"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CsmeCountry } from "@/lib/csmeData";

// Country picker for the CSME Skills Certificate. The visitor chooses their
// country from a dropdown, then is taken to that country's instructions page.
export default function CsmePicker({ countries }: { countries: CsmeCountry[] }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const go = () => {
    if (slug) router.push(`/caricom-skills-certificate/${slug}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <label htmlFor="csme-country" className="block text-sm font-semibold uppercase tracking-wide text-brand">
        Choose your country
      </label>
      <p className="mt-1 text-sm text-slate-500">
        Pick where you live (or where you want to work) to see the exact steps and office for that country.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <select
          id="csme-country"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <option value="" disabled>
            Select a country…
          </option>
          {countries.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={go}
          disabled={!slug}
          className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          View instructions →
        </button>
      </div>
    </div>
  );
}
