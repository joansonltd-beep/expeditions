import type { Metadata } from "next";
import { getPolicies } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import ContentSections from "@/components/ContentSections";

export const metadata: Metadata = { title: "Policies" };

export default async function PoliciesPage() {
  const policies = await getPolicies();
  return (
    <>
      <PageHeader icon="📋" title="Policies" intro={policies.intro} crumb="Policies" />
      <Section>
        <div className="mx-auto max-w-3xl">
          <ContentSections sections={policies.sections} />
        </div>
      </Section>
    </>
  );
}
