/**
 * Resync About only: pushes DEFAULT_ABOUT from src/lib/defaults.ts into Sanity
 * with createOrReplace, overwriting just the "aboutContent" document. Use this
 * after editing DEFAULT_ABOUT so the live site picks up the change (getAbout()
 * prefers the Sanity document over the code default whenever one exists).
 *
 *   npm run resync:about
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 */
import { createClient } from "@sanity/client";
import { DEFAULT_ABOUT } from "../src/lib/defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

async function run() {
  await client.createOrReplace({
    _id: "aboutContent",
    _type: "aboutContent",
    intro: DEFAULT_ABOUT.intro,
    sections: DEFAULT_ABOUT.sections.map((s, i) => ({ _type: "contentSection", _key: `about-${i}`, ...s })),
  });
  console.log("About resync complete: aboutContent updated, nothing else touched.");
}

run().catch((err) => {
  console.error("About resync failed:", err);
  process.exit(1);
});
