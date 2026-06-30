"use client";

import { useState } from "react";
import type { CsmeCountry } from "@/lib/csmeData";

// Country picker for the CSME Skills Certificate page. Every country's panel is
// rendered in the HTML (so search engines see it); only the selected one shows.
export default function CsmePicker({ countries }: { countries: CsmeCountry[] }) {
  const initial = countries.find((c) => c.slug === "trinidad-and-tobago")?.slug ?? countries[0].slug;
  const [sel, setSel] = useState(initial);

  return (
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand">Where do you live? Pick your country</p>
      <div className="flex flex-wrap gap-2">
        {countries.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setSel(c.slug)}
            aria-pressed={sel === c.slug}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              sel === c.slug
                ? "border-brand bg-brand text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {countries.map((c) => (
          <div key={c.slug} className={sel === c.slug ? "" : "hidden"}>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">CSME Skills Certificate in {c.name}</h3>

              {c.fullFreeMovement ? (
                <div className="mt-4 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
                  {c.name} began <strong>full free movement</strong> on 1 October 2025. Its nationals can live and work in
                  Barbados, Belize, Dominica and St. Vincent and the Grenadines without a Skills Certificate. You still need
                  the certificate to live and work in other CARICOM countries.
                </div>
              ) : null}

              <p className="mt-5 text-slate-600">
                <span className="font-semibold text-slate-900">Where to apply:</span> {c.authority}
              </p>
              <p className="mt-3 text-slate-600">{c.howTo}</p>

              {c.officialUrl ? (
                <a
                  href={c.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  Official {c.name} information →
                </a>
              ) : (
                <p className="mt-5 text-sm text-slate-400">
                  Search your government website for &ldquo;{c.authority}&rdquo; to confirm the current requirements.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
