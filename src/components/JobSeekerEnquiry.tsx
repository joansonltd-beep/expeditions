"use client";

import { useState } from "react";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";
import { CSME_COUNTRIES } from "@/lib/csmeData";
import { EDUCATION_OPTIONS, PROFESSION_OPTIONS } from "@/lib/jobSeekerData";

const COUNTRY_NAMES = CSME_COUNTRIES.map((c) => c.name);

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

// Static-friendly, same pattern as ContactForm/BusinessSetupEnquiry: builds a
// prefilled email on submit, sent from the applicant's own mail client, so it
// genuinely comes from their address. No backend, so it can't attach a file;
// they're asked to attach their resume themselves before hitting send.
export default function JobSeekerEnquiry() {
  const { generalEmail } = useSiteClient();
  const waLink = useWhatsAppLink();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState<(typeof EDUCATION_OPTIONS)[number]>(EDUCATION_OPTIONS[0]);
  const [countries, setCountries] = useState<string[]>([]);
  const [profession, setProfession] = useState<(typeof PROFESSION_OPTIONS)[number]>(PROFESSION_OPTIONS[0]);
  const [jobTitle, setJobTitle] = useState("");
  const [csme, setCsme] = useState<"Yes" | "No" | "">("");
  const [comments, setComments] = useState("");
  const [countriesTouched, setCountriesTouched] = useState(false);

  const allSelected = countries.length === COUNTRY_NAMES.length;
  const toggleCountry = (c: string) => {
    setCountriesTouched(true);
    setCountries((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };
  const toggleAll = () => {
    setCountriesTouched(true);
    setCountries(allSelected ? [] : [...COUNTRY_NAMES]);
  };

  const countriesValid = countries.length > 0;
  const csmeValid = csme !== "";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCountriesTouched(true);
    if (!countriesValid || !csmeValid) return;

    const subject = encodeURIComponent(`Job seeker enquiry: ${jobTitle} - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone/WhatsApp: ${phone}\nHighest education: ${education}\nCSME Skills Certificate: ${csme}\nCountries open to: ${countries.join(", ")}\nProfession/field: ${profession}\nJob title: ${jobTitle}\n\nComments:\n${comments || "(none)"}\n\n(Remember to attach your resume before sending, if you have one.)`
    );
    window.location.href = `mailto:${generalEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-900">
          Name
          <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={`mt-1.5 ${field}`} placeholder="Your name" />
        </label>
        <label className="block text-sm font-semibold text-slate-900">
          Email
          <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-1.5 ${field}`} placeholder="you@email.com" />
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold text-slate-900">
        Phone / WhatsApp
        <input required type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={`mt-1.5 ${field}`} placeholder="Your number" />
      </label>

      <label className="mt-4 block text-sm font-semibold text-slate-900">
        Highest education level
        <select value={education} onChange={(e) => setEducation(e.target.value as (typeof EDUCATION_OPTIONS)[number])} className={`mt-1.5 ${field}`}>
          {EDUCATION_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="block text-sm font-semibold text-slate-900">Countries you're open to</span>
          <button type="button" onClick={toggleAll} className="text-xs font-semibold text-brand hover:underline">
            {allSelected ? "Clear all" : "Select all"}
          </button>
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 p-3.5 sm:grid-cols-3">
          {COUNTRY_NAMES.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={countries.includes(c)} onChange={() => toggleCountry(c)} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand/40" />
              {c}
            </label>
          ))}
        </div>
        {countriesTouched && !countriesValid ? <p className="mt-1.5 text-xs text-accent">Select at least one country.</p> : null}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-900">
          Profession / field
          <select value={profession} onChange={(e) => setProfession(e.target.value as (typeof PROFESSION_OPTIONS)[number])} className={`mt-1.5 ${field}`}>
            {PROFESSION_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-900">
          Specific job title
          <input required value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={`mt-1.5 ${field}`} placeholder="e.g. Supervisor, Software Developer" />
        </label>
      </div>

      <div className="mt-4">
        <span className="block text-sm font-semibold text-slate-900">Do you have a CSME Skills Certificate?</span>
        <div className="mt-1.5 flex gap-3">
          {(["Yes", "No"] as const).map((opt) => (
            <label
              key={opt}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border-[1.5px] py-2.5 text-sm font-semibold transition ${
                csme === opt ? "border-brand bg-brand-soft text-brand" : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              <input type="radio" name="csme" value={opt} checked={csme === opt} onChange={() => setCsme(opt)} className="sr-only" />
              {opt}
            </label>
          ))}
        </div>
        {countriesTouched && !csmeValid ? <p className="mt-1.5 text-xs text-accent">Select yes or no.</p> : null}
      </div>

      <label className="mt-4 block text-sm font-semibold text-slate-900">
        Other comments
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} rows={3} className={`mt-1.5 ${field} resize-y`} placeholder="Anything else we should know" />
      </label>

      <p className="mt-4 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
        Have a resume? This opens an email in your own mail app with everything filled in, just attach your resume there before you hit send (optional, but it helps).
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className={btnPrimary}>
          Send enquiry
        </button>
        <a href={waLink("Hi Jo, I'm a job seeker looking for work in another CARICOM country.")} target="_blank" rel="noopener noreferrer" className={btnWhatsapp}>
          Message on WhatsApp
        </a>
      </div>
    </form>
  );
}
