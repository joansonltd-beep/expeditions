"use client";

import { useState } from "react";
import { UTILITY_TYPES, CURRENCY_BY_COUNTRY } from "@/lib/surveyData";
import { btnPrimary } from "@/components/ui";

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

type UtilityType = (typeof UTILITY_TYPES)[number];
type Amounts = Record<UtilityType, string>;

const initialAmounts = Object.fromEntries(UTILITY_TYPES.map((u) => [u, ""])) as Amounts;

export default function UtilitiesSurveyForm({ countries }: { countries: string[] }) {
  const [country, setCountry] = useState("");
  const [householdSize, setHouseholdSize] = useState("");
  const [utilities, setUtilities] = useState<UtilityType[]>([]);
  const [amounts, setAmounts] = useState<Amounts>(initialAmounts);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const currencyInfo = CURRENCY_BY_COUNTRY[country];
  const currency = currencyInfo?.code ?? "your local currency";
  const currencySymbol = currencyInfo?.symbol ?? "$";

  const toggleUtility = (u: UtilityType) => {
    setUtilities((prev) => (prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]));
  };

  const setAmount = (u: UtilityType) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmounts((a) => ({ ...a, [u]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/survey/utilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, householdSize, utilities, amounts }),
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
      <p className="mb-6 text-xl font-bold text-slate-900">Utility Cost Survey</p>

      <div className="grid gap-4">
        <label className="block text-sm font-semibold text-slate-900">
          Which Caribbean country do you live in?
          <select required value={country} onChange={(e) => setCountry(e.target.value)} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          How many people live in your household?
          <input
            required
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            className={`mt-1.5 ${field}`}
            placeholder="e.g. 3"
          />
        </label>

        <fieldset className="block text-sm font-semibold text-slate-900">
          Which of the following utilities/services do you personally pay for?
          <span className="mt-0.5 block text-xs font-normal text-slate-500">Select all that apply.</span>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {UTILITY_TYPES.map((u) => (
              <label key={u} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-normal text-slate-700">
                <input
                  type="checkbox"
                  checked={utilities.includes(u)}
                  onChange={() => toggleUtility(u)}
                  className="h-4 w-4 accent-brand"
                />
                {u}
              </label>
            ))}
          </div>
        </fieldset>

        {utilities.length ? (
          <div className="grid gap-4 rounded-2xl border border-dashed border-brand/40 bg-brand-soft p-5">
            <p className="text-sm font-semibold text-slate-900">How much do you typically pay per month, in {currency}?</p>
            <p className="-mt-2 text-xs font-normal text-slate-500">Answer in your own country&apos;s currency, not USD.</p>
            {utilities.map((u) => (
              <label key={u} className="block text-sm font-semibold text-slate-900">
                {u}
                <span className="relative mt-1.5 block">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500">
                    {currencySymbol}
                  </span>
                  <input
                    required
                    type="number"
                    min={0}
                    step="any"
                    inputMode="decimal"
                    value={amounts[u]}
                    onChange={setAmount(u)}
                    className={`${field} bg-white pl-14`}
                    placeholder="e.g. 80"
                  />
                </span>
              </label>
            ))}
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      <button type="submit" disabled={status === "submitting"} className={`${btnPrimary} mt-6 w-full disabled:opacity-60`}>
        {status === "submitting" ? "Submitting…" : "Submit response"}
      </button>
    </form>
  );
}
