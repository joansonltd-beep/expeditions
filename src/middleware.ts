import { NextResponse, type NextRequest } from "next/server";

/*
  TEMPORARY MAINTENANCE MODE ("site deactivated").

  While this file is present, the public site returns a styled HTTP 503
  "back soon" page instead of the real pages. This is the correct, SEO-safe
  way to take a site offline temporarily (503 + Retry-After tells search
  engines it's temporary and NOT to deindex).

  The site is LIVE only when the environment variable MAINTENANCE_MODE is set
  to exactly "off". With the variable unset (the default), maintenance is ON.

  To bring the site back, see MAINTENANCE.md in the repo root. Short version:
    - Fastest, no code: in Vercel add env var MAINTENANCE_MODE = off, then redeploy.
    - Permanent:        delete this file (and MAINTENANCE.md), commit, and push.

  The Studio (/studio), the API (/api), Next internals (/_next), and the
  Google site-verification file stay reachable so content editing and Search
  Console keep working during maintenance.
*/

const SITE_LIVE = process.env.MAINTENANCE_MODE === "off";

const MAINTENANCE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="none" />
<title>Back soon | Expeditions With Jo</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    background:
      radial-gradient(900px 480px at 85% -8%, #f0fdf4, transparent 60%),
      #ffffff;
    display: grid;
    place-items: center;
    padding: 24px;
  }
  .card {
    max-width: 520px;
    width: 100%;
    text-align: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 999px;
    background: #f0fdf4;
    color: #15803d;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid #bbf7d0;
  }
  .dot {
    width: 8px; height: 8px; border-radius: 999px; background: #16a34a;
  }
  h1 {
    margin: 22px 0 12px;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p {
    margin: 0 auto;
    max-width: 42ch;
    color: #475569;
    font-size: 1.05rem;
    line-height: 1.6;
  }
  a.cta {
    display: inline-block;
    margin-top: 26px;
    padding: 12px 22px;
    border-radius: 999px;
    background: #16a34a;
    color: #ffffff;
    font-weight: 600;
    text-decoration: none;
  }
  a.cta:hover { background: #15803d; }
</style>
</head>
<body>
  <main class="card">
    <span class="badge"><span class="dot"></span>Temporarily offline</span>
    <h1>We&rsquo;ll be back soon.</h1>
    <p>Expeditions With Jo is briefly down for maintenance. Thanks for your patience &mdash; check back shortly, or reach us by email in the meantime.</p>
    <a class="cta" href="mailto:ai@expeditionswithjo.com">Email us</a>
  </main>
</body>
</html>`;

export function middleware(_req: NextRequest) {
  if (SITE_LIVE) return NextResponse.next();

  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
    },
  });
}

export const config = {
  // Apply to all routes EXCEPT the Studio, API, Next internals, and the
  // Google Search Console verification file.
  matcher: [
    "/((?!studio|api|_next/static|_next/image|favicon.ico|google37f569bdde66c7cc.html).*)",
  ],
};
