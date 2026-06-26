/**
 * Resync: pushes the current bundled defaults into Sanity with createOrReplace,
 * OVERWRITING the matching documents. Use this to apply copy fixes made in
 * src/lib/defaults.ts to the live CMS content.
 *
 * WARNING: this overwrites the seeded documents (settings, about, policies,
 * stay, services, packages, testimonials) with the values in defaults.ts. Any
 * edits made directly in Studio to those documents will be replaced. Safe while
 * the content still matches what was seeded.
 *
 *   npm run resync
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 */
import { createClient } from "@sanity/client";
import {
  DEFAULT_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_PACKAGES,
  DEFAULT_STAY,
  DEFAULT_TESTIMONIALS,
  DEFAULT_ABOUT,
  DEFAULT_POLICIES,
} from "../src/lib/defaults";
import { DEFAULT_HOME, DEFAULT_INSURANCE } from "../src/lib/homeDefaults";

const keyed = <T,>(arr: T[], prefix: string) => arr.map((x, i) => ({ _key: `${prefix}-${i}`, ...x }));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

async function run() {
  const tx = client.transaction();

  tx.createOrReplace({
    _id: "homeContent",
    _type: "homeContent",
    ...DEFAULT_HOME,
    heroStats: keyed(DEFAULT_HOME.heroStats, "stat"),
    pillars: keyed(DEFAULT_HOME.pillars, "pillar"),
    steps: keyed(DEFAULT_HOME.steps, "step"),
    why: keyed(DEFAULT_HOME.why, "why"),
    gallery: keyed(DEFAULT_HOME.gallery, "tile"),
  });

  tx.createOrReplace({ _id: "insurancePage", _type: "insurancePage", ...DEFAULT_INSURANCE });

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    businessName: DEFAULT_SETTINGS.businessName,
    tagline: DEFAULT_SETTINGS.tagline,
    whatsappNumber: DEFAULT_SETTINGS.whatsappNumber,
    chatbotUrl: DEFAULT_SETTINGS.chatbotUrl,
    generalEmail: DEFAULT_SETTINGS.generalEmail,
    staysEmail: DEFAULT_SETTINGS.staysEmail,
    flightsEmail: DEFAULT_SETTINGS.flightsEmail,
    supportEmail: DEFAULT_SETTINGS.supportEmail,
    queriesEmail: DEFAULT_SETTINGS.queriesEmail,
    facebookUrl: DEFAULT_SETTINGS.facebookUrl ?? undefined,
    instagramUrl: DEFAULT_SETTINGS.instagramUrl ?? undefined,
    heroEyebrow: DEFAULT_SETTINGS.heroEyebrow,
    heroHeadline: DEFAULT_SETTINGS.heroHeadline,
    heroSubcopy: DEFAULT_SETTINGS.heroSubcopy,
    paymentNote: DEFAULT_SETTINGS.paymentNote,
    footerBlurb: DEFAULT_SETTINGS.footerBlurb,
  });

  tx.createOrReplace({
    _id: "aboutContent",
    _type: "aboutContent",
    intro: DEFAULT_ABOUT.intro,
    sections: DEFAULT_ABOUT.sections.map((s, i) => ({ _type: "contentSection", _key: `about-${i}`, ...s })),
  });

  tx.createOrReplace({
    _id: "policiesContent",
    _type: "policiesContent",
    intro: DEFAULT_POLICIES.intro,
    sections: DEFAULT_POLICIES.sections.map((s, i) => ({ _type: "contentSection", _key: `pol-${i}`, ...s })),
  });

  tx.createOrReplace({
    _id: "stay",
    _type: "stay",
    name: DEFAULT_STAY.name,
    tagline: DEFAULT_STAY.tagline,
    description: DEFAULT_STAY.description,
    tags: DEFAULT_STAY.tags,
    features: DEFAULT_STAY.features,
  });

  DEFAULT_SERVICES.forEach((s) => {
    tx.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      icon: s.icon,
      scope: s.scope,
      category: s.category,
      order: s.order,
      shortBlurb: s.shortBlurb,
      cardFeatures: s.cardFeatures,
      intro: s.intro,
      body: s.body.map((b, i) => ({ _type: "contentSection", _key: `${s.slug}-${i}`, ...b })),
      primaryLink: s.primaryLink ? { _type: "linkRef", ...s.primaryLink } : undefined,
    });
  });

  DEFAULT_PACKAGES.forEach((p, i) => {
    tx.createOrReplace({
      _id: `package-${i}`,
      _type: "package",
      name: p.name,
      price: p.price,
      terms: p.terms,
      features: p.features,
      featured: p.featured,
      order: p.order,
    });
  });

  DEFAULT_TESTIMONIALS.forEach((t, i) => {
    tx.createOrReplace({ _id: `testimonial-${i}`, _type: "testimonial", quote: t.quote, person: t.person, context: t.context, order: i });
  });

  await tx.commit();
  console.log("Resync complete (createOrReplace): settings, about, policies, stay, services, packages, testimonials.");
}

run().catch((err) => {
  console.error("Resync failed:", err);
  process.exit(1);
});
