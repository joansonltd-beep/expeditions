import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Free CARICOM Tools: Currency Converter and Translator",
  description:
    "Free tools for anyone visiting, working or studying in CARICOM: a currency converter for all twelve member states, plus USD, CAD and GBP, and a translator covering the region's official languages.",
  keywords: ["CARICOM currency converter", "Caribbean translator", "CARICOM tools"],
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    href: "/tools/currency-converter",
    icon: "calculator" as const,
    title: "Currency converter",
    text: "Convert between the twelve CARICOM currencies, plus USD, CAD and GBP, using live mid-market rates.",
  },
  {
    href: "/tools/translator",
    icon: "globe" as const,
    title: "Translator",
    text: "Speak or type in one of the region's official languages and get it back in another: English, French, Dutch, Spanish, Hindi, Mandarin or Portuguese.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="sparkles" className="h-7 w-7 text-brand" />}
        title="Free tools for your move"
        crumb="Tools"
        intro="Two small, free tools that come up constantly when planning a move within CARICOM."
      />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-7 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={t.icon} className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-navy">{t.title}</h2>
              <p className="mt-2 flex-1 text-navy/70">{t.text}</p>
              <span className="mt-5 text-sm font-semibold text-brand group-hover:underline">Open →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
