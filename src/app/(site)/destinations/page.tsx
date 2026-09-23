import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import RandomDestinationLink from "@/components/RandomDestinationLink";
import CountryFinder, { type FinderCountry } from "@/components/CountryFinder";
import PageIssueNote from "@/components/PageIssueNote";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";
import { CSME_COUNTRIES } from "@/lib/csmeData";

// The header used to rotate through Wikimedia airport photos. Those files are
// still under /public/photos/heroes/airports if they are ever wanted again;
// they were replaced by Jo’s own footage of Dunn’s River, which is his, needs
// no credit line, and moves.
const HEADER_VIDEO = {
  src: "/videos/destinations-bg.mp4",
  poster: "/videos/destinations-bg-poster.jpg",
};

export const metadata: Metadata = {
  title: "CARICOM Countries at a Glance",
  description:
    "Browse twelve CARICOM countries by monthly budget, official language and whether full free movement applies. Cost of living, places to see and what each country asks for.",
  keywords: [
    "CARICOM countries at a glance",
    "cheapest CARICOM country to live in",
    "cost of living in the Caribbean",
    "CARICOM full free movement countries",
    "moving to the Caribbean",
    "CARICOM country profiles",
  ],
  alternates: { canonical: "/destinations" },
};

/**
 * The published budget reads "≈US$1,100–1,700/month all-in (...)". The lower
 * bound is what a band is anchored on, because it answers "can I afford to be
 * here at all". Anything unparseable falls through to null and simply never
 * matches a budget filter, rather than being guessed at.
 */
function budgetFloor(s: string | undefined): number | null {
  if (!s) return null;
  const m = s.replace(/,/g, "").match(/US\$\s*(\d{3,6})/);
  return m ? Number(m[1]) : null;
}

/** "English (official)" and the rest of the sentence after it is not a filter. */
function officialLanguage(langs: string[] | undefined): string {
  const first = langs?.[0] ?? "English";
  return first.replace(/\s*\(official\).*$/i, "").trim();
}

/** The range as published, shortened to the figures for a one-line label. */
function budgetLabel(s: string | undefined): string | null {
  if (!s) return null;
  const m = s.match(/≈?US\$[\d,]+(?:\s*[–-]\s*[\d,]+)?/);
  return m ? `${m[0].replace("≈", "")} a month` : null;
}

export default function DestinationsPage() {
  const countries: FinderCountry[] = [...COUNTRY_GUIDES]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((g) => ({
      slug: g.slug,
      name: g.name,
      tagline: g.tagline,
      freeMovement: CSME_COUNTRIES.find((c) => c.slug === g.slug)?.fullFreeMovement ?? false,
      language: officialLanguage(g.demographics?.officialLanguages),
      costFrom: budgetFloor(g.costOfLiving?.budgetModestSingle),
      costLabel: budgetLabel(g.costOfLiving?.budgetModestSingle),
    }));

  return (
    <>
      <PageHeader
        title="CARI-COME to one of these CARICOM Countries"
        crumb="Where are we Going?"
        intro="Twelve CARICOM countries with free movement*, twelve different answers. Narrow them by what it costs to live there, what language you will be working in, or whether you can move without a permit."
        video={HEADER_VIDEO}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <RandomDestinationLink slugs={countries.map((c) => c.slug)} />
          </div>

          <CountryFinder countries={countries} />

          <p className="mt-10 text-sm text-navy/70">
            * Free movement is the right CARICOM nationals have to live and work in another member state without a
            work permit, established under the CSME (CARICOM Single Market and Economy) by the Revised Treaty of
            Chaguaramas. All twelve countries listed here participate. The four marked{" "}
            <span className="font-semibold text-brand">full free movement</span> went further on 1 October 2025 and
            admit CARICOM nationals of any skill level, not only those holding a Skills Certificate. Budgets are the
            modest single-person, all-in figures published on each country&rsquo;s own page, with their sources and
            dates.
          </p>

          <div className="mt-10 border-l-4 border-brand bg-brand-soft px-5 py-4">
            <p className="font-semibold text-navy">Curious what people actually earn and pay?</p>
            <p className="measure mt-1.5 text-navy/80">
              Anonymous, crowdsourced reports on what people earn and what they pay to live, country by country.
            </p>
            <Link
              href="/survey"
              className="mt-3 inline-block text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand-dark"
            >
              See the reports
            </Link>
          </div>
        </div>
      </Section>

      <PageIssueNote section="destinations" />
    </>
  );
}
