import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon, pillarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Come Live: Relocating Within CARICOM",
  description:
    "Everything you need to set up your move within CARICOM: the CSME Skills Certificate, registering a business, opening a bank account, insurance, and step-by-step guides.",
  keywords: [
    "how to move to CARICOM",
    "CSME Skills Certificate",
    "CARICOM business setup",
    "CARICOM banking",
    "moving to another CARICOM country checklist",
  ],
  alternates: { canonical: "/getting-started" },
};

const ITEMS = [
  {
    href: "/caricom-skills-certificate",
    title: "CSME Skills Certificate",
    text: "Country-by-country guidance to the certificate that lets CARICOM nationals live and work on another member state.",
  },
  {
    href: "/business-setup",
    title: "Business Setup",
    text: "Register your business on your new island, from name search to a ready-to-use business bank account.",
  },
  {
    href: "/finance",
    title: "Banking",
    text: "Open accounts and prepare loan and credit card applications for your new home.",
  },
  {
    href: "/guides",
    title: "General Guides",
    text: "Plain-language guides to certificates, documents, and getting settled.",
  },
  {
    href: "/insurance",
    title: "Insurance",
    text: "Life, health and retirement planning, now handled through our partner site, joansonbjames.com.",
  },
];

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="compass" className="h-12 w-12 text-brand" />}
        title="Come Live"
        crumb="Come Live"
        intro="Ready to relocate? Everything you need to set up your move within CARICOM, in one place."
      />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={pillarIcon(item.href)} className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
