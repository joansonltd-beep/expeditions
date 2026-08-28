"use client";

import { useId, useState } from "react";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";
import { CSME_COUNTRIES } from "@/lib/csmeData";

const COUNTRY_NAMES = CSME_COUNTRIES.map((c) => c.name);

// The four states that began full free movement on 1 October 2025. Derived from
// the country data rather than hardcoded, so adding a fifth country there is
// enough to keep this correct.
const FULL_FREE_MOVEMENT = CSME_COUNTRIES.filter((c) => c.fullFreeMovement).map((c) => c.name);

function listNames(names: string[], conjunction = "and"): string {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} ${conjunction} ${names[names.length - 1]}`;
}

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-600 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
const labelClass = "block text-sm font-semibold text-slate-900";

/**
 * First-contact form for someone with a job offer (or hunting for one) in
 * another CARICOM country. Deliberately short: enough for us to tell them what
 * their particular route involves, not a self-service guide.
 *
 * Same static-friendly pattern as the other forms on the site: submitting opens
 * the visitor's own mail client with everything filled in, so no backend is
 * needed and the enquiry genuinely comes from their address.
 */
export default function JobOfferEnquiry() {
  const { generalEmail } = useSiteClient();
  const waLink = useWhatsAppLink();
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [csme, setCsme] = useState<"Yes" | "No" | "Not sure" | "">("");
  const [touched, setTouched] = useState(false);

  const csmeValid = csme !== "";

  // Full free movement runs BETWEEN the four participating states: it applies
  // when the person is a national of one and moving to another. Showing this
  // only when both ends match keeps it accurate rather than implying the
  // certificate is never needed for those countries.
  const routeIsFullFreeMovement =
    FULL_FREE_MOVEMENT.includes(origin) && FULL_FREE_MOVEMENT.includes(destination) && origin !== destination;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!csmeValid) return;

    const subject = encodeURIComponent(`Job offer enquiry: ${origin || "?"} to ${destination || "?"} - ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Number: ${phone}`,
        `Country of origin: ${origin}`,
        `Country of job offer: ${destination}`,
        `Potential work address: ${workAddress || "(not given)"}`,
        `Has a CARICOM Skills Certificate: ${csme}`,
      ].join("\n")
    );
    window.location.href = `mailto:${generalEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Name <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input
            id={id("name")}
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1.5 ${field}`}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelClass}>
            Number <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <input
            id={id("phone")}
            required
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`mt-1.5 ${field}`}
            placeholder="Include your country code"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("origin")} className={labelClass}>
            Country of origin <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <select
            id={id("origin")}
            required
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={`mt-1.5 ${field}`}
          >
            <option value="">Select a country</option>
            {COUNTRY_NAMES.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Another country</option>
          </select>
        </div>
        <div>
          <label htmlFor={id("destination")} className={labelClass}>
            Country of job offer <span aria-hidden="true" className="text-brand">*</span>
          </label>
          <select
            id={id("destination")}
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`mt-1.5 ${field}`}
          >
            <option value="">Select a country</option>
            {COUNTRY_NAMES.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Still looking</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={id("address")} className={labelClass}>
          Potential work address
        </label>
        <input
          id={id("address")}
          value={workAddress}
          onChange={(e) => setWorkAddress(e.target.value)}
          className={`mt-1.5 ${field}`}
          placeholder="Employer, town or area, if you know it"
        />
      </div>

      <fieldset className="mt-4">
        <legend className={labelClass}>
          Do you have a CARICOM Skills Certificate? <span aria-hidden="true" className="text-brand">*</span>
        </legend>
        <div className="mt-1.5 flex flex-wrap gap-3">
          {(["Yes", "No", "Not sure"] as const).map((opt) => (
            <label
              key={opt}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border-[1.5px] py-2.5 text-sm font-semibold transition ${
                csme === opt ? "border-brand bg-brand-soft text-brand" : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              <input
                type="radio"
                name={id("csme")}
                value={opt}
                checked={csme === opt}
                onChange={() => setCsme(opt)}
                className="sr-only"
              />
              {opt}
            </label>
          ))}
        </div>
        {touched && !csmeValid ? (
          <p className="mt-1.5 text-xs text-accent">Pick one so we know where to start.</p>
        ) : null}

        <p className="mt-2.5 text-xs text-slate-600">
          Not required if you are a national of {listNames(FULL_FREE_MOVEMENT, "or")} and moving to another of those
          four. Full free movement between them began on 1 October 2025. Everywhere else in CARICOM, the certificate
          still applies.
        </p>
        {routeIsFullFreeMovement ? (
          <p className="mt-2 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            {origin} to {destination} falls under full free movement, so a Skills Certificate is generally not needed for
            this route. There is still paperwork on arrival, and we will tell you what your destination expects.
          </p>
        ) : null}
      </fieldset>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className={btnPrimary}>
          Find out what I need
        </button>
        <a
          href={waLink("Hi Jo, I have a job offer in another CARICOM country and want to know what I need.")}
          target="_blank"
          rel="noopener noreferrer"
          className={btnWhatsapp}
        >
          Ask on WhatsApp
        </a>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        We will come back with what applies to your route and what to line up first. Please do not send passport
        numbers or bank details here; we will explain the secure document process once we are talking.
      </p>
    </form>
  );
}
