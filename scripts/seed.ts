/**
 * Seed: pushes the bundled default content into Sanity so it can be edited in
 * Studio.
 *
 * Run after setting NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 * and SANITY_API_WRITE_TOKEN in .env.local:
 *
 *   npm run seed
 *
 * Uses fixed document ids + createIfNotExists, so it only creates documents
 * that don't exist yet. Re-running is SAFE: it never overwrites edits you've
 * made in Studio, and it fills in any newly-added content.
 */
import { createClient } from "@sanity/client";
import {
  DEFAULT_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_PACKAGES,
  DEFAULT_ADDONS,
  DEFAULT_STAY,
  DEFAULT_TESTIMONIALS,
  DEFAULT_ABOUT,
  DEFAULT_POLICIES,
} from "../src/lib/defaults";
import { DEFAULT_HOME, DEFAULT_INSURANCE } from "../src/lib/homeDefaults";
import { DEFAULT_ARTICLES } from "../src/lib/articleDefaults";
import { DEFAULT_BUSINESS_SETUP } from "../src/lib/businessSetupDefaults";

// Sanity needs a stable _key on every object inside an array.
const keyed = <T,>(arr: T[], prefix: string) => arr.map((x, i) => ({ _key: `${prefix}-${i}`, ...x }));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function run() {
  const tx = client.transaction();

  tx.createIfNotExists({
    _id: "homeContent",
    _type: "homeContent",
    ...DEFAULT_HOME,
    heroStats: keyed(DEFAULT_HOME.heroStats, "stat"),
    pillars: keyed(DEFAULT_HOME.pillars, "pillar"),
    steps: keyed(DEFAULT_HOME.steps, "step"),
    why: keyed(DEFAULT_HOME.why, "why"),
    gallery: keyed(DEFAULT_HOME.gallery, "tile"),
  });

  tx.createIfNotExists({ _id: "insurancePage", _type: "insurancePage", ...DEFAULT_INSURANCE });

  tx.createIfNotExists({
    _id: "businessSetupPage",
    _type: "businessSetupPage",
    ...DEFAULT_BUSINESS_SETUP,
    services: keyed(DEFAULT_BUSINESS_SETUP.services, "bsvc"),
  });

  DEFAULT_ARTICLES.forEach((a) => {
    tx.createIfNotExists({
      _id: `post-${a.slug}`,
      _type: "post",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      excerpt: a.excerpt,
      publishedAt: a.publishedAt,
      body: a.body.map((b, i) => ({ _type: "contentSection", _key: `${a.slug}-${i}`, ...b })),
    });
  });

  tx.createIfNotExists({
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

  tx.createIfNotExists({
    _id: "aboutContent",
    _type: "aboutContent",
    intro: DEFAULT_ABOUT.intro,
    sections: DEFAULT_ABOUT.sections.map((s, i) => ({ _type: "contentSection", _key: `about-${i}`, ...s })),
  });

  tx.createIfNotExists({
    _id: "policiesContent",
    _type: "policiesContent",
    intro: DEFAULT_POLICIES.intro,
    sections: DEFAULT_POLICIES.sections.map((s, i) => ({ _type: "contentSection", _key: `pol-${i}`, ...s })),
  });

  tx.createIfNotExists({
    _id: "stay",
    _type: "stay",
    name: DEFAULT_STAY.name,
    tagline: DEFAULT_STAY.tagline,
    description: DEFAULT_STAY.description,
    tags: DEFAULT_STAY.tags,
    features: DEFAULT_STAY.features,
  });

  DEFAULT_SERVICES.forEach((s) => {
    tx.createIfNotExists({
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
    tx.createIfNotExists({
      _id: `package-${i}`,
      _type: "package",
      name: p.name,
      priceUsd: p.priceUsd,
      features: p.features,
      featured: p.featured,
      order: p.order,
    });
  });

  DEFAULT_ADDONS.forEach((a, i) => {
    tx.createIfNotExists({
      _id: `addon-${i}`,
      _type: "addOn",
      title: a.title,
      usdPrice: a.usdPrice,
      amountText: a.amountText,
      trinidadOnly: a.trinidadOnly ?? false,
      order: a.order,
    });
  });

  DEFAULT_TESTIMONIALS.forEach((t, i) => {
    tx.createIfNotExists({
      _id: `testimonial-${i}`,
      _type: "testimonial",
      quote: t.quote,
      person: t.person,
      context: t.context,
      order: i,
    });
  });

  await tx.commit();
  console.log(
    `Seed complete (createIfNotExists): settings, about, policies, stay, business setup, ` +
      `${DEFAULT_SERVICES.length} services, ${DEFAULT_PACKAGES.length} packages, ` +
      `${DEFAULT_ADDONS.length} add-ons, ${DEFAULT_TESTIMONIALS.length} testimonials.`
  );
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
