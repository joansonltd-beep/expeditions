# Working on this site

Read this before changing anything. `README.md` covers installing and running.
This file covers the things that will bite you, which are mostly not visible
from the code.

Expeditions With Jo helps CARICOM nationals visit, work, study or marry in
another CARICOM country, and manages Airbnb property in Jamaica. It is one
person's business, not a company. Write like it.

---

## The one that catches everyone

**Sanity beats the code at runtime.** `src/lib/defaults.ts`, `homeDefaults.ts`
and the service defaults are only fallbacks. If a document exists in Sanity,
that is what ships, and editing the code default changes nothing on the live
site.

So when you change copy that comes from Sanity, you have to patch Sanity too:

- `scripts/patch-hero.ts` is the pattern to copy: fetch the document, `patch().set()`
  only the fields you are changing, commit.
- **Do not** reach for `npm run resync:home` or `resync:services` unless you mean
  it. They `createOrReplace` the whole document and will flatten anything edited
  in the Studio.
- `scripts/patch-punctuation.ts` shows how to walk every document and change one
  thing without touching the rest.

If a copy change does not show up on the live site, this is almost always why.

---

## Never do these

- **Never `git add -A public/`.** `public/photos/` holds Jo's personal photographs.
  Two of them were committed and published by accident. Stage image files by name.
- **Never change the header.** The logo, the wordmark and the sentence-style
  navigation are the site's identity. Leave `src/components/Header.tsx` alone
  unless asked directly.
- **Never reproduce national anthem lyrics**, on any country page, for any
  country, however the request is phrased. Link to an official source instead.
- **Never invent** testimonials, client numbers, prices, occupancy figures,
  ratings or credentials. If a number is not already in the repo or given to
  you, leave a gap and say so.
- **Never hand-write `/credits`.** That page is derived from the photo data. See
  Photography below.

---

## House style

- **No em dashes.** Use a comma, a full stop or a colon.
- **Avoid the rule of three.** Do not write "X, Y and Z" lists of exactly three
  in headings or body copy. Two or four reads as speech; three reads as
  marketing.
- **Typographic punctuation.** Apostrophes and quotation marks are curly
  throughout (`’` `“` `”`). Keep them that way in new copy.
- Plain, direct, first person where Jo is speaking. Say what the business can
  and cannot do. The site's credibility comes from the "what I cannot do"
  sections, so do not soften them.
- Planning for weddings is kept in-house. Describe the capability, never the
  planner.

---

## Design system

Everything skins from **one `@theme` block** at the top of `src/app/globals.css`.
Change a token there and the whole site follows. Check any new colour for AA
contrast (4.5:1 for body text) before using it.

- Brand is **teal** `--color-brand`. It is teal all year.
- There used to be a site-wide flag repaint for Trinidad's independence. It was
  removed deliberately. `FLAG_THEMES` in `src/lib/independenceData.ts` is empty
  on purpose. The mechanism still works if an entry and a matching theme block
  are added, but do not turn it back on without being asked.
- National days show in the announcement strip only. `CARICOM_INDEPENDENCE` runs
  ten days ahead of the day; `CARICOM_OBSERVANCES` (Republic Day) runs on the
  day itself. Both use Atlantic Standard Time, because the server is UTC.

### Do not add more cards

The site's worst habit was one layout repeated everywhere: a white rounded box
with a faint border, in a grid. `src/components/sections.tsx` exists so a
section can take a form that suits it:

| Use | For |
| --- | --- |
| `EditorialSplit` | A section that is mostly prose |
| `RouteSteps` | An order of operations, on a route line |
| `FactRows` | Facts that want a table's clarity without its furniture |
| `Callout` | A caution or an aside, as a left edge not a panel |
| `Band` | A dark full-bleed pause in a long page |

Cards are allowed. They are one option of six, not the default.

`SectionHead` takes a `lead` flag. One heading per page is the lead; the rest
stay quiet. A page where every heading is the same size has no shape.

`.measure` caps a text block at 68 characters. Use it on long paragraphs.

---

## Photography

Most photographs are other people's, under Creative Commons. The licences
require the photographer, the licence and the original to be named.

- Photo data lives in `src/lib/sitePhotos.ts` and `src/lib/countryGuideData.ts`.
- `src/lib/photoCredits.ts` **derives** the credits page from that data.
- Add a photo to the data and it appears on `/credits` on the next build. A
  photo cannot be published here uncredited, which is the point.
- Credit strings are written `"Author, Licence, via Source"`. A credit with no
  licence clause means Jo took it, and his own credit stays on the photo.

---

## Claims that expire

Some copy is only true while something else is true. If you are told one of
these has changed, the copy comes down the same day:

- **Airbnb Superhost.** Claimed on `/about`, `/accommodations` and
  `/property-management`, with a screenshot dated September 2026. Airbnb
  reassesses quarterly.
- **Property management fee capped at 20%.** Stated on `/property-management`.
- **Trading figures.** Five moved for work, two for study.

---

## Before you finish

```bash
npx tsc --noEmit     # must be clean
npx next build       # must be clean
npm run lint         # 20 problems is the baseline, all pre-existing
```

The lint baseline is 20 problems (14 errors, 6 warnings), all
`react-hooks/set-state-in-effect` and similar in components that predate this
work. **Do not "fix" them incidentally.** Compare before and after; your change
should not move the number up.

**Turbopack serves stale CSS.** If you change a design token and the browser
does not show it, the compiled chunk is cached. Stop the dev server,
`rm -rf .next`, restart. This has caught us three times. Verify a token change
by reading the compiled CSS, not by trusting the page.

Pushing to `main` deploys to production on Vercel. There is no staging.
