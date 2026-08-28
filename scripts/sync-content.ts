/**
 * Targeted content sync.
 *
 * Unlike scripts/resync.ts (which does createOrReplace on whole documents and
 * will happily wipe a field it does not know about, such as an uploaded logo),
 * this script PATCHES only the named fields. Everything else in Sanity is left
 * exactly as it is.
 *
 * Dry run (default) prints every change without writing:
 *   npm run sync:content
 *
 * Apply for real:
 *   npm run sync:content -- --apply
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 */
import { createClient } from "@sanity/client";
import { DEFAULT_SETTINGS, DEFAULT_SERVICES, DEFAULT_ABOUT } from "../src/lib/defaults";
import { DEFAULT_HOME } from "../src/lib/homeDefaults";

const apply = process.argv.includes("--apply");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

const keyed = <T,>(arr: T[], prefix: string) => arr.map((x, i) => ({ _key: `${prefix}-${i}`, ...x }));

// --- what to write -------------------------------------------------------

// Repositioning copy on the site settings singleton. Only these five fields:
// emails, socials, the WhatsApp number, the payment note and any uploaded logo
// are deliberately left untouched.
const settingsFields = {
  tagline: DEFAULT_SETTINGS.tagline,
  heroEyebrow: DEFAULT_SETTINGS.heroEyebrow,
  heroHeadline: DEFAULT_SETTINGS.heroHeadline,
  heroSubcopy: DEFAULT_SETTINGS.heroSubcopy,
  footerBlurb: DEFAULT_SETTINGS.footerBlurb,
};

const homeFields = {
  heroStats: keyed(DEFAULT_HOME.heroStats, "stat"),
  heroTrustNote: DEFAULT_HOME.heroTrustNote,
  journeysEyebrow: DEFAULT_HOME.journeysEyebrow,
  journeysTitle: DEFAULT_HOME.journeysTitle,
  journeysIntro: DEFAULT_HOME.journeysIntro,
  journeys: keyed(DEFAULT_HOME.journeys, "journey"),
  journeysNote: DEFAULT_HOME.journeysNote,
  ladderEyebrow: DEFAULT_HOME.ladderEyebrow,
  ladderTitle: DEFAULT_HOME.ladderTitle,
  ladderIntro: DEFAULT_HOME.ladderIntro,
  howEyebrow: DEFAULT_HOME.howEyebrow,
  howTitle: DEFAULT_HOME.howTitle,
  howIntro: DEFAULT_HOME.howIntro,
  steps: keyed(DEFAULT_HOME.steps, "step"),
  howNote: DEFAULT_HOME.howNote,
  csmeEyebrow: DEFAULT_HOME.csmeEyebrow,
  csmeTitle: DEFAULT_HOME.csmeTitle,
  csmeText: DEFAULT_HOME.csmeText,
  studyEyebrow: DEFAULT_HOME.studyEyebrow,
  studyTitle: DEFAULT_HOME.studyTitle,
  studyText: DEFAULT_HOME.studyText,
  supportEyebrow: DEFAULT_HOME.supportEyebrow,
  supportTitle: DEFAULT_HOME.supportTitle,
  supportIntro: DEFAULT_HOME.supportIntro,
  pillars: keyed(DEFAULT_HOME.pillars, "pillar"),
  notSureTitle: DEFAULT_HOME.notSureTitle,
  notSureText: DEFAULT_HOME.notSureText,
  whyEyebrow: DEFAULT_HOME.whyEyebrow,
  whyTitle: DEFAULT_HOME.whyTitle,
  why: keyed(DEFAULT_HOME.why, "why"),
  testimonialsEyebrow: DEFAULT_HOME.testimonialsEyebrow,
  testimonialsTitle: DEFAULT_HOME.testimonialsTitle,
  faqEyebrow: DEFAULT_HOME.faqEyebrow,
  faqTitle: DEFAULT_HOME.faqTitle,
  faqs: keyed(DEFAULT_HOME.faqs, "faq"),
  contactEyebrow: DEFAULT_HOME.contactEyebrow,
  contactTitle: DEFAULT_HOME.contactTitle,
  contactIntro: DEFAULT_HOME.contactIntro,
  gallery: keyed(DEFAULT_HOME.gallery, "tile"),
};

