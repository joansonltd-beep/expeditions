import type { Metadata } from "next";
import { Section, PageHeader, SectionHead, CheckList } from "@/components/ui";
import CsmePicker from "@/components/CsmePicker";
import CtaButtons from "@/components/CtaButtons";
import { CSME_CATEGORIES, CSME_DOCUMENTS, CSME_STEPS, CSME_FAQS, CSME_COUNTRIES } from "@/lib/csmeData";

export const metadata: Metadata = {
  title: "CARICOM Skills Certificate (CSME): How to Apply by Country",
  description:
    "How to get a CARICOM Skills Certificate (CSME). The eligible categories, the documents, the steps, and the exact office to apply to in every CARICOM country, from Trinidad and Jamaica to Grenada, Guyana, Barbados and more.",
  keywords: [
    "CARICOM skills certificate",
    "CARICOM skill certificate",
    "CSME skills certificate",
    "CARICOM certificate",
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

export default function CsmePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon="🌎"
        title="CARICOM Skills Certificate (CSME): How to Apply"
        crumb="Guides"
        intro="A clear guide to the CARICOM Skills Certificate, also called the CSME Skills Certificate, with the steps and the exact office to apply to in each CARICOM country. Pick your country below."
      />

      {/* WHAT IT IS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-slate-600">
            The CARICOM Skills Certificate (officially the Certificate of Recognition of CARICOM Skills Qualification)
            lets an eligible skilled CARICOM national live and work in another participating CARICOM country without a
            work permit. You get an initial entry stamp, can start work, then apply for an indefinite stay once the local
            authority verifies your certificate.
          </p>
          <div className="mt-4 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            On 1 October 2025, Barbados, Belize, Dominica and St. Vincent and the Grenadines began <strong>full free
            movement</strong>. Their nationals can live and work among those four countries without a Skills Certificate.
            For everyone else, and for moving to other CARICOM countries, the certificate is still required.
          </div>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">Who can apply</h2>
          <p className="mt-2 text-slate-600">
            You can apply if you are a CARICOM national in one of the 12 approved categories of skilled workers:
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
          <p className="mt-6 text-sm text-slate-400">
            The Bahamas is a CARICOM member but is not part of the CSME free movement regime, so the Skills Certificate
            does not apply there. Haiti&rsquo;s participation is limited.
          </p>
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
            office for your country, linked above.
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
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
      <Section alt>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Travelling to another island for this?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            If you need to travel to another CARICOM country for your application or to start work, we can sort your
            flights, a place to stay and your transfers in one booking.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButtons message="Hi Jo, I have a question about the CSME Skills Certificate." />
          </div>
        </div>
      </Section>
    </>
  );
}
