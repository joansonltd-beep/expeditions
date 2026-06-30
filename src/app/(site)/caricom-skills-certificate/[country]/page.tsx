import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader, SectionHead, CheckList } from "@/components/ui";
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
        icon="🌎"
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
          {c.officialUrl ? (
            <a
              href={c.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Official {c.name} site →
            </a>
          ) : (
            <p className="mt-4 text-sm text-slate-400">
              Search your government website for &ldquo;{c.authority}&rdquo; to confirm the current requirements.
            </p>
          )}
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
          <h2 className="text-2xl font-bold text-slate-900">The steps</h2>
          <div className="mt-5 grid gap-5">
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

          <h2 className="mt-12 text-2xl font-bold text-slate-900">Documents you usually need</h2>
          <CheckList items={CSME_DOCUMENTS} className="mt-4" />
          <div className="mt-6 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            This is general guidance and the rules change. Always confirm the current requirements with {c.authority}.
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
