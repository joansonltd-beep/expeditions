# Backups and how to roll back

Snapshot taken 27 August 2026, immediately before the CARICOM visit/work/study
repositioning. The live site at that moment was commit `c69674c`.

There are two halves to this site, and rolling back means restoring both.

## 1. The code (pages, layout, components)

Backed up on GitHub in two places, either of which works:

- tag `backup-2026-08-27-pre-caricom`
- branch `backup/pre-caricom-2026-08-27`

To roll the live site back to it:

```bash
git checkout main && git revert --no-commit c69674c..HEAD && git commit -m "Roll back to pre-repositioning site" && git push origin main
```

That records the rollback as a new commit and leaves the history intact, which
is safer than a force push. Vercel redeploys automatically on push.

Faster option with no git at all: open the project in the Vercel dashboard,
find the deployment for `c69674c`, and use **Promote to Production**. That
rolls the code back in seconds without touching the repo.

## 2. The content (Sanity CMS)

The homepage hero, section headings, About page, Policies page, service pages
and pricing all live in Sanity, not in the code. A code rollback alone will not
restore them.

`sanity-production-2026-08-27.ndjson` is a full export of the `production`
dataset as it was before any changes: all 25 documents.

To restore it:

```bash
npm run restore:sanity -- backups/sanity-production-2026-08-27.ndjson
```

Every document in the file is written back with `createOrReplace`, returning the
dataset to its exact pre-change state. Documents created after the backup are
left alone rather than deleted, so a restore cannot silently destroy newer work.
Remove those in Studio if you want an exact rollback.

Needs `SANITY_API_WRITE_TOKEN` in `.env.local`, which is already there.

## Taking a fresh backup later

```bash
curl -s "https://bk54yfif.api.sanity.io/v2024-10-01/data/export/production" -o "backups/sanity-production-$(date +%Y-%m-%d).ndjson"
```
