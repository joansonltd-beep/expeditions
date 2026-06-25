"use client";

import { useState } from "react";
import { useSiteClient } from "@/components/SiteSettingsProvider";
import { btnPrimary } from "@/components/ui";

const SERVICES = [
  "Flights",
  "Accommodation",
  "Transfers",
  "Cruises",
  "Bundle (flight + stay + transfers)",
  "Travel visa",
  "Insurance consultation",
  "Finance / loans / business registration",
  "Something else",
];

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-3.5 py-3 text-[0.97rem] text-slate-900 transition focus:border-brand focus:outline-none";

// Static-friendly contact form: builds a prefilled email on submit. Works on
// any host with no backend. (A lead webhook can be wired in later if wanted.)
export default function ContactForm() {
  const { generalEmail } = useSiteClient();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: SERVICES[0], message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry: ${form.service} - ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nDetails:\n${form.message}`
    );
    window.location.href = `mailto:${generalEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-900">
          Name
          <input required value={form.name} onChange={set("name")} className={`mt-1.5 ${field}`} placeholder="Your name" />
        </label>
        <label className="block text-sm font-semibold text-slate-900">
          Email
          <input required type="email" value={form.email} onChange={set("email")} className={`mt-1.5 ${field}`} placeholder="you@email.com" />
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-slate-900">
        Phone / WhatsApp
        <input value={form.phone} onChange={set("phone")} className={`mt-1.5 ${field}`} placeholder="Optional" />
      </label>
      <label className="mt-4 block text-sm font-semibold text-slate-900">
        What can we help with?
        <select value={form.service} onChange={set("service")} className={`mt-1.5 ${field}`}>
          {SERVICES.map((s) => (
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
          placeholder="Dates, destination, budget, or what you need help with"
        />
      </label>
      <button type="submit" className={`${btnPrimary} mt-5 w-full`}>
        Send enquiry
      </button>
    </form>
  );
}
