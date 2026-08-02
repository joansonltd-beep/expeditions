#!/usr/bin/env python3
"""Cut launcher icons out of the EWJ Document Reader logo export."""

import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "stitch", "ewj_document_reader_logo", "screen.png")
RES = os.path.join(ROOT, "app", "src", "main", "res")

# The logo is a wordmark: open-book glyph on the left, "EWJ Document Reader" on
# the right. Only the glyph reads at launcher size, so crop to it.
CROP = (95, 320, 510, 680)
DENSITIES = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
BACKGROUND = (245, 240, 230, 255)


def main():
    logo = Image.open(SRC).convert("RGBA")
    glyph = logo.crop(CROP)

    side = max(glyph.size)
    pad = int(side * 0.18)
    canvas = Image.new("RGBA", (side + pad * 2, side + pad * 2), BACKGROUND)
    canvas.paste(
        glyph,
        (pad + (side - glyph.width) // 2, pad + (side - glyph.height) // 2),
        glyph,
    )

    for density, size in DENSITIES.items():
        out_dir = os.path.join(RES, "mipmap-" + density)
        os.makedirs(out_dir, exist_ok=True)
        canvas.resize((size, size), Image.LANCZOS).save(os.path.join(out_dir, "ic_launcher.png"))
        print("mipmap-%s/ic_launcher.png (%dpx)" % (density, size))


if __name__ == "__main__":
    main()
