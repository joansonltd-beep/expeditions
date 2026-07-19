import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader, SectionHead, CheckList } from "@/components/ui";
import { CaribbeanGlobe } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import { CSME_CATEGORIES, CSME_DOCUMENTS, CSME_STEPS, CSME_FAQS, CSME_COUNTRIES } from "@/lib/csmeData";

export function generateStaticParams() {
  return CSME_COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const c = CSME_COUNTRIES.find((x) => x.slug === country);
  if (!c) return { title: "CARICOM Skills Certificate" };
  return {
    title: `CARICOM Skills Certificate in ${c.name} (CSME)`,
    description: `How to apply for a CARICOM Skills Certificate (CSME) in ${c.name}: where to apply (${c.authority}), who qualifies, the documents, and the steps.`,
    keywords: [
      `CARICOM skills certificate ${c.name}`,
      `CARICOM skill certificate ${c.name}`,
      `CSME skills certificate ${c.name}`,
      `how to apply CARICOM skills certificate ${c.name}`,
    ],
    alternates: { canonical: `/caricom-skills-certificate/${c.slug}` },
  };
}

export default async function CountryCsmePage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const c = CSME_COUNTRIES.find((x) => x.slug === country);
  if (!c) notFound();

  const d = c.detail;
  const steps = d?.steps ?? CSME_STEPS;
  const documents = d?.documents ?? CSME_DOCUMENTS;
  const hasCountryDocs = Boolean(d?.documents);
  const others = CSME_COUNTRIES.filter((x) => x.slug !== c.slug);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CSME_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<CaribbeanGlobe className="h-12 w-12 text-brand" />}
        title={`CARICOM Skills Certificate in ${c.name}`}
        crumb={c.name}
        intro={`How to apply for a CARICOM Skills Certificate (also called the CSME Skills Certificate) in ${c.name}, with the office to apply to, who qualifies, and what you need.`}
      />

      {/* WHERE TO APPLY */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm">
            <Link href="/caricom-skills-certificate" className="font-semibold text-brand hover:underline">
              ← All countries
            </Link>
          </p>
          {c.fullFreeMovement ? (
            <div className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
              {c.name} began <strong>full free movement</strong> on 1 October 2025. Its nationals can live and work in
              Barbados, Belize, Dominica and St. Vincent and the Grenadines without a Skills Certificate. You still need
              the certificate to live and work in other CARICOM countries.
            </div>
          ) : null}

          <h2 className="mt-6 text-2xl font-bold text-slate-900">Where to apply in {c.name}</h2>
          <p className="mt-3 text-slate-600">
            <span className="font-semibold text-slate-900">Office:</span> {c.authority}
          </p>
          <p className="mt-3 text-slate-600">{c.howTo}</p>

          {d?.submit || d?.address || d?.phone || d?.email || d?.processingTime ? (
            <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm">
              {d?.submit ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <span className="shrink-0 font-semibold text-slate-900 sm:w-36">How to submit</span>
                  <span className="text-slate-600">{d.submit}</span>
                </div>
              ) : null}
              {d?.address ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <span className="shrink-0 font-semibold text-slate-900 sm:w-36">Address</span>
                  <span className="text-slate-600">{d.address}</span>
                </div>
              ) : null}
              {d?.phone ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <span className="shrink-0 font-semibold text-slate-900 sm:w-36">Phone</span>
                  <span className="text-slate-600">{d.phone}</span>
                </div>
              ) : null}
              {d?.email ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <span className="shrink-0 font-semibold text-slate-900 sm:w-36">Email</span>
                  <a href={`mailto:${d.email}`} className="text-brand hover:underline">
                    {d.email}
                  </a>
                </div>
              ) : null}
              {d?.processingTime ? (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <span className="shrink-0 font-semibold text-slate-900 sm:w-36">Processing time</span>
                  <span className="text-slate-600">{d.processingTime}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Fee:</span>{" "}
            {c.fee ?? `Not published by ${c.authority}. Confirm the current cost when you apply.`}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {c.officialUrl ? (
              <a
                href={c.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Official {c.name} site →
              </a>
            ) : null}
            {c.formUrl ? (
              <a
                href={c.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft"
              >
                Application form →
              </a>
            ) : null}
          </div>
          {!c.officialUrl && !c.formUrl ? (
            <p className="mt-4 text-sm text-slate-400">
              Search your government website for &ldquo;{c.authority}&rdquo; to confirm the current requirements.
            </p>
          ) : null}
        </div>
      </Section>

      {/* WHO CAN APPLY */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Who can apply</h2>
          <p className="mt-2 text-slate-600">
            You can apply if you are a CARICOM national in one of the 12 approved categories of skilled workers:
          </p>
          <CheckList items={CSME_CATEGORIES} className="mt-4" />
        </div>
      </Section>

      {/* STEPS + DOCUMENTS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">How to apply in {c.name}</h2>
          <div className="mt-5 grid gap-5">
            {steps.map((s, i) => (
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
                        <li key={j} className="flex gap-2 text-sm text-slate-500">
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

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {hasCountryDocs ? `Documents required in ${c.name}` : "Documents you usually need"}
          </h2>
          <CheckList items={documents} className="mt-4" />

          {d?.notes?.length ? (
            <>
              <h2 className="mt-12 text-2xl font-bold text-slate-900">Good to know</h2>
              <ul className="mt-4 space-y-2">
                {d.notes.map((n, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span aria-hidden="true" className="mt-0.5 text-brand">•</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-8 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            This is guidance and the rules and fees change. Always confirm the current requirements with {c.authority}.
          </div>
        </div>
      </Section>

      {/* OTHER COUNTRIES */}
      <Section alt>
        <SectionHead eyebrow="Other countries" title="CARICOM Skills Certificate in other countries" />
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/caricom-skills-certificate/${o.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand"
            >
              {o.name}
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Travelling for your application?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            If you need to travel to another CARICOM country for your application or to start work, we can sort your
            flights, a place to stay and your transfers in one booking.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButtons message={`Hi Jo, I have a question about the CARICOM Skills Certificate in ${c.name}.`} />
          </div>
        </div>
      </Section>
    </>
  );
}
