/**
 * Make the apostrophes in Sanity copy typographic.
 *
 * The code sweep could only reach strings in the repository. Sanity wins at
 * runtime, so copy edited there kept its straight apostrophes.
 *
 * This walks the documents the site reads, applies the same rule the code
 * sweep used, and patches back ONLY the fields that changed. It deliberately
 * does not use createOrReplace: anything edited in the Studio and not covered
 * here stays exactly as it is.
 *
 *   npx tsx scripts/patch-punctuation.ts
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

/** Contractions and possessives only: an apostrophe with a letter each side. */
const fix = (s: string) => s.replace(/([A-Za-z])'([A-Za-z])/g, "$1\u2019$2");

/** Walks a value, returning the fixed copy and how many changes it made. */
function walk(v: unknown): { out: unknown; n: number } {
  if (typeof v === "string") {
    const out = fix(v);
    return { out, n: out === v ? 0 : 1 };
  }
  if (Array.isArray(v)) {
    let n = 0;
    const out = v.map((x) => { const r = walk(x); n += r.n; return r.out; });
    return { out, n };
  }
  if (v && typeof v === "object") {
    let n = 0;
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (k.startsWith("_")) { out[k] = val; continue; }
      const r = walk(val);
      n += r.n;
      out[k] = r.out;
    }
    return { out, n };
  }
  return { out: v, n: 0 };
}

async function main() {
  const docs = await client.fetch<Record<string, unknown>[]>(
    `*[_type in ["siteSettings", "homeContent", "about", "service", "article"]]`
  );
  let patched = 0, fields = 0;

  for (const doc of docs) {
    const id = doc._id as string;
    const changes: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(doc)) {
      if (k.startsWith("_")) continue;
      const r = walk(v);
      if (r.n > 0) { changes[k] = r.out; fields += r.n; }
    }
    if (Object.keys(changes).length === 0) continue;
    await client.patch(id).set(changes).commit();
    patched++;
    console.log(`  ${id}: ${Object.keys(changes).join(", ")}`);
  }
  console.log(`\n${fields} strings fixed across ${patched} documents (${docs.length} checked).`);
}

main();
