"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";
import { captureLead } from "@/lib/leadCapture";
import { CSME_COUNTRIES } from "@/lib/csmeData";

const COUNTRY_NAMES = CSME_COUNTRIES.map((c) => c.name);

const REASONS = ["Visit", "Work", "Business", "Study", "Family", "Retirement", "Other", "Not sure yet"];

const TIMEFRAMES = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"];

const HELP_OPTIONS = [
  "Move planning",
  "CSME assistance",
  "Housing or accommodation",
  "Banking",
  "Business setup",
  "Flights or transfers",
  "Full relocation support",
  "Not sure yet",
];

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-500 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
const labelClass = "block text-sm font-semibold text-slate-900";

/**
 * The Plan My Move enquiry. Every CTA labelled "Plan My Move" across the site
 * lands here.
 *
 * Submission uses the same static-friendly pattern as every other form on the
 * site: it opens the visitor's own mail client with the answers filled in, so
 * the enquiry genuinely comes from their address and nothing depends on a
 * backend being up. It also fires captureLead(), which posts to /api/lead and
 * forwards to LEAD_WEBHOOK_URL when that env var is set. It is not set today,
 * so the mail hand-off is what actually delivers the enquiry.
 *
 * This is an initial assessment, not a finished plan, and the copy says so.
 */
export default function PlanMyMoveForm() {
  const { generalEmail } = useSiteClient();
  const waLink = useWhatsAppLink();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const [form, setForm] = useState({
    from: "",
    to: "",
    reason: "",
    timeframe: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [help, setHelp] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleHelp = (opt: string) =>
    setHelp((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]));

  const helpValid = help.length > 0;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    // The browser enforces the required fields and the consent box; this only
    // guards the checkbox group, which has no native required equivalent.
    if (!helpValid) return;

    const lines = [
      `Moving from: ${form.from}`,
      `Moving to: ${form.to}`,
      `Main reason: ${form.reason}`,
      `Expected timeframe: ${form.timeframe}`,
      `How we can help: ${help.join(", ")}`,
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone}`,
      "",
      "Message:",
      form.message || "(none)",
    ];

    // Fire and forget, so a configured webhook records the lead too. Never
    // blocks the mail hand-off.
    captureLead({
      source: "plan-my-move",
      message: lines.join("\n"),
      recommended: help.join(", "),
      figures: { from: form.from, to: form.to, reason: form.reason, timeframe: form.timeframe },
    });

    const subject = encodeURIComponent(`Plan My Move: ${form.from || "?"} to ${form.to || "?"} - ${form.name}`);
    window.location.href = `mailto:${generalEmail}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8"
    >
      <h2 className="text-xl font-bold text-slate-900">Tell us about your move</h2>
      <p className="mt-1.5 text-sm text-slate-600">
        A few questions so we can point you at the right next step. Fields marked with an asterisk are required.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("from")} className={labelClass}>
            Moving from <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input
            id={id("from")}
            required
            list={id("countries")}
            value={form.from}
            onChange={set("from")}
            className={`mt-1.5 ${field}`}
            placeholder="Country you're leaving"
          />
        </div>
        <div>
          <label htmlFor={id("to")} className={labelClass}>
            Moving to <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input
            id={id("to")}
            required
            list={id("countries")}
            value={form.to}
            onChange={set("to")}
            className={`mt-1.5 ${field}`}
            placeholder="Country you're headed to"
          />
        </div>
      </div>

      <datalist id={id("countries")}>
        {COUNTRY_NAMES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("reason")} className={labelClass}>
            Main reason for travel or relocation <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <select id={id("reason")} required value={form.reason} onChange={set("reason")} className={`mt-1.5 ${field}`}>
            <option value="">Select a reason</option>
            {REASONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id("timeframe")} className={labelClass}>
            Expected timeframe <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <select
            id={id("timeframe")}
            required
            value={form.timeframe}
            onChange={set("timeframe")}
            className={`mt-1.5 ${field}`}
          >
            <option value="">Select a timeframe</option>
            {TIMEFRAMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelClass}>
          How can we help? <span aria-hidden="true" className="text-brand">*</span>
          <span className="ml-1 font-normal text-slate-600">Pick as many as apply.</span>
        </legend>
        <div className="mt-2 grid gap-2 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 p-3.5 sm:grid-cols-2">
          {HELP_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={help.includes(opt)}
                onChange={() => toggleHelp(opt)}
                className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand focus:ring-brand/40"
              />
              {opt}
            </label>
          ))}
        </div>
        {touched && !helpValid ? (
          <p className="mt-1.5 text-sm text-accent">Pick at least one, or choose &ldquo;Not sure yet&rdquo;.</p>
        ) : null}
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

      <div className="mt-4">
        <label htmlFor={id("phone")} className={labelClass}>
          Phone or WhatsApp
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

      <div className="mt-4">
        <label htmlFor={id("message")} className={labelClass}>
          Anything else we should know
        </label>
        <textarea
          id={id("message")}
          value={form.message}
          onChange={set("message")}
          rows={4}
          className={`mt-1.5 ${field} resize-y`}
          placeholder="Optional. Where you've got to so far, or what you're stuck on."
        />
      </div>

      <p className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
        Please do not send passport numbers, bank details or other sensitive information here. We will explain the
        secure document process once we are in touch.
      </p>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand focus:ring-brand/40"
          />
          <span>
            I agree that Expeditions With Jo may use these details to respond to my enquiry, as set out in the{" "}
            <Link href="/policies" className="font-semibold text-brand hover:underline">
              privacy policy
            </Link>
            . <span aria-hidden="true" className="text-brand">*</span>
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className={btnPrimary}>
          Request My Move Plan
        </button>
        <a
          href={waLink("Hi Jo, I'd like help planning a move within CARICOM.")}
          target="_blank"
          rel="noopener noreferrer"
          className={btnWhatsapp}
        >
          Ask on WhatsApp
        </a>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        This is an initial enquiry, not a finished plan. We read what you send and come back to you about the right
        next step, which may be a consultation or simply a pointer to the free guides. Submitting opens your email app
        with the answers filled in, so you can see exactly what is sent before it goes.
      </p>
    </form>
  );
}
