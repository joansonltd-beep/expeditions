#!/usr/bin/env python3
"""Turn the Stitch mockup exports in android/stitch into an offline web bundle.

Every remote dependency the mockups use (Tailwind's CDN runtime, Google Fonts,
the placeholder cover images) is already vendored under android/vendor, so the
generated bundle loads with no network at all. Output goes to
android/app/src/main/assets/www and is what the APK ships.
"""

import hashlib
import json
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STITCH = os.path.join(ROOT, "stitch")
VENDOR = os.path.join(ROOT, "vendor")
OUT = os.path.join(ROOT, "app", "src", "main", "assets", "www")

# Stitch screen directory -> page filename in the bundle.
SCREENS = [
    ("storage_permission_onboarding", "index.html", "Welcome"),
    ("library", "library.html", "Library"),
    ("ewj_library_resume_reading", "library_resume.html", "Library (resume reading)"),
    ("library_device_only", "library_device.html", "Library (device only)"),
    ("empty_library_state", "library_empty.html", "Library (empty)"),
    ("immersive_reader", "reader.html", "Reader"),
    ("ewj_reader", "reader_ewj.html", "Reader (EWJ theme)"),
    ("import_pdf", "import.html", "Import a document"),
    ("import_from_device", "import_device.html", "Import from device"),
    ("settings_voice", "settings.html", "Settings"),
    ("ewj_settings", "settings_ewj.html", "Settings (EWJ theme)"),
    ("voice_settings_multilingual", "settings_languages.html", "Voice and languages"),
    ("about_legal", "about.html", "About and legal"),
]

TAILWIND_RE = re.compile(r'<script[^>]*src="https://cdn\.tailwindcss\.com[^"]*"[^>]*>\s*</script>')
FONTS_RE = re.compile(r'<link[^>]*href="https://fonts\.googleapis\.com/[^"]*"[^>]*>')
IMG_RE = re.compile(r"https://lh3\.googleusercontent\.com/[^\"')\s]+")

LOCAL_HEAD = (
    '<link href="assets/fonts.css" rel="stylesheet"/>\n'
    '<link href="assets/symbols.css" rel="stylesheet"/>\n'
    '<script src="assets/tailwind.js"></script>'
)


def build():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, "assets"), exist_ok=True)

    shutil.copy(os.path.join(VENDOR, "tailwind.js"), os.path.join(OUT, "assets", "tailwind.js"))
    shutil.copy(os.path.join(VENDOR, "inter.css"), os.path.join(OUT, "assets", "fonts.css"))
    shutil.copy(os.path.join(VENDOR, "symbols.css"), os.path.join(OUT, "assets", "symbols.css"))
    shutil.copytree(os.path.join(VENDOR, "fonts"), os.path.join(OUT, "assets", "fonts"))
    shutil.copytree(os.path.join(VENDOR, "img"), os.path.join(OUT, "assets", "img"))
    screen_list = json.dumps([{"page": p, "label": l} for _, p, l in SCREENS], indent=2)
    app_js = open(os.path.join(ROOT, "tools", "app.js"), encoding="utf-8").read()
    open(os.path.join(OUT, "assets", "app.js"), "w", encoding="utf-8").write(
        "window.EWJ_SCREENS = " + screen_list + ";\n\n" + app_js
    )

    written = []
    for folder, page, label in SCREENS:
        src = os.path.join(STITCH, folder, "code.html")
        if not os.path.exists(src):
            raise SystemExit("missing screen: " + src)
        html = open(src, encoding="utf-8").read()

        first = [True]

        def tailwind_sub(_m):
            if first[0]:
                first[0] = False
                return LOCAL_HEAD
            return ""

        html = TAILWIND_RE.sub(tailwind_sub, html)
        html = FONTS_RE.sub("", html)
        html = IMG_RE.sub(lambda m: "assets/img/" + hashlib.md5(m.group(0).encode()).hexdigest()[:10] + ".png", html)

        html = html.replace(
            "</body>",
            '<script src="assets/app.js"></script>\n</body>',
        )
        open(os.path.join(OUT, page), "w", encoding="utf-8").write(html)
        written.append((page, label))

    print("wrote %d pages to %s" % (len(written), OUT))


if __name__ == "__main__":
    build()
