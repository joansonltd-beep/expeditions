/**
 * Resync home content only: pushes DEFAULT_HOME from src/lib/homeDefaults.ts
 * into Sanity with createOrReplace, overwriting just the "homeContent"
 * document. Use this after editing DEFAULT_HOME so the live homepage picks
 * up the change (getHomeContent() prefers the Sanity document over the code
 * default whenever one exists).
 *
 *   npm run resync:home
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 */
import { createClient } from "@sanity/client";
import { DEFAULT_HOME } from "../src/lib/homeDefaults";

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
  await client.createOrReplace({
    _id: "homeContent",
    _type: "homeContent",
    ...DEFAULT_HOME,
    heroStats: keyed(DEFAULT_HOME.heroStats, "stat"),
    pillars: keyed(DEFAULT_HOME.pillars, "pillar"),
    steps: keyed(DEFAULT_HOME.steps, "step"),
    why: keyed(DEFAULT_HOME.why, "why"),
    gallery: keyed(DEFAULT_HOME.gallery, "tile"),
  });
  console.log("Home resync complete: homeContent updated, nothing else touched.");
}

run().catch((err) => {
  console.error("Home resync failed:", err);
  process.exit(1);
});
