"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";
import { track } from "@/lib/analytics";
import { CSME_COUNTRIES } from "@/lib/csmeData";
import { savePendingConsultation } from "@/lib/pendingConsultation";
import FygaroPaymentButton from "@/components/FygaroPaymentButton";

const COUNTRY_NAMES = CSME_COUNTRIES.map((c) => c.name);

const PURPOSES = ["Visit", "Work", "Study", "Relocate"] as const;
type Purpose = (typeof PURPOSES)[number];

// One line each, so the purpose step can be four large targets rather than a
// dropdown. The wording matches what the rest of the site calls these.
const PURPOSE_BLURB: Record<Purpose, string> = {
  Visit: "A holiday, family or a short trip",
  Work: "Taking up a job, or looking for one",
  Study: "A course or a degree",
  Relocate: "Moving there for good",
};

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

type StepId = "origin" | "destination" | "purpose" | "background" | "timeframe" | "details";

/**
 * Find My Pathway: the short, qualifying first step from the hero.
 *
 * One question at a time rather than one long form. The questions, the
 * conditional logic and what happens on submit are unchanged; only the way
 * they are presented is different. A page of twelve fields reads as work to
 * be done, and most of it is irrelevant to any given visitor: someone going
 * for a holiday is never asked about a job offer.
 *
 * Shorter than the Plan My Move form on purpose. It asks only what is needed
 * to point someone at the right pathway, then shows the next step inline
 * rather than leaving them on a "thanks, we'll be in touch" dead end. The
 * free reading recommendations show immediately; the actual enquiry is held
 * by savePendingConsultation() and only reaches Jo once the $100 payment goes
 * through and the visitor lands on /consultation-paid.
 *
 * Never asks for passport numbers, bank details or document uploads.
 */
