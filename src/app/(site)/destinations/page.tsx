import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

export const metadata: Metadata = {
  title: "Caribbean Country Fact Sheets",
  description:
    "What to expect in each CARICOM country: cost of living, places to see, things to do, where to eat, and national symbols. Added one country at a time.",
  keywords: [
    "Caribbean country fact sheets",
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
        title="Caribbean Country Fact Sheets"
        crumb="Destinations"
        intro="What to expect on the ground in each CARICOM country: cost of living, places to see, things to do, where to eat, and national symbols. We're adding countries one at a time, in alphabetical order."
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
              <span className="mt-3 inline-block text-sm font-semibold text-brand">View fact sheet →</span>
            </Link>
          ))}
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center text-sm text-slate-500">
            More CARICOM countries are being added, alphabetically.
          </div>
        </div>
      </Section>
    </>
  );
}
