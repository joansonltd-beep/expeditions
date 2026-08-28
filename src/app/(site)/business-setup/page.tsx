import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, SectionHead } from "@/components/ui";
import { getBusinessSetupPage } from "@/lib/siteData";
import { Icon, BUSINESS_SETUP_ICONS, CaribbeanGlobe } from "@/components/icons";
import BusinessSetupEnquiry from "@/components/BusinessSetupEnquiry";

export const metadata: Metadata = {
  title: "Business Setup",
  description:
    "Business registration, bank account, accounting, social media, website and payment processing setup for small businesses in Trinidad and Tobago, Jamaica and Grenada. Plus how CARICOM's Right of Establishment lets you set up a business on another island.",
  keywords: [
    "CARICOM right of establishment",
    "start a business in another CARICOM country",
    "register a business Trinidad and Tobago",
    "register a business Jamaica",
    "register a business Grenada",
    "CARICOM service provider registration",
    "self-employed CARICOM national",
  ],
  alternates: { canonical: "/business-setup" },
};

export default async function BusinessSetupPage() {
  const p = await getBusinessSetupPage();

  return (
    <>
      <PageHeader
        icon={<Icon name="building" className="h-7 w-7 text-brand" />}
        title={p.title}
        crumb="Business Setup"
        intro={p.intro}
      />

      <Section>
        <SectionHead
          eyebrow={p.eyebrow}
          title="What's included"
          intro="Every business is different, so work is scoped and quoted around what you actually need rather than a fixed package."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.services.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 grid h-13 w-13 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={BUSINESS_SETUP_ICONS[i % BUSINESS_SETUP_ICONS.length]} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* RIGHT OF ESTABLISHMENT */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 text-brand">
            <CaribbeanGlobe className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{p.establishmentTitle}</h2>
          <div className="mt-5 space-y-4">
            {p.establishmentParagraphs.map((para, i) => (
              <p key={i} className="leading-relaxed text-slate-600">
                {para}
              </p>
            ))}
          </div>
          {p.establishmentNote ? (
            <div className="mt-6 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
              {p.establishmentNote}
            </div>
          ) : null}
          <p className="mt-6 text-sm">
            <Link href="/caricom-skills-certificate" className="font-semibold text-brand hover:underline">
              Taking a job instead? See the CSME Skills Certificate →
            </Link>
          </p>
        </div>
      </Section>

      {/* COMING SOON */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-brand/40 bg-brand-soft p-7 sm:p-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Coming soon
          </span>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">{p.comingSoonTitle}</h2>
          <p className="mt-3 leading-relaxed text-slate-600">{p.comingSoonText}</p>
        </div>
      </Section>

      <Section alt>
        <div className="mx-auto max-w-xl">
          <SectionHead
            eyebrow="Eligibility"
            title="Start your enquiry"
            intro={p.eligibilityIntro}
          />
          <BusinessSetupEnquiry
            services={p.services.map((s) => s.title)}
            eligibilityTitle={p.eligibilityTitle}
            ineligibleMessage={p.ineligibleMessage}
          />
        </div>
      </Section>
    </>
  );
}
