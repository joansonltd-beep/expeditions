import type { Metadata } from "next";
import { PageHeader, Section, SectionHead } from "@/components/ui";
import { getBusinessSetupPage } from "@/lib/siteData";
import { Icon, BUSINESS_SETUP_ICONS } from "@/components/icons";
import BusinessSetupEnquiry from "@/components/BusinessSetupEnquiry";

export const metadata: Metadata = {
  title: "Business Setup",
  description:
    "Business registration, bank account, accounting, social media, website and payment processing setup for small businesses in Trinidad and Tobago and Grenada.",
};

export default async function BusinessSetupPage() {
  const p = await getBusinessSetupPage();

  return (
    <>
      <PageHeader icon="🏢" title={p.title} crumb="Business Setup" intro={p.intro} />

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
              <p className="mt-2 text-sm text-slate-500">{s.description}</p>
            </div>
          ))}
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
