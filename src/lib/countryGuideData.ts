// Country guides: practical orientation for each CARICOM country, covering
// demographics, cost of living, things to see and do, food, and national
// symbols. Built one country at a time, in alphabetical order, and researched
// from named sources below each entry — this is not paraphrased Wikipedia,
// it is independently sourced and cited so figures can be checked and updated.
//
// Anthems: title/composer/adoption year only, with a link to an official
// source to listen. Full lyrics are never reproduced on this site, even when
// a comparison source quotes them.
//
// Pledge: many CARICOM countries don't have a distinct, publicly documented
// "national pledge" text (as opposed to an anthem or citizenship oath). The
// field is left out entirely for a country rather than filled with anything
// unverified — never guess or paraphrase a pledge from memory.
//
// Cost of living: different source families (crowd-sourced aggregators like
// Numbeo vs. real-estate market analysts vs. expat relocation blogs) can
// diverge by 2x on the same figure. Where they do, this file records the
// range and names both source families rather than picking one arbitrarily.

export type SourcedFigure = {
  value: string;
  sourceName: string;
  sourceUrl?: string;
};

export type CostOfLiving = {
  rentTypical1BR?: string; // ordinary local rental market
  rentPremium1BR?: string; // marina/tourist/expat-oriented areas
  groceriesSingle?: string;
  inexpensiveMeal?: string;
  midRangeMealForTwo?: string;
  utilities?: string;
  budgetModestSingle?: string; // total incl. rent, modest lifestyle
  budgetComfortableSingle?: string; // total incl. rent, comfortable/expat lifestyle
  notes?: string;
  sourceName: string;
  sourceUrl?: string;
  secondarySourceName?: string;
  secondarySourceUrl?: string;
  asOf: string; // e.g. "August 2026" — cost of living data goes stale fast
};

export type PlaceToSee = { name: string; description: string };
export type Experience = { title: string; description: string };
export type PlaceToEat = { name: string; description: string; area?: string };
export type LocalDish = { name: string; description: string };

export type Coordinates = {
  lat: number;
  lng: number;
  display: string; // human-readable, e.g. "17.06°N, 61.80°W"
};

// A real, appropriately-licensed photo — self-hosted under /public, never
// hotlinked. Any non-public-domain license (e.g. Creative Commons) requires
// a visible credit line on the page, which `credit`/`creditUrl` supply.
export type CountryPhoto = {
  src: string;
  alt: string;
  credit: string;
  creditUrl?: string;
};

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
  areaKm2?: string;
  independence?: string;
  capital: string;
  officialLanguages: string[];
  currency: string;
  government: string;
  medianAge?: string;
  ageStructure?: string;
  ethnicComposition?: SourcedFigure;
  outlyingPopulation?: SourcedFigure; // e.g. Barbuda's population within Antigua and Barbuda
  urbanizationNote?: string;
};

