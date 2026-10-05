"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * "Could you see yourself here?" asked as four answers.
 *
 * A country guide is long because the material is genuinely long, and four
 * different people want four different quarters of it. Someone booking a
 * holiday does not need the tax treatment, and someone moving does not need
 * the best places to eat first. This sits near the top and points each of
 * them at the part of the page that is theirs.
 *
 * It hides nothing. Every section stays on the page, in the markup and
 * indexable; this is a way in, not a filter. Facts shown here come from the
 * country data, never from an assumption about a country we have not checked.
 */

export type LensFacts = {
  countryName: string;
  slug: string;
  /** Full free movement, in force since 1 October 2025. */
  freeMovement: boolean;
  /** The published monthly budget range, as written on the page. */
  costLabel: string | null;
  /** Whether the guide carries a relocation section at all. */
  hasMovingSection: boolean;
};

type Lens = {
  id: string;
  label: string;
  question: string;
  /** Sections of this page worth their time, as anchors. */
  jumps: { label: string; href: string }[];
  /** Where to go next on the site. Every href is a real page. */
  next: { label: string; href: string };
};

function lenses(f: LensFacts): Lens[] {
  const cost = f.costLabel ? [{ label: "Cost of living", href: "#cost" }] : [];
  const moving = f.hasMovingSection ? [{ label: `Moving to ${f.countryName}`, href: "#moving" }] : [];
  return [
    {
      id: "visit",
      label: "Visit",
      question: "A holiday, family, or a look around first",
      jumps: [
        { label: "Places to see", href: "#see" },
        { label: "Experiences to have", href: "#do" },
        ...cost,
      ],
      next: { label: "What a visit involves", href: "/getting-there" },
    },
    {
      id: "work",
      label: "Work",
      question: "Taking up a job, or going to look for one",
      jumps: [...moving, ...cost],
      next: { label: "Working in another CARICOM country", href: "/getting-started" },
    },
    {
      id: "study",
      label: "Study",
      question: "A course, a degree, or bringing family with you",
      jumps: [...cost, ...moving],
      next: { label: "Studying in another CARICOM country", href: "/study" },
    },
    {
      id: "move",
      label: "Move",
      question: "Living here, not visiting",
      jumps: [...moving, ...cost, { label: "Places to see", href: "#see" }],
      next: { label: "Plan the move with Jo", href: "/plan-my-move" },
    },
  ];
}

export default function DestinationLens(facts: LensFacts) {
  const all = lenses(facts);
  const [active, setActive] = useState(all[0].id);
  const lens = all.find((l) => l.id === active) ?? all[0];

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-brand">
        Could you see yourself here?
      </h2>
      <p className="measure mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
        What would bring you to {facts.countryName}?
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {all.map((l) => {
          const on = l.id === active;
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(l.id)}
              className={`rounded-full border-[1.5px] px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                on ? "border-brand bg-brand text-white" : "border-navy/15 bg-white text-navy hover:border-brand hover:text-brand"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 border-t border-navy/10 pt-5">
        <p className="text-navy/80">{lens.question}.</p>

        {/* Facts, only where the data actually carries them. */}
        <ul className="mt-3 space-y-1.5 text-sm text-navy/75">
          {(lens.id === "work" || lens.id === "move") && facts.freeMovement ? (
            <li>
              <span className="font-semibold text-navy">Full free movement applies.</span> CARICOM nationals of any
              skill level, not only those holding a Skills Certificate.
            </li>
          ) : null}
          {(lens.id === "work" || lens.id === "move") && !facts.freeMovement ? (
            <li>
              Free movement here runs through the{" "}
              <Link href={`/caricom-skills-certificate/${facts.slug}`} className="font-semibold text-brand underline underline-offset-4">
                CARICOM Skills Certificate
              </Link>
              .
            </li>
          ) : null}
          {facts.costLabel ? (
            <li>
              Budget from <span className="font-semibold text-navy">{facts.costLabel}</span> for one person, modest and
              all in.
            </li>
          ) : null}
        </ul>

        {lens.jumps.length ? (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {lens.jumps.map((j) => (
              <a
                key={j.href + j.label}
                href={j.href}
                className="text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand-dark"
              >
                {j.label}
              </a>
            ))}
          </div>
        ) : null}

        <Link
          href={lens.next.href}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {lens.next.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
