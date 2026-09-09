import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import Translator from "@/components/Translator";

export const metadata: Metadata = {
  title: "CARICOM Translator",
  description:
    "Speak or type in one Caribbean language and get it back in another. Covers the official languages, the creoles people actually speak, and the indigenous and heritage languages of the region.",
  keywords: ["Caribbean translator", "Jamaican Patwa translator", "Trini Creole translator", "Sranan Tongo translator"],
  alternates: { canonical: "/tools/translator" },
};

export default function TranslatorPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="globe" className="h-7 w-7 text-brand" />}
        title="CARICOM translator"
        crumb="Translator"
        intro="Speak or type in one Caribbean language, get it back in another. Covers the official languages, the creoles people actually speak, and the indigenous and heritage languages of the region."
        footnote="Please do not send passport numbers, bank details or other sensitive information through this tool."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <Translator />
        </div>
      </Section>
    </>
  );
}
