"use client";

import { useMemo, useState } from "react";
import type { CountrySchools } from "@/lib/schoolData";

export default function SchoolSearch({ institutions }: { institutions: CountrySchools[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return institutions;
    return institutions
      .map((c) => ({
        ...c,
        schools: c.schools.filter((s) => {
          const haystack = [
            s.name,
            s.note,
            s.affiliation ?? "",
            s.public ? "public government state" : "",
            ...s.programs,
            c.country,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        }),
      }))
      .filter((c) => c.schools.length > 0);
  }, [institutions, query]);

  const resultCount = filtered.reduce((n, c) => n + c.schools.length, 0);

  return (
    <div>
      <label htmlFor="school-search" className="sr-only">
        Search by course of study, religious affiliation, government/public status, school or country
      </label>
      <div className="relative">
        <input
          id="school-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a course (e.g. accounting), affiliation (e.g. adventist), public/government, school or country…"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
      </div>

      {query ? (
        <p className="mt-3 text-sm text-slate-600">
          {resultCount === 0
            ? "No schools match that search."
            : `${resultCount} school${resultCount === 1 ? "" : "s"} match "${query}".`}
        </p>
      ) : null}

      <div className="mt-6 space-y-6">
        {filtered.map((c) => (
          <div key={c.country}>
            <h3 className="font-semibold text-slate-900">{c.country}</h3>
            <ul className="mt-2 space-y-3">
              {c.schools.map((s) => (
                <li key={s.name} className="text-sm text-slate-600">
                  <div className="flex gap-2">
                    <span aria-hidden="true" className="mt-0.5 text-brand">
                      •
                    </span>
                    <span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand hover:underline"
                      >
                        {s.name} ↗
                      </a>
                      : {s.note}
                    </span>
                  </div>
                  {s.public || s.affiliation ? (
                    <div className="mt-1.5 ml-4 flex flex-wrap gap-1.5">
                      {s.public ? (
                        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
                          Government / public
                        </span>
                      ) : null}
                      {s.affiliation ? (
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-slate-700">
                          {s.affiliation}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="mt-1.5 ml-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Courses offered:
                    </span>
                    {s.programs.map((p) => (
                      <span key={p} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {p}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
