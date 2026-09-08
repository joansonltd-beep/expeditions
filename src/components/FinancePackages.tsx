"use client";

import { useState } from "react";
import { CheckList } from "@/components/ui";
import CtaButtons from "@/components/CtaButtons";

// Only the fields actually rendered. This is a client component, so whatever
// it is handed is serialised into the page source: taking the full Package
// and AddOn objects would publish priceUsd/amountText in the HTML even though
// nothing draws them.
export type PackageCard = { name: string; features: string[]; featured: boolean };
export type AddOnItem = { title: string; trinidadOnly?: boolean };

// Which country the business is based in changes what is actually done, not a
// figure: Trinidad gets the LLC + BIR line, and some add-ons are Trinidad only.
type SetupCountry = "tt" | "gd";

const COUNTRY_LABELS: Record<SetupCountry, string> = {
  tt: "Trinidad and Tobago",
  gd: "Grenada",
};

const COUNTRIES: SetupCountry[] = ["tt", "gd"];

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

// LLC + BIR registration is only offered in Trinidad and Tobago, so this
// line is injected here rather than stored as package content (which would
// otherwise show for Grenada too).
function registrationFeature(country: SetupCountry): string {
  return country === "tt"
    ? "Limited Liability Company registration (Articles of Incorporation, BIR registration, NIS employer number)"
    : "Company registration guidance for your business structure (Limited Liability Company registration is only available in Trinidad and Tobago)";
}

export default function FinancePackages({ packages, addOns }: { packages: PackageCard[]; addOns: AddOnItem[] }) {
  const [country, setCountry] = useState<SetupCountry>("tt");

  const visibleAddOns = addOns.filter((a) => !a.trinidadOnly || country === "tt");

  return (
    <div>
      <label className="mx-auto mb-10 block max-w-xs text-center text-sm font-semibold text-slate-900">
        Where is your business based?
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value as SetupCountry)}
          className={`mt-1.5 ${field}`}
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {COUNTRY_LABELS[c]}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-6 lg:grid-cols-3">
        {packages.map((p) => {
          const features =
            p.name === "Professional"
              ? [p.features[0], registrationFeature(country), ...p.features.slice(1)]
              : p.features;
          return (
            <div
              key={p.name}
              className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-xl ${
                p.featured ? "border-brand shadow-md" : "border-slate-200"
              }`}
            >
              <div className={`relative p-7 ${p.featured ? "bg-brand text-white" : "bg-brand-soft"}`}>
                {p.featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ring-white/30">
                    Most popular
                  </span>
                ) : null}
                <h3 className={`text-2xl font-bold ${p.featured ? "text-white" : "text-slate-900"}`}>{p.name}</h3>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <CheckList items={features} className="text-sm" />
                <div className="mt-auto pt-6">
                  <CtaButtons message={`Hi Jo, I'm interested in the ${p.name} business package.`} showContact={false} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 sm:p-8">
        <h3 className="text-lg font-semibold text-slate-900">Add-on services</h3>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600">
          {visibleAddOns.map((a) => (
            <li key={a.title} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              {a.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
