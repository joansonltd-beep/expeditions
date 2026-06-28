import type { Metadata } from "next";
import { getAbout } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import ContentSections from "@/components/ContentSections";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Expeditions With Jo, founded by Joanson Baptiste James, makes travel, Canadian visa appointments and financial matters simpler for people in Trinidad, Tobago and the wider Caribbean.",
};

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <>
      <PageHeader icon="😄" title="About Us" intro={about.intro} crumb="About Us" />
      <Section>
        <div className="mx-auto max-w-3xl">
          <ContentSections sections={about.sections} />
          <div className="mt-8">
            <CtaButtons message="Hi Jo, I'd like some help." />
          </div>
        </div>
      </Section>
    </>
  );
}