export type CountryGuide = {
  slug: string; // matches CSME_COUNTRIES slug in csmeData.ts
  name: string;
  tagline: string;
  overview: string;
  photo?: CountryPhoto;
  coordinates?: Coordinates;
  demographics: Demographics;
  costOfLiving: CostOfLiving;
  placesToSee: PlaceToSee[];
  experiences: Experience[];
  localDishes?: LocalDish[];
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
    photo: {
      src: "/destinations/antigua-and-barbuda.jpg",
      alt: "Nelson's Dockyard, English Harbour, Antigua",
      credit: "Dr. Thomas Liptak, CC BY 4.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Antigua_English_Harbour_Nelson's_Dockyard_2.jpg",
    },
    coordinates: { lat: 17.0608, lng: -61.7964, display: "17.06°N, 61.80°W" },
    demographics: {
      population: {
        value: "≈94,200 (2025 estimate; some sources put it as high as ≈105,000)",
        sourceName: "UN World Population Prospects (2024 revision), via Worldometer",
        sourceUrl: "https://www.worldometers.info/world-population/antigua-and-barbuda-population/",
      },
      areaKm2: "≈442 km² total (Antigua ≈281 km², Barbuda ≈161 km², plus the small uninhabited islet of Redonda)",
      independence: "1 November 1981, from the United Kingdom",
      capital: "St. John's, on Antigua. Barbuda's main settlement is Codrington.",
      officialLanguages: ["English (official)", "Antiguan Creole (widely spoken)"],
      currency: "Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1 since 1976. US dollars are widely accepted in tourist areas.",
      government:
        "Parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General; a Prime Minister heads the government.",
      medianAge: "33.6 years (2023 estimate)",
      ageStructure: "0–14 years: ≈22%. 15–64 years: ≈68%. 65 years and over: ≈10%.",
      ethnicComposition: {
        value: "African descent ≈87%, mixed ≈5%, Hispanic ≈3%, White ≈2%, other/unspecified ≈4%",
        sourceName: "CIA World Factbook (2011 census, most recent available)",
      },
      outlyingPopulation: {
        value: "≈2,200 people live on Barbuda",
        sourceName: "March 2025 population estimate",
      },
      urbanizationNote: "Most residents live in or around St. John's and other coastal communities on Antigua; Barbuda is sparsely populated.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$800–1,300/month for an ordinary local rental",
      rentPremium1BR: "≈US$1,200–2,500+/month in marina and beachfront areas (English Harbour, Jolly Harbour)",
      groceriesSingle: "≈US$150–400/month, depending on how much you rely on imported vs. local produce and seafood",
      inexpensiveMeal: "≈US$10–12",
      midRangeMealForTwo: "≈US$40–90, heavily dependent on whether it's a casual local spot or a marina-area restaurant",
      utilities: "≈US$120–300/month for a small apartment, mostly driven by how much air conditioning is used",
      budgetModestSingle: "≈US$1,100–1,700/month all-in (modest rental, local food, limited AC)",
      budgetComfortableSingle: "≈US$1,800–2,500+/month all-in (private rental in a desirable area, dining out regularly, a car)",
      notes:
        "Rent estimates vary widely by source: crowd-sourced cost-of-living sites tend to skew toward premium, expat-oriented listings, while real-estate market data and relocation guides point to lower figures for ordinary local rentals. Both are shown above rather than picking one. Prices are quoted in US dollars since the EC dollar is pegged to it.",
      sourceName: "Numbeo / Global Citizen Solutions and Wise (premium-end figures)",
      sourceUrl: "https://www.globalcitizensolutions.com/the-cost-of-living-in-antigua-and-barbuda/",
      secondarySourceName: "TheLatinvestor real-estate market analysis and expat relocation guides (typical local figures)",
      secondarySourceUrl: "https://thelatinvestor.com/blogs/news/antigua-rents",
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
        name: "Half Moon Bay",
        description:
          "A long, crescent-shaped beach on the southeastern coast: calmer water at one end, real surf at the other.",
      },
      {
        name: "Jolly Beach & Jolly Harbour",
        description: "A popular white-sand beach next to a marina and residential complex with restaurants, shops and water sports.",
      },
      {
        name: "Stingray City",
        description: "Shallow, clear water off Seaton's Village where visitors can wade in and interact with southern stingrays.",
      },
      {
        name: "St. John's Public Market",
        description: "The capital's market, liveliest on Saturdays, for local produce, spices and street food.",
      },
      {
        name: "Fort James & Fort Barrington",
        description: "Two 18th-century forts guarding either side of St. John's Harbour, both an easy walk with coastal views.",
      },
      {
        name: "Frigate Bird Sanctuary, Barbuda",
        description:
          "The largest frigate bird colony in the Western Hemisphere, reached by a boat trip through Codrington Lagoon's mangroves.",
      },
      {
        name: "Barbuda's pink sand beach",
        description:
          "An 11-mile, largely secluded beach tinted pink by crushed coral and shell. Its southern stretch is also known as Princess Diana Beach, renamed in 2011 after the beach she used to visit.",
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
        title: "Catamaran and snorkelling day sail",
        description: "Half- and full-day boat trips along the south coast, usually with snorkelling stops over reefs and old wrecks.",
      },
      {
        title: "Rainforest zipline canopy tour",
        description: "A zipline and rope course through the rainforest at Fig Tree Drive on the south-west coast.",
      },
      {
        title: "Day trip to Barbuda",
        description: "Combine the Frigate Bird Sanctuary with the pink sand beaches on the quieter sister island.",
      },
    ],
    localDishes: [
      {
        name: "Pepperpot and fungee",
        description:
          "Widely cited as Antigua and Barbuda's national dish: a hearty stew (traditionally with spinach, eggplant, peas and meat) served with fungee, a cornmeal-and-okra side similar to polenta.",
      },
      {
        name: "Saltfish",
        description: "Salt-cured cod cooked down with garlic, tomato, pepper and onion — a weekend, especially Sunday, favourite.",
      },
      {
        name: "Goat water",
        description:
          "A spiced goat stew enjoyed across the Leeward Islands (it's especially associated with neighbouring Montserrat, where it's the national dish, but it's a well-loved weekend dish in Antigua too).",
      },
      {
        name: "Fresh seafood",
        description: "Grilled lobster, snapper and conch, and \"fish and bakes\" from beachside stalls and restaurants.",
      },
    ],
    placesToEat: [
      {
        name: "Sheer Rocks",
        area: "Antigua, near English Harbour",
        description: "Cliff-front dining with plunge pools and a Mediterranean-leaning menu.",
      },
      {
        name: "Cecilia's High Point Cafe",
        area: "Dutchman's Bay, Antigua",
        description: "A long-standing favourite overlooking Dutchman's Bay, with a French-influenced, locally-sourced menu.",
      },
      {
        name: "Catherine's Cafe",
        area: "Pigeon Point Beach, English Harbour",
        description: "A beachfront French-inspired spot known for Saturday live music and Wednesday jazz nights.",
      },
      {
        name: "Beach Limerz",
        area: "Fort James Beach",
        description: "A family-run beach bar for local dishes — curry conch, bake and saltfish, curry goat — with live steel pan.",
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
        name: "Fat Cat Coffee",
        area: "Antigua",
        description: "One of Antigua's most consistently well-regarded coffee houses.",
      },
      {
        name: "Nobu Barbuda",
        area: "Princess Diana Beach, Barbuda",
        description: "The Caribbean's only Nobu — Japanese-Peruvian fusion on a remote beach, reachable by boat or helicopter. A splurge, not an everyday spot.",
      },
      {
        name: "Uncle Roddy's Beach Bar & Grill",
        area: "Coral Group Bay, Barbuda",
        description: "A local institution for grilled Barbudan lobster, fish and conch right on the beach. Reserve a day ahead.",
      },
    ],
    symbols: {
      motto: "Each Endeavouring, All Achieving",
      anthem: {
        title: "Fair Antigua, We Salute Thee",
        lyricist: "Novelle Hamilton Richards",
        composer: "Walter Garnet Picart Chambers",
        adopted: "1967 (retained as the national anthem at independence in 1981)",
        officialUrl: "https://ab.gov.ag/detail_page.php?page=26",
      },
      // No distinct, publicly documented national pledge text found from an
      // official source — only a citizenship Oath of Allegiance in a
      // different context. Left out rather than guessed or copied from an
      // unverified secondary source.
    },
    lastUpdated: "August 2026",
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((g) => g.slug === slug);
}
