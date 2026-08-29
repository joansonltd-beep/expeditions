"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";
import { captureLead } from "@/lib/leadCapture";
import { track } from "@/lib/analytics";
import { CSME_COUNTRIES } from "@/lib/csmeData";

const COUNTRY_NAMES = CSME_COUNTRIES.map((c) => c.name);

const PURPOSES = ["Visit", "Work", "Study", "Relocate"] as const;
type Purpose = (typeof PURPOSES)[number];

const TIMEFRAMES = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"];

// What "do you already have an offer?" means depends on why they are going, so
// the question rewords itself rather than asking something that makes no sense.
const OFFER_QUESTION: Record<Purpose, string | null> = {
  Visit: null,
  Work: "Do you already have a job offer?",
  Study: "Do you already have a school acceptance?",
  Relocate: "Do you already have a job offer or school acceptance?",
};

const OCCUPATION_LABEL: Record<Purpose, string | null> = {
  Visit: null,
  Work: "Your occupation or field",
  Study: "Your field of study",
  Relocate: "Your occupation or field of study",
};

// Where to send someone next, by purpose. Every href is a real page.
const NEXT_GUIDES: Record<Purpose, { label: string; href: string }[]> = {
  Visit: [
    { label: "Go Visit: visiting another CARICOM country", href: "/getting-there" },
    { label: "Country guides", href: "/destinations" },
  ],
  Work: [
    { label: "CARICOM Skills Certificate guide", href: "/caricom-skills-certificate" },
    { label: "Go Work: working in another CARICOM country", href: "/getting-started" },
  ],
  Study: [
    { label: "Go Study: studying in another CARICOM country", href: "/study" },
    { label: "Country guides", href: "/destinations" },
  ],
  Relocate: [
    { label: "CARICOM Move Basics: the free guides", href: "/guides" },
    { label: "CARICOM Skills Certificate guide", href: "/caricom-skills-certificate" },
  ],
};

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-500 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
const labelClass = "block text-sm font-semibold text-slate-900";

/**
 * Find My Pathway: the short, qualifying first step from the hero.
 *
 * Shorter than the Plan My Move form on purpose. It asks only what is needed
 * to point someone at the right pathway, then shows the next step inline
 * rather than leaving them on a "thanks, we'll be in touch" dead end.
 *
 * Never asks for passport numbers, bank details or document uploads.
 */
