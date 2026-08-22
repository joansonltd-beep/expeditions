"use client";

import { useState } from "react";
import {
  RENT_PROPERTY_TYPES,
  RENT_INCLUDED_OPTIONS,
  FURNISHED_OPTIONS,
  AREA_TYPE_OPTIONS,
  RENT_DURATION_OPTIONS,
  RENT_INCREASE_OPTIONS,
  RENT_REASONABLE_OPTIONS,
  CURRENCY_BY_COUNTRY,
} from "@/lib/surveyData";
import { btnPrimary } from "@/components/ui";

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

type IncludedOption = (typeof RENT_INCLUDED_OPTIONS)[number];

const initial = {
  country: "",
  propertyType: "",
  monthlyRentLocal: "",
  occupants: "",
  furnished: "",
  areaType: "",
  parking: "",
  duration: "",
  lastIncrease: "",
  reasonable: "",
};

type FormState = typeof initial;

export default function RentSurveyForm({ countries }: { countries: string[] }) {
  const [form, setForm] = useState<FormState>(initial);
  const [included, setIncluded] = useState<IncludedOption[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const currency = CURRENCY_BY_COUNTRY[form.country]?.code ?? "your local currency";

  const set =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleIncluded = (opt: IncludedOption) => {
    setIncluded((prev) => {
      if (opt === "None") return prev.includes("None") ? [] : ["None"];
      const withoutNone = prev.filter((x) => x !== "None");
      return withoutNone.includes(opt) ? withoutNone.filter((x) => x !== opt) : [...withoutNone, opt];
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/survey/rent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, included }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-900/5">
        <p className="text-xl font-bold text-slate-900">Thank you</p>
        <p className="mt-2 text-slate-600">Your response has been recorded anonymously. No name or email was collected.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand">Anonymous &middot; no name or email collected</p>
      <p className="mb-6 text-xl font-bold text-slate-900">Caribbean Rent Survey</p>

      <div className="grid gap-4">
        <label className="block text-sm font-semibold text-slate-900">
          1. Which Caribbean country do you currently live in?
          <select required value={form.country} onChange={set("country")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          2. What type of property do you rent?
          <select required value={form.propertyType} onChange={set("propertyType")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {RENT_PROPERTY_TYPES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          3. How much do you pay in rent per month, in {currency}?
          <span className="mt-0.5 block text-xs font-normal text-slate-500">Answer in your own country&apos;s currency, not USD.</span>
          <input
            required
            type="number"
            min={1}
            step="any"
            inputMode="decimal"
            value={form.monthlyRentLocal}
            onChange={set("monthlyRentLocal")}
            className={`mt-1.5 ${field}`}
            placeholder="e.g. 900"
          />
        </label>

        <fieldset className="block text-sm font-semibold text-slate-900">
          4. Does your rent include any utilities or other services?
          <span className="mt-0.5 block text-xs font-normal text-slate-500">Select all that apply.</span>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {RENT_INCLUDED_OPTIONS.map((o) => (
              <label key={o} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-normal text-slate-700">
                <input type="checkbox" checked={included.includes(o)} onChange={() => toggleIncluded(o)} className="h-4 w-4 accent-brand" />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-semibold text-slate-900">
          5. How many people live in the rental property?
          <input
            required
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={form.occupants}
            onChange={set("occupants")}
            className={`mt-1.5 ${field}`}
            placeholder="e.g. 2"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          6. Is the property furnished?
          <select required value={form.furnished} onChange={set("furnished")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {FURNISHED_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          7. What area do you live in?
          <select required value={form.areaType} onChange={set("areaType")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {AREA_TYPE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <fieldset className="block text-sm font-semibold text-slate-900">
          8. Does your rent include parking?
          <div className="mt-1.5 flex gap-4">
            {["Yes", "No"].map((o) => (
              <label key={o} className="flex items-center gap-2 text-sm font-normal text-slate-700">
                <input required type="radio" name="parking" value={o} checked={form.parking === o} onChange={set("parking")} className="h-4 w-4 accent-brand" />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-semibold text-slate-900">
          9. How long have you been paying your current rent?
          <select required value={form.duration} onChange={set("duration")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {RENT_DURATION_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          10. When was the last time your rent increased?
          <select required value={form.lastIncrease} onChange={set("lastIncrease")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {RENT_INCREASE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <fieldset className="block text-sm font-semibold text-slate-900">
          11. In your opinion, is your current rent reasonable for the property and location?
          <div className="mt-1.5 flex flex-wrap gap-4">
            {RENT_REASONABLE_OPTIONS.map((o) => (
              <label key={o} className="flex items-center gap-2 text-sm font-normal text-slate-700">
                <input
                  required
                  type="radio"
                  name="reasonable"
                  value={o}
                  checked={form.reasonable === o}
                  onChange={set("reasonable")}
                  className="h-4 w-4 accent-brand"
                />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      <button type="submit" disabled={status === "submitting"} className={`${btnPrimary} mt-6 w-full disabled:opacity-60`}>
        {status === "submitting" ? "Submitting…" : "Submit response"}
      </button>
    </form>
  );
}
