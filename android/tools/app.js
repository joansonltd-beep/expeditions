/* Wiring layer for the Stitch mockups.
 *
 * The exported screens are static: every link is href="#". This script gives
 * them app behaviour — bottom-nav routing, back buttons, an all-screens picker,
 * and hooks the reader's play button up to Android text-to-speech through the
 * EwjTts bridge exposed by MainActivity.
 */
(function () {
  "use strict";

  var ROUTES = {
    library_books: "library.html",
    play_circle: "reader.html",
    settings: "settings.html",
    add: "import.html",
    upload_file: "import.html",
    menu_book: "library.html",
    library_add: "import.html"
  };

  function clickable(el) {
    return el.closest("a, button, [role=button], li, div.flex") || el;
  }

  function go(page) {
    window.location.href = page;
  }

  function onboarding() {
    var isIndex = /(^|\/)index\.html$/.test(window.location.pathname);
    if (!isIndex) return;
    if (localStorage.getItem("ewj.onboarded") === "1") {
      window.location.replace("library.html");
      return;
    }
    // The screen's own handler swaps the button into a spinner on click and
    // then calls location.reload() as a placeholder, so match the call to
    // action by its text now, while it still says what it does, and listen in
    // the capture phase. Setting the flag is enough on its own: the mockup's
    // reload comes back through the redirect above.
    var cta = /continue|get started|allow|next|grant/;
    Array.prototype.slice
      .call(document.querySelectorAll("a, button"))
      .filter(function (el) {
        return cta.test((el.innerText || "").toLowerCase());
      })
      .forEach(function (el) {
        el.addEventListener(
          "click",
          function () {
            localStorage.setItem("ewj.onboarded", "1");
            setTimeout(function () {
              go("library.html");
            }, 2600);
          },
          true
        );
      });
  }

  function routing() {
    document.querySelectorAll("[data-icon]").forEach(function (icon) {
      var name = icon.getAttribute("data-icon");
      var host = clickable(icon);
      if (name === "arrow_back") {
        host.addEventListener("click", function (ev) {
          ev.preventDefault();
          if (history.length > 1) history.back();
          else go("library.html");
        });
        return;
      }
      var dest = ROUTES[name];
      if (!dest) return;
      // Only route chrome elements (nav bars, headers, FABs), never list rows.
      if (!icon.closest("nav, header, footer, .fixed")) return;
      host.addEventListener("click", function (ev) {
        ev.preventDefault();
        go(dest);
      });
    });

    document.querySelectorAll("a, button").forEach(function (el) {
      var text = (el.innerText || "").trim().toLowerCase();
      if (text === "about" || text === "about & legal" || text === "about and legal") {
        el.addEventListener("click", function (ev) {
          ev.preventDefault();
          go("about.html");
        });
      } else if (/^(voice|voices|language|languages|voice & language)/.test(text)) {
        el.addEventListener("click", function (ev) {
          ev.preventDefault();
          go("settings_languages.html");
        });
      }
    });
  }

  function readerText() {
    var main = document.querySelector("main") || document.body;
    var blocks = Array.prototype.slice.call(main.querySelectorAll("p, h1, h2, h3, li"));
    var text = blocks
      .map(function (el) {
        return (el.innerText || "").trim();
      })
      .filter(function (t) {
        return t.length > 20;
      })
      .join(". ");
    return text || (main.innerText || "").trim();
  }

  function tts() {
    var bridge = window.EwjTts;
    if (!bridge) return;
    var buttons = document.querySelectorAll('[data-icon="pause"], [data-icon="play_arrow"], [data-icon="play_circle"]');
    buttons.forEach(function (icon) {
      if (icon.closest("nav")) return;
      var host = clickable(icon);
      host.addEventListener("click", function (ev) {
        ev.preventDefault();
        if (bridge.isSpeaking()) {
          bridge.stop();
          icon.textContent = "play_arrow";
          icon.setAttribute("data-icon", "play_arrow");
        } else {
          bridge.speak(readerText());
          icon.textContent = "pause";
          icon.setAttribute("data-icon", "pause");
        }
      });
    });
  }

  function screenPicker() {
    // Docked to the right edge at mid-height: every screen has a bottom nav
    // bar and a header, so the vertical centre is the only spot that never
    // covers a control.
    var btn = document.createElement("button");
    btn.setAttribute("aria-label", "All screens");
    btn.textContent = "apps";
    btn.className = "material-symbols-outlined";
    btn.style.cssText =
      "position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:2147483000;" +
      "width:26px;height:46px;border-radius:14px 0 0 14px;border:none;opacity:.4;" +
      "background:#a73918;color:#fff;font-size:17px;line-height:46px;padding:0;";

    var sheet = document.createElement("div");
    sheet.style.cssText =
      "position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,.45);display:none;" +
      "align-items:flex-end;font-family:Inter,system-ui,sans-serif;";
    var panel = document.createElement("div");
    panel.style.cssText =
      "background:#fff8f3;color:#1e1b17;width:100%;max-height:70vh;overflow:auto;" +
      "border-radius:20px 20px 0 0;padding:12px 8px 24px;";
    panel.innerHTML = '<div style="padding:8px 16px;font-weight:700;font-size:15px;">Screens</div>';
    sheet.appendChild(panel);

    sheet.addEventListener("click", function (ev) {
      if (ev.target === sheet) sheet.style.display = "none";
    });
    btn.addEventListener("click", function () {
      sheet.style.display = sheet.style.display === "flex" ? "none" : "flex";
    });

    // Inlined by build_www.py — a file:// page cannot fetch a sibling file.
    var here = window.location.pathname.split("/").pop() || "index.html";
    (window.EWJ_SCREENS || []).forEach(function (s) {
      var row = document.createElement("a");
      row.href = s.page;
      row.textContent = s.label;
      row.style.cssText =
        "display:block;padding:12px 16px;text-decoration:none;font-size:15px;border-radius:12px;" +
        (s.page === here ? "background:#ffdbd1;color:#862201;font-weight:600;" : "color:#1e1b17;");
      panel.appendChild(row);
    });

    document.body.appendChild(btn);
    document.body.appendChild(sheet);
  }

  function start() {
    onboarding();
    routing();
    tts();
    screenPicker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