// Home-page fields the redesign retired. Left in place they would clutter
// Studio with text that no longer renders anywhere.
const retiredHomeFields = [
  "pillarsEyebrow",
  "pillarsTitle",
  "pillarsIntro",
  "travelEyebrow",
  "travelTitle",
  "travelIntro",
  "bundleEyebrow",
  "bundleTitle",
  "bundleText",
  "localEyebrow",
  "localTitle",
  "localIntro",
];

async function run() {
  const mode = apply ? "APPLY" : "DRY RUN";
  console.log(`\n${mode}: ${projectId}/${dataset}\n${"=".repeat(50)}\n`);

  console.log("siteSettings — set:");
  for (const [k, v] of Object.entries(settingsFields)) console.log(`  ${k}: ${JSON.stringify(v).slice(0, 110)}`);

  console.log("\nhomeContent — set:");
  for (const k of Object.keys(homeFields)) console.log(`  ${k}`);
  console.log("homeContent — unset (retired):");
  for (const k of retiredHomeFields) console.log(`  ${k}`);

  console.log("\naboutContent — set: intro, sections");

  const withDetail = DEFAULT_SERVICES.filter((s) => s.detail);
  console.log(`\nservices — set detail on ${withDetail.length}:`);
  for (const s of withDetail) console.log(`  service-${s.slug}`);

  // Only the travel-visas copy actually changed; the rest of the service body
  // text is untouched so any Studio edits survive.
  const visas = DEFAULT_SERVICES.find((s) => s.slug === "travel-visas");
  console.log("\nservices — set copy on service-travel-visas: shortBlurb, cardFeatures, intro, body");

  const placeholders = await client.fetch<{ _id: string; person: string }[]>(
    `*[_type == "testimonial" && person match "Sample*"]{_id, person}`
  );
  console.log(`\ntestimonials — delete ${placeholders.length} placeholder document(s):`);
  for (const t of placeholders) console.log(`  ${t._id} (${t.person})`);

  if (!apply) {
    console.log("\nNothing written. Re-run with --apply to make these changes.\n");
    return;
  }

  const tx = client.transaction();

  tx.patch("siteSettings", (p) => p.set(settingsFields));
  tx.patch("homeContent", (p) => p.set(homeFields).unset(retiredHomeFields));
  tx.patch("aboutContent", (p) =>
    p.set({
      intro: DEFAULT_ABOUT.intro,
      sections: DEFAULT_ABOUT.sections.map((s, i) => ({ _type: "contentSection", _key: `about-${i}`, ...s })),
    })
  );

  for (const s of withDetail) {
    tx.patch(`service-${s.slug}`, (p) =>
      p.set({
        detail: {
          ...s.detail,
          faqs: s.detail?.faqs ? keyed(s.detail.faqs, `${s.slug}-faq`) : undefined,
          related: s.detail?.related
            ? s.detail.related.map((r, i) => ({ _type: "linkRef", _key: `${s.slug}-rel-${i}`, ...r }))
            : undefined,
        },
      })
    );
  }

  if (visas) {
    tx.patch("service-travel-visas", (p) =>
      p.set({
        shortBlurb: visas.shortBlurb,
        cardFeatures: visas.cardFeatures,
        intro: visas.intro,
        body: visas.body.map((b, i) => ({ _type: "contentSection", _key: `travel-visas-${i}`, ...b })),
      })
    );
  }

  for (const t of placeholders) tx.delete(t._id);

  await tx.commit();
  console.log("\nDone. Only the fields listed above were written.\n");
}

run().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
