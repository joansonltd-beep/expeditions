"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICE_TIERS } from "@/lib/serviceTiers";

/**
 * The three tiers as a question rather than as three cards in a row.
 *
 * "How much help do you want?" is the thing a visitor is actually deciding.
 * Three cards side by side ask them to compare feature lists, which is work;
 * a spectrum asks them to place themselves, which is a feeling they already
 * have. The tiers, their wording and their anchors are unchanged.
 *
 * The positions read left to right as increasing commitment, matching the
 * order SERVICE_TIERS is already in. Nothing here invents a price, because
 * none are published anywhere on the site.
 */

// One line per tier, in the visitor's own voice rather than the service's.
const STANCE = [
  "I'm just curious",
  "I know where I'm going",
  "Just handle it for me",
];

export default function ServiceSpectrum() {
  const [open, setOpen] = useState(0);
  const tier = SERVICE_TIERS[open];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">How much help do you want?</h2>
      <p className="measure mt-2 text-navy/70">
        Three levels, from a conversation to the whole move handled. Pick the one that sounds like you.
      </p>

      {/* The spectrum. The line is decoration; the buttons carry the meaning. */}
      <div className="relative mt-8">
        <div aria-hidden="true" className="absolute left-0 right-0 top-[14px] h-[2px] bg-navy/12" />
        <div
          aria-hidden="true"
          className="absolute top-[14px] h-[2px] bg-brand transition-[width] duration-300"
          style={{ left: 0, width: `${((open + 0.5) / SERVICE_TIERS.length) * 100}%` }}
        />
        <div className="relative grid gap-4 sm:grid-cols-3">
          {SERVICE_TIERS.map((t, i) => {
            const active = i === open;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setOpen(i)}
                className="group text-left focus:outline-none"
              >
                <span
                  aria-hidden="true"
                  className={`block h-[30px] w-[30px] rounded-full border-[3px] bg-cream transition group-focus-visible:ring-2 group-focus-visible:ring-brand group-focus-visible:ring-offset-2 ${
                    active ? "border-brand" : "border-navy/20 group-hover:border-brand/60"
                  }`}
                >
                  <span
                    className={`block h-full w-full scale-50 rounded-full transition ${
                      active ? "bg-brand" : "bg-transparent"
                    }`}
                  />
                </span>
                <span
                  className={`mt-3 block font-display text-lg font-bold transition ${
                    active ? "text-brand" : "text-navy group-hover:text-brand"
                  }`}
                >
                  {STANCE[i]}
                </span>
                <span className="mt-0.5 block text-sm text-navy/65">{t.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail for the chosen stance. One panel, not three. */}
      <div className="mt-8 border-l-4 border-brand bg-brand-soft px-5 py-5 sm:px-6">
        <h3 className="font-display text-xl font-bold text-navy">{tier.title}</h3>
        <p className="measure mt-2 text-navy/80">{tier.intro}</p>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">What it covers</h4>
            <ul className="mt-2.5 space-y-1.5">
              {tier.includes.slice(0, 4).map((x) => (
                <li key={x} className="text-sm text-navy/80">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">What it does not</h4>
            <ul className="mt-2.5 space-y-1.5">
              {tier.notIncluded.slice(0, 4).map((x) => (
                <li key={x} className="text-sm text-navy/80">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={`/services#${tier.id}`}
          className="mt-5 inline-block text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand-dark"
        >
          Everything in {tier.title} →
        </Link>
      </div>
    </div>
  );
}
