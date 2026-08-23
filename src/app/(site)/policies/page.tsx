import type { Metadata } from "next";
import { getPolicies } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import ContentSections from "@/components/ContentSections";

export const metadata: Metadata = {
  title: "Policies",
  description: "Booking, payment, cancellation and privacy policies for Expeditions With Jo.",
  alternates: { canonical: "/policies" },
};

export default async function PoliciesPage() {
  const policies = await getPolicies();
  return (
    <>
      <PageHeader
        icon={<Icon name="check" className="h-7 w-7 text-brand" />}
        title="Policies"
        intro={policies.intro}
        crumb="Policies"
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <ContentSections sections={policies.sections} />
        </div>
      </Section>
    </>
  );
}
