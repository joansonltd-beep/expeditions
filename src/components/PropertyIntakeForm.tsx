"use client";

import { useMemo, useState } from "react";
import { btnPrimary, btnGhost } from "@/components/ui";

/**
 * Property intake for Airbnb management enquiries.
 *
 * Deliberately not wired to a server. The owner fills this in, and the last
 * step hands them a finished email addressed to us, which they send from their
 * own account. Nothing is stored, nothing is posted, and the enquiry arrives
 * from an address that can be replied to.
 *
 * The questions mirror what Airbnb asks when a listing is created, so an owner
 * who answers these has effectively done the first half of a listing. Five
 * extras are Jamaica's rather than Airbnb's: water tank, backup power, gated
 * access, hot water, and who is currently holding the keys. Those are the ones
 * that decide whether a property can take guests at all.
 *
 * A composed mailto can exceed what some mail clients accept in a URL, and
 * Outlook in particular truncates around 2,000 characters. So the finished
 * email is also shown on the page with a copy button. If the mail client
 * mangles it, nothing is lost.
 */

const field =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

const TO = "info@expeditionswithjo.com";

const PARISHES = [
  "Kingston", "St. Andrew", "St. Thomas", "Portland", "St. Mary", "St. Ann",
  "Trelawny", "St. James (Montego Bay)", "Hanover", "Westmoreland",
  "St. Elizabeth", "Manchester", "Clarendon", "St. Catherine",
];

const PLACE_TYPES = [
  "An entire place to themselves",
  "A private room in the property",
  "A shared room",
];

const PROPERTY_TYPES = [
  "House", "Apartment", "Villa", "Cottage", "Guesthouse", "Studio", "Condo", "Other",
];

const AMENITIES = [
  "Wi-Fi", "Air conditioning", "Kitchen", "Washing machine", "Free parking",
  "Pool", "TV", "Workspace for a laptop", "Outdoor space or patio", "Beach access",
];

/** The five that decide whether a Jamaican property can take guests at all. */
const ESSENTIALS = [
  "Water tank or backup water",
  "Generator or inverter",
  "Gated or secured access",
  "Hot water",
  "Someone local who holds a key",
];

type Form = {
  name: string; email: string; phone: string; livesIn: string;
  parish: string; area: string; placeType: string; propertyType: string;
  guests: string; bedrooms: string; beds: string; bathrooms: string;
  amenities: string[]; essentials: string[];
  alreadyListed: string; listingUrl: string;
  condition: string; photos: string; cleaning: string;
  availableFrom: string; ownUse: string; goal: string; notes: string;
};

const EMPTY: Form = {
  name: "", email: "", phone: "", livesIn: "",
  parish: "", area: "", placeType: "", propertyType: "",
  guests: "", bedrooms: "", beds: "", bathrooms: "",
  amenities: [], essentials: [],
  alreadyListed: "", listingUrl: "",
  condition: "", photos: "", cleaning: "",
  availableFrom: "", ownUse: "", goal: "", notes: "",
};

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label, children, hint,
}: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block text-sm font-semibold text-slate-900">
      {label}
      {children}
      {hint ? <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span> : null}
    </label>
  );
}

function Fieldset({
  legend, note, children,
}: { legend: string; note?: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-8 border-t border-slate-100 pt-7 first:mt-0 first:border-0 first:pt-0">
      <legend className="sr-only">{legend}</legend>
      <h3 className="text-base font-bold text-navy">{legend}</h3>
      {note ? <p className="mt-1 text-sm text-slate-600">{note}</p> : null}
      <div className="mt-4 grid gap-4">{children}</div>
    </fieldset>
  );
}

function CheckGroup({
  options, selected, onToggle,
}: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => (
        <label key={o} className="flex items-center gap-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={selected.includes(o)}
            onChange={() => onToggle(o)}
            className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
          />
          {o}
        </label>
      ))}
    </div>
  );
}

