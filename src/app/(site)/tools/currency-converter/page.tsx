import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import CurrencyConverter from "@/components/CurrencyConverter";

export const metadata: Metadata = {
  title: "CARICOM Currency Converter",
  description:
    "Convert between the twelve CARICOM currencies, plus the US dollar, Canadian dollar and pound sterling, using live mid-market exchange rates.",
  keywords: ["CARICOM currency converter", "Caribbean exchange rate", "TTD to JMD", "XCD converter"],
  alternates: { canonical: "/tools/currency-converter" },
};

export default function CurrencyConverterPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="calculator" className="h-7 w-7 text-brand" />}
        title="Currency converter"
        crumb="Currency Converter"
        intro="The twelve CARICOM free movement destinations, plus the US dollar, Canadian dollar and pound sterling."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <CurrencyConverter />
        </div>
      </Section>
    </>
  );
}
