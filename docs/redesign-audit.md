# Redesign audit

Stage 1 of the redesign brief. Written against `main` at `e594ec6`, plus the
live site. This is the state of things before any redesign work, and the places
where the brief and the repository disagree.

---

## Current architecture

Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Sanity as the CMS,
deployed on Vercel from `main` with no staging. 33 page routes under
`src/app/(site)`, plus `/studio`, `/internal/job-search` and four API routes.

The data layer is the thing to understand first. `src/lib/siteData.ts` fetches
from Sanity when a project id is configured and falls back to bundled defaults
otherwise. **If Sanity holds a document, that is what ships, and editing the
code default changes nothing live.** Any redesign that moves copy around has to
patch Sanity as well, through a targeted `client.patch().set()`. Never
`resync:home`, which replaces whole documents and flattens Studio edits.

Content lives in two places. Editable copy (settings, services, about, home,
policies) comes from Sanity with defaults in `src/lib/defaults.ts` and
`homeDefaults.ts`. Reference data is code only: `countryGuideData.ts` is 3,746
lines, `csmeData.ts` 803, plus banking, marriage, school and photo data. Roughly
8,500 lines of structured content that is already written and sourced.

Two blocks are deliberately code only and documented as such in `homeCopy.ts`:
`WE_DO` / `THEY_DECIDE`, described there as the most legally sensitive sentences
on the site.

## Existing pages and routes

Home. Destinations index plus twelve country guides. Guides index plus articles.
Services, and the five service pages (flights, accommodation, transfers,
insurance, banking) with `finance/[island]`. CARICOM Skills Certificate plus
per-country pages. Weddings plus per-country pages plus a guests page. Getting
there, getting started, study, business setup, plan my move, find my pathway,
flights, tools (translator, currency converter, list my property), survey,
about, policies, credits, accommodations, property management, consultation
paid, transfers (unreachable, see below).

`/transfers` redirects to Welcome Pickups, so its page never renders and it is
kept out of the sitemap on purpose. `/internal/job-search` is live, unlisted and
not disallowed in robots.

## Reusable components

51 components, 6,559 lines. The ones that matter:

| Component | Role |
| --- | --- |
| `ui.tsx` | `Container`, `PageHeader`, `Section`, `SectionHead`, `CheckList`, button classes |
| `sections.tsx` | `EditorialSplit`, `RouteSteps`, `FactRows`, `Callout`, `Band` |
| `Header.tsx` | Logo, wordmark, sentence-style nav |
| `ServicePage.tsx` | Renders any service from its data |
| `FindMyPathwayForm.tsx` | The pathway questionnaire |
| `PlanMyMoveForm.tsx` | The paid consultation intake |
| `CountryFinder.tsx` | Filters the twelve countries |
| `RotatingHero` / `RotatingPhotoBg` | Photo heroes |
| `icons.tsx` | Inline SVG icon set, no icon dependency |

Forms are `CombinedSurveyForm`, `PropertyIntakeForm`, `FindMyPathwayForm`,
`PlanMyMoveForm`, `JobSeekerEnquiry`, `JobOfferEnquiry`, `BusinessSetupEnquiry`.

## Current visual system

One `@theme` block at the top of `globals.css` skins everything. Brand is sea
teal `#0b6b72`, hover `#084f55`, accent deep spice red `#a32b1f`, navy `#0e2a3a`
for type, sand `#e7efee` and cream `#f6f9f9` for section separation. Every value
is documented with its contrast ratio against white, all above AA.

Display face is Source Serif 4, body is Geist Sans. Fraunces was removed
deliberately because its J and F read before the words did.

`FLAG_THEMES` is empty on purpose. The seasonal flag repaint mechanism still
works but is switched off. National days appear in the announcement strip only.

**The brief's section 13 is largely already satisfied.** It asks for deep
Caribbean blue/green, warm sand and off-white, charcoal, a muted tropical accent
and occasional coral. That is a description of the palette already in place. It
also warns against endless rounded cards and repetitive three-column sections,
which is the exact problem `sections.tsx` was built to solve.

