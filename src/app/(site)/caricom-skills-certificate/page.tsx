import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList } from "@/components/ui";
import { CaribbeanGlobe } from "@/components/icons";
import CsmePicker from "@/components/CsmePicker";
import CtaButtons from "@/components/CtaButtons";
import WeHandleIt from "@/components/WeHandleIt";
import {
  CSME_CATEGORIES,
  CSME_DOCUMENTS,
  CSME_STEPS,
  CSME_FAQS,
  CSME_COUNTRIES,
  CSME_LAST_UPDATED,
  CSME_OFFICIAL_SOURCES,
} from "@/lib/csmeData";

export const metadata: Metadata = {
  title: "CARICOM Skills Certificate (CSME): How to Work in Another Caribbean Country",
  description:
    "We can help you prepare a CARICOM Skills Certificate (CSME) application to work in another Caribbean country without a work permit. The eligible categories, the documents, the fees, the steps, and the exact office to apply to in every CARICOM country, from Trinidad and Jamaica to Grenada, Guyana, Barbados and more.",
  keywords: [
    "CARICOM skills certificate",
    "CARICOM skill certificate",
    "CSME skills certificate",
    "CARICOM certificate",
    "jobs in the Caribbean",
    "work in the Caribbean",
    "how to work in another Caribbean country",
    "live and work in the Caribbean",
    "work in CARICOM without a work permit",
    "Caribbean work permit",
    "how to apply for a CARICOM skills certificate",
    "CARICOM skills certificate Trinidad",
    "CARICOM skills certificate Jamaica",
    "CARICOM skills certificate Grenada",
    "CARICOM free movement of skills",
    "certificate of recognition of CARICOM skills qualification",
  ],
  alternates: { canonical: "/caricom-skills-certificate" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CSME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// What we do, set against what only the government office can do. Keeping these
// side by side is the clearest way to avoid implying we influence the decision.
const WE_HELP = [
  "Working out which of the approved categories fits your qualification",
  "Explaining what your country's office asks for, and in what order",
  "Checking your document set against the published requirements before you go",
  "Flagging the timing traps, such as a Police Certificate of Character expiring mid-application",
  "Arranging flights, accommodation and transfers if you have to travel to apply or to start work",
  "Helping with the bank account and settling-in steps once a certificate is issued",
];

const THEY_DECIDE = [
  "Whether you are eligible and fall within an approved category",
  "Whether your qualification is recognised and successfully verified",
  "Whether a certificate is issued, refused, or returned for more information",
  "How long processing takes, and the fee charged",
  "Whether immigration in the receiving country admits you and grants an indefinite stay",
  "Any change to the requirements, forms or fees, which can happen without notice",
];

export default function CsmePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<CaribbeanGlobe className="h-9 w-9 text-brand" />}
        title="CARICOM Skills Certificate (CSME): How to Apply"
        crumb="Guides"
        intro="We can help you prepare an application for the CARICOM Skills Certificate, also called the CSME Skills Certificate: the steps and the exact office to apply to in each CARICOM country. Pick your country below."
      />

      {/* WHAT IT IS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-slate-600">
            Last updated:{" "}
            <time dateTime={CSME_LAST_UPDATED.iso} className="font-semibold text-slate-900">
              {CSME_LAST_UPDATED.display}
            </time>
          </p>

          <p className="mt-5 text-lg text-slate-600">
            The CARICOM Skills Certificate (officially the Certificate of Recognition of CARICOM Skills Qualification)
            lets an eligible skilled CARICOM national live and work in another participating CARICOM country without a
            work permit. You get an initial entry stamp, can start work, then apply for an indefinite stay once the local
            authority verifies your certificate.
          </p>

          <div className="mt-6 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            <strong className="font-semibold">Approval is not guaranteed.</strong> The Skills Certificate is issued, or
            refused, by the designated government office in the country you apply to. Expeditions With Jo is not a
            government body and has no influence over that decision. What we do is help you understand the process and
            submit a complete, well-prepared application. Anyone promising you a certificate is not being straight with
            you.
          </div>

          <div className="mt-4 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            <strong className="font-semibold">Requirements change.</strong> Fees, forms, document lists and processing
            times are set by each country and can be revised at any time, sometimes without an announcement. Treat
            everything on this page as a starting point and confirm the current position with the official office for
            your country before you act on it.
          </div>

          <div className="mt-4 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            On 1 October 2025, Barbados, Belize, Dominica and St. Vincent and the Grenadines began <strong>full free
            movement</strong>. Their nationals can live and work among those four countries without a Skills Certificate.
            For everyone else, and for moving to other CARICOM countries, the certificate is still required.
          </div>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">Who can apply</h2>
          <p className="mt-2 text-slate-600">
            The certificate is open to CARICOM nationals in one of the 12 approved categories of skilled workers. We can
            help you work out whether you fit one of them:
          </p>
          <CheckList items={CSME_CATEGORIES} className="mt-4" />
        </div>
      </Section>

      {/* COUNTRY PICKER */}
      <Section alt>
        <SectionHead
          eyebrow="Apply in your country"
          title="Where to apply, country by country"
          intro="Pick the country where you live (or where you want to work). You can apply in your home country or the host country."
        />
        <div className="mx-auto max-w-3xl">
          <CsmePicker countries={CSME_COUNTRIES} />
          <WeHandleIt what="your Skills Certificate application" className="mt-8" />
        </div>
      </Section>

      {/* STEPS */}
      <Section>
        <SectionHead eyebrow="The process" title="How it works, step by step" />
        <div className="mx-auto grid max-w-3xl gap-5">
          {CSME_STEPS.map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.text}</p>
                {s.tips?.length ? (
                  <ul className="mt-2 space-y-1.5">
                    {s.tips.map((t, j) => (
                      <li key={j} className="flex gap-2 text-sm text-slate-600">
                        <span aria-hidden="true" className="mt-0.5 shrink-0 text-brand">
                          •
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* DOCUMENTS */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Documents you usually need</h2>
          <p className="mt-2 text-slate-600">
            Requirements vary by country and category, but most offices ask for:
          </p>
          <CheckList items={CSME_DOCUMENTS} className="mt-4" />
          <div className="mt-6 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            This is general guidance and the rules change. Always confirm the current requirements with the official
            office for your country, linked on your country&rsquo;s page.
          </div>
        </div>
      </Section>

      {/* WHAT WE DO vs WHAT THEY DECIDE */}
      <Section>
        <SectionHead
          eyebrow="Being clear about roles"
          title="What we help with, and what the government office decides"
          intro="These two lists do not overlap, and it is worth knowing which is which before you start."
        />
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <h3 className="text-lg font-semibold text-slate-900">What Expeditions With Jo does</h3>
            <CheckList items={WE_HELP} className="mt-4 text-sm" />
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/50 p-7">
            <h3 className="text-lg font-semibold text-slate-900">What the government office decides</h3>
            <ul className="mt-4 grid gap-2.5">
              {THEY_DECIDE.map((item, i) => (
                <li key={i} className="relative pl-6 text-sm text-slate-700">
                  <span aria-hidden="true" className="absolute left-0 top-0 text-accent">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* AFTER THE APPLICATION */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What happens after you apply</h2>
          <p className="mt-3 text-slate-600">
            Your qualification is sent for verification, which is the part that takes the time. Processing runs from
            about 7 working days in Barbados to 6 or 8 weeks in Trinidad and Tobago and Belize, and several countries
            convene a committee that meets on its own schedule. Applications generally cannot be expedited.
          </p>
          <p className="mt-3 text-slate-600">
            If it is approved, you collect a Certificate of Recognition of CARICOM Skills Qualification. It does not
            expire. If something is missing or a qualification cannot be verified, the office will normally come back to
            you rather than refuse outright, so keep your contact details current and follow up if you hear nothing.
          </p>
          <p className="mt-3 text-slate-600">
            Presenting the certificate to immigration in the receiving country typically gets you an initial six-month
            entry stamp. You can begin work, and an indefinite stay follows once that country&rsquo;s competent authority
            verifies the certificate. Your spouse and dependants generally gain the same rights, though the receiving
            country still makes that call.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">Where travel and accommodation fit in</h3>
          <p className="mt-2 text-slate-600">
            Several countries require you to appear in person to submit, and to collect the certificate in person
            afterwards. That can mean two trips before you have even started work, plus the move itself once you do. We
            arrange the flights, somewhere to stay and the airport transfers around those dates, and help with the bank
            account once you land, so the travel side is not another thing to solve alone.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            <Link href="/getting-started" className="font-semibold text-brand hover:underline">
              See the whole Go Work pathway →
            </Link>
          </p>
        </div>
      </Section>

      {/* OFFICIAL SOURCES */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Official sources</h2>
          <p className="mt-2 text-slate-600">
            Check these directly rather than relying on any third party, including us. Each country page also links to
            its own government office and application form where one is published.
          </p>
          <ul className="mt-5 grid gap-3">
            {CSME_OFFICIAL_SOURCES.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span className="font-semibold text-slate-900">{s.label} ↗</span>
                  <span className="mt-0.5 block text-sm text-slate-600">{s.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto grid max-w-3xl gap-5">
          {CSME_FAQS.map((f, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Not sure whether you are ready to apply?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Tell us your category, your qualification and the country you are applying in, and we will go through what
            you have against what that office asks for. If you need to travel for the application or to start work, we
            can arrange the flights, the stay and the transfers in one go.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButtons message="Hi Jo, I'd like a Skills Certificate readiness assessment. My category and destination country are:" />
          </div>
        </div>
      </Section>
    </>
  );
}
