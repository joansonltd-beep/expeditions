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
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 ${
                p.featured ? "border-brand shadow-xl" : "border-slate-200"
              }`}
            >
              {p.featured ? (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <div className="mt-1 text-3xl font-extrabold text-slate-900">{p.price}</div>
              <p className="mt-1 text-sm text-slate-500">{p.terms}</p>
              <CheckList items={p.features} className="my-6 text-sm" />
              <div className="mt-auto">
                <CtaButtons message={`Hi Jo, I'm interested in the ${p.name} business package.`} showContact={false} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </ServicePage>
  );
}
