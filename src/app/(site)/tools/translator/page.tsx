import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import Translator from "@/components/Translator";
import PageIssueNote from "@/components/PageIssueNote";

export const metadata: Metadata = {
  title: "CARICOM Translator",
  description:
    "Speak or type in one of the region’s official languages and get it back in another: English, French, Dutch, Spanish, Hindi, Mandarin or Portuguese.",
  keywords: ["Caribbean translator", "CARICOM languages", "English French Dutch Spanish translator"],
  alternates: { canonical: "/tools/translator" },
};

export default function TranslatorPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="globe" className="h-7 w-7 text-brand" />}
        title="CARICOM translator"
        crumb="Translator"
        intro="Speak or type in one of the official languages spoken across CARICOM, get it back in another: English, French, Dutch, Spanish, Hindi, Mandarin or Portuguese."
        footnote="Translations pass through a third-party service. Please do not send passport numbers, bank details or other sensitive information through this tool."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <Translator />
        </div>
      </Section>
      <PageIssueNote section="tools" />
    </>
  );
}
