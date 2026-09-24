import fs from "node:fs";
import path from "node:path";

const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };

function inlineImages(html) {
  return html.replace(/src="([^"]+\.(?:jpe?g|png))"/g, (m, file) => {
    const p = path.join(dir, file);
    if (!fs.existsSync(p)) throw new Error("missing image: " + file);
    const b64 = fs.readFileSync(p).toString("base64");
    return `src="data:${MIME[path.extname(file).toLowerCase()]};base64,${b64}"`;
  });
}

function parse(file) {
  const src = read(file);
  const style = src.match(/<style>([\s\S]*?)<\/style>/)[1];
  const body = src.slice(src.indexOf("</helmet>") + 9, src.indexOf("</x-dc>"));
  return { style, body: inlineImages(body) };
}

const outside = parse("Main.dc.html");
const inside = parse("Inside.dc.html");

// Fold guides are working marks for the canvas, not something a print shop
// should reproduce: the panels are exact thirds and get scored by measurement.
const stripFolds = (s) => s.replace(/ style="border-right: 1px dashed rgba\(14,42,58,0\.16\);"/g, "");

const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Expeditions With Jo — tri-fold brochure</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@700&display=swap" rel="stylesheet">
<style>
@page { size: 11in 8.5in; margin: 0; }
html, body { margin: 0; padding: 0; background: #ffffff; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.sheet { width: 1056px; height: 816px; overflow: hidden; position: relative; background: #ffffff; }
.sheet + .sheet { page-break-before: always; break-before: page; }
${outside.style}
${inside.style}
</style>
</head>
<body>
<div class="sheet">${stripFolds(outside.body)}</div>
<div class="sheet">${stripFolds(inside.body)}</div>
</body>
</html>
`;

fs.writeFileSync(path.join(dir, "expeditions-with-jo-brochure-print.html"), out);
console.log("wrote expeditions-with-jo-brochure-print.html —", (out.length / 1024 / 1024).toFixed(2), "MB");

// One file per sheet, for capturing each page as a single flattened image.
// PDF viewers antialias the edge of every embedded image, which shows up as a
// hairline tracing each photo's bounding box at fractional zoom. Flattening a
// page to one image leaves no internal image edges for that to happen at.
const sheets = [stripFolds(outside.body), stripFolds(inside.body)];
sheets.forEach((body, i) => {
  const one = out
    .replace(/<div class="sheet">[\s\S]*<\/div>\s*<\/body>/, `<div class="sheet">${body}</div>\n</body>`)
    .replace("@page { size: 11in 8.5in; margin: 0; }", "@page { size: 11in 8.5in; margin: 0; }");
  fs.writeFileSync(path.join(dir, `sheet${i + 1}.html`), one);
});
console.log("wrote sheet1.html, sheet2.html");
