"use client";

import { useId, useState } from "react";
import { useSiteClient } from "@/components/SiteSettingsProvider";
import { btnPrimary } from "@/components/ui";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

// What the visitor wants to do. These mirror the three journeys the site is
// built around, plus the certificate people most often ask about by name.
const PURPOSES = [
  "Visit another CARICOM country",
  "Work in another CARICOM country",
  "Study in another CARICOM country",
  "CARICOM Skills Certificate support",
  "Not sure yet",
];

const CONTACT_METHODS = ["WhatsApp", "Phone call", "Email"];

const COUNTRY_OPTIONS = [...COUNTRY_GUIDES].map((c) => c.name).sort((a, b) => a.localeCompare(b));

// Inputs keep focus:outline-none but replace it with a visible focus-visible ring
// (plus a brand border) so keyboard focus is always clear.
const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-500 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
const labelClass = "block text-sm font-semibold text-slate-900";

// Static-friendly enquiry form: builds a prefilled email on submit. Works on
// any host with no backend. Deliberately collects only what is needed for a
// first assessment; never passport numbers, bank details or other sensitive
// information, which are handled separately once contact is made.
export default function ContactForm() {
  const { generalEmail } = useSiteClient();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: CONTACT_METHODS[0],
    citizenship: "",
    currentCountry: "",
    destination: "",
    purpose: PURPOSES[0],
    travelDate: "",
    travellers: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry: ${form.purpose} - ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone / WhatsApp: ${form.phone}`,
        `Preferred contact method: ${form.contactMethod}`,
        "",
        `Purpose: ${form.purpose}`,
        `Citizenship: ${form.citizenship}`,
        `Currently living in: ${form.currentCountry}`,
        `Intended destination: ${form.destination}`,
        `Intended travel date: ${form.travelDate}`,
        `Number of travellers: ${form.travellers}`,
        "",
        "About my situation:",
        form.message,
      ].join("\n")
    );
    window.location.href = `mailto:${generalEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-describedby={id("privacy")}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8"
    >
      <h3 className="mb-1 text-xl font-bold text-slate-900">Enquiry</h3>
      <p className="mb-6 text-sm text-slate-600">
        Tell us where you are and what you want to do. Fields marked with an asterisk are required.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Name <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input
            id={id("name")}
            required
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            className={`mt-1.5 ${field}`}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelClass}>
            Email <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input
            id={id("email")}
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            className={`mt-1.5 ${field}`}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("phone")} className={labelClass}>
            Phone / WhatsApp
          </label>
          <input
            id={id("phone")}
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            className={`mt-1.5 ${field}`}
            placeholder="Include your country code"
          />
        </div>
        <div>
          <label htmlFor={id("contactMethod")} className={labelClass}>
            Preferred contact method
          </label>
          <select
            id={id("contactMethod")}
            value={form.contactMethod}
            onChange={set("contactMethod")}
            className={`mt-1.5 ${field}`}
          >
            {CONTACT_METHODS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={id("purpose")} className={labelClass}>
          What do you want to do? <span aria-hidden="true" className="text-brand">*</span>
        </label>
        <select id={id("purpose")} required value={form.purpose} onChange={set("purpose")} className={`mt-1.5 ${field}`}>
          {PURPOSES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("citizenship")} className={labelClass}>
            Your citizenship
          </label>
          <input
            id={id("citizenship")}
            list={id("countries")}
            autoComplete="country-name"
            value={form.citizenship}
            onChange={set("citizenship")}
            className={`mt-1.5 ${field}`}
            placeholder="e.g. Grenadian"
          />
        </div>
        <div>
          <label htmlFor={id("currentCountry")} className={labelClass}>
            Where you live now
          </label>
          <input
            id={id("currentCountry")}
            list={id("countries")}
            value={form.currentCountry}
            onChange={set("currentCountry")}
            className={`mt-1.5 ${field}`}
            placeholder="Country you're travelling from"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("destination")} className={labelClass}>
            Where you want to go
          </label>
          <input
            id={id("destination")}
            list={id("countries")}
            value={form.destination}
            onChange={set("destination")}
            className={`mt-1.5 ${field}`}
            placeholder="Destination country"
          />
        </div>
        <div>
          <label htmlFor={id("travelDate")} className={labelClass}>
            Intended travel date
          </label>
          <input
            id={id("travelDate")}
            type="text"
            value={form.travelDate}
            onChange={set("travelDate")}
            className={`mt-1.5 ${field}`}
            placeholder="A date, a month, or 'not sure yet'"
          />
        </div>
      </div>

      {/* Shared country suggestions for the three location inputs. Typing
          anything else is still allowed; this is a convenience, not a limit. */}
      <datalist id={id("countries")}>
        {COUNTRY_OPTIONS.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <div className="mt-4">
        <label htmlFor={id("travellers")} className={labelClass}>
          Number of travellers
        </label>
        <input
          id={id("travellers")}
          type="number"
          min={1}
          inputMode="numeric"
          value={form.travellers}
          onChange={set("travellers")}
          className={`mt-1.5 ${field} sm:max-w-[10rem]`}
          placeholder="1"
        />
      </div>

      <div className="mt-4">
        <label htmlFor={id("message")} className={labelClass}>
          Tell us about your situation
        </label>
        <textarea
          id={id("message")}
          value={form.message}
          onChange={set("message")}
          rows={4}
          className={`mt-1.5 ${field} resize-y`}
          placeholder="What you're planning, where you've got to so far, and anything you're stuck on"
        />
      </div>

      <p
        id={id("privacy")}
        className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700"
      >
        Please do not submit passport numbers, bank details, or other highly sensitive information through this form. We
        will explain the secure document process after your enquiry.
      </p>

      <button type="submit" className={`${btnPrimary} mt-5 w-full`}>
        Send enquiry
      </button>
      <p className="mt-3 text-center text-xs text-slate-600">
        This opens your email app with the details filled in, so you can see exactly what is sent before it goes.
      </p>
    </form>
  );
}