export default function PropertyIntakeForm() {
  const [f, setF] = useState<Form>(EMPTY);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const set =
    <K extends keyof Form>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value } as Form));

  const toggle = (k: "amenities" | "essentials") => (v: string) =>
    setF((p) => ({
      ...p,
      [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v],
    }));

  const body = useMemo(() => {
    const line = (label: string, value: string) => (value.trim() ? `${label}: ${value.trim()}` : "");
    const list = (label: string, value: string[]) => (value.length ? `${label}: ${value.join(", ")}` : "");

    // A heading with nothing under it tells the reader the form was long and
    // the owner gave up. Sections only appear once they have something in them.
    const section = (heading: string, lines: string[]) => {
      const kept = lines.filter(Boolean);
      return kept.length ? `${heading}\n${kept.join("\n")}\n\n` : "";
    };

    return (
      "I would like Expeditions With Jo to manage my property in Jamaica. Here are the details.\n\n" +
      section("OWNER", [
        line("Name", f.name),
        line("Email", f.email),
        line("Phone or WhatsApp", f.phone),
        line("Currently living in", f.livesIn),
      ]) +
      section("THE PROPERTY", [
        line("Parish", f.parish),
        line("Area or town", f.area),
        line("Property type", f.propertyType),
        line("Guests would have", f.placeType),
        line("Sleeps", f.guests),
        line("Bedrooms", f.bedrooms),
        line("Beds", f.beds),
        line("Bathrooms", f.bathrooms),
        list("Amenities", f.amenities),
        list("Essentials in place", f.essentials),
      ]) +
      section("CONDITION AND STATUS", [
        line("Condition", f.condition),
        line("Already on Airbnb", f.alreadyListed),
        line("Existing listing", f.listingUrl),
        line("Photographs", f.photos),
        line("Cleaning at the moment", f.cleaning),
      ]) +
      section("PLANS", [
        line("Could start", f.availableFrom),
        line("Own use", f.ownUse),
        line("What I want out of it", f.goal),
      ]) +
      section("ANYTHING ELSE", [f.notes.trim()])
    ).trimEnd() + "\n";
  }, [f]);

  const subject = `Property management enquiry${f.parish ? ` - ${f.parish}` : ""}${f.name ? ` - ${f.name}` : ""}`;
  const mailto = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const longForEmail = mailto.length > 1900;

  async function copy() {
    try {
      await navigator.clipboard.writeText(`To: ${TO}\nSubject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8">
        <h2 className="text-xl font-bold text-navy">Your email is ready</h2>
        <p className="mt-2 text-slate-600">
          Nothing has been sent and nothing has been saved. The button below opens this in your own email app so you
          can read it, change anything, and send it yourself.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={mailto} className={btnPrimary}>
            Open this in my email
          </a>
          <button type="button" onClick={copy} className={btnGhost}>
            {copied ? "Copied" : "Copy it instead"}
          </button>
          <button type="button" onClick={() => setDone(false)} className={btnGhost}>
            Go back and change something
          </button>
        </div>

        {longForEmail ? (
          <p className="mt-4 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            This one is long, and some email apps cut long messages short. If what opens looks incomplete, use
            <strong> Copy it instead</strong> and paste it into a new email to {TO}.
          </p>
        ) : null}

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-900">What it says</p>
          <pre className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            {body}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8"
    >
      <Fieldset legend="You" note="So we know who we are talking to and where you are.">
        <Row>
          <Field label="Name">
            <input required value={f.name} onChange={set("name")} autoComplete="name" className={`mt-1.5 ${field}`} placeholder="Your name" />
          </Field>
          <Field label="Email">
            <input required type="email" value={f.email} onChange={set("email")} autoComplete="email" className={`mt-1.5 ${field}`} placeholder="you@email.com" />
          </Field>
        </Row>
        <Row>
          <Field label="Phone or WhatsApp">
            <input type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" className={`mt-1.5 ${field}`} placeholder="With country code" />
          </Field>
          <Field label="Where do you live?" hint="If you are overseas, say which city.">
            <input value={f.livesIn} onChange={set("livesIn")} className={`mt-1.5 ${field}`} placeholder="Toronto, London, Kingston..." />
          </Field>
        </Row>
      </Fieldset>

      <Fieldset legend="Where it is">
        <Row>
          <Field label="Parish">
            <select required value={f.parish} onChange={set("parish")} className={`mt-1.5 ${field}`}>
              <option value="">Choose a parish</option>
              {PARISHES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Area or town" hint="No street address needed yet.">
            <input value={f.area} onChange={set("area")} className={`mt-1.5 ${field}`} placeholder="Ocho Rios, Negril, Portmore..." />
          </Field>
        </Row>
      </Fieldset>

      <Fieldset legend="The property" note="The same things Airbnb asks when a listing is set up.">
        <Row>
          <Field label="What kind of property is it?">
            <select required value={f.propertyType} onChange={set("propertyType")} className={`mt-1.5 ${field}`}>
              <option value="">Choose one</option>
              {PROPERTY_TYPES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="What would guests have?">
            <select required value={f.placeType} onChange={set("placeType")} className={`mt-1.5 ${field}`}>
              <option value="">Choose one</option>
              {PLACE_TYPES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
        </Row>
        <div className="grid gap-4 sm:grid-cols-4">
          <Field label="Sleeps">
            <input type="number" min="1" value={f.guests} onChange={set("guests")} className={`mt-1.5 ${field}`} placeholder="4" />
          </Field>
          <Field label="Bedrooms">
            <input type="number" min="0" value={f.bedrooms} onChange={set("bedrooms")} className={`mt-1.5 ${field}`} placeholder="2" />
          </Field>
          <Field label="Beds">
            <input type="number" min="0" value={f.beds} onChange={set("beds")} className={`mt-1.5 ${field}`} placeholder="3" />
          </Field>
          <Field label="Bathrooms">
            <input type="number" min="0" step="0.5" value={f.bathrooms} onChange={set("bathrooms")} className={`mt-1.5 ${field}`} placeholder="1.5" />
          </Field>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">What does it have?</p>
          <div className="mt-3">
            <CheckGroup options={AMENITIES} selected={f.amenities} onToggle={toggle("amenities")} />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">The ones that matter here</p>
          <p className="mt-1 text-xs text-slate-500">
            Airbnb does not ask about these. In Jamaica they decide whether a property can take guests at all.
          </p>
          <div className="mt-3">
            <CheckGroup options={ESSENTIALS} selected={f.essentials} onToggle={toggle("essentials")} />
          </div>
        </div>
      </Fieldset>

      <Fieldset legend="Where it stands now">
        <Row>
          <Field label="Is it already on Airbnb?">
            <select value={f.alreadyListed} onChange={set("alreadyListed")} className={`mt-1.5 ${field}`}>
              <option value="">Choose one</option>
              <option>No, never listed</option>
              <option>Yes, listed and taking bookings</option>
              <option>Yes, but the listing is paused</option>
              <option>Listed somewhere other than Airbnb</option>
            </select>
          </Field>
          <Field label="Link to the listing" hint="If there is one.">
            <input value={f.listingUrl} onChange={set("listingUrl")} className={`mt-1.5 ${field}`} placeholder="https://" />
          </Field>
        </Row>
        <Row>
          <Field label="What condition is it in?">
            <select value={f.condition} onChange={set("condition")} className={`mt-1.5 ${field}`}>
              <option value="">Choose one</option>
              <option>Ready for guests today</option>
              <option>Nearly ready, needs furnishing or small repairs</option>
              <option>Needs real work first</option>
              <option>Not sure, I have not seen it recently</option>
            </select>
          </Field>
          <Field label="Do you have photographs?">
            <select value={f.photos} onChange={set("photos")} className={`mt-1.5 ${field}`}>
              <option value="">Choose one</option>
              <option>Yes, good ones</option>
              <option>Only phone snaps</option>
              <option>None</option>
            </select>
          </Field>
        </Row>
        <Field label="Who cleans it at the moment?">
          <input value={f.cleaning} onChange={set("cleaning")} className={`mt-1.5 ${field}`} placeholder="Nobody, a helper, a company, family..." />
        </Field>
      </Fieldset>

      <Fieldset legend="What you want">
        <Row>
          <Field label="When could it start taking guests?">
            <input value={f.availableFrom} onChange={set("availableFrom")} className={`mt-1.5 ${field}`} placeholder="Right away, next month, after repairs..." />
          </Field>
          <Field label="Will you use it yourself?">
            <select value={f.ownUse} onChange={set("ownUse")} className={`mt-1.5 ${field}`}>
              <option value="">Choose one</option>
              <option>No, it is free all year</option>
              <option>A few weeks a year</option>
              <option>Christmas and summer</option>
              <option>Not sure yet</option>
            </select>
          </Field>
        </Row>
        <Field label="What are you hoping for?" hint="Cover the bills, earn properly, or just stop it sitting empty. Be honest, it changes what we would advise.">
          <input value={f.goal} onChange={set("goal")} className={`mt-1.5 ${field}`} placeholder="In your own words" />
        </Field>
        <Field label="Anything else we should know?">
          <textarea rows={4} value={f.notes} onChange={set("notes")} className={`mt-1.5 ${field}`} placeholder="Access, neighbours, a tenant already there, a title question, anything at all" />
        </Field>
      </Fieldset>

      <button type="submit" className={`${btnPrimary} mt-8 w-full sm:w-auto`}>
        Build my email
      </button>
      <p className="mt-3 text-xs text-slate-500">
        Nothing is sent or saved from this page. The next step hands you the email to send yourself.
      </p>
    </form>
  );
}
