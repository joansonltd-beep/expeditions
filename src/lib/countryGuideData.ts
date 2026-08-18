// Country guides: practical orientation for each CARICOM country, covering
// demographics, cost of living, things to see and do, food, and national
// symbols. Built one country at a time, in alphabetical order, and researched
// from named sources below each entry — this is not paraphrased Wikipedia,
// it is independently sourced and cited so figures can be checked and updated.
//
// Anthems: title/composer/adoption year only, with a link to an official
// source to listen. Full lyrics are never reproduced on this site.
//
// Pledge: many CARICOM countries don't have a distinct, publicly documented
// "national pledge" text (as opposed to an anthem or citizenship oath). The
// field is left out entirely for a country rather than filled with anything
// unverified — never guess or paraphrase a pledge from memory.

export type SourcedFigure = {
  value: string;
  sourceName: string;
  sourceUrl?: string;
};

export type CostOfLiving = {
  rentCityCenter1BR?: string;
  rentOutsideCityCenter1BR?: string;
  overallExcludingRentSingle?: string; // broad monthly cost-of-living index, not just groceries
  overallExcludingRentFamilyOfFour?: string;
  inexpensiveMeal?: string;
  notes?: string;
  sourceName: string;
  sourceUrl?: string;
  asOf: string; // e.g. "August 2026" — cost of living data goes stale fast
};

export type PlaceToSee = { name: string; description: string };
export type Experience = { title: string; description: string };
export type PlaceToEat = { name: string; description: string; area?: string };

export type NationalSymbols = {
  motto?: string;
  anthem: {
    title: string;
    composer?: string;
    lyricist?: string;
    adopted?: string;
    officialUrl?: string; // where to listen / read about it — never lyrics on-site
  };
  pledge?: { text: string; sourceName: string; sourceUrl?: string };
};

export type Demographics = {
  population: SourcedFigure;
  capital: string;
  officialLanguages: string[];
  currency: string;
  government: string;
};

export type CountryGuide = {
  slug: string; // matches CSME_COUNTRIES slug in csmeData.ts
  name: string;
  tagline: string;
  overview: string;
  demographics: Demographics;
  costOfLiving: CostOfLiving;
  placesToSee: PlaceToSee[];
  experiences: Experience[];
  placesToEat: PlaceToEat[];
  symbols: NationalSymbols;
  lastUpdated: string;
};

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    slug: "antigua-and-barbuda",
    name: "Antigua and Barbuda",
    tagline: "365 beaches, a working Georgian dockyard, and the Caribbean's biggest frigate bird colony.",
    overview:
      "Antigua and Barbuda is a two-island nation in the Eastern Caribbean: Antigua, the larger and more developed island, built around sailing, historic English Harbour and its beaches; and Barbuda, low-lying, sparsely populated and largely undeveloped, known for pink sand and seabirds.",
    demographics: {
      population: {
        value: "≈94,200 (2025 estimate)",
        sourceName: "UN World Population Prospects (2024 revision)",
        sourceUrl: "https://www.worldometers.info/world-population/antigua-and-barbuda-population/",
      },
      capital: "St. John's, on Antigua. Barbuda's main settlement is Codrington.",
      officialLanguages: ["English (official)", "Antiguan Creole (widely spoken)"],
      currency: "Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1 since 1976",
      government:
        "Parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General; a Prime Minister heads the government.",
    },
    costOfLiving: {
      rentCityCenter1BR: "≈US$1,740/month",
      rentOutsideCityCenter1BR: "≈US$1,520/month",
      overallExcludingRentSingle: "≈US$1,100/month",
      overallExcludingRentFamilyOfFour: "≈US$3,900/month",
      inexpensiveMeal: "≈US$10",
      notes:
        "Prices are quoted in US dollars since the EC dollar is pegged to it. Imported groceries cost noticeably more than local produce and seafood, and renting outside the St. John's / English Harbour tourist areas is cheaper.",
      sourceName: "Numbeo cost-of-living data, via Global Citizen Solutions",
      sourceUrl: "https://www.globalcitizensolutions.com/the-cost-of-living-in-antigua-and-barbuda/",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Nelson's Dockyard",
        description:
          "A UNESCO World Heritage site in English Harbour and the world's only continuously working Georgian-era dockyard, with a museum, restaurants and historic naval buildings.",
      },
      {
        name: "Shirley Heights",
        description:
          "A hilltop lookout with panoramic views over English Harbour, best known for its Sunday evening steel-band and sunset party.",
      },
      {
        name: "Devil's Bridge",
        description:
          "A natural limestone arch at Indian Town National Park, carved by the Atlantic. At high tide, waves force geysers of water through blowholes in the rock.",
      },
      {
        name: "Betty's Hope",
        description: "Antigua's first full-scale sugar plantation, with a restored working windmill and a visitor centre on its history.",
      },
      {
        name: "Frigate Bird Sanctuary, Barbuda",
        description:
          "The largest frigate bird colony in the Western Hemisphere, reached by a boat trip through Codrington Lagoon's mangroves.",
      },
      {
        name: "Barbuda's pink sand beach",
        description: "An 11-mile, largely secluded beach tinted pink by crushed coral and shell.",
      },
    ],
    experiences: [
      {
        title: "Antigua Sailing Week",
        description:
          "Held in late April, one of the world's premier yacht racing regattas (founded 1967), with shoreside parties every night of racing.",
      },
      {
        title: "Antigua Carnival",
        description:
          "Late July into early August: calypso and soca competitions building to a Carnival Monday and Tuesday parade.",
      },
      {
        title: "Sunday sunset at Shirley Heights",
        description: "Steel pan and reggae over English Harbour as the sun goes down — a weekly institution, not just a tourist event.",
      },
      {
        title: "Day trip to Barbuda",
        description: "Combine the Frigate Bird Sanctuary with the pink sand beaches on the quieter sister island.",
      },
    ],
    placesToEat: [
      {
        name: "Sheer Rocks",
        area: "Antigua",
        description: "Cliff-front dining with plunge pools and a Mediterranean-leaning menu.",
      },
      {
        name: "Trappas",
        area: "English Harbour",
        description: "A long-running, casual spot for Caribbean and seafood dishes, popular with the yachting crowd.",
      },
      {
        name: "Incanto Restaurant & Lounge",
        area: "Near Nelson's Dockyard",
        description: "Italian menu — risotto, gnocchi and lobster linguine.",
      },
      {
        name: "Cafe Boheme",
        area: "Near St. John's",
        description: "A terrace cafe known for acai bowls and its view.",
      },
      {
        name: "Fat Cat Coffee",
        description: "One of Antigua's most consistently well-regarded coffee houses.",
      },
    ],
    symbols: {
      motto: "Each Endeavouring, All Achieving",
      anthem: {
        title: "Fair Antigua, We Salute Thee",
        lyricist: "Novelle Richards",
        composer: "Walter P. Chambers",
        adopted: "1967 (retained as the national anthem at independence in 1981)",
        officialUrl: "https://ab.gov.ag/detail_page.php?page=26",
      },
      // No distinct, publicly documented national pledge found — only a
      // citizenship Oath of Allegiance in a different context. Left out
      // rather than guessed.
    },
    lastUpdated: "August 2026",
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((g) => g.slug === slug);
}
