import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, getPackages, getAddOns } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";
import { Section, SectionHead } from "@/components/ui";
import FinancePricing from "@/components/FinancePricing";

export const metadata: Metadata = {
  title: "Banking & Business Registration",
  description:
    "Help with loans, credit card applications and business registration in Trinidad and Tobago and Grenada. Loan and credit card applications are processed through First Citizens Bank; business setup packages from US$110.",
};

export default async function FinancePage() {
  const [service, packages, addOns] = await Promise.all([getService("finance"), getPackages(), getAddOns()]);
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
          intro="Select your country to see pricing in your local currency. Each package is 50% upfront, with the balance on completion."
        />
        <FinancePricing packages={packages} addOns={addOns} />
      </Section>
    </ServicePage>
  );
}