export default function FindMyPathwayForm() {
  const { generalEmail } = useSiteClient();
  const waLink = useWhatsAppLink();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const [form, setForm] = useState({
    nationality: "",
    current: "",
    destination: "",
    purpose: "" as Purpose | "",
    occupation: "",
    offer: "",
    timeframe: "",
    name: "",
    email: "",
    whatsapp: "",
  });
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const purpose = form.purpose as Purpose | "";
  const offerQuestion = purpose ? OFFER_QUESTION[purpose] : null;
  const occupationLabel = purpose ? OCCUPATION_LABEL[purpose] : null;

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!started) {
        setStarted(true);
        track("form_start", { form: "pathway" });
      }
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [
      `Nationality: ${form.nationality}`,
      `Current country: ${form.current}`,
      `Intended destination: ${form.destination}`,
      `Purpose: ${form.purpose}`,
      occupationLabel ? `${occupationLabel}: ${form.occupation || "(not given)"}` : null,
      offerQuestion ? `${offerQuestion} ${form.offer || "(not answered)"}` : null,
      `Intended travel timeframe: ${form.timeframe}`,
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
    ].filter(Boolean) as string[];

    track("pathway_complete", {
      purpose: form.purpose,
      from: form.current,
      to: form.destination,
      timeframe: form.timeframe,
    });
    track("form_submit", { form: "pathway", purpose: form.purpose });

    captureLead({ source: "find-my-pathway", message: lines.join("\n") });

    setDone(true);

    const subject = encodeURIComponent(`Find my pathway: ${form.purpose} - ${form.name}`);
    window.location.href = `mailto:${generalEmail}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (done && purpose) {
    return (
      <div className="rounded-3xl border border-brand/30 bg-brand-soft p-7 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Thanks {form.name.split(" ")[0] || "for that"}. Here is your next step.</h2>
        <p className="mt-2 text-slate-700">
          Your email app should have opened with your answers filled in. Send that and we will come back to you, usually
          within one business day. If it did not open, message us on WhatsApp instead and we will pick it up there.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waLink(
              `Hi Jo, I filled in Find My Pathway. I want to ${form.purpose.toLowerCase()} in ${form.destination || "another CARICOM country"}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "pathway-result" })}
            className={btnWhatsapp}
          >
            Chat with Jo on WhatsApp
          </a>
          <Link
            href="/services#consultation"
            onClick={() => track("consultation_click", { location: "pathway-result" })}
            className={btnPrimary}
          >
            Book a Move Planning Consultation
          </Link>
        </div>

        <div className="mt-7 border-t border-brand/20 pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Worth reading while you wait
          </h3>
          <ul className="mt-3 grid gap-2">
            {NEXT_GUIDES[purpose].map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="font-semibold text-brand hover:underline">
                  {g.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 text-sm font-medium text-slate-600 underline hover:text-brand"
        >
          Change my answers
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8"
    >
      <h2 className="text-xl font-bold text-slate-900">Find my pathway</h2>
      <p className="mt-1.5 text-sm text-slate-600">
        Nine short questions. We will tell you which pathway fits and what to do next.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("nat")} className={labelClass}>
            Your nationality <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input id={id("nat")} required list={id("countries")} value={form.nationality} onChange={set("nationality")} className={`mt-1.5 ${field}`} placeholder="e.g. Grenadian" />
        </div>
        <div>
          <label htmlFor={id("cur")} className={labelClass}>
            Current country <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input id={id("cur")} required list={id("countries")} value={form.current} onChange={set("current")} className={`mt-1.5 ${field}`} placeholder="Where you live now" />
        </div>
      </div>

      <datalist id={id("countries")}>
        {COUNTRY_NAMES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("dest")} className={labelClass}>
            Intended destination <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input id={id("dest")} required list={id("countries")} value={form.destination} onChange={set("destination")} className={`mt-1.5 ${field}`} placeholder="Where you want to go" />
        </div>
        <div>
          <label htmlFor={id("purpose")} className={labelClass}>
            Purpose <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <select id={id("purpose")} required value={form.purpose} onChange={set("purpose")} className={`mt-1.5 ${field}`}>
            <option value="">Select a purpose</option>
            {PURPOSES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Both of these only make sense once we know why they are going. */}
      {occupationLabel ? (
        <div className="mt-4">
          <label htmlFor={id("occ")} className={labelClass}>
            {occupationLabel}
          </label>
          <input id={id("occ")} value={form.occupation} onChange={set("occupation")} className={`mt-1.5 ${field}`} placeholder="e.g. Registered nurse, Civil engineering" />
        </div>
      ) : null}

      {offerQuestion ? (
        <fieldset className="mt-4">
          <legend className={labelClass}>{offerQuestion}</legend>
          <div className="mt-1.5 flex flex-wrap gap-3">
            {["Yes", "No", "Not yet"].map((opt) => (
              <label
                key={opt}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border-[1.5px] py-2.5 text-sm font-semibold transition ${
                  form.offer === opt ? "border-brand bg-brand-soft text-brand" : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                <input type="radio" name={id("offer")} value={opt} checked={form.offer === opt} onChange={set("offer")} className="sr-only" />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-4">
        <label htmlFor={id("time")} className={labelClass}>
          Intended travel timeframe <span aria-hidden="true" className="text-brand">*</span>
        </label>
        <select id={id("time")} required value={form.timeframe} onChange={set("timeframe")} className={`mt-1.5 ${field}`}>
          <option value="">Select a timeframe</option>
          {TIMEFRAMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Name <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input id={id("name")} required autoComplete="name" value={form.name} onChange={set("name")} className={`mt-1.5 ${field}`} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelClass}>
            Email <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input id={id("email")} required type="email" autoComplete="email" value={form.email} onChange={set("email")} className={`mt-1.5 ${field}`} placeholder="you@email.com" />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={id("wa")} className={labelClass}>
          WhatsApp number
        </label>
        <input id={id("wa")} type="tel" autoComplete="tel" value={form.whatsapp} onChange={set("whatsapp")} className={`mt-1.5 ${field}`} placeholder="Include your country code" />
      </div>

      <p className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
        We will never ask for passport numbers, bank details or document uploads through this website. If anyone asks
        you for those here, it is not us.
      </p>

      <button type="submit" className={`${btnPrimary} mt-5 w-full`}>
        Find my pathway
      </button>
      <p className="mt-3 text-center text-xs text-slate-600">
        By sending this you agree we may use these details to respond, as set out in our{" "}
        <Link href="/policies" className="font-medium underline hover:text-brand">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
