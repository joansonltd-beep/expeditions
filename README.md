# Expeditions With Jo

The Expeditions With Jo website. Built the same way as joansonbjames.com:
**Next.js + Sanity CMS + Vercel**, with an embedded Studio at `/studio` so you can
edit all the content yourself.

It is designed to **run with no setup**: until you connect Sanity, every page
renders from the bundled default content in `src/lib/defaults.ts`. Connecting
Sanity simply lets you edit that content from a dashboard instead of code.

---

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The Studio is at http://localhost:3000/studio.

---

## Connect the CMS (Sanity)

You can reuse the same Sanity account you use for joansonbjames.com. Create a
**new project** (or a new dataset) for Expeditions so the content stays separate.

1. Go to https://www.sanity.io/manage and **create a project** (free plan is fine).
   Note its **Project ID**.
2. Copy `.env.local.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_WRITE_TOKEN=...   # only needed for seeding (see below)
   ```
   Create the write token at sanity.io/manage → API → Tokens (Editor permission).
3. **Seed the starter content** into Sanity (safe to re-run; never overwrites edits):
   ```bash
   npm run seed
   ```
4. Restart `npm run dev`. The site now reads from Sanity. Edit anything at
   `/studio` (services, prices, the A Likkle Rest stay, testimonials, the About
   and Policies pages, contact details, hero text) and it updates within a minute.

If you skip all of this, the site still works perfectly on the bundled content.

---

## Deploy to Vercel

You likely already have a Vercel account from joansonbjames.com.

1. Push this folder to a new GitHub repo.
2. In Vercel, **Add New → Project** and import that repo. Framework is detected
   as Next.js; no build settings needed.
3. Add the same environment variables from your `.env.local` in
   **Vercel → Project → Settings → Environment Variables**
   (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER`, and `NEXT_PUBLIC_SITE_URL` once you know the URL).
   The `SANITY_API_WRITE_TOKEN` is only needed locally for seeding, not on Vercel.
4. Deploy. You get a `*.vercel.app` URL to check.

### Point the domain (replacing the Google Site)

Your domain is managed at **Squarespace** (the old Google Domains). The Google
Site is currently wired by a single record: `www` → CNAME → `ghs.googlehosted.com`.

1. In Vercel → Project → **Domains**, add `expeditionswithjo.com` and
   `www.expeditionswithjo.com`. Vercel shows the exact DNS records to create.
2. In your Squarespace DNS settings:
   - **Delete** the `www` → CNAME → `ghs.googlehosted.com` record (the Google Site link).
   - **Add** the records Vercel gives you (typically an `A` record on the apex to
     `76.76.21.21`, and a `CNAME` on `www` to `cname.vercel-dns.com` — use
     whatever Vercel displays).
3. In Google Sites, unpublish / disconnect the custom domain so it does not try
   to reclaim it.
4. Wait for DNS to propagate (minutes to a few hours). Vercel auto-issues HTTPS.

---

## Where things live

- `src/lib/defaults.ts` — all bundled content (the single source of truth before Sanity).
- `src/lib/siteData.ts` — fetches from Sanity, falls back to defaults.
- `src/sanity/schemaTypes/` — the editable content types.
- `src/app/(site)/` — the pages. `src/components/` — the building blocks.
- `scripts/seed.ts` — pushes defaults into Sanity (`npm run seed`).

## Notes

- The home-page testimonials are placeholders ("Sample client"). Replace them in
  Studio (or `src/lib/defaults.ts`) with real client quotes.
- The contact form opens the visitor's email app prefilled to
  `info@expeditionswithjo.com`. WhatsApp, the Zapier chat bot, and the Welcome
  Pickups transfer booking are all wired to the real destinations.
