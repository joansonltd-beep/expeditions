"use client";

import { useState } from "react";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";

// Hard eligibility gate: business setup is only offered to citizens/residents
// of Trinidad & Tobago and Grenada. The enquiry form only renders once one of
// these is selected; any other choice explains why it is unavailable instead
// of silently hiding the option.
const COUNTRIES = [
  { value: "", label: "Select your country" },
  { value: "tt", label: "Trinidad and Tobago" },
  { value: "gd", label: "Grenada" },
  { value: "other", label: "Somewhere else" },
];
const ELIGIBLE = new Set(["tt", "gd"]);

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

export default function BusinessSetupEnquiry({
  services,
  eligibilityTitle,
  ineligibleMessage,
}: {
  services: string[];
  eligibilityTitle: string;
  ineligibleMessage: string;
}) {
  const { generalEmail } = useSiteClient();
  const waLink = useWhatsAppLink();
  const [country, setCountry] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: services[0] ?? "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const countrySelected = country !== "";
  const eligible = ELIGIBLE.has(country);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const countryLabel = COUNTRIES.find((c) => c.value === country)?.label ?? "";
    const subject = encodeURIComponent(`Business setup enquiry: ${form.service} - ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCountry: ${countryLabel}\nService: ${form.service}\n\nDetails:\n${form.message}`
    );
    window.location.href = `mailto:${generalEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8">
      <label className="block text-sm font-semibold text-slate-900">
        {eligibilityTitle}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={`mt-1.5 ${field}`}
        >
          {COUNTRIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      {countrySelected && !eligible ? (
        <div role="status" className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
          {ineligibleMessage}
        </div>
      ) : null}

      {eligible ? (
        <form onSubmit={onSubmit} className="mt-6 border-t border-slate-100 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-900">
              Name
              <input
                required
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                className={`mt-1.5 ${field}`}
                placeholder="Your name"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                className={`mt-1.5 ${field}`}
                placeholder="you@email.com"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold text-slate-900">
            Phone / WhatsApp
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={set("phone")}
              className={`mt-1.5 ${field}`}
              placeholder="Optional"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-900">
            Which service do you need?
            <select value={form.service} onChange={set("service")} className={`mt-1.5 ${field}`}>
              {services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-900">
            Details
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={4}
              className={`mt-1.5 ${field} resize-y`}
              placeholder="Tell us about your business and what you need help with"
            />
          </label>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" className={btnPrimary}>
              Send enquiry
            </button>
            <a
              href={waLink(`Hi Jo, I'm interested in business setup help (${form.service}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className={btnWhatsapp}
            >
              Message on WhatsApp
            </a>
          </div>
        </form>
      ) : null}
    </div>
  );
}
