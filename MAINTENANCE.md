# Maintenance mode (site temporarily deactivated)

The public site **www.expeditionswithjo.com** is currently in maintenance mode:
every public page returns a styled "We'll be back soon" page (HTTP 503).

This is controlled by [`src/middleware.ts`](src/middleware.ts).

- The site is **LIVE only when** the environment variable `MAINTENANCE_MODE` is
  set to exactly `off`.
- With that variable **unset (the default), maintenance is ON.**
- Still reachable during maintenance: the Sanity Studio (`/studio`), the API
  (`/api`), Next.js internals (`/_next`), and the Google Search Console
  verification file. So you can still edit content and stay verified.

---

## How to reactivate — pick ONE

### Option A — Vercel dashboard, no code (fastest, recommended)

1. Go to <https://vercel.com> and open the **expeditions** project.
2. **Settings → Environment Variables → Add New.**
   - Key: `MAINTENANCE_MODE`
   - Value: `off`
   - Environments: tick **Production** (and Preview if you want).
   - Save.
3. **Deployments** tab → open the most recent Production deployment → the
   **⋯** menu → **Redeploy** (env-var changes only take effect after a redeploy).
4. Wait for the build to finish. The site is live again.

To take it back down later: change that variable's value to anything other than
`off` (e.g. `on`), or delete the variable, then redeploy.

### Option B — Git, remove maintenance for good

1. Delete both files: `src/middleware.ts` and `MAINTENANCE.md`.
2. Commit and push to the `main` branch. **The commit author email must be
   `admin@expeditionswithjo.com`** or Vercel will silently skip the build.

   ```bash
   git rm src/middleware.ts MAINTENANCE.md
   git -c user.email=admin@expeditionswithjo.com commit -m "Reactivate site: remove maintenance mode"
   git push origin main
   ```

3. Vercel auto-deploys the push. The site is live again.

---

## To re-deactivate later (if you removed the files in Option B)

Restore `src/middleware.ts` from git history and push it, or in Vercel set
`MAINTENANCE_MODE` to `on` (only works while the middleware file exists).
