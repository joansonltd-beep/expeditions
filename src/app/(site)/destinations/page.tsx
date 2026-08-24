import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, type HeroPhoto } from "@/components/ui";
import RandomDestinationLink from "@/components/RandomDestinationLink";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

const AIRPORT_PHOTOS: HeroPhoto[] = [
  {
    src: "/photos/heroes/airports/trinidad-piarco.jpg",
    alt: "Piarco International Airport, Trinidad",
    credit: "Chris Fitzpatrick, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Piarco_International_Airport_Atrium.jpg",
  },
  {
    src: "/photos/heroes/airports/jamaica-norman-manley.jpg",
    alt: "Norman Manley International Airport, Kingston, Jamaica",
    credit: "Wolmadrian, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Norman_Manley_International_Airport.jpg",
  },
  {
    src: "/photos/heroes/airports/barbados-grantley-adams.jpg",
    alt: "Grantley Adams International Airport, Barbados",
    credit: "CaribDigita, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Sir_Grantley_Adams_Int_Airport,_Barbados-01.jpg",
  },
  {
    src: "/photos/heroes/airports/antigua-vc-bird.jpg",
    alt: "V.C. Bird International Airport, Antigua",
    credit: "CROIX, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:V.C._Bird_International_Airport,_Interior.jpg",
  },
  {
    src: "/photos/heroes/airports/grenada-maurice-bishop.jpg",
    alt: "Maurice Bishop International Airport, Grenada",
    credit: "Estormiz, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Maurice_Bishop_International_Airport_Grenada.jpg",
  },
  {
    src: "/photos/heroes/airports/guyana-cheddi-jagan.jpg",
    alt: "Cheddi Jagan International Airport, Guyana",
    credit: "Interestica, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Arrivals_-_Cheddi_Jagan_International_Airport,_Guyana.jpg",
  },
  {
    src: "/photos/heroes/airports/belize-philip-goldson.jpg",
    alt: "Philip S. W. Goldson International Airport, Belize",
    credit: "Pgbk87, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Philip_S._W._Goldson_International_Airport.jpg",
  },
  {
    src: "/photos/heroes/airports/dominica-douglas-charles.jpg",
    alt: "Douglas-Charles Airport, Dominica",
    credit: "Russell Watkins/DFID, CC BY 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Main_terminal_building_of_Douglas%E2%80%93Charles_Airport_on_the_Caribbean_island_of_Dominica.jpg",
  },
  {
    src: "/photos/heroes/airports/saint-lucia-hewanorra.jpg",
    alt: "Hewanorra International Airport, Saint Lucia",
    credit: "Zidane hadeed, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Hewanorra_International_Airport_Terminal_Building.jpg",
  },
  {
    src: "/photos/heroes/airports/st-kitts-bradshaw.jpg",
    alt: "Robert L. Bradshaw International Airport, St. Kitts",
    credit: "Sunnya343, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:St._Kitts_Airport_Terminal_from_side.jpg",
  },
  {
    src: "/photos/heroes/airports/st-vincent-argyle.jpg",
    alt: "Argyle International Airport, St. Vincent and the Grenadines",
    credit: "Dylanwill, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Argyle_Terminal_Building.jpg",
  },
  {
    src: "/photos/heroes/airports/suriname-pengel.jpg",
    alt: "Johan Adolf Pengel International Airport, Suriname",
    credit: "Ymnes, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:JAP_Airport,_2022_-_1.jpg",
  },
];

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
        title="CARICOM Countries at a Glance"
        crumb="Destinations"
        intro="What to expect on the ground in each CARICOM country: cost of living, places to see, things to do, where to eat, and national symbols."
        photos={AIRPORT_PHOTOS}
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
      </Section>
    </>
  );
}
