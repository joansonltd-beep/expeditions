"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";
import { track } from "@/lib/analytics";
import { CSME_COUNTRIES } from "@/lib/csmeData";
import { savePendingConsultation } from "@/lib/pendingConsultation";
import FygaroPaymentButton from "@/components/FygaroPaymentButton";

const COUNTRY_NAMES = CSME_COUNTRIES.map((c) => c.name);

const PURPOSES = ["Visit", "Work", "Study", "Relocate"] as const;
type Purpose = (typeof PURPOSES)[number];

const PURPOSE_BLURB: Record<Purpose, string> = {
  Visit: "A holiday, family or a short trip",
  Work: "Taking up a job, or looking for one",
  Study: "A course or a degree",
  Relocate: "Moving there for good",
};

const TIMEFRAMES = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"];

const HELP_OPTIONS = [
  "Move planning",
  "CSME assistance",
  "Housing or accommodation",
  "Banking",
  "Business setup",
  "Flights or transfers",
  "Wedding travel and room blocks",
  "Full relocation support",
  "Not sure yet",
];

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
    { label: "Visiting another CARICOM country", href: "/getting-there" },
    { label: "Country guides", href: "/destinations" },
  ],
  Work: [
    { label: "CARICOM Skills Certificate guide", href: "/caricom-skills-certificate" },
    { label: "Working in another CARICOM country", href: "/getting-started" },
  ],
  Study: [
    { label: "Studying in another CARICOM country", href: "/study" },
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
const headingClass = "mt-5 font-display text-2xl font-bold text-navy focus:outline-none";

type StepId = "origin" | "destination" | "purpose" | "background" | "timeframe" | "help" | "details";

/**
 * The one enquiry form. Every "Plan My Move" and every "Find my pathway" CTA
 * lands here.
 *
 * There used to be two. Find My Pathway asked where you were, where you were
 * going, why and when, then offered a $100 consultation. Plan My Move asked
 * where you were, where you were going, why and when, then offered the same
 * $100 consultation. Anyone who met both answered the same questions twice,
 * and the second form had no way of knowing the first had been filled in.
 *
 * So this is the union of the two, asked one question at a time. Nothing was
 * dropped in the merge: the pathway form's conditional questions and its
 * purpose-specific reading list are here, and so are Plan My Move's "what do
 * you want help with", access needs, message and consent.
 *
 * Submitting still sends nothing. savePendingConsultation() holds the answers
 * and the payment panel takes over; the enquiry only reaches Jo once payment
 * goes through and the visitor lands on /consultation-paid.
 *
 * Never asks for passport numbers, bank details or document uploads.
 */
export default function PlanMyMoveForm({
  initialFrom = "",
  initialTo = "",
  initialPurpose = "",
}: {
  initialFrom?: string;
  initialTo?: string;
  initialPurpose?: string;
}) {
  const waLink = useWhatsAppLink();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  // The hero's route selector sends its answers through the query string.
  // Read on the server and handed down, so the form is in the served HTML.
  const seeded = {
    current: initialFrom,
    destination: initialTo,
    purpose: (PURPOSES as readonly string[]).includes(initialPurpose) ? (initialPurpose as Purpose) : ("" as const),
  };

  const [form, setForm] = useState({
    nationality: "",
    current: seeded.current,
    destination: seeded.destination,
    purpose: seeded.purpose as Purpose | "",
    occupation: "",
    offer: "",
    timeframe: "",
    name: "",
    email: "",
    whatsapp: "",
    access: "",
    message: "",
  });
  const [help, setHelp] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [started, setStarted] = useState(
    Boolean(seeded.current || seeded.destination || seeded.purpose),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const purpose = form.purpose as Purpose | "";
  const offerQuestion = purpose ? OFFER_QUESTION[purpose] : null;
  const occupationLabel = purpose ? OCCUPATION_LABEL[purpose] : null;

  // The background step is counted in by default and removed only for Visit,
  // so the total can shrink but never grow while someone is answering.
  const steps: StepId[] = [
    "origin",
    "destination",
    "purpose",
    ...(purpose === "Visit" ? [] : (["background"] as StepId[])),
    "timeframe",
    "help",
    "details",
  ];
  const index = Math.min(stepIndex, steps.length - 1);
  const step = steps[index];

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index]);

  const begin = () => {
    if (!started) {
      setStarted(true);
      track("form_start", { form: "plan-my-move" });
    }
  };

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      begin();
      setError("");
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  const toggleHelp = (opt: string) => {
    begin();
    setError("");
    setHelp((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]));
  };

  function missing(s: StepId): string {
    if (s === "origin" && (!form.nationality.trim() || !form.current.trim()))
      return "Your nationality and where you live now, so we know which rules apply.";
    if (s === "destination" && !form.destination.trim()) return "Pick where you want to go.";
    if (s === "purpose" && !form.purpose) return "Pick what is taking you there.";
    if (s === "timeframe" && !form.timeframe) return "Pick roughly when you want to travel.";
    if (s === "help" && help.length === 0) return "Pick at least one, or choose “Not sure yet”.";
    return "";
  }

  function next() {
    const m = missing(step);
    if (m) {
      setError(m);
      return;
    }
    setError("");
    setStepIndex(index + 1);
  }

  function back() {
    setError("");
    setStepIndex(Math.max(0, index - 1));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    for (const s of steps) {
      const m = missing(s);
      if (m) {
        setStepIndex(steps.indexOf(s));
        setError(m);
        return;
      }
    }

    const lines = [
      `Nationality: ${form.nationality}`,
      `Current country: ${form.current}`,
      `Intended destination: ${form.destination}`,
      `Purpose: ${form.purpose}`,
      occupationLabel ? `${occupationLabel}: ${form.occupation || "(not given)"}` : null,
      offerQuestion ? `${offerQuestion} ${form.offer || "(not answered)"}` : null,
      `Intended travel timeframe: ${form.timeframe}`,
      `How we can help: ${help.join(", ")}`,
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.whatsapp}`,
      "",
      "Access needs:",
      form.access || "(none given)",
      "",
      "Message:",
      form.message || "(none)",
    ].filter(Boolean) as string[];

    track("pathway_complete", {
      purpose: form.purpose,
      from: form.current,
      to: form.destination,
      timeframe: form.timeframe,
    });
    track("form_submit", { form: "plan-my-move", purpose: form.purpose });

    savePendingConsultation({
      source: "plan-my-move",
      message: lines.join("\n"),
      recommended: help.join(", "),
      figures: { purpose: form.purpose, from: form.current, to: form.destination, timeframe: form.timeframe },
      mailtoSubject: encodeURIComponent(`Plan My Move: ${form.current || "?"} to ${form.destination || "?"} - ${form.name}`),
      mailtoBody: encodeURIComponent(lines.join("\n")),
    });

    setDone(true);
  }

  if (done && purpose) {
    return (
      <div className="rounded-3xl border border-brand/30 bg-brand-soft p-7 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Thanks {form.name.split(" ")[0] || "for that"}. Here is your next step.
        </h2>

        <p className="mt-3 font-display text-lg text-navy">
          {form.current || "Where you are"} to {form.destination || "your destination"}, for{" "}
          {form.purpose.toLowerCase()}.
        </p>

        <p className="mt-2 text-slate-700">
          Your answers are saved. Pay the $100 consultation fee below and your request goes to Jo the moment payment
          goes through.
        </p>

        <div className="mt-6 rounded-2xl border border-brand/25 bg-white p-6 text-center">
          <p className="font-semibold text-slate-900">$100 Move Planning Consultation</p>
          <div className="mt-4">
            <FygaroPaymentButton />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waLink(
              `Hi Jo, I filled in Plan My Move. I want to ${form.purpose.toLowerCase()} in ${form.destination || "another CARICOM country"}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "plan-my-move-result" })}
            className={btnWhatsapp}
          >
            Chat with Jo on WhatsApp
          </a>
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

  const isLast = step === "details";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </span>
        <div aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300"
            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div key={step} className="motion-safe:animate-[stepIn_220ms_ease-out]">
        {step === "origin" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              Where are you starting?
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={id("nat")} className={labelClass}>
                  Your nationality
                </label>
                <input id={id("nat")} list={id("countries")} value={form.nationality} onChange={set("nationality")} className={`mt-1.5 ${field}`} placeholder="e.g. Grenadian" />
              </div>
              <div>
                <label htmlFor={id("cur")} className={labelClass}>
                  Current country
                </label>
                <input id={id("cur")} list={id("countries")} value={form.current} onChange={set("current")} className={`mt-1.5 ${field}`} placeholder="Where you live now" />
              </div>
            </div>
          </>
        ) : null}

        {step === "destination" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              Where are you headed?
            </h2>
            <div className="mt-5">
              <label htmlFor={id("dest")} className={labelClass}>
                Intended destination
              </label>
              <input id={id("dest")} list={id("countries")} value={form.destination} onChange={set("destination")} className={`mt-1.5 ${field}`} placeholder="Where you want to go" />
            </div>
          </>
        ) : null}

        {step === "purpose" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              What is taking you there?
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {PURPOSES.map((p) => {
                const active = form.purpose === p;
                return (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      begin();
                      setError("");
                      setForm((f) => ({ ...f, purpose: p }));
                    }}
                    className={`rounded-2xl border-[1.5px] px-5 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                      active ? "border-brand bg-brand-soft" : "border-slate-200 bg-slate-50 hover:border-brand/50"
                    }`}
                  >
                    <span className="block font-display text-lg font-bold text-navy">{p}</span>
                    <span className="mt-0.5 block text-sm text-navy/70">{PURPOSE_BLURB[p]}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {step === "background" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              A bit about the move
            </h2>
            <p className="mt-2 text-sm text-slate-600">Both optional. They help us point you at the right pathway.</p>
            {occupationLabel ? (
              <div className="mt-5">
                <label htmlFor={id("occ")} className={labelClass}>
                  {occupationLabel}
                </label>
                <input id={id("occ")} value={form.occupation} onChange={set("occupation")} className={`mt-1.5 ${field}`} placeholder="e.g. Registered nurse, Civil engineering" />
              </div>
            ) : null}
            {offerQuestion ? (
              <fieldset className="mt-5">
                <legend className={labelClass}>{offerQuestion}</legend>
                <div className="mt-2 flex flex-wrap gap-3">
                  {["Yes", "No", "Not yet"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border-[1.5px] py-3 text-sm font-semibold transition ${
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
          </>
        ) : null}

        {step === "timeframe" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              When are you hoping to travel?
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {TIMEFRAMES.map((t) => {
                const active = form.timeframe === t;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      begin();
                      setError("");
                      setForm((f) => ({ ...f, timeframe: t }));
                    }}
                    className={`rounded-2xl border-[1.5px] px-5 py-4 text-left font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                      active ? "border-brand bg-brand-soft text-brand" : "border-slate-200 bg-slate-50 text-navy hover:border-brand/50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {step === "help" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              What would you like help with?
            </h2>
            <p className="mt-2 text-sm text-slate-600">Pick as many as apply.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {HELP_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-center gap-2.5 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
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
          </>
        ) : null}

        {step === "details" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              Where should Jo reply?
            </h2>
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
                Phone or WhatsApp
              </label>
              <input id={id("wa")} type="tel" autoComplete="tel" value={form.whatsapp} onChange={set("whatsapp")} className={`mt-1.5 ${field}`} placeholder="Include your country code" />
            </div>

            <div className="mt-4">
              <label htmlFor={id("access")} className={labelClass}>
                Access or mobility needs
              </label>
              <p className="mt-1 text-sm text-slate-600">
                Optional. Tell us what has to be arranged, not your medical history. We put it to the airline, the
                property and the driver, and tell you what each one confirms.
              </p>
              <textarea
                id={id("access")}
                value={form.access}
                onChange={set("access")}
                rows={3}
                className={`mt-1.5 ${field} resize-y`}
                placeholder="For example: wheelchair user, needs step-free entry and a roll-in shower; assistance from check-in to the gate."
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
                placeholder="Optional. Where you’ve got to so far, or what you’re stuck on."
              />
            </div>

            <p className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
              We will never ask for passport numbers, bank details or document uploads through this website. If anyone
              asks you for those here, it is not us.
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
          </>
        ) : null}
      </div>

      <datalist id={id("countries")}>
        {COUNTRY_NAMES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <p aria-live="polite" className={error ? "mt-4 text-sm font-medium text-accent" : "sr-only"}>
        {error}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {index > 0 ? (
          <button
            type="button"
            onClick={back}
            className="rounded-full border-[1.5px] border-slate-200 px-5 py-3 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Back
          </button>
        ) : null}

        {isLast ? (
          <button type="submit" className={btnPrimary}>
            Request Consultancy
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Continue
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      {isLast ? (
        <p className="mt-3 text-xs text-slate-600">
          This is an initial enquiry, not a finished plan. Submitting takes you to the $100 consultation payment step;
          your request is sent once that goes through.
        </p>
      ) : null}
    </form>
  );
}