## Problems with UX

1. The home page opens with explanation rather than a way in. The brief is right
   about this, and it is the single biggest win available.
2. Two overlapping intake forms. `FindMyPathwayForm` and `PlanMyMoveForm` ask
   many of the same questions and lead to the same consultation. A visitor who
   does both answers twice.
3. The pathway questionnaire is one long form on one screen. The logic inside it
   is good and already adapts its questions to the stated purpose, but the
   presentation does not reward going through it.
4. Service content is rich and barely surfaced. Every service carries `whoFor`,
   `included`, `youProvide`, `notControlled`, `process`, `feesNote` and FAQs, and
   `cardFeatures` is not rendered anywhere at all.
5. The twelve country guides hold the best content on the site and are reached
   through a filter list that most visitors will not use.
6. `/transfers` sends people off-site with no way back.

## Problems with visual hierarchy

1. `SectionHead` has a `lead` flag so one heading per page can dominate, and it
   is not used consistently. Pages where every heading is the same size have no
   shape.
2. The home page is a vertical stack of equal-weight bands. Nothing is clearly
   first.
3. Photography is strong but used small and decoratively rather than at scale.
4. Long prose blocks are not consistently capped with `.measure`, so line length
   runs past comfortable reading on wide screens.

## Content that should remain

All of `countryGuideData.ts`, `csmeData.ts`, `bankingData.ts`, `marryData.ts`
and `schoolData.ts`. The "what I can do / what I cannot do" blocks. Every service
page's `notControlled` and `disclaimer`. The credits page and the photo data it
derives from. All existing URLs, which are indexed.

## Functionality that should remain

Every form listed above. The pathway logic. The consultation payment flow
through `savePendingConsultation` and Fygaro. The currency converter, translator
and property intake. The cost-of-living survey. The Sanity Studio route. The
announcement strip and its date logic. WhatsApp links throughout.

## Functionality worth adding

The route selector hero and the interactive map from the brief are both good and
neither needs a new dependency. The map should be inline SVG, not a globe
library. Merging the two intake forms into one stepped journey would remove the
duplication rather than add to it. `My Expedition` is worth architecting for but
needs a backend that does not exist.

---

## Where the brief and this repository disagree

These need a decision before the work they describe can start.

**Navigation.** AGENTS.md says never change the header, because the logo,
wordmark and sentence-style navigation are the site's identity, unless asked
directly. The brief restructures the navigation. That counts as asking
directly, so the rule is satisfied, but the sentence nav is a deliberate brand
asset and replacing it with a conventional menu is a real loss. Worth keeping
the sentence form and changing what it points at.

**Typography.** The brief suggests DM Serif Display with Inter, or Cormorant
Garamond with Manrope. The project moved off a display serif once already, for
documented reasons. Changing again should be a deliberate choice, not a default.

**Palette.** Already close to what the brief describes. Recommend keeping it and
spending the effort on layout and scale instead.

**Testimonials.** The brief allows clearly marked placeholders. AGENTS.md
forbids inventing them outright. Placeholders only, and visibly so.

**Claims that expire.** Superhost status, the 20% management fee cap and the
trading figures are true only while they are true. A redesign must not restate
them in new places.

## Blockers

1. **Sanity.** Whether the live site is served from Sanity or from the bundled
   defaults cannot be determined from outside, and `.env.local` is not in the
   repo. If Sanity is live, every copy change in the redesign needs a matching
   patch, and that needs a write token.
2. **Photography.** The brief asks for airports, passports, packing, arrivals
   and real neighbourhoods. The repo has landscapes and city views. Licensed
   stock does not cover the region's civic landmarks, so only Jo's own
   photographs will close this gap.
3. **Backend.** `My Expedition` needs accounts and persistence. Front end only
   until then, and it must not pretend to save anything.
4. **No staging.** Every merge to `main` is live in about ninety seconds. A
   redesign of this size wants a preview deploy and a review step.
