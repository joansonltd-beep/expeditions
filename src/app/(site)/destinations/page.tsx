import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import RandomDestinationLink from "@/components/RandomDestinationLink";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

// The header used to rotate through Wikimedia airport photos. Those files are
// still under /public/photos/heroes/airports if they are ever wanted again;
// they were replaced by Jo's own footage of Dunn's River, which is his, needs
// no credit line, and moves.
const HEADER_VIDEO = {
  src: "/videos/destinations-bg.mp4",
  poster: "/videos/destinations-bg-poster.jpg",
};

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
        title="CARI-COME to one of these CARICOM Countries"
        crumb="Where are we Going?"
        intro="Twelve CARICOM countries with Free Movement*, twelve different answers. Pick one below for the cost of living, places to see, things to do, where to eat, and national symbols."
        video={HEADER_VIDEO}
      />
      <Section>
        <div className="mx-auto mb-6 max-w-3xl">
          <RandomDestinationLink slugs={countries.map((g) => g.slug)} />
        </div>
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
        <p className="mx-auto mt-6 max-w-3xl text-sm text-slate-600">
          * Free movement is the right CARICOM nationals have to live and work in another member state without a work
          permit, established under the CSME (CARICOM Single Market and Economy) by the Revised Treaty of
          Chaguaramas. These 12 states currently participate: Antigua and Barbuda, Barbados, Belize, Dominica,
          Grenada, Guyana, Jamaica, St. Kitts and Nevis, Saint Lucia, St. Vincent and the Grenadines, Suriname, and
          Trinidad and Tobago.
        </p>
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-semibold text-slate-900">Curious what people actually earn and pay?</p>
          <p className="mt-1 text-sm text-slate-600">
            Anonymous, crowdsourced reports on what people earn and what they pay to live, country by country.
          </p>
          <Link href="/survey" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
            See the Reports →
          </Link>
        </div>
      </Section>
    </>
  );
}
