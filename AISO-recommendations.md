# AI discoverability recommendations

Advisory only — nothing here has been applied to the live site. Everything is grounded in what's actually true about the business today; no invented stats, reviews, or credentials.

## Homepage hero — example rewrite

Not applied. The current hero (`heroHeadline`/`heroSubcopy` in `src/lib/defaults.ts`) already reads as a fairly direct, plain answer, so this is offered as an option, not a fix.

**Current:**
> Thinking about working, studying or visiting another CARICOM country?
>
> Tell Jo where you are starting and where you want to go. We will help you work out what to check first, and organise the flights, papers and arrival details around it.

**More citation-friendly version** (front-loads the facts an AI would want to lift as a standalone snippet, rather than opening on a question):

> **Visit, work or study in another CARICOM country — here's what actually applies**
>
> Expeditions With Jo helps CARICOM nationals work out what's required to visit, work or study in one of the twelve CARICOM member states, then organises the paperwork and travel to match. Working usually starts with the CARICOM Skills Certificate. Studying needs a separate student visa, since CSME free movement covers work, not study. Visiting has its own, simpler requirements. Tell Jo the situation and get a straight answer on what applies before committing to anything.

## Example H2s matching natural AI queries

- "What is the CARICOM Skills Certificate and who can apply?"
- "Do I need a visa to work in another CARICOM country?"
- "How is studying in CARICOM different from working there?"

These aren't new topics — the site already answers all three (Skills Certificate guide, the Go Work page, the Go Study page). The point is just that phrasing a real H2 as the literal question makes it easier for an answer engine to match it to a search query and quote it directly.

## FAQ before/after (Go Visit page)

**Before** (current, from `src/app/(site)/getting-there/page.tsx`):
> **Do CARICOM nationals need a visa to visit another CARICOM country?**
> In many cases no, and CARICOM nationals often receive an automatic stay of up to six months on arrival in member states. It still depends on your nationality, your destination and your purpose, and it is not the same thing as permission to work or study. Tell us your passport and destination and we will point you to what applies.

This is already good — specific, factual, no fluff. The one change worth making across the FAQ set: lead the *page* intro with the single most common question's answer in miniature, so a crawler indexing just the top of the page still gets the core fact, rather than that fact only appearing several paragraphs down inside the FAQ accordion. E.g., the Go Visit page's intro paragraph could open with "Most CARICOM nationals don't need a visa to visit another member state and get up to six months on arrival" before the current "Planning a trip..." framing — same fact, just promoted higher on the page.

## Entity & authority signals

1. **NAP consistency** — the business now shows Kingston, Jamaica in the site's structured data. If Jo lists the business anywhere else (Google Business Profile, directories, social bios), make sure the name/location match this exactly. Mismatched location signals actively hurt entity resolution.
2. **About page** — already has a real named founder, a real history, and clear boundaries ("what I don't decide"). That's the right shape; keep it that way rather than genericizing it.
3. **Social profile alignment** — `sameAs` in the JSON-LD only lists Facebook and Instagram (`src/lib/defaults.ts`). Add any other real, active profiles (LinkedIn, TikTok, etc.) to `socialLinks`/`sameAs` once they exist — don't add placeholders.
4. **Reviews** — there's a `ProofPlaceholder` component on the homepage explicitly marked "not visible in production," waiting for real testimonials. Getting even two or three genuine ones in is one of the highest-leverage things left undone here — AI answer engines and Google both weight third-party validation heavily, and right now there's none published.
5. **Backlinks / citations** — being mentioned on CARICOM-adjacent forums, Facebook groups, Reddit threads (r/caribbean, r/jamaica, r/trinidadandtobago) or referenced by other CSME/immigration resource pages is the actual mechanism that gets a source into an AI system's retrieval or training data. This isn't something the codebase can produce — it's outreach.
6. **Consistent phone number** — the site uses a Trinidad number (868) throughout while the address now says Jamaica. That's not necessarily wrong (a business can keep an old number after a personal move), but if it's inaccurate or confusing, worth deciding on purpose rather than by accident.

## Glossary page ideas

- **"What is CARICOM?"** — genuinely missing. Nothing on the site currently explains CARICOM from a standing start (it's assumed knowledge everywhere else). Suggested H1: "What is CARICOM?" Suggested opening sentence: "CARICOM (the Caribbean Community) is a group of 12 member states with a shared regime for free movement of skilled labour, known as the CSME." Worth writing as a real guide article if you want it — I didn't write the full piece since that's real content work, not a template.
- **"CSME Freedom of Movement Explained"** — already covered by the existing guide `full-free-movement-vs-csme-certificate` (`src/lib/articleDefaults.ts`). Recommend against a duplicate; if anything, that existing article's title/URL could be checked for how well it matches how people actually phrase this question.

## Testing checklist

1. Ask ChatGPT, Perplexity and Gemini: *"How does the CARICOM Skills Certificate work?"* — check whether expeditionswithjo.com appears as a cited source, and whether the answer given matches what the site actually says.
2. Ask: *"Do I need a visa to visit Jamaica from Trinidad?"* (or another same-CARICOM pair) — same check.
3. Search the exact business name ("Expeditions With Jo") in each tool to see if it's recognized as an entity at all, separate from being cited for a topic query.
4. In Google, search `site:expeditionswithjo.com` to confirm how many pages are actually indexed — a gap here means AI Overviews (which lean on Google's index) can't cite pages that aren't in it.
5. Re-run all of the above again a month after any change, since AI retrieval indexes update on their own schedules, not immediately.

## Metrics to track monthly

- **Branded search volume** (Google Search Console — how many people search "Expeditions With Jo" or "Joanson Baptiste James" by name) as a proxy for whether AI-driven exposure is translating into people looking the business up directly.
- **Referral traffic from AI tools** (Vercel Analytics / Google Analytics referrer data — chatgpt.com, perplexity.ai, and similar do show up as referrers when a user clicks a cited link).
- **Indexed page count** (`site:expeditionswithjo.com` in Google) — a simple leading indicator of crawl/index health.
