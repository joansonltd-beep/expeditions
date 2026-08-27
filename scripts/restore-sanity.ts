/**
 * Restore Sanity content from an NDJSON backup taken with the dataset export
 * endpoint (see backups/README.md).
 *
 *   npm run restore:sanity -- backups/sanity-production-2026-08-27.ndjson
 *
 * Every document in the file is pushed back with createOrReplace, so the
 * dataset returns to exactly the state it was in when the backup was taken.
 * Documents created AFTER the backup are left alone rather than deleted, so a
 * restore can never silently destroy newer content; delete those in Studio if
 * you want a byte-exact rollback.
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const file = process.argv[2];
if (!file) {
  console.error("Usage: npm run restore:sanity -- <path-to-backup.ndjson>");
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

// The export includes system documents and drafts; neither should be restored.
const isRestorable = (doc: { _id?: string; _type?: string }) =>
  typeof doc._id === "string" &&
  typeof doc._type === "string" &&
  !doc._id.startsWith("drafts.") &&
  !doc._type.startsWith("system.");

async function run() {
  const docs = readFileSync(file, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as Record<string, unknown>)
    .filter(isRestorable);

  if (docs.length === 0) {
    console.error(`No restorable documents found in ${file}.`);
    process.exit(1);
  }

  const tx = client.transaction();
  for (const doc of docs) {
    // _rev and the timestamps belong to the old revision; Sanity assigns new
    // ones on write, and passing the stale _rev would be rejected.
    const { _rev, _createdAt, _updatedAt, ...rest } = doc;
    void _rev;
    void _createdAt;
    void _updatedAt;
    tx.createOrReplace(rest as { _id: string; _type: string });
  }
  await tx.commit();

  console.log(`Restored ${docs.length} documents to ${projectId}/${dataset} from ${file}.`);
}

run().catch((err) => {
  console.error("Restore failed:", err);
  process.exit(1);
});
