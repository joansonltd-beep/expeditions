/**
 * Patch the hero headline on the live siteSettings document.
 *
 * getSiteSettings() prefers Sanity over the code default, so editing
 * defaults.ts alone changes nothing on the live site. This sets the one field
 * rather than replacing the document, so nothing else in siteSettings is
 * touched.
 *
 *   npx tsx scripts/patch-hero.ts
 */
import { createClient } from "@sanity/client";
import { DEFAULT_SETTINGS } from "../src/lib/defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

async function main() {
  const doc = await client.fetch<{ _id: string; heroHeadline?: string } | null>(
    `*[_type == "siteSettings"][0]{_id, heroHeadline}`
  );
  if (!doc) {
    console.log("No siteSettings document in Sanity; the code default is already what ships.");
    process.exit(0);
  }
  console.log("was:", JSON.stringify(doc.heroHeadline));
  await client.patch(doc._id).set({ heroHeadline: DEFAULT_SETTINGS.heroHeadline }).commit();
  console.log("now:", JSON.stringify(DEFAULT_SETTINGS.heroHeadline));
  
}

main();
