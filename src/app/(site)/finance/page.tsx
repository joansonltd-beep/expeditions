import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, getPackages } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";
import { Section, SectionHead, CheckList } from "@/components/ui";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "Finance & Business Registration",
  description:
    "Help with loans, credit card applications and business registration in Trinidad and Tobago. Loan and credit card applications are processed through First Citizens Bank; business setup packages from TT$700.",
};

export default async function FinancePage() {
  const [service, packages] = await Promise.all([getService("finance"), getPackages()]);
  if (!service) notFound();

  return (
    <ServicePage
      service={service}
      ctaTitle="Ready to get your finances in order?"
      ctaText="Reach out and we will tell you exactly what you need and what comes next."
    >
      <Section alt>
        <SectionHead
          eyebrow="Packages"
          title="Business setup packages"
          intro="Each package is 50% upfront, with the balance on completion."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-xl ${
                p.featured ? "border-brand shadow-md" : "border-slate-200"
              }`}
            >
              {/* Price header (green; solid for the featured tier) */}
              <div className={`relative p-7 ${p.featured ? "bg-brand text-white" : "bg-brand-soft"}`}>
                {p.featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ring-white/30">
                    Most popular
                  </span>
                ) : null}
                <h3 className={`text-lg font-semibold ${p.featured ? "text-white" : "text-slate-900"}`}>{p.name}</h3>
                <div className={`mt-1 text-3xl font-extrabold ${p.featured ? "text-white" : "text-slate-900"}`}>{p.price}</div>
                <p className={`mt-1 text-sm ${p.featured ? "text-white/80" : "text-slate-500"}`}>{p.terms}</p>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <CheckList items={p.features} className="text-sm" />
                <div className="mt-auto pt-6">
                  <CtaButtons message={`Hi Jo, I'm interested in the ${p.name} business package.`} showContact={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </ServicePage>
  );
}
