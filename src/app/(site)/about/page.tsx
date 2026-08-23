import type { Metadata } from "next";
import { getAbout } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import ContentSections from "@/components/ContentSections";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Expeditions With Jo helps CARICOM citizens move within CARICOM to work, under the Treaty of Chaguaramas: CSME Skills Certificates, banking, business setup and settling-in support, with travel arranged when you need it.",
  keywords: [
    "CARICOM relocation specialist",
    "CSME Skills Certificate help",
    "Treaty of Chaguaramas",
    "move within CARICOM for work",
    "Joanson Baptiste James",
    "Expeditions With Jo",
  ],
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <>
      <PageHeader icon={<Icon name="users" className="h-7 w-7 text-brand" />} title="About Us" intro={about.intro} crumb="About Us" />
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
