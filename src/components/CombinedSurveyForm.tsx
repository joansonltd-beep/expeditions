"use client";

import { useState } from "react";
import { btnPrimary } from "@/components/ui";
import {
  SURVEY_INDUSTRIES,
  EXPERIENCE_OPTIONS,
  EDUCATION_OPTIONS,
  COMMISSION_OPTIONS,
  EMPLOYER_TYPE_OPTIONS,
  PAY_FREQUENCY_OPTIONS,
  RENT_PROPERTY_TYPES,
  RENT_INCLUDED_OPTIONS,
  FURNISHED_OPTIONS,
  AREA_TYPE_OPTIONS,
  RENT_DURATION_OPTIONS,
  RENT_INCREASE_OPTIONS,
  RENT_REASONABLE_OPTIONS,
  UTILITY_TYPES,
  CURRENCY_BY_COUNTRY,
} from "@/lib/surveyData";

const field =
  "w-full rounded-xl border-[1.5px] border-navy/15 bg-cream px-3.5 py-3 text-[0.97rem] text-navy transition placeholder:text-navy/45 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
const label = "block text-sm font-semibold text-navy";

type IncludedOption = (typeof RENT_INCLUDED_OPTIONS)[number];
type UtilityType = (typeof UTILITY_TYPES)[number];
type Amounts = Record<UtilityType, string>;

type SectionKey = "salary" | "rent" | "utilities";

const SECTIONS: { key: SectionKey; title: string; text: string }[] = [
  { key: "salary", title: "Salary", text: "What you earn, your role and your industry." },
  { key: "rent", title: "Rent", text: "What you pay, the property, and what is included." },
  { key: "utilities", title: "Utilities", text: "Electricity, water, internet and the rest." },
];

