/**
 * Add the accessibility lines to the live service documents.
 *
 * Sanity holds the five service documents, so the matching edit in
 * defaults.ts changes nothing on the live site. This adds one bullet to the
 * `detail.included` list of three services and leaves every other field alone.
 *
 *   npx tsx scripts/patch-access.ts          # report what would change
 *   npx tsx scripts/patch-access.ts --write  # actually write
 *
 * It refuses to write when the live list is anything other than what the code
 * default looked like before the new line was added. That way a bullet edited
 * in the Studio is never flattened by this script: it stops and tells you
 * instead, and you add the line by hand.
 */
import { createClient } from "@sanity/client";
import { DEFAULT_SERVICES } from "../src/lib/defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

const WRITE = process.argv.includes("--write");

// The one bullet added to each service. Each has to match a string that is
// already in defaults.ts, so the code and the CMS cannot drift apart.
const NEW_LINE: Record<string, string> = {
  flights: "Wheelchair and airport assistance put to the airline when you book, with its answer passed back to you in writing",
  accommodations:
    "Step-free entry, lift access and bathroom layout checked with the property itself before you book, rather than taken from the listing",
  transfers: "An accessible vehicle requested where the operator runs one, and a straight answer where it does not",
};

type Doc = { _id: string; included?: string[] };

async function main() {
  let changed = 0;
  let blocked = 0;

  for (const [slug, line] of Object.entries(NEW_LINE)) {
    const service = DEFAULT_SERVICES.find((s) => s.slug === slug);
    const target = service?.detail?.included;
    if (!target || !target.includes(line)) {
      console.error(`! ${slug}: the code default no longer contains this line. Fix defaults.ts first.`);
      blocked++;
      continue;
    }
    // What the list looked like before the line was added.
    const expectedBefore = target.filter((x) => x !== line);

    const doc = await client.fetch<Doc | null>(
      `*[_type == "service" && slug.current == $slug][0]{_id, "included": detail.included}`,
      { slug }
    );
    if (!doc) {
      console.log(`- ${slug}: no document in Sanity, the code default already ships.`);
      continue;
    }

    const live = doc.included ?? [];
    if (live.includes(line)) {
      console.log(`= ${slug}: already has the line, nothing to do.`);
      continue;
    }
    if (JSON.stringify(live) !== JSON.stringify(expectedBefore)) {
      console.error(`! ${slug}: the live list differs from the code default, so this will not touch it.`);
      console.error(`  live:     ${JSON.stringify(live, null, 2)}`);
      console.error(`  expected: ${JSON.stringify(expectedBefore, null, 2)}`);
      console.error("  Add the line in the Studio by hand, in the position you want it.");
      blocked++;
      continue;
    }

    console.log(`${WRITE ? "+" : "~"} ${slug}: ${live.length} bullets to ${target.length}`);
    console.log(`    adding: ${line}`);
    if (WRITE) {
      await client.patch(doc._id).set({ "detail.included": target }).commit();
    }
    changed++;
  }

  console.log(
    WRITE
      ? `\nWrote ${changed} service${changed === 1 ? "" : "s"}. ${blocked} skipped.`
      : `\nDry run. ${changed} would change, ${blocked} skipped. Re-run with --write to apply.`
  );
  if (blocked) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
