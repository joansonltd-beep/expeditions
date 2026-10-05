"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { CSME_COUNTRIES } from "@/lib/csmeData";

/**
 * The way into the site, sitting in the hero.
 *
 * The home page used to open by explaining the business, which asks a visitor
 * to read before it gives them anything to do. This asks the three questions
 * the whole site is organised around, then hands the answers to the pathway
 * questionnaire so nobody is asked them twice.
 *
 * No flag emoji, deliberately. Windows ships no glyphs for regional indicator
 * pairs, so 🇹🇹 renders as the letters "TT" and a column of them reads as
 * noise. CurrencyFlag.tsx carries the full account of that.
 *
 * A light panel over the photograph rather than a translucent one: the type
 * has to stay readable whichever frame the rotating hero happens to be on.
 */

const COUNTRY_NAMES = CSME_COUNTRIES.map((c) => c.name);

// Matches the Purpose union the pathway questionnaire already uses, so the
// value can be handed straight over without translation.
const PURPOSES = [
  { value: "Visit", label: "A visit" },
  { value: "Work", label: "Work" },
  { value: "Study", label: "Study" },
  { value: "Relocate", label: "Moving there" },
] as const;

const control =
  "w-full appearance-none rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] font-medium text-navy transition focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
const label = "block text-xs font-semibold uppercase tracking-[0.14em] text-navy/55";

export default function RouteSelector() {
  const router = useRouter();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [purpose, setPurpose] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Every field is optional. Someone who knows only where they are going
    // still gets a useful head start, and the questionnaire asks for the rest.
    const q = new URLSearchParams();
    if (from) q.set("from", from);
    if (to) q.set("to", to);
    if (purpose) q.set("purpose", purpose);
    const qs = q.toString();
    router.push(qs ? `/plan-my-move?${qs}` : "/plan-my-move");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-7 rounded-2xl bg-white/95 p-5 shadow-xl shadow-navy/20 backdrop-blur-sm sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={id("from")} className={label}>
            Starting from
          </label>
          <select
            id={id("from")}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={`mt-2 ${control}`}
          >
            <option value="">Where you are now</option>
            {COUNTRY_NAMES.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option value="Somewhere else">Somewhere else</option>
          </select>
        </div>

        <div>
          <label htmlFor={id("to")} className={label}>
            Going to
          </label>
          <select id={id("to")} value={to} onChange={(e) => setTo(e.target.value)} className={`mt-2 ${control}`}>
            <option value="">Pick a country</option>
            {COUNTRY_NAMES.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option value="Not decided yet">Not decided yet</option>
          </select>
        </div>

        <div>
          <label htmlFor={id("purpose")} className={label}>
            Going for
          </label>
          <select
            id={id("purpose")}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className={`mt-2 ${control}`}
          >
            <option value="">What takes you there</option>
            {PURPOSES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Find my route
          <span aria-hidden="true">→</span>
        </button>
        <p className="text-sm text-navy/60">Takes about a minute.</p>
      </div>
    </form>
  );
}