const salaryInitial = {
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

const rentInitial = {
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

const amountsInitial = Object.fromEntries(UTILITY_TYPES.map((u) => [u, ""])) as Amounts;

/**
 * One survey covering salary, rent and utilities.
 *
 * Previously three separate pages, which meant answering "which country do you
 * live in" three times to contribute all three. Country is now asked once and
 * each section is optional, so somebody willing to report their rent is not
 * forced to disclose their salary to do it.
 *
 * Each section still posts to its own existing endpoint, because each one
 * feeds a different Google Sheet with a different column layout. Combining
 * them into a single sheet would need a new Apps Script and a new destination,
 * which is Joanson's to set up. Nothing about the existing data pipeline
 * changes here.
 *
 * Fully anonymous: no name, email or IP is collected or forwarded.
 */
export default function CombinedSurveyForm({ countries }: { countries: string[] }) {
  const [country, setCountry] = useState("");
  const [active, setActive] = useState<SectionKey[]>([]);
  const [salary, setSalary] = useState(salaryInitial);
  const [rent, setRent] = useState(rentInitial);
  const [included, setIncluded] = useState<IncludedOption[]>([]);
  const [householdSize, setHouseholdSize] = useState("");
  const [utilities, setUtilities] = useState<UtilityType[]>([]);
  const [amounts, setAmounts] = useState<Amounts>(amountsInitial);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  const currencyInfo = CURRENCY_BY_COUNTRY[country];
  const currency = currencyInfo?.code ?? "your local currency";
  const symbol = currencyInfo?.symbol ?? "$";

  const on = (k: SectionKey) => active.includes(k);
  const toggleSection = (k: SectionKey) =>
    setActive((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));

  const setSalaryField =
    (k: keyof typeof salaryInitial) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setSalary((f) => ({ ...f, [k]: e.target.value }));
  const setRentField =
    (k: keyof typeof rentInitial) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setRent((f) => ({ ...f, [k]: e.target.value }));

  const toggleIncluded = (opt: IncludedOption) =>
    setIncluded((prev) => {
      if (opt === "None") return prev.includes("None") ? [] : ["None"];
      const withoutNone = prev.filter((x) => x !== "None");
      return withoutNone.includes(opt) ? withoutNone.filter((x) => x !== opt) : [...withoutNone, opt];
    });

  const toggleUtility = (u: UtilityType) =>
    setUtilities((prev) => (prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]));

  async function post(url: string, body: unknown): Promise<string | null> {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return data.error || "Something went wrong.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (active.length === 0) {
      setError("Pick at least one section to answer.");
      return;
    }
    if (on("utilities") && utilities.length === 0) {
      setError("Select at least one utility, or untick the utilities section.");
      return;
    }
    setStatus("submitting");
    setError(null);

    // Each section keeps its own endpoint, so a failure in one does not lose
    // the others. Whatever saved is reported back by name.
    const jobs: { name: string; run: () => Promise<string | null> }[] = [];
    if (on("salary")) {
      jobs.push({ name: "Salary", run: () => post("/api/survey", { country, ...salary }) });
    }
    if (on("rent")) {
      jobs.push({ name: "Rent", run: () => post("/api/survey/rent", { country, ...rent, included }) });
    }
    if (on("utilities")) {
      jobs.push({
        name: "Utilities",
        run: () => post("/api/survey/utilities", { country, householdSize, utilities, amounts }),
      });
    }

    try {
      const results = await Promise.all(jobs.map(async (j) => ({ name: j.name, error: await j.run() })));
      const ok = results.filter((r) => !r.error).map((r) => r.name);
      const failed = results.filter((r) => r.error);
      setSaved(ok);
      if (failed.length) {
        setError(`${failed.map((f) => `${f.name}: ${f.error}`).join(" ")}`);
        setStatus(ok.length ? "done" : "error");
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
      <div className="border border-navy/15 bg-white p-8 text-center">
        <p className="font-display text-2xl font-bold text-navy">Thank you</p>
        <p className="mt-2 text-navy/70">
          {saved.length === 1
            ? `Your ${saved[0].toLowerCase()} response was recorded anonymously.`
            : `Your ${saved.join(" and ").toLowerCase()} responses were recorded anonymously.`}{" "}
          No name or email was collected.
        </p>
        {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-navy/15 bg-white p-7 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Anonymous &middot; no name or email collected
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold text-navy">Cost of living survey</h2>
      <p className="mt-2 text-navy/70">
        Answer whichever parts you want. One section is plenty, and nothing is linked back to you.
      </p>

      {/* Asked once, used by every section */}
      <div className="mt-7">
        <label htmlFor="survey-country" className={label}>
          Which CARICOM country do you live in? <span aria-hidden="true" className="text-accent">*</span>
        </label>
        <select
          id="survey-country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={`mt-1.5 ${field}`}
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Which sections to answer */}
      <fieldset className="mt-7">
        <legend className={label}>
          What can you tell us about? <span aria-hidden="true" className="text-accent">*</span>
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {SECTIONS.map((s) => (
            <label
              key={s.key}
              className={`cursor-pointer border p-4 transition ${
                on(s.key) ? "border-brand bg-brand-soft" : "border-navy/15 bg-cream hover:border-navy/30"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={on(s.key)}
                  onChange={() => toggleSection(s.key)}
                  className="h-4 w-4 accent-brand"
                />
                <span className="font-semibold text-navy">{s.title}</span>
              </span>
              <span className="mt-1.5 block text-sm text-navy/65">{s.text}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* SALARY */}
      {on("salary") ? (
        <section className="mt-9 border-t border-navy/12 pt-7">
          <h3 className="font-display text-xl font-bold text-navy">Salary</h3>
          <div className="mt-4 grid gap-4">
            <label className={label}>
              Job title
              <input required value={salary.jobTitle} onChange={setSalaryField("jobTitle")} className={`mt-1.5 ${field}`} placeholder="e.g. Registered Nurse" />
            </label>
            <label className={label}>
              Industry
              <select required value={salary.industry} onChange={setSalaryField("industry")} className={`mt-1.5 ${field}`}>
                <option value="" disabled>Select an industry</option>
                {SURVEY_INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Years of experience
                <select required value={salary.experience} onChange={setSalaryField("experience")} className={`mt-1.5 ${field}`}>
                  <option value="" disabled>Select an option</option>
                  {EXPERIENCE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className={label}>
                Highest education
                <select required value={salary.education} onChange={setSalaryField("education")} className={`mt-1.5 ${field}`}>
                  <option value="" disabled>Select an option</option>
                  {EDUCATION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <label className={label}>
              Gross monthly salary in {currency}, before deductions
              <span className="mt-0.5 block text-xs font-normal text-navy/60">
                If commission based, use your base salary. Your own currency, not USD.
              </span>
              <span className="relative mt-1.5 block">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-navy/60">{symbol}</span>
                <input required type="number" min={1} step="any" inputMode="decimal" value={salary.monthlySalaryLocal} onChange={setSalaryField("monthlySalaryLocal")} className={`${field} pl-14`} placeholder="e.g. 2500" />
              </span>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Commission based?
                <select required value={salary.commission} onChange={setSalaryField("commission")} className={`mt-1.5 ${field}`}>
                  <option value="" disabled>Select an option</option>
                  {COMMISSION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className={label}>
                Employer type
                <select required value={salary.employerType} onChange={setSalaryField("employerType")} className={`mt-1.5 ${field}`}>
                  <option value="" disabled>Select an option</option>
                  {EMPLOYER_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <label className={label}>
              How often are you paid?
              <select required value={salary.payFrequency} onChange={setSalaryField("payFrequency")} className={`mt-1.5 ${field}`}>
                <option value="" disabled>Select an option</option>
                {PAY_FREQUENCY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <fieldset className={label}>
              Any bonuses or commissions on top?
              <div className="mt-1.5 flex gap-4">
                {["Yes", "No"].map((o) => (
                  <label key={o} className="flex items-center gap-2 text-sm font-normal text-navy/80">
                    <input required type="radio" name="additionalIncome" value={o} checked={salary.additionalIncome === o} onChange={setSalaryField("additionalIncome")} className="h-4 w-4 accent-brand" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className={label}>
              One comment about your salary
              <textarea value={salary.comment} onChange={setSalaryField("comment")} rows={3} maxLength={1000} className={`mt-1.5 ${field} resize-y`} placeholder="Optional" />
            </label>
          </div>
        </section>
      ) : null}

      {/* RENT */}
      {on("rent") ? (
        <section className="mt-9 border-t border-navy/12 pt-7">
          <h3 className="font-display text-xl font-bold text-navy">Rent</h3>
          <div className="mt-4 grid gap-4">
            <label className={label}>
              Property type
              <select required value={rent.propertyType} onChange={setRentField("propertyType")} className={`mt-1.5 ${field}`}>
                <option value="" disabled>Select an option</option>
                {RENT_PROPERTY_TYPES.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className={label}>
              Monthly rent in {currency}
              <span className="mt-0.5 block text-xs font-normal text-navy/60">Your own currency, not USD.</span>
              <span className="relative mt-1.5 block">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-navy/60">{symbol}</span>
                <input required type="number" min={1} step="any" inputMode="decimal" value={rent.monthlyRentLocal} onChange={setRentField("monthlyRentLocal")} className={`${field} pl-14`} placeholder="e.g. 900" />
              </span>
            </label>
            <fieldset className={label}>
              Does the rent include anything?
              <span className="mt-0.5 block text-xs font-normal text-navy/60">Select all that apply.</span>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {RENT_INCLUDED_OPTIONS.map((o) => (
                  <label key={o} className="flex items-center gap-2 border border-navy/15 bg-cream px-3.5 py-2.5 text-sm font-normal text-navy/80">
                    <input type="checkbox" checked={included.includes(o)} onChange={() => toggleIncluded(o)} className="h-4 w-4 accent-brand" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                How many people live there?
                <input required type="number" min={1} step={1} inputMode="numeric" value={rent.occupants} onChange={setRentField("occupants")} className={`mt-1.5 ${field}`} placeholder="e.g. 2" />
              </label>
              <label className={label}>
                Furnished?
                <select required value={rent.furnished} onChange={setRentField("furnished")} className={`mt-1.5 ${field}`}>
                  <option value="" disabled>Select an option</option>
                  {FURNISHED_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <label className={label}>
              What sort of area?
              <select required value={rent.areaType} onChange={setRentField("areaType")} className={`mt-1.5 ${field}`}>
                <option value="" disabled>Select an option</option>
                {AREA_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <fieldset className={label}>
              Is parking included?
              <div className="mt-1.5 flex gap-4">
                {["Yes", "No"].map((o) => (
                  <label key={o} className="flex items-center gap-2 text-sm font-normal text-navy/80">
                    <input required type="radio" name="parking" value={o} checked={rent.parking === o} onChange={setRentField("parking")} className="h-4 w-4 accent-brand" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                How long at this rent?
                <select required value={rent.duration} onChange={setRentField("duration")} className={`mt-1.5 ${field}`}>
                  <option value="" disabled>Select an option</option>
                  {RENT_DURATION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className={label}>
                Last increase
                <select required value={rent.lastIncrease} onChange={setRentField("lastIncrease")} className={`mt-1.5 ${field}`}>
                  <option value="" disabled>Select an option</option>
                  {RENT_INCREASE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <fieldset className={label}>
              Is that reasonable for what you get?
              <div className="mt-1.5 flex flex-wrap gap-4">
                {RENT_REASONABLE_OPTIONS.map((o) => (
                  <label key={o} className="flex items-center gap-2 text-sm font-normal text-navy/80">
                    <input required type="radio" name="reasonable" value={o} checked={rent.reasonable === o} onChange={setRentField("reasonable")} className="h-4 w-4 accent-brand" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </section>
      ) : null}

      {/* UTILITIES */}
      {on("utilities") ? (
        <section className="mt-9 border-t border-navy/12 pt-7">
          <h3 className="font-display text-xl font-bold text-navy">Utilities</h3>
          <div className="mt-4 grid gap-4">
            <label className={label}>
              How many people in the household?
              <input required type="number" min={1} step={1} inputMode="numeric" value={householdSize} onChange={(e) => setHouseholdSize(e.target.value)} className={`mt-1.5 ${field}`} placeholder="e.g. 3" />
            </label>
            <fieldset className={label}>
              Which do you pay for, and how much a month in {currency}?
              <span className="mt-0.5 block text-xs font-normal text-navy/60">Tick one to enter an amount.</span>
              <div className="mt-2 grid gap-2">
                {UTILITY_TYPES.map((u) => (
                  <div key={u} className="grid items-center gap-2 sm:grid-cols-[1fr_10rem]">
                    <label className="flex items-center gap-2 border border-navy/15 bg-cream px-3.5 py-2.5 text-sm font-normal text-navy/80">
                      <input type="checkbox" checked={utilities.includes(u)} onChange={() => toggleUtility(u)} className="h-4 w-4 accent-brand" />
                      {u}
                    </label>
                    {utilities.includes(u) ? (
                      <span className="relative block">
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-navy/60">{symbol}</span>
                        <input required type="number" min={0} step="any" inputMode="decimal" value={amounts[u]} onChange={(e) => setAmounts((a) => ({ ...a, [u]: e.target.value }))} className={`${field} pl-12`} placeholder="0" aria-label={`Monthly cost for ${u}`} />
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </section>
      ) : null}

      {error ? <p className="mt-6 text-sm font-medium text-accent">{error}</p> : null}

      <button type="submit" disabled={status === "submitting"} className={`${btnPrimary} mt-8 w-full disabled:opacity-60`}>
        {status === "submitting" ? "Submitting…" : "Submit response"}
      </button>
      <p className="mt-3 text-center text-xs text-navy/55">
        Used only in aggregate. No name, email or IP is stored.
      </p>
    </form>
  );
}