export default function FindMyPathwayForm() {
  const waLink = useWhatsAppLink();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  // The hero's route selector sends its three answers through the query
  // string. Seeded lazily at first render rather than in an effect, so there
  // is no flash of an empty form and no setState during mount.
  const params = useSearchParams();
  const seeded = {
    current: params.get("from") ?? "",
    destination: params.get("to") ?? "",
    purpose: (PURPOSES as readonly string[]).includes(params.get("purpose") ?? "")
      ? (params.get("purpose") as Purpose)
      : ("" as const),
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
  });
  const [started, setStarted] = useState(
    Boolean(seeded.current || seeded.destination || seeded.purpose),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const purpose = form.purpose as Purpose | "";
  const offerQuestion = purpose ? OFFER_QUESTION[purpose] : null;
  const occupationLabel = purpose ? OCCUPATION_LABEL[purpose] : null;

  // Someone visiting is never asked about a job offer, so that step does not
  // exist for them and the count reads 5 rather than 6.
  //
  // The step is counted in until they choose Visit specifically, rather than
  // counted out until they choose Work. Otherwise the total climbs from 5 to 6
  // the moment a purpose is picked, and a progress count that grows while you
  // answer reads as broken. This way it only ever shrinks.
  const steps: StepId[] = [
    "origin",
    "destination",
    "purpose",
    ...(purpose === "Visit" ? [] : (["background"] as StepId[])),
    "timeframe",
    "details",
  ];
  // Changing the purpose can remove a step from under the visitor.
  const index = Math.min(stepIndex, steps.length - 1);
  const step = steps[index];

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    // Moving focus to the new question is what makes this usable by keyboard
    // and screen reader. Skipped on first paint so the page does not steal
    // focus from the top of the document.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index]);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!started) {
        setStarted(true);
        track("form_start", { form: "pathway" });
      }
      setError("");
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  /** What has to be answered before this step can be left. */
  function missing(s: StepId): string {
    if (s === "origin" && (!form.nationality.trim() || !form.current.trim()))
      return "Your nationality and where you live now, so we know which rules apply.";
    if (s === "destination" && !form.destination.trim()) return "Pick where you want to go.";
    if (s === "purpose" && !form.purpose) return "Pick what is taking you there.";
    if (s === "timeframe" && !form.timeframe) return "Pick roughly when you want to travel.";
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
    // Every earlier step is validated on the way through, but a seeded visitor
    // can land deep in the form, so the whole thing is checked once more here.
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

    savePendingConsultation({
      source: "find-my-pathway",
      message: lines.join("\n"),
      figures: { purpose: form.purpose, from: form.current, to: form.destination },
      mailtoSubject: encodeURIComponent(`Find my pathway: ${form.purpose} - ${form.name}`),
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

        {/* The route as answered, before the ask. */}
        <p className="mt-3 font-display text-lg text-navy">
          {form.current || "Where you are"} to {form.destination || "your destination"}, for{" "}
          {form.purpose.toLowerCase()}.
        </p>

        <p className="mt-2 text-slate-700">
          Pay the $100 consultation fee below and your answers go to Jo the moment payment goes through.
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
              `Hi Jo, I filled in Find My Pathway. I want to ${form.purpose.toLowerCase()} in ${form.destination || "another CARICOM country"}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "pathway-result" })}
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
      {/* Progress. The bar is decoration; the count beside it is the fact. */}
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
            <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl font-bold text-navy focus:outline-none">
              Where are you starting?
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={id("nat")} className={labelClass}>
                  Your nationality
                </label>
                <input
                  id={id("nat")}
                  list={id("countries")}
                  value={form.nationality}
                  onChange={set("nationality")}
                  className={`mt-1.5 ${field}`}
                  placeholder="e.g. Grenadian"
                />
              </div>
              <div>
                <label htmlFor={id("cur")} className={labelClass}>
                  Current country
                </label>
                <input
                  id={id("cur")}
                  list={id("countries")}
                  value={form.current}
                  onChange={set("current")}
                  className={`mt-1.5 ${field}`}
                  placeholder="Where you live now"
                />
              </div>
            </div>
          </>
        ) : null}

        {step === "destination" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl font-bold text-navy focus:outline-none">
              Where are you headed?
            </h2>
            <div className="mt-5">
              <label htmlFor={id("dest")} className={labelClass}>
                Intended destination
              </label>
              <input
                id={id("dest")}
                list={id("countries")}
                value={form.destination}
                onChange={set("destination")}
                className={`mt-1.5 ${field}`}
                placeholder="Where you want to go"
              />
            </div>
          </>
        ) : null}

        {step === "purpose" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl font-bold text-navy focus:outline-none">
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
                      if (!started) {
                        setStarted(true);
                        track("form_start", { form: "pathway" });
                      }
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
            <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl font-bold text-navy focus:outline-none">
              A bit about the move
            </h2>
            <p className="mt-2 text-sm text-slate-600">Both optional. They help us point you at the right pathway.</p>
            {occupationLabel ? (
              <div className="mt-5">
                <label htmlFor={id("occ")} className={labelClass}>
                  {occupationLabel}
                </label>
                <input
                  id={id("occ")}
                  value={form.occupation}
                  onChange={set("occupation")}
                  className={`mt-1.5 ${field}`}
                  placeholder="e.g. Registered nurse, Civil engineering"
                />
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
                        form.offer === opt
                          ? "border-brand bg-brand-soft text-brand"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name={id("offer")}
                        value={opt}
                        checked={form.offer === opt}
                        onChange={set("offer")}
                        className="sr-only"
                      />
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
            <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl font-bold text-navy focus:outline-none">
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
                      setError("");
                      setForm((f) => ({ ...f, timeframe: t }));
                    }}
                    className={`rounded-2xl border-[1.5px] px-5 py-4 text-left font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                      active
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-slate-200 bg-slate-50 text-navy hover:border-brand/50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {step === "details" ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl font-bold text-navy focus:outline-none">
              Where should Jo reply?
            </h2>
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
              <label htmlFor={id("wa")} className={labelClass}>
                WhatsApp number
              </label>
              <input
                id={id("wa")}
                type="tel"
                autoComplete="tel"
                value={form.whatsapp}
                onChange={set("whatsapp")}
                className={`mt-1.5 ${field}`}
                placeholder="Include your country code"
              />
            </div>
            <p className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
              We will never ask for passport numbers, bank details or document uploads through this website. If anyone
              asks you for those here, it is not us.
            </p>
          </>
        ) : null}
      </div>

      <datalist id={id("countries")}>
        {COUNTRY_NAMES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      {/* Announced, because a validation message nobody hears is not one. */}
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
          By sending this you agree we may use these details to respond, as set out in our{" "}
          <Link href="/policies" className="font-medium underline hover:text-brand">
            privacy policy
          </Link>
          .
        </p>
      ) : null}
    </form>
  );
}
