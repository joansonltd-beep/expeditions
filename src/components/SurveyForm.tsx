"use client";

import { useState } from "react";
import {
  SURVEY_INDUSTRIES,
  EXPERIENCE_OPTIONS,
  EDUCATION_OPTIONS,
  COMMISSION_OPTIONS,
  EMPLOYER_TYPE_OPTIONS,
  PAY_FREQUENCY_OPTIONS,
  CURRENCY_BY_COUNTRY,
} from "@/lib/surveyData";
import { btnPrimary } from "@/components/ui";

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

const initial = {
  country: "",
  jobTitle: "",
  industry: "",
  experience: "",
  education: "",
  commission: "",
  monthlySalaryLocal: "",
  employerType: "",
  payFrequency: "",
  additionalIncome: "",
  comment: "",
};

type FormState = typeof initial;

export default function SurveyForm({ countries }: { countries: string[] }) {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const currencyInfo = CURRENCY_BY_COUNTRY[form.country];
  const currency = currencyInfo?.code ?? "your local currency";
  const currencySymbol = currencyInfo?.symbol ?? "$";

  const set =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      <p className="mb-6 text-xl font-bold text-slate-900">CARICOM Salary Survey</p>

      <div className="grid gap-4">
        <label className="block text-sm font-semibold text-slate-900">
          1. Which Caribbean country do you currently work in?
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
          2. What is your job title?
          <input
            required
            value={form.jobTitle}
            onChange={set("jobTitle")}
            className={`mt-1.5 ${field}`}
            placeholder="e.g. Accountant, Registered Nurse, Software Developer"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          3. What industry do you work in?
          <select required value={form.industry} onChange={set("industry")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an industry
            </option>
            {SURVEY_INDUSTRIES.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          4. How many years of experience do you have in your field?
          <select required value={form.experience} onChange={set("experience")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          5. What is your highest level of education?
          <select required value={form.education} onChange={set("education")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {EDUCATION_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          6. Is your salary commission based?
          <select required value={form.commission} onChange={set("commission")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {COMMISSION_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          7. What is your gross monthly salary in {currency}, before taxes and deductions?
          <span className="mt-0.5 block text-xs font-normal text-slate-600">
            If commission based, please use your base salary. Answer in your own country&apos;s currency, not USD.
          </span>
          <span className="relative mt-1.5 block">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-600">
              {currencySymbol}
            </span>
            <input
              required
              type="number"
              min={1}
              step="any"
              inputMode="decimal"
              value={form.monthlySalaryLocal}
              onChange={set("monthlySalaryLocal")}
              className={`${field} pl-14`}
              placeholder="e.g. 2500"
            />
          </span>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          8. Are you employed by a private company, government, or self-employed?
          <select required value={form.employerType} onChange={set("employerType")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {EMPLOYER_TYPE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-900">
          9. Is your salary paid monthly, biweekly, weekly, or another way?
          <select required value={form.payFrequency} onChange={set("payFrequency")} className={`mt-1.5 ${field}`}>
            <option value="" disabled>
              Select an option
            </option>
            {PAY_FREQUENCY_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <fieldset className="block text-sm font-semibold text-slate-900">
          10. Do you receive additional income such as bonuses or commissions?
          <div className="mt-1.5 flex gap-4">
            {["Yes", "No"].map((o) => (
              <label key={o} className="flex items-center gap-2 text-sm font-normal text-slate-700">
                <input
                  required
                  type="radio"
                  name="additionalIncome"
                  value={o}
                  checked={form.additionalIncome === o}
                  onChange={set("additionalIncome")}
                  className="h-4 w-4 accent-brand"
                />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-semibold text-slate-900">
          11. If you could add one comment about your salary, what would you say?
          <textarea
            value={form.comment}
            onChange={set("comment")}
            rows={3}
            maxLength={1000}
            className={`mt-1.5 ${field} resize-y`}
            placeholder="Optional"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      <button type="submit" disabled={status === "submitting"} className={`${btnPrimary} mt-6 w-full disabled:opacity-60`}>
        {status === "submitting" ? "Submitting…" : "Submit response"}
      </button>
    </form>
  );
}
