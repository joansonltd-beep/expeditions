import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

export const metadata: Metadata = {
  title: "CARICOM Countries at a Glance",
  description:
    "What to expect in each CARICOM country: cost of living, places to see, things to do, where to eat, and national symbols.",
  keywords: [
    "CARICOM countries at a glance",
    "cost of living in the Caribbean",
    "things to do in the Caribbean",
    "moving to the Caribbean",
    "CARICOM country profiles",
  ],
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  const countries = [...COUNTRY_GUIDES].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <PageHeader
        icon={<Icon name="compass" className="h-12 w-12 text-brand" />}
        title="CARICOM Countries at a Glance"
        crumb="Destinations"
        intro="What to expect on the ground in each CARICOM country: cost of living, places to see, things to do, where to eat, and national symbols."
      />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-5">
          {countries.map((g) => (
            <Link
              key={g.slug}
              href={`/destinations/${g.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-slate-900">{g.name}</h2>
              <p className="mt-2 text-slate-600">{g.tagline}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">View at a glance →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
