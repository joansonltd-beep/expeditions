/**
 * Resync services + policies only: pushes DEFAULT_SERVICES and
 * DEFAULT_POLICIES from src/lib/defaults.ts into Sanity with createOrReplace,
 * overwriting just the "service-*" and "policiesContent" documents. Use this
 * after editing service or policy copy so the live site picks up the change
 * (getServices()/getPolicies() prefer the Sanity documents over the code
 * defaults whenever they exist).
 *
 *   npm run resync:services
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 */
import { createClient } from "@sanity/client";
import { DEFAULT_SERVICES, DEFAULT_POLICIES } from "../src/lib/defaults";

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

  tx.createOrReplace({
    _id: "policiesContent",
    _type: "policiesContent",
    intro: DEFAULT_POLICIES.intro,
    sections: DEFAULT_POLICIES.sections.map((s, i) => ({ _type: "contentSection", _key: `pol-${i}`, ...s })),
  });

  await tx.commit();
  console.log("Services + policies resync complete: service-* and policiesContent updated, nothing else touched.");
}

run().catch((err) => {
  console.error("Services + policies resync failed:", err);
  process.exit(1);
});
