"use client";

import { useState } from "react";
import type { Package, AddOn } from "@/lib/siteData";
import { CheckList } from "@/components/ui";
import CtaButtons from "@/components/CtaButtons";
import {
  type SetupCountry,
  COUNTRY_LABELS,
  formatUsdConverted,
  formatLocal,
  convertUsd,
  currencyTag,
} from "@/lib/currency";

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

export default function FinancePricing({ packages, addOns }: { packages: Package[]; addOns: AddOn[] }) {
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
          const total = convertUsd(p.priceUsd, country);
          const half = total / 2;
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
              {/* Price header (green; solid for the featured tier) */}
              <div className={`relative p-7 ${p.featured ? "bg-brand text-white" : "bg-brand-soft"}`}>
                {p.featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ring-white/30">
                    Most popular
                  </span>
                ) : null}
                <h3 className={`text-lg font-semibold ${p.featured ? "text-white" : "text-slate-900"}`}>{p.name}</h3>
                <div className={`mt-1 text-3xl font-extrabold ${p.featured ? "text-white" : "text-slate-900"}`}>
                  {formatLocal(total, country)}
                </div>
                <p className={`mt-1 text-sm ${p.featured ? "text-white/80" : "text-slate-500"}`}>
                  50% upfront ({formatLocal(half, country)}), balance on completion
                </p>
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
            <li
              key={a.title}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
            >
              <span>{a.title}</span>
              <span className="shrink-0 font-medium text-slate-900">
                {a.usdPrice != null ? formatUsdConverted(a.usdPrice, country) : `${a.amountText} ${currencyTag(country)}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
