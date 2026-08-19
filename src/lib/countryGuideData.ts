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
  {
    slug: "dominica",
    name: "Dominica",
    tagline: "The \"Nature Isle of the Caribbean\": a mountainous, volcanic island built for hikers and divers, not beach loungers.",
    overview:
      "Dominica is a mountainous, volcanic island of rainforest, rivers and hot springs, and the only Eastern Caribbean island still home to a Kalinago (Carib) community, the region's last pre-Columbian population. It's less developed for mass tourism than most of its neighbours and has few sandy beaches — the draw here is hiking, diving and nature, not lounging.",
    photo: {
      src: "/destinations/dominica.jpg",
      alt: "Trafalgar Falls, twin waterfalls in Morne Trois Pitons National Park, Dominica",
      credit: "Nelro, public domain, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Trafalgar_Falls_at_Morne_Trois_Pitons_National_Park.jpg",
    },
    coordinates: { lat: 15.3017, lng: -61.3881, display: "15.30°N, 61.39°W" },
    demographics: {
      population: {
        value: "≈65,500–66,000 (2025–2026 estimate)",
        sourceName: "Worldometer / World Population Review",
        sourceUrl: "https://www.worldometers.info/world-population/dominica-population/",
      },
      areaKm2: "≈750 km²",
      independence: "3 November 1978, from the United Kingdom",
      capital: "Roseau",
      officialLanguages: ["English (official)", "Dominican Creole French (Kwéyòl), widely spoken"],
      currency: "Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1. US dollars are often accepted in tourist areas.",
      government:
        "Parliamentary republic — one of the few CARICOM states never to retain the British monarch as head of state after independence. A President, elected by the House of Assembly, is head of state; a Prime Minister is head of government.",
      medianAge: "≈35.6 years (2023 estimate)",
      ageStructure: "0–14 years: ≈18–21%. 15–64 years: ≈66–69%. 65 years and over: ≈13–14%.",
      ethnicComposition: {
        value: "African descent ≈85%, mixed ≈9%, indigenous Kalinago (Carib) ≈4%, other/unspecified ≈3%",
        sourceName: "CIA World Factbook (2011 census, most recent available)",
      },
      urbanizationNote:
        "Most people live in and around Roseau and the southwest. Portsmouth is the second-largest town. Dominica is the only Eastern Caribbean island where a Kalinago community survived colonisation — around 3,000–3,500 people live in the Kalinago Territory on the east coast, though only a small number are considered \"pure\" Kalinago after generations of intermarriage.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$300–600/month in Portsmouth, Calibishie, Salisbury and other towns and villages outside Roseau",
      rentPremium1BR: "≈US$350–800+/month in and around Roseau, more for newer or waterfront/expat-oriented units",
      groceriesSingle: "≈US$200–350/month; local produce and root crops are much cheaper than imports",
      inexpensiveMeal: "≈US$5–12 (rice and peas, callaloo, a plate of chicken or fish)",
      midRangeMealForTwo: "≈US$30–60, more at upscale hotel or waterfront restaurants",
      utilities: "≈US$75–200/month for electricity and water (more with regular air conditioning), plus roughly US$55–85/month for fixed broadband internet",
      budgetModestSingle: "≈US$1,200–1,600/month all-in (modest rental, local food, limited AC, public transport)",
      budgetComfortableSingle: "≈US$1,600–2,500/month all-in (good location, some dining out, AC, regular transport)",
      notes:
        "Dominica is one of the more affordable Eastern Caribbean islands, with cheap local food but pricier imports and electricity. Numbeo doesn't carry data for Dominica, so these figures come from relocation and expat guides rather than a single crowd-sourced source. A premium lifestyle — luxury rental, frequent dining and tours — can run US$3,500–5,000+/month. Minibus fares run roughly US$0.50–1.50 per trip.",
      sourceName: "Relocation and expat relocation guides",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Boiling Lake",
        description:
          "The world's second-largest thermally active lake, a churning, mist-covered crater in Morne Trois Pitons National Park (a UNESCO World Heritage Site), reachable only by a strenuous 6–8 hour round-trip hike.",
      },
      {
        name: "Valley of Desolation",
        description: "Surreal volcanic terrain of sulphur vents, steaming mud pools and hot streams, crossed on the way to Boiling Lake.",
      },
      {
        name: "Trafalgar Falls",
        description: "Twin waterfalls (\"Mother\" and \"Father\") near Wotten Waven, among the easiest of Dominica's falls to reach, with swimmable lower pools.",
      },
      {
        name: "Emerald Pool",
        description: "A forest-fringed pool and waterfall near Morne Trois Pitons, reached by a short, well-maintained trail.",
      },
      {
        name: "Ti Tou Gorge & Wotten Waven hot springs",
        description: "A narrow canyon with clear water for swimming, next to Wotten Waven, the village at the centre of Dominica's sulphur hot springs.",
      },
      {
        name: "Champagne Reef",
        description: "A shallow dive and snorkel site where underwater volcanic vents send streams of bubbles up through the coral and marine life.",
      },
      {
        name: "Indian River",
        description: "A calm, mangrove-lined river near Portsmouth, explored by rowed boat tour (no motors allowed).",
      },
      {
        name: "Cabrits National Park & Fort Shirley",
        description: "An 18th-century British garrison on a former volcanic islet near Portsmouth, now a national park with coastal hiking trails.",
      },
      {
        name: "Kalinago Territory",
        description: "Home to the Caribbean's last Kalinago (Carib) community, on the east coast — craft, cultural sites and coastal scenery.",
      },
    ],
    experiences: [
      {
        title: "The Boiling Lake hike",
        description: "A full-day, guided trek through rainforest and the Valley of Desolation to the edge of the lake — one of the Caribbean's most demanding and iconic hikes.",
      },
      {
        title: "Waterfall hikes and swims",
        description: "Trafalgar Falls, Emerald Pool and others, for hiking, swimming and picnicking in forest settings.",
      },
      {
        title: "Snorkelling or diving Champagne Reef",
        description: "Swimming over volcanic vents that send up constant bubbles, alongside coral and reef fish.",
      },
      {
        title: "River tubing and canyoning",
        description: "Floating down jungle rivers and exploring canyons with local operators, often with waterfall jumps included.",
      },
      {
        title: "Whale watching off Scotts Head",
        description: "Boat trips into deep offshore water, seasonally, to see sperm whales and other cetaceans.",
      },
      {
        title: "Hiking the Waitukubuli National Trail",
        description: "A 185km, 14-segment trail across the whole island, the Caribbean's only long-distance hiking trail — walkable in day-length sections or end to end.",
      },
    ],
    localDishes: [
      {
        name: "Callaloo",
        description: "A leafy-green soup, similar to spinach, cooked with okra, coconut milk and often crab or saltfish.",
      },
      {
        name: "Crab back",
        description: "Seasoned crab meat stuffed back into the shell — a festive, flavourful local specialty.",
      },
      {
        name: "Rice and peas with stewed fish or chicken",
        description: "The everyday plate, usually with fried plantain or provision (boiled root vegetables) on the side.",
      },
      {
        name: "Fresh seafood",
        description: "Grilled or stewed fish, and lobster in season, especially around Portsmouth and Scotts Head.",
      },
      {
        name: "Mountain chicken (historical note, not a recommendation)",
        description:
          "Dominica's traditional national dish is actually a large frog (Leptodactylus fallax), not poultry. A chytrid fungus outbreak in 2002 wiped out over 80% of the wild population within 18 months, and it's now Critically Endangered — around 100 individuals remain in the wild across Dominica and Montserrat combined. Hunting has been banned since 2004. It's mentioned here for cultural context, not as something to order.",
      },
    ],
    placesToEat: [
      {
        name: "Lacou Melrose House",
        area: "Roseau",
        description: "A charming restaurant in the historic Melrose House, with a chalkboard menu that changes with what's fresh.",
      },
      {
        name: "Petit Paris Restaurant & Bar",
        area: "Roseau",
        description: "French-Caribbean cuisine in the capital.",
      },
      {
        name: "Kozy's Niche",
        area: "Roseau",
        description: "A local favourite blending Italian and Caribbean cooking — lionfish and grilled mahi-mahi are the dishes to order.",
      },
    ],
    symbols: {
      motto: "Après Bondie C'est La Ter (Kwéyòl for \"After God is the Earth\")",
      anthem: {
        title: "Isle of Beauty, Isle of Splendour",
        lyricist: "Rev. Wilfred Oscar Morgan Pond",
        composer: "Lemuel McPherson Christian",
        adopted: "1967, at statehood; retained at independence in 1978",
        officialUrl: "https://dominica.gov.dm/about-dominica/national-symbols/national-anthem",
      },
      pledge: {
        text: "Before God and all mankind, I pledge allegiance to the flag of the Commonwealth of Dominica and to the Sovereign Republic for which it stands; my love, my loyalty and skills, in the service of Dominica and my fellow citizens. I promise to work diligently and to help build a prosperous and peaceful Nation.",
        sourceName: "Government of Dominica (dominica.gov.dm), written by Peter Israel",
        sourceUrl: "https://dominica.gov.dm/about-dominica/national-symbols/national-pledge",
      },
    },
    lastUpdated: "August 2026",
  },
  {
    slug: "grenada",
    name: "Grenada",
    tagline: "The \"Spice Isle\": a tri-island state built on nutmeg, and home to the world's first underwater sculpture park.",
    overview:
      "Grenada is a tri-island state — Grenada, Carriacou and Petite Martinique — long known as the \"Spice Isle\" for the nutmeg, mace, cocoa and cinnamon grown on its slopes; nutmeg appears on the national flag. It's also a country that has rebuilt more than once: a 1979 revolution and its violent 1983 collapse brought a brief US-led intervention, and Hurricane Ivan in 2004 destroyed 90% of the island's buildings and nearly wiped out the nutmeg industry overnight. Today it's calm, green and mountainous, with diving, waterfalls and rainforest as much a draw as its beaches.",
    photo: {
      src: "/destinations/grenada.jpg",
      alt: "Underwater sculptures at the Molinere Underwater Sculpture Park, Grenada",
      credit: "Boris Kasimov, CC BY 2.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Underwater_sculptures_at_Molinere_Underwater_Sculpture_Park.jpg",
    },
    coordinates: { lat: 12.05, lng: -61.75, display: "12.05°N, 61.75°W" },
    demographics: {
      population: {
        value: "≈114,000–117,000 (2024–2025 estimate)",
        sourceName: "Worldometer / CIA World Factbook",
        sourceUrl: "https://www.worldometers.info/world-population/grenada-population/",
      },
      areaKm2: "≈344 km² across three inhabited islands — Grenada (≈311 km²), Carriacou (≈34 km²) and Petite Martinique (≈2.4 km²)",
      independence: "7 February 1974, from the United Kingdom",
      capital: "St. George's",
      officialLanguages: ["English (official)", "Grenadian Creole English and French Patois widely spoken"],
      currency: "Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1",
      government:
        "Parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General; a Prime Minister heads the government.",
      medianAge: "≈35.4 years (2025 estimate)",
      ageStructure: "0–14 years: ≈19%. 15–64 years: ≈68%. 65 years and over: ≈13%.",
      ethnicComposition: {
        value: "African descent ≈85%, mixed ≈10%, East Indian ≈1.4%, White ≈0.9%, Indigenous (Carib/Arawak) ≈0.2%",
        sourceName: "2021 preliminary census",
      },
      outlyingPopulation: {
        value: "Carriacou ≈5,700 and Petite Martinique ≈900",
        sourceName: "2011 census, most recent island-level breakdown",
      },
      urbanizationNote:
        "Most people live on the main island of Grenada, in and around St. George's. Carriacou (Hillsborough its main town) lies about 40km north-east by ferry or short flight; Petite Martinique, smaller still, sits just off Carriacou.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$435–800/month outside St. George's, or for a modest unit in town",
      rentPremium1BR: "≈US$800–1,800/month in St. George's, Grand Anse, True Blue or the Lance aux Epines / Westerhall south-coast corridor",
      groceriesSingle: "≈US$250–450/month",
      inexpensiveMeal: "≈US$7–12",
      midRangeMealForTwo: "≈US$30–80, more at upscale beachfront or resort restaurants",
      utilities: "≈US$80–250/month for electricity (more with regular AC) plus roughly US$10–30/month water and US$50–80/month internet",
      budgetModestSingle: "≈US$1,300–1,800/month all-in",
      budgetComfortableSingle: "≈US$1,800–3,500/month all-in",
      notes:
        "Numbeo has no listing for St. George's, so these figures come from relocation and expat cost-of-living guides rather than a single crowd-sourced dataset — treat them a little more cautiously than other countries' figures. Carriacou and the northern parishes (e.g. Sauteurs) run 50–70% cheaper than the south-coast expat corridor. A premium lifestyle — a beachfront rental near Grand Anse, frequent dining and tours — can run US$3,500–5,000+/month. Local minibuses (\"reggae buses\") cost roughly US$1–3 per trip; taxis run about US$1.50–3/km.",
      sourceName: "Global Citizen Solutions cost-of-living data",
      sourceUrl: "https://www.globalcitizensolutions.com/grenada-living-cost/",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Molinere Underwater Sculpture Park",
        description: "The world's first underwater sculpture park (opened 2006), with more than 80 submerged works by Jason deCaires Taylor slowly becoming an artificial reef.",
      },
      {
        name: "Grand Anse Beach",
        description: "Grenada's best-known beach: two miles of soft white sand, calm water, and restaurants and bars along the shore.",
      },
      {
        name: "Annandale Falls",
        description: "An easily reached waterfall in lush tropical grounds, good for swimming and photos.",
      },
      {
        name: "Grand Etang National Park",
        description: "A rainforest park built around a crater lake, with trails from 15-minute strolls to multi-hour treks through the misty central highlands.",
      },
      {
        name: "Seven Sisters Waterfalls",
        description: "A series of seven connected waterfalls and natural swimming pools in Grand Etang National Park, reached by a moderate rainforest hike of about an hour each way.",
      },
      {
        name: "River Antoine Rum Distillery",
        description: "Operating since 1785 and still turning a water wheel — the oldest functioning water-driven distillery in the Caribbean.",
      },
      {
        name: "Belmont Estate",
        description: "A 17th-century plantation turned working organic cocoa farm, with tours through the chocolate-making process.",
      },
      {
        name: "Carriacou",
        description: "Grenada's larger sister island, quieter and less developed — Hillsborough town, boatbuilding traditions, and its own set of beaches and dive sites.",
      },
      {
        name: "The Carenage & Fort George",
        description: "St. George's horseshoe-shaped historic harbour, ringed by colourful buildings and restaurants, overlooked by Fort George, an 18th-century fort with panoramic views over the capital.",
      },
      {
        name: "Fort Frederick",
        description: "A well-preserved fort completed in 1783, nicknamed the \"backward-facing fort\" since its cannons point inland rather than out to sea. It served as PRA headquarters during the 1979 revolution, and offers wide views over the Carenage from 244m up.",
      },
    ],
    experiences: [
      {
        title: "Spicemas Carnival",
        description: "Grenada's carnival, centred on St. George's in early August after a season that builds from May — soca, costume bands and street parades.",
      },
      {
        title: "Diving the Bianca C wreck",
        description: "A 180-metre former passenger liner that sank in 1961, now one of the largest diveable shipwrecks in the Caribbean — for experienced divers only, given its depth.",
      },
      {
        title: "Snorkelling the Underwater Sculpture Park",
        description: "Shallow enough for snorkellers, not just divers, to see the sculptures up close.",
      },
      {
        title: "Nutmeg and spice plantation tours",
        description: "Visits to working spice estates to see how nutmeg, mace and cocoa are grown and processed — the industry that gave Grenada its nickname.",
      },
      {
        title: "Carriacou Maroon & String Band Music Festival",
        description: "An April festival on Carriacou celebrating traditional Caribbean music and harvest celebrations.",
      },
      {
        title: "A day trip to Carriacou",
        description: "By ferry or short flight, for a quieter island with its own beaches, diving and boatbuilding culture.",
      },
    ],
    localDishes: [
      {
        name: "Oil down",
        description: "Grenada's national dish: breadfruit, coconut milk, callaloo, dumplings and salted meat or fish, slow-cooked in one pot until the coconut oil rises. Traditionally made as a communal, all-day beach cookout.",
      },
      {
        name: "Callaloo soup",
        description: "A soup built on callaloo (dasheen leaf), a staple ingredient in Grenadian cooking.",
      },
      {
        name: "Lambi (conch)",
        description: "Conch meat, marinated and tenderised with local spices — grilled, stewed, or added to a seafood oil down.",
      },
      {
        name: "Crab back",
        description: "Seasoned crab meat served stuffed back into its shell.",
      },
    ],
    placesToEat: [
      {
        name: "Patrick's Local Homestyle Restaurant",
        area: "St. George's",
        description: "Grenadian food tapas-style — oil down, callaloo soup, ginger pork and fish cakes, all in small plates.",
      },
      {
        name: "BB's Crab Back",
        area: "St. George's",
        description: "Run by a well-known local chef, built around crab backs, curried goat and other Grenadian specialties.",
      },
      {
        name: "Umbrella's Beach Bar",
        area: "Grand Anse Beach",
        description: "A women-run beach bar serving fresh, locally-sourced seafood on the sand.",
      },
      {
        name: "The Aquarium",
        area: "Magazine Beach",
        description: "Beachfront dining ranging from casual lunches to fine dining — grilled lobster, jerk chicken and callaloo cannelloni.",
      },
      {
        name: "Belmont Estate restaurant",
        area: "St. Patrick",
        description: "On-site dining at the working cocoa plantation, serving local dishes alongside estate-grown chocolate and spices.",
      },
    ],
    symbols: {
      motto: "Ever Conscious of God, We Aspire, Build and Advance as One People",
      anthem: {
        title: "Hail Grenada",
        lyricist: "Irva Merle Baptiste-Blackett",
        composer: "Louis Arnold Masanto",
        adopted: "1974, at independence",
        officialUrl: "https://www.oas.org/sap/peacefund/VirtualLibrary/NationalAnthems/GRENADA.pdf",
      },
      pledge: {
        text: "I pledge allegiance to my flag and to the country for which it stands, with Liberty, Justice and Equality for all. I pledge also that I shall defend and uphold the Honour, Dignity and Laws and Institutions of my country.",
        sourceName: "Government of Grenada (gov.gd)",
        sourceUrl: "https://www.gov.gd/national-symbols",
      },
    },
    lastUpdated: "August 2026",
  },
  {
    slug: "guyana",
    name: "Guyana",
    tagline: "Mainland South America's only English-speaking country: a vast, largely untouched interior of rainforest, savannah and waterfalls, transformed by a recent oil boom.",
    overview:
      "Guyana is the odd one out geographically among CARICOM's island states — mainland South America, over 80% covered in rainforest, and by far the largest country in the group at more than 200,000 km². Since offshore oil production began in 2019, its economy has grown faster than almost any country on Earth, transforming Georgetown's real estate market and cost of living in the space of a few years. Away from the capital, most of the country is still Amerindian villages, savannah ranches and unbroken forest.",
    photo: {
      src: "/destinations/guyana.jpg",
      alt: "Aerial view of Kaieteur Falls, Guyana",
      credit: "Amanda (amanderson), CC BY 2.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Kaieteur_Falls_Aerial_01.jpg",
    },
    coordinates: { lat: 6.8045, lng: -58.1553, display: "6.80°N, 58.16°W" },
    demographics: {
      population: {
        value: "1,025,334 at end of 2025 — Guyana passed 1 million people for the first time, up from 956,044 a year earlier",
        sourceName: "Guyana Bureau of Statistics (announced July 2026, World Population Day)",
        sourceUrl: "https://kaieteurnewsonline.com/2026/07/13/guyanas-population-surpasses-1-million-chief-statistician/",
      },
      areaKm2: "≈214,970 km² — by far the largest CARICOM member, over 80% of it rainforest",
      independence: "26 May 1966, from the United Kingdom. Became a Cooperative Republic on 23 February 1970.",
      capital: "Georgetown",
      officialLanguages: ["English (official)", "Guyanese Creole, widely spoken"],
      currency: "Guyanese dollar (GYD) — floating since 2015, trading at roughly GY$209 to US$1",
      government:
        "Cooperative Republic. Unlike several smaller CARICOM states, Guyana's President is an executive head of state and head of government combined (since the 1980 constitution), not a ceremonial office.",
      medianAge: "≈27 years — one of the younger populations in CARICOM",
      ethnicComposition: {
        value: "East Indian ≈40%, African descent ≈29%, mixed ≈20%, Amerindian ≈10.5%, other ≈0.5%",
        sourceName: "CIA World Factbook (2012 census, most recent available)",
      },
      urbanizationNote:
        "Most of the population lives on a narrow coastal strip, with Georgetown the largest city by far. The vast interior — savannah, rainforest, and the Rupununi region bordering Brazil — is sparsely populated, largely by Amerindian communities.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$300–600/month in Georgetown suburbs (Providence, Diamond, East Bank Demerara) or other towns (Linden, New Amsterdam)",
      rentPremium1BR: "≈US$400–900/month for a standard central Georgetown unit, but specific reported cases show the top end running far higher — see notes",
      groceriesSingle: "≈US$150–400/month, wide because local produce is very cheap but imports are not",
      inexpensiveMeal: "≈US$3–15",
      midRangeMealForTwo: "≈US$30–80",
      utilities: "≈US$60–170/month for electricity, water and cooking gas combined (more with regular AC use)",
      budgetModestSingle: "≈US$1,000–1,400/month all-in",
      budgetComfortableSingle: "≈US$1,400–2,500/month all-in",
      notes:
        "Cost of living here needs an asterisk: Guyana's economy has grown faster than almost anywhere on Earth since offshore oil production started in 2019, and Georgetown rents have risen dramatically as a result — one widely reported example saw a property's rent rise over 165% in 2024 alone, and property values are up roughly 500% in five years. That surge is concentrated in oil-industry-driven premium listings; the ranges above reflect more typical local costs, but expect newer, furnished or secure buildings in central Georgetown to run well above them. Numbeo has no listing for Georgetown. A premium lifestyle — luxury rental in central Georgetown or an upscale suburb, frequent dining — can run US$2,500–4,000+/month. Minibus and taxi fares in Georgetown run roughly US$0.90–2.20 per ride.",
      sourceName: "Relocation and expat cost-of-living guides, cross-checked against real-estate reporting on the oil boom",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Kaieteur Falls",
        description:
          "One of the world's most powerful single-drop waterfalls, roughly four times the height of Niagara. No road reaches it — visitors fly in on a small plane over unbroken rainforest.",
      },
      {
        name: "Iwokrama Rainforest",
        description: "A protected wilderness known for jaguars, giant river otters and over 500 bird species, with a high canopy walkway through the treetops.",
      },
      {
        name: "Rupununi Savannah",
        description: "Open savannah and working cattle ranches near the Brazilian border, for horseback riding, river safaris and wildlife tracking rather than beaches.",
      },
      {
        name: "Georgetown's colonial architecture & Stabroek Market",
        description: "18th- and 19th-century wooden buildings and the seawall protecting the below-sea-level capital, plus Stabroek Market, a landmark iron-and-steel market building with a clock tower, open since 1881.",
      },
      {
        name: "Orinduik Falls",
        description: "A wide, tiered waterfall on the Ireng River bordering Brazil, with warm, shallow pools over reddish jasper stone terraces — less dramatic in height than Kaieteur, more swimmable.",
      },
      {
        name: "Shell Beach",
        description: "One of only four major nesting sites in the world for the endangered leatherback sea turtle, on the remote north-west coast, with nesting season running March to August.",
      },
    ],
    experiences: [
      {
        title: "Flying to Kaieteur Falls",
        description: "A small-plane flight over rainforest canopy to reach the falls — the journey is as much the experience as the waterfall itself.",
      },
      {
        title: "The Iwokrama canopy walkway",
        description: "Suspension bridges up to 30 metres above the forest floor, for a rainforest view most visitors never get.",
      },
      {
        title: "A ranch stay in the Rupununi",
        description: "Days built around horseback riding, wildlife tracking and river trips, staying at working cattle ranches or community-run lodges.",
      },
      {
        title: "Birdwatching",
        description: "Guyana is one of the world's most serious birding destinations — harpy eagles, macaws and hundreds of other species in largely untouched habitat.",
      },
      {
        title: "Turtle watching at Shell Beach",
        description: "Night visits during nesting season (March–August) to see leatherback, hawksbill, olive ridley and green turtles come ashore.",
      },
    ],
    localDishes: [
      {
        name: "Pepperpot",
        description: "Guyana's national dish: meat slow-cooked in cassareep, the reduced, bittersweet juice of cassava root, traditionally served at Christmas.",
      },
      {
        name: "Cook-up rice",
        description: "An everyday one-pot dish of rice and split peas cooked with meat and coconut milk — brought by enslaved West Africans, similar to Ghanaian waakye.",
      },
      {
        name: "Metemgee",
        description: "Ground provisions (cassava, eddoe, plantain, yam) cooked in coconut milk with dumplings and fish or meat.",
      },
      {
        name: "Roti and curry",
        description: "A strong Indo-Guyanese influence on everyday eating, reflecting the country's East Indian plurality — curried chicken, goat or vegetables wrapped in roti.",
      },
    ],
    placesToEat: [
      {
        name: "Backyard Café",
        area: "Georgetown",
        description: "Chef Delven Adams's take on Guyanese cuisine, named to TIME Magazine's World's Greatest Places 2026 list.",
      },
      {
        name: "Aagman Indian Restaurant",
        area: "Georgetown",
        description: "A well-regarded Indian restaurant reflecting Guyana's large Indo-Guyanese population — the paneer tikka masala is a standout.",
      },
      {
        name: "Govinda's Higher Taste",
        area: "Georgetown",
        description: "Georgetown's first all-vegetarian restaurant.",
      },
    ],
    symbols: {
      motto: "One People, One Nation, One Destiny",
      anthem: {
        title: "Dear Land of Guyana, of Rivers and Plains",
        lyricist: "Rev. Archibald Leonard Luker",
        composer: "Robert Cyril Gladstone Potter",
        adopted: "1966, at independence",
        officialUrl: "https://en.wikipedia.org/wiki/Dear_Land_of_Guyana,_of_Rivers_and_Plains",
      },
      // Two materially different texts circulate online as Guyana's National
      // Pledge, both attributed to the same secondary source without a clean
      // official-government confirmation for either. Rather than guess which
      // is correct, it's left out — same policy as Belize.
    },
    lastUpdated: "August 2026",
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    tagline: "The Caribbean's best-known island by far: reggae, jerk, and a coastline that runs from Blue Mountain coffee slopes to Seven Mile Beach.",
    overview:
      "Jamaica is the most populous English-speaking Caribbean country by a wide margin, and easily the best known internationally — reggae, Bob Marley and jerk cooking all trace back here. It's a bigger, more varied island than most of its CARICOM neighbours: mountains and coffee estates in the interior, resort coastline around Negril and Ocho Rios, and Kingston, the largest English-speaking city south of Miami, as its cultural and business centre. A 2022 government push to become a republic by 2025 was retracted in March 2025, so Jamaica remains a constitutional monarchy for now.",
    photo: {
      src: "/destinations/jamaica.jpg",
      alt: "Dunn's River Falls, Ocho Rios, Jamaica",
      credit: "Don Ramey Logan, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Dunns_River_Falls_wide_Photo_Don_Ramey_Logan.jpg",
    },
    coordinates: { lat: 17.997, lng: -76.7936, display: "18.00°N, 76.79°W" },
    demographics: {
      population: {
        value: "≈2.83–2.84 million (2025–2026 estimate)",
        sourceName: "Worldometer",
        sourceUrl: "https://www.worldometers.info/world-population/jamaica-population/",
      },
      areaKm2: "≈10,990 km² — the largest English-speaking island in the Caribbean",
      independence: "6 August 1962, from the United Kingdom",
      capital: "Kingston",
      officialLanguages: ["English (official)", "Jamaican Patois, spoken by most of the population day to day"],
      currency: "Jamaican dollar (JMD), floating, trading at roughly J$158 to US$1. US dollars are sometimes accepted in tourist areas, but JMD is standard.",
      government:
        "Parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General; a Prime Minister heads the government. A 2022 plan to become a republic by 2025 was formally retracted in March 2025.",
      medianAge: "≈30.5 years (2023 estimate)",
      ageStructure: "0–14 years: ≈24%. 15–64 years: ≈66%. 65 years and over: ≈10%.",
      ethnicComposition: {
        value: "African ≈76%, Afro-European (mixed) ≈15%, Indian/Afro-Indian ≈3.4%, White ≈3.2%, Chinese/Afro-Chinese ≈1.2%, other ≈0.8%",
        sourceName: "2024 estimate",
      },
      urbanizationNote:
        "The Kingston Metropolitan Area is by far the largest population centre and the country's economic and cultural hub; Montego Bay and Ocho Rios are the main tourism centres on the north coast.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$350–600/month in outer Kingston (Half Way Tree, Constant Spring, Portmore) or a modest unit elsewhere",
      rentPremium1BR: "≈US$570–1,200/month in uptown Kingston (New Kingston, Barbican) or the main tourist towns (Montego Bay, Ocho Rios, Negril), more for beachfront units",
      groceriesSingle: "≈US$180–350/month",
      inexpensiveMeal: "≈US$10–15",
      midRangeMealForTwo: "≈US$50–100",
      utilities: "≈US$60–300+/month for electricity, which runs notably high in Jamaica, especially with regular AC use, plus roughly US$10–25 water and US$50–80 internet",
      budgetModestSingle: "≈US$1,200–1,800/month all-in",
      budgetComfortableSingle: "≈US$1,800–3,000/month all-in",
      notes:
        "Jamaica has one of the better-populated Numbeo listings in the region, so the rent, meal and utility figures above rest on a reasonably sized sample rather than a handful of entries — cross-checked against relocation guides, which is why groceries and the overall budget bands sit a little higher here than a Numbeo-only estimate would suggest. Local wages are low relative to these costs, so day-to-day prices for residents can feel more expensive than the raw dollar figures suggest. A premium lifestyle — uptown Kingston or beachfront tourist area, frequent dining, high AC use — can run US$3,500–6,000+/month. Local route-taxi fares run roughly US$1–3 per trip.",
      sourceName: "Numbeo",
      sourceUrl: "https://www.numbeo.com/cost-of-living/in/Kingston-Jamaica",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Dunn's River Falls",
        description: "A terraced waterfall near Ocho Rios that visitors climb hand in hand, cascading straight onto the beach — one of Jamaica's most-photographed sights.",
      },
      {
        name: "Blue Mountains",
        description: "Jamaica's highest range, home to Blue Mountain Peak (2,256m) and the coffee estates that grow the world-famous Blue Mountain coffee, most of it exported to Japan.",
      },
      {
        name: "Negril and Seven Mile Beach",
        description: "A long stretch of white sand on the west coast, with the Negril cliffs at its southern end used for cliff diving and sunset watching.",
      },
      {
        name: "YS Falls",
        description: "A quieter, less crowded set of seven waterfalls on the south coast, in St. Elizabeth Parish.",
      },
      {
        name: "Ocho Rios' Blue Hole",
        description: "A series of waterfalls and turquoise swimming holes in the hills above Ocho Rios, good for cliff jumping.",
      },
      {
        name: "Bob Marley Museum & Devon House",
        description: "Marley's former Kingston home, now a museum on his life and the roots of reggae; nearby, Devon House is an 1881 Jamaican-Georgian mansion turned heritage site, famous for its ice cream.",
      },
      {
        name: "Doctor's Cave Beach",
        description: "A historic Montego Bay beach that grew famous in the 1920s after a British osteopath publicised its supposedly restorative waters — still one of the city's best-known beaches.",
      },
      {
        name: "Blue and John Crow Mountains National Park",
        description: "A UNESCO World Heritage Site of rainforest covering the Blue Mountains and John Crow range, with Maroon heritage sites alongside the coffee estates and hiking trails.",
      },
      {
        name: "Port Royal",
        description: "Once called \"the wickedest city on Earth\" for its pirate-haven reputation, two-thirds of it sank in a 1692 earthquake. Its archaeological landscape at the mouth of Kingston Harbour became Jamaica's second UNESCO World Heritage Site in July 2025.",
      },
    ],
    experiences: [
      {
        title: "Climbing Dunn's River Falls",
        description: "A guided, hand-in-hand climb up the terraced falls — one of the most-repeated Jamaica experiences there is.",
      },
      {
        title: "Hiking Blue Mountain Peak",
        description: "A pre-dawn hike to the summit for sunrise views stretching across both the north and south coasts, with a coffee tour on the way.",
      },
      {
        title: "A jerk pit meal",
        description: "Chicken or pork slow-grilled over pimento wood — best eaten at a roadside jerk stand, not a hotel restaurant.",
      },
      {
        title: "Cliff diving at Rick's Café",
        description: "A Negril institution: sunset drinks and cliff jumps from platforms up to 35 feet above the water.",
      },
      {
        title: "Reggae and dancehall nightlife",
        description: "Live music, sound systems and street dances, especially in Kingston — the birthplace of both genres.",
      },
      {
        title: "Bamboo rafting on the Rio Grande",
        description: "A calm, poled bamboo-raft trip down the river that runs from the Blue Mountains to the Portland coast — river rafting as a leisure activity started here, popularised by Errol Flynn in the 1950s.",
      },
    ],
    localDishes: [
      {
        name: "Ackee and saltfish",
        description: "Jamaica's national dish: ackee, the national fruit, cooked with salted cod, onion and pepper — traditionally a breakfast dish, served with fried dumplings or breadfruit.",
      },
      {
        name: "Jerk chicken or pork",
        description: "Meat marinated in Scotch bonnet pepper, allspice and thyme, then slow-cooked over pimento wood — Jamaica's best-known culinary export.",
      },
      {
        name: "Patties",
        description: "Flaky, turmeric-yellow pastry filled with spiced beef, chicken or vegetables — Jamaica's everyday fast food.",
      },
      {
        name: "Curried goat",
        description: "A slow-cooked curry, usually served with rice and peas, common at gatherings and celebrations.",
      },
    ],
    placesToEat: [
      {
        name: "Kingston Jerk",
        area: "Kingston",
        description: "Widely cited by locals as the city's best jerk — chicken, pork, festival and roast breadfruit off the pimento-wood grill.",
      },
      {
        name: "Sweetwood Jerk Joint",
        area: "Kingston, near Emancipation Park",
        description: "A wide jerk menu — chicken, pork, sausage, lamb, fish and conch — with traditional pimento-wood barbecue sides.",
      },
      {
        name: "Gloria's",
        area: "Kingston",
        description: "A long-standing favourite for seafood.",
      },
      {
        name: "Moby Dick",
        area: "Kingston",
        description: "Known for curried goat and old-school Jamaican cooking.",
      },
      {
        name: "Scotchies",
        area: "Montego Bay (original), plus Ocho Rios and Kingston",
        description: "One of Jamaica's most famous jerk centres — open-air, pimento-wood barbecue, wooden tables and barrel stools. The Montego Bay original is the one most people mean by \"Scotchies.\"",
      },
    ],
    symbols: {
      motto: "Out of Many, One People",
      anthem: {
        title: "Jamaica, Land We Love",
        lyricist: "Hugh Sherlock",
        composer: "Robert Lightbourne (arranged by Mapletoft Poulle)",
        adopted: "1962, at independence",
        officialUrl: "https://jis.gov.jm/information/anthem-pledge/",
      },
      pledge: {
        text: "Before God and all mankind, I pledge the love and loyalty of my heart, the wisdom and courage of my mind, the strength and vigor of my body in the service of my fellow citizens, I promise to stand up for Justice, Brotherhood and Peace, to work diligently and creatively, to think generously and honestly, so that Jamaica may, under God, increase in beauty, fellowship and prosperity, and play her part in advancing the welfare of the whole human race.",
        sourceName: "Jamaica Information Service and Ministry of Foreign Affairs and Foreign Trade (mfaft.gov.jm)",
        sourceUrl: "https://mfaft.gov.jm/site/national-anthem-song-and-pledge/",
      },
    },
    lastUpdated: "August 2026",
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((g) => g.slug === slug);
}
