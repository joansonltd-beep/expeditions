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
  {
    slug: "barbados",
    name: "Barbados",
    tagline: "The Caribbean's culinary capital: a former British colony turned republic, built around rum, reefs and Bajan cuisine.",
    overview:
      "Barbados is the easternmost Caribbean island, a former British colony that became a parliamentary republic in 2021. It combines well-developed tourism infrastructure with deep cultural heritage — historic Bridgetown, the birthplace of rum, and a food scene often called the best in the Caribbean.",
    photo: {
      src: "/destinations/barbados.jpg",
      alt: "Carlisle Bay, Barbados, with Bridgetown visible in the distance",
      credit: "Pontificalibus, CC0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Carlisle_Bay,_Barbados.jpg",
    },
    coordinates: { lat: 13.1939, lng: -59.5432, display: "13.19°N, 59.54°W" },
    demographics: {
      population: {
        value: "≈282,000–283,000 (2025–2026 estimate)",
        sourceName: "Worldometer / UN-based estimates",
        sourceUrl: "https://www.worldometers.info/world-population/barbados-population/",
      },
      areaKm2: "≈430 km²",
      independence: "30 November 1966, from the United Kingdom. Became a parliamentary republic on 30 November 2021.",
      capital: "Bridgetown, in the parish of Saint Michael.",
      officialLanguages: ["English (official)", "Bajan (Barbadian Creole) widely spoken"],
      currency: "Barbadian dollar (BBD), fixed at BBD 2 to US$1. US dollars are widely accepted in tourist areas.",
      government:
        "Parliamentary republic. Barbados removed the British monarch as head of state in November 2021; a President (currently ceremonial, elected by Parliament) is head of state, with a Prime Minister as head of government.",
      medianAge: "≈39.5 years (2020 estimate)",
      ageStructure: "0–14 years: ≈17%. 15–64 years: ≈68%. 65 years and over: ≈16%.",
      ethnicComposition: {
        value: "African descent ≈92%, mixed ≈3%, White ≈3%, East Indian ≈1%, other/unspecified ≈1%",
        sourceName: "CIA World Factbook (2010 census, most recent available)",
      },
      urbanizationNote:
        "Most residents live in and around Bridgetown and the south-coast parishes (Christ Church, Saint Michael, Saint James), which are also the main tourist and business areas. Barbados has a sizeable diaspora in the UK, US and Canada.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$900–1,300/month inland or in smaller towns away from the coast",
      rentPremium1BR: "≈US$1,200–2,600/month in Bridgetown and the popular south/west-coast parishes (Hastings, Worthing, Holetown)",
      groceriesSingle: "≈US$250–450/month",
      inexpensiveMeal: "≈US$10–15",
      midRangeMealForTwo: "≈US$40–90, higher at upscale beachfront or hotel restaurants",
      utilities: "≈US$140–210/month for a small apartment, driven mostly by air conditioning use",
      budgetModestSingle: "≈US$1,900–2,500/month all-in (modest rental, limited AC, local food)",
      budgetComfortableSingle: "≈US$3,000–4,500+/month all-in (good location, car, dining out, more AC)",
      notes:
        "Barbados runs more expensive than most of its CARICOM neighbours, especially housing on the south and west coasts and imported goods. A public bus pass runs roughly US$25–30/month, though coverage is limited. Luxury villas and premium rentals can run well beyond US$7,000/month. Crowd-sourced sites like Numbeo show notably lower rent figures for Barbados than current rental listings and relocation guides do — the ranges above lean on the latter, since Numbeo's Barbados sample is thin.",
      sourceName: "Numbeo",
      sourceUrl: "https://www.numbeo.com/cost-of-living/in/Bridgetown",
      secondarySourceName: "current rental listings and relocation guides (typical and popular-parish figures)",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Historic Bridgetown and its Garrison",
        description:
          "A UNESCO World Heritage Site since 2011: colonial architecture, the careenage waterfront, and the Garrison Savannah, once a British military headquarters.",
      },
      {
        name: "George Washington House",
        description:
          "The only house outside the continental US where George Washington lived — six weeks in 1751, aged 19. Now a museum within the Garrison, with access to old tunnels.",
      },
      {
        name: "St. Nicholas Abbey",
        description: "A well-preserved 1658 plantation house with its own rum distillery, gardens and a heritage railway.",
      },
      {
        name: "Carlisle Bay",
        description: "A calm, clear bay near Bridgetown with several shipwrecks close to shore — popular for snorkelling and swimming with sea turtles.",
      },
      {
        name: "Crane Beach",
        description: "Pink-tinged sand below 80-foot cliffs on the southeast coast, regularly ranked among the world's best beaches.",
      },
      {
        name: "Bathsheba and the east coast",
        description:
          "A rugged Atlantic coastline with the mushroom-shaped rock formations of the Soup Bowl — dramatic for photos and surfing, not for casual swimming.",
      },
      {
        name: "Harrison's Cave",
        description: "A large limestone cave system with guided tram tours past stalactites, streams and underground chambers.",
      },
      {
        name: "Animal Flower Cave",
        description: "A sea cave on the north coast with a natural swimming pool and panoramic Atlantic views.",
      },
      {
        name: "Welchman Hall Gully & Andromeda Botanic Gardens",
        description: "A collapsed-cave tropical gully with monkeys and old-growth vegetation, and a coastal botanic garden in Bathsheba with over 500 plant species.",
      },
      {
        name: "Barbados Wildlife Reserve",
        description: "A mahogany-wood reserve in St. Peter where Barbados's green monkeys roam free, best seen at the 11am and 2:30pm feedings.",
      },
    ],
    experiences: [
      {
        title: "Oistins Fish Fry",
        description:
          "Friday (and Saturday) nights in the fishing town of Oistins: grilled marlin, swordfish and flying fish, calypso and soca, and craft stalls. Barbados's biggest tourist draw.",
      },
      {
        title: "Crop Over Festival",
        description:
          "A months-long festival rooted in the old sugar-harvest celebrations, building through July with calypso competitions to Grand Kadooment, a costumed road march in early August.",
      },
      {
        title: "Rum distillery tours",
        description: "Mount Gay (the world's oldest rum distillery, est. 1703), Foursquare in St. Philip, or St. Nicholas Abbey's own distillery.",
      },
      {
        title: "Catamaran and snorkelling cruise",
        description: "Half- and full-day sails from Bridgetown or the south coast, often including sea turtle encounters and shipwreck snorkelling in Carlisle Bay.",
      },
      {
        title: "Surfing (or watching) at the Soup Bowl",
        description: "A renowned reef break at Bathsheba on the east coast, one of the Caribbean's best-known surf spots.",
      },
      {
        title: "A night out in St. Lawrence Gap",
        description: "The south coast's dining and nightlife strip — everything from casual bars to gourmet restaurants, near Dover Beach.",
      },
    ],
    localDishes: [
      {
        name: "Cou-cou and flying fish",
        description:
          "The national dish: a cornmeal-and-okra side (cou-cou) similar to polenta, served with flying fish stewed in a tomato-based sauce.",
      },
      {
        name: "Macaroni pie",
        description: "Baked, spiced macaroni and cheese — a Bajan Sunday-table staple, not a side dish to skip.",
      },
      {
        name: "Fish cakes",
        description: "Deep-fried, spiced saltfish fritters, sold everywhere as street food and a classic rum-shop snack.",
      },
      {
        name: "Pudding and souse",
        description: "A traditional Saturday dish: spiced pickled pork (souse) served with sweet potato pudding.",
      },
    ],
    placesToEat: [
      {
        name: "The Cliff",
        area: "St. James, west coast",
        description: "Fine dining with a Michelin-trained chef and sea views over illuminated waters — a special-occasion splurge.",
      },
      {
        name: "The Fish Pot",
        area: "Six Men's Bay, north-west coast",
        description: "A well-regarded, relaxed beachfront spot for fresh seafood in a converted fort.",
      },
      {
        name: "Champers Restaurant",
        area: "Hastings, south coast",
        description: "A long-running, owner-run favourite for local, Barbados-caught seafood, with a gallery of Caribbean art on-site.",
      },
      {
        name: "Uncle George's Fish Net Grill",
        area: "Oistins",
        description: "Grilled fish and seafood in the heart of the Oistins Fish Fry scene, with regular live music.",
      },
      {
        name: "Cuz's Fish Stand",
        area: "Pebbles Beach, Bridgetown",
        description: "A decades-old, no-frills stand famous for its fried marlin fish cutter sandwiches — one of the island's most-loved cheap eats.",
      },
    ],
    symbols: {
      motto: "Pride and Industry",
      anthem: {
        title: "In Plenty and In Time of Need",
        lyricist: "Irving Burgie",
        composer: "C. Van Roland Edwards",
        adopted: "30 November 1966, at independence",
        officialUrl: "https://en.wikipedia.org/wiki/National_Anthem_of_Barbados",
      },
      pledge: {
        text: "I pledge allegiance to my country Barbados and to my flag, To uphold and defend their honour, And by my living to do credit to my nation wherever I go.",
        sourceName: "Government of Barbados (gov.bb), written by Lester Vaughan, adopted 2 April 1973",
        sourceUrl: "https://www.gov.bb/Visit-Barbados/national-pledge",
      },
    },
    lastUpdated: "August 2026",
  },
  {
    slug: "belize",
    name: "Belize",
    tagline: "The only English-speaking CARICOM country in Central America: the world's second-largest barrier reef alongside Maya ruins and rainforest.",
    overview:
      "Belize is the only fully Central American member of CARICOM, and the only one with English as its official language. It's a dual destination: the Belize Barrier Reef and its cayes for diving and snorkelling, and Maya ruins, caves and rainforest inland — a mix of marine and jungle that few CARICOM countries can offer.",
    photo: {
      src: "/destinations/belize.jpg",
      alt: "The Great Blue Hole, a giant marine sinkhole off the coast of Belize",
      credit: "The TerraMar Project, CC BY 2.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Belize_Blue_Hole_(TMP)_(16912331906).jpg",
    },
    coordinates: { lat: 17.1899, lng: -88.4977, display: "17.19°N, 88.50°W" },
    demographics: {
      population: {
        value: "≈422,000–429,000 (2025–2026 estimate)",
        sourceName: "Worldometer / UN-based estimates",
        sourceUrl: "https://www.worldometers.info/world-population/belize-population/",
      },
      areaKm2: "≈22,966 km² — much larger than any other CARICOM member except Guyana and Suriname, since Belize is mainland Central America, not an island",
      independence: "21 September 1981, from the United Kingdom",
      capital: "Belmopan — a small, purpose-built inland capital. Belize City, the former capital, remains the largest city and main commercial hub.",
      officialLanguages: [
        "English (official)",
        "Spanish (widely spoken)",
        "Belize Kriol",
        "Maya languages (Yucatec, Mopan, Q'eqchi')",
        "Garifuna",
      ],
      currency: "Belize dollar (BZD), fixed at BZ$2 to US$1. US dollars are widely accepted in tourist areas.",
      government:
        "Parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General; a Prime Minister heads the government.",
      medianAge: "≈27–28 years — young relative to most CARICOM members",
      ageStructure: "0–14 years: ≈26–28%. 15–64 years: ≈66–69%. 65 years and over: ≈5–6%.",
      ethnicComposition: {
        value: "Mestizo ≈53%, Creole ≈26%, Maya (combined groups) ≈11%, Garifuna ≈6%, East Indian ≈4%, Mennonite ≈4%, White, Asian and other small percentages",
        sourceName: "CIA World Factbook (2010 census, most recent available)",
      },
      urbanizationNote:
        "The largest population centre is Belize City. Inland towns like San Ignacio (Cayo), Orange Walk and Corozal are growing, while coastal towns and the cayes (Ambergris Caye's San Pedro, Caye Caulker, Placencia) are more tourism-oriented. Belize also receives immigration from neighbouring Central American countries.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$400–700/month in mainland towns (Belize City, San Ignacio, Belmopan) for an ordinary local unit",
      rentPremium1BR: "≈US$800–1,500+/month on the tourist cayes (San Pedro on Ambergris Caye, Caye Caulker, Placencia)",
      groceriesSingle: "≈US$200–350/month",
      inexpensiveMeal: "≈US$5–12 (rice and beans with chicken or fish, fry jacks, street stalls)",
      midRangeMealForTwo: "≈US$30–60, more at upscale beachfront or resort restaurants",
      utilities: "≈US$125–300/month for electricity, water and garbage (heavy air conditioning pushes this higher), plus roughly US$50–80/month for home internet where available",
      budgetModestSingle: "≈US$1,200–1,800/month all-in (modest rental, local food, limited AC, public transport)",
      budgetComfortableSingle: "≈US$1,800–3,500/month all-in (good location, some dining out, AC, regular transport)",
      notes:
        "Belize is generally cheaper than the Caribbean islands, but costs vary sharply between mainland towns and the tourist cayes — a beachfront rental on Ambergris Caye or Placencia can run US$3,500–6,000+ a month all-in. Numbeo's Belize City sample is very thin (about 75 price entries from 5 contributors), so the ranges above lean more on rental listings and relocation guides. A local bus fare runs roughly US$1–3, with fuel around US$1.30–1.70 per litre.",
      sourceName: "Numbeo (thin sample for Belize City)",
      sourceUrl: "https://www.numbeo.com/cost-of-living/in/Belize-City",
      secondarySourceName: "rental listings and expat relocation guides (typical mainland and caye figures)",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Belize Barrier Reef",
        description: "The second-largest barrier reef in the world and a UNESCO World Heritage Site, running the length of the coast and around dozens of cayes.",
      },
      {
        name: "Great Blue Hole",
        description: "A giant marine sinkhole on Lighthouse Reef — a signature dive site for the certified, and a dramatic sight from a scenic flight for everyone else.",
      },
      {
        name: "Hol Chan Marine Reserve & Shark Ray Alley",
        description: "A protected reef channel near San Pedro thick with fish, turtles and rays, next to a shallow sandbar where you can swim with nurse sharks and stingrays.",
      },
      {
        name: "Caye Caulker",
        description: "A laid-back island built around a \"Go Slow\" motto — golf carts instead of cars, easy snorkelling and day trips to the reef.",
      },
      {
        name: "Placencia & Hopkins",
        description: "Southern coastal villages with beaches, reef access, and Garifuna cultural heritage.",
      },
      {
        name: "Actun Tunichil Muknal (ATM Cave)",
        description: "A sacred Maya cave with calcified skeletal remains and ceramics still in place, reached by a jungle trek and river crossings — one of Belize's best-known adventures.",
      },
      {
        name: "Xunantunich",
        description: "A major Maya site near San Ignacio, with the climbable \"El Castillo\" pyramid and views into Guatemala.",
      },
      {
        name: "Caracol",
        description: "A large, remote Maya city deep in the Chiquibul Forest — a longer drive than Xunantunich, and a more adventurous ruins visit.",
      },
      {
        name: "Cockscomb Basin Wildlife Sanctuary",
        description: "A protected reserve known for jaguar conservation, hiking trails and waterfalls.",
      },
    ],
    experiences: [
      {
        title: "Snorkelling Hol Chan and Shark Ray Alley",
        description: "Drifting through a coral channel and swimming with nurse sharks and rays in shallow water — often the top first activity for visitors.",
      },
      {
        title: "ATM Cave expedition",
        description: "A full-day trip combining jungle trekking, river crossings and cave exploration to see ancient Maya ceremonial remains in situ.",
      },
      {
        title: "Diving or flying over the Great Blue Hole",
        description: "A deep dive into the sinkhole for certified divers, or a scenic flight for a dramatic aerial view without getting in the water.",
      },
      {
        title: "Cave tubing and jungle hikes",
        description: "Floating through underground river systems in inner tubes, usually combined with a rainforest walk — commonly run as a day trip from San Ignacio or Belize City.",
      },
      {
        title: "Garifuna cultural experiences",
        description: "Drumming, dance and traditional food in Hopkins or Placencia, reflecting Belize's Afro-Caribbean Garifuna heritage.",
      },
      {
        title: "Whale shark trips off Placencia",
        description: "Seasonal (roughly March to June) boat excursions to swim with whale sharks at the Gladden Spit marine reserve.",
      },
    ],
    localDishes: [
      {
        name: "Rice and beans with stewed chicken",
        description: "The everyday Belizean staple, usually with potato salad or fried plantain on the side.",
      },
      {
        name: "Fry jacks",
        description: "Deep-fried pieces of dough served for breakfast with eggs, beans, cheese or jam.",
      },
      {
        name: "Hudut",
        description: "A Garifuna dish of mashed plantains served with fish or chicken in a coconut broth.",
      },
      {
        name: "Panades",
        description: "Fried corn masa turnovers filled with fish or beans — a Mestizo-influenced snack sold everywhere.",
      },
      {
        name: "Conch soup and ceviche",
        description: "Common coastal dishes, especially on the cayes and around Placencia and Hopkins.",
      },
    ],
    placesToEat: [
      {
        name: "Elvi's Kitchen",
        area: "San Pedro, Ambergris Caye",
        description: "A San Pedro institution since 1974, from a burger window to a full seafood restaurant — Belize Tourism Board's Restaurant of the Year in 2022.",
      },
      {
        name: "Estel's Dine by the Sea",
        area: "San Pedro, Ambergris Caye",
        description: "A family-run, beachfront spot for Belizean breakfast — fry jacks, chorizo and beans — right on the sand.",
      },
      {
        name: "The Guava Limb Restaurant & Café",
        area: "San Ignacio, Cayo District",
        description: "Farm-to-table dining using produce from its own Maya Farm; widely regarded as San Ignacio's best restaurant.",
      },
    ],
    symbols: {
      motto: "Sub Umbra Floreo (\"Under the Shade I Flourish\")",
      anthem: {
        title: "Land of the Free",
        lyricist: "Samuel Alfred Haynes",
        composer: "Selwyn Walford Young",
        adopted: "1981, at independence (the lyrics began as Haynes's 1929 poem \"Land of the Gods\")",
        officialUrl: "https://www.pressoffice.gov.bz/national-anthem-prayer/",
      },
      // No official National Pledge text confirmed. A school recitation
      // often called the "Tribute to the Belizean Flag" circulates online,
      // but different unofficial sources give different, inconsistent
      // wording for it, and the Government of Belize Press Office's own
      // national symbols page lists only the anthem and a national prayer.
      // Left out rather than picking one of the conflicting versions.
    },
    lastUpdated: "August 2026",
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((g) => g.slug === slug);
}
