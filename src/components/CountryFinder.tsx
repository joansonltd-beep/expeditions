"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * Browsing twelve countries by the thing you actually care about.
 *
 * The index used to be twelve identical cards in alphabetical order, which is
 * only useful if you already know which country you want. Someone who does not
 * is usually deciding on one of three things: whether they can move there
 * without a permit, what it costs to live, and what language they will be
 * working in. So those are the filters.
 *
 * Everything here is derived from the country data at build time and filtered
 * in the browser. No search index, no network call, no new dependency.
 */

export type FinderCountry = {
  slug: string;
  name: string;
  tagline: string;
  /** Full free movement, in force since 1 October 2025. */
  freeMovement: boolean;
  /** The official language, which for eleven of the twelve is English. */
  language: string;
  /** Lower bound of the modest monthly all-in budget, in US dollars. */
  costFrom: number | null;
  /** The published range, shown as written rather than as a number. */
  costLabel: string | null;
};

type CostBand = "all" | "under1200" | "1200to1500" | "over1500";

const COST_BANDS: { id: CostBand; label: string; test: (n: number | null) => boolean }[] = [
  { id: "all", label: "Any budget", test: () => true },
  { id: "under1200", label: "Under US$1,200", test: (n) => n !== null && n < 1200 },
  { id: "1200to1500", label: "US$1,200 to US$1,500", test: (n) => n !== null && n >= 1200 && n <= 1500 },
  { id: "over1500", label: "Over US$1,500", test: (n) => n !== null && n > 1500 },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full border border-brand bg-brand px-4 py-2.5 text-sm font-semibold text-white transition"
          : "rounded-full border border-navy/25 bg-transparent px-4 py-2.5 text-sm font-semibold text-navy/80 transition hover:border-brand hover:text-brand"
      }
    >
      {children}
    </button>
  );
}

export default function CountryFinder({ countries }: { countries: FinderCountry[] }) {
  const [band, setBand] = useState<CostBand>("all");
  const [ffmOnly, setFfmOnly] = useState(false);
  const [language, setLanguage] = useState<string>("all");

  const languages = useMemo(
    () => [...new Set(countries.map((c) => c.language))].sort(),
    [countries]
  );

  const shown = useMemo(() => {
    const test = COST_BANDS.find((b) => b.id === band)!.test;
    return countries.filter(
      (c) => test(c.costFrom) && (!ffmOnly || c.freeMovement) && (language === "all" || c.language === language)
    );
  }, [countries, band, ffmOnly, language]);

  const filtered = band !== "all" || ffmOnly || language !== "all";

  return (
    <div>
      <div className="border-y border-navy/15 py-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-sm font-semibold uppercase tracking-[0.1em] text-navy/70">Budget</span>
          {COST_BANDS.map((b) => (
            <Chip key={b.id} active={band === b.id} onClick={() => setBand(b.id)}>
              {b.label}
            </Chip>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-sm font-semibold uppercase tracking-[0.1em] text-navy/70">Language</span>
          <Chip active={language === "all"} onClick={() => setLanguage("all")}>
            Any language
          </Chip>
          {languages.map((l) => (
            <Chip key={l} active={language === l} onClick={() => setLanguage(l)}>
              {l}
            </Chip>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-sm font-semibold uppercase tracking-[0.1em] text-navy/70">Movement</span>
          <Chip active={!ffmOnly} onClick={() => setFfmOnly(false)}>
            All twelve
          </Chip>
          <Chip active={ffmOnly} onClick={() => setFfmOnly(true)}>
            Full free movement only
          </Chip>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-navy/70">
        {shown.length === countries.length
          ? `All ${countries.length} countries.`
          : `${shown.length} of ${countries.length} ${shown.length === 1 ? "country" : "countries"}.`}
        {filtered ? (
          <>
            {" "}
            <button
              type="button"
              onClick={() => {
                setBand("all");
                setFfmOnly(false);
                setLanguage("all");
              }}
              className="font-semibold text-brand underline underline-offset-4 hover:text-brand-dark"
            >
              Clear filters
            </button>
          </>
        ) : null}
      </p>

      {shown.length === 0 ? (
        <p className="mt-8 border-l-4 border-accent bg-accent-soft px-5 py-4 text-navy/80">
          Nothing matches all three at once. Widen the budget, or clear the filters and browse the whole list.
        </p>
      ) : (
        <ul className="mt-6 border-t border-navy/15">
          {shown.map((c) => (
            <li key={c.slug} className="border-b border-navy/15">
              <Link
                href={`/destinations/${c.slug}`}
                className="group block py-6 transition hover:bg-white/60 sm:flex sm:items-baseline sm:gap-8"
              >
                <div className="sm:w-64 sm:shrink-0">
                  <h2 className="font-display text-xl font-bold tracking-tight text-navy group-hover:text-brand">
                    {c.name}
                  </h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy/70">
                    <span>{c.language}</span>
                    {c.costLabel ? <span>{c.costLabel}</span> : null}
                    {c.freeMovement ? (
                      <span className="font-semibold text-brand">Full free movement</span>
                    ) : null}
                  </p>
                </div>
                <p className="measure mt-2 text-navy/80 sm:mt-0">{c.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
