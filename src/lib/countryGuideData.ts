// Country guides: practical orientation for each CARICOM country, covering
// demographics, cost of living, things to see and do, food, and national
// symbols. Built one country at a time, in alphabetical order, and researched
// from named sources below each entry; this is not paraphrased Wikipedia,
// it is independently sourced and cited so figures can be checked and updated.
//
// Anthems: title/composer/adoption year only, with a link to an official
// source to listen. Full lyrics are never reproduced on this site, even when
// a comparison source quotes them.
//
// Pledge: many CARICOM countries don't have a distinct, publicly documented
// "national pledge" text (as opposed to an anthem or citizenship oath). The
// field is left out entirely for a country rather than filled with anything
// unverified: never guess or paraphrase a pledge from memory.
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
  asOf: string; // e.g. "August 2026"; cost of living data goes stale fast
};

export type PlaceToSee = { name: string; description: string };
export type Experience = { title: string; description: string };
export type PlaceToEat = { name: string; description: string; area?: string };
export type LocalDish = { name: string; description: string };
export type VisitorFaqEntry = { q: string; a: string };
export type MovingHereArea = { name: string; description: string };

export type MovingHere = {
  visaWorkPermit: string; // entry, work permits, and the CSME route for CARICOM nationals
  residency?: string;
  healthcare: string;
  taxes: string;
  areas: MovingHereArea[]; // neighbourhoods/towns worth knowing for someone relocating, not just visiting
  notes?: string;
  sourceName: string;
  sourceUrl?: string;
  secondarySourceName?: string;
  secondarySourceUrl?: string;
  asOf: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
  display: string; // human-readable, e.g. "17.06°N, 61.80°W"
};

// A real, appropriately-licensed photo, self-hosted under /public, never
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
    officialUrl?: string; // where to listen / read about it, never lyrics on-site
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
  movingHere?: MovingHere;
  placesToSee: PlaceToSee[];
  experiences: Experience[];
  localDishes?: LocalDish[];
  placesToEat: PlaceToEat[];
  symbols: NationalSymbols;
  visitorFaq?: VisitorFaqEntry[];
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
        "Expect rent to vary a lot depending on the type of listing: a premium, expat-oriented apartment costs noticeably more than an ordinary local rental in the same area, which is why the range above is wide. Prices are quoted in US dollars since the EC dollar is pegged to it.",
      sourceName: "Numbeo, Global Citizen Solutions and Wise",
      sourceUrl: "https://www.globalcitizensolutions.com/the-cost-of-living-in-antigua-and-barbuda/",
      secondarySourceName: "TheLatinvestor real-estate market analysis and expat relocation guides (typical local figures)",
      secondarySourceUrl: "https://thelatinvestor.com/blogs/news/antigua-rents",
      asOf: "August 2026",
    },
    movingHere: {
      visaWorkPermit:
        "CARICOM nationals can enter visa-free and apply for a CARICOM Skills Certificate (the CSME route) to live and work in Antigua and Barbuda without a work permit; see the CSME steps for Antigua and Barbuda for the application process. Non-CARICOM nationals commonly get a visa-free stay of up to 180 days as visitors, but need a work permit, arranged through a local employer, before taking up employment.",
      residency:
        "Antigua and Barbuda also runs an investment-based Permanent Residence programme, open to people who can show a minimum annual income of US$100,000 and pay a flat annual tax of US$20,000, with a minimum physical presence of only around 30 days a year, plus a separate Citizenship by Investment programme typically processed in 3 to 6 months. Both are aimed at people buying tax residency or a second passport, not the standard route for someone moving here to work.",
      healthcare:
        "Mount St. John's Medical Centre in St. John's is the main public hospital. Most movers carry private health insurance, roughly US$240-390/month for local coverage or US$400-800/month for an international plan, and use private clinics for routine care. For serious or specialist treatment, medical evacuation to Miami (about 3 hours by air) or Barbados is common, so it's worth checking what a policy covers for evacuation.",
      taxes:
        "Antigua and Barbuda has charged no personal income tax on residents since April 2016, covering wages, business, pension and investment income alike, with no capital gains, inheritance or wealth tax either. The tax most residents notice day to day is the Antigua and Barbuda Sales Tax (ABST), a 15% consumption tax added to most goods and services.",
      areas: [
        {
          name: "Saint John's",
          description:
            "The capital, with roughly 22,000 people and most government offices, banks and medical facilities on the island. Two-bedroom apartments run roughly US$800-1,200/month.",
        },
        {
          name: "Jolly Harbour",
          description:
            "A planned resort community built around a 700-berth marina, with a golf course and its own private security, drawing plenty of North American and European movers. Two-bedroom condos run roughly US$1,500-2,500/month.",
        },
        {
          name: "English Harbour and Falmouth Harbour",
          description:
            "The island's sailing heartland, home to the UNESCO-listed Nelson's Dockyard and a magnet for the yachting crowd. Costs generally run higher here than in Jolly Harbour.",
        },
        {
          name: "Five Islands Village",
          description:
            "A cheaper alternative close to the airport, with easy beach access. Two- to three-bedroom houses run roughly US$900-1,500/month.",
        },
      ],
      sourceName: "Expat.com",
      sourceUrl: "https://www.expat.com/en/guide/central-america/antigua-and-barbuda/",
      secondarySourceName: "Caribbean Journal",
      secondarySourceUrl: "https://www.caribjournal.com/2016/04/10/this-caribbean-country-just-abolished-income-tax/",
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
        description: "Steel pan and reggae over English Harbour as the sun goes down: a weekly institution, not just a tourist event.",
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
        description: "Salt-cured cod cooked down with garlic, tomato, pepper and onion: a weekend, especially Sunday, favourite.",
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
        description: "A family-run beach bar for local dishes (curry conch, bake and saltfish, curry goat) with live steel pan.",
      },
      {
        name: "Trappas",
        area: "English Harbour",
        description: "A long-running, casual spot for Caribbean and seafood dishes, popular with the yachting crowd.",
      },
      {
        name: "Incanto Restaurant & Lounge",
        area: "Near Nelson's Dockyard",
        description: "Italian menu: risotto, gnocchi and lobster linguine.",
      },
      {
        name: "Fat Cat Coffee",
        area: "Antigua",
        description: "One of Antigua's most consistently well-regarded coffee houses.",
      },
      {
        name: "Nobu Barbuda",
        area: "Princess Diana Beach, Barbuda",
        description: "The Caribbean's only Nobu: Japanese-Peruvian fusion on a remote beach, reachable by boat or helicopter. A splurge, not an everyday spot.",
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
      // official source, only a citizenship Oath of Allegiance in a
      // different context. Left out rather than guessed or copied from an
      // unverified secondary source.
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit Antigua and Barbuda?",
        a: "Antigua is mid-to-upper range for the Eastern Caribbean. A budget traveller can expect roughly US$100–150/day (guesthouse, local food, limited tours); mid-range roughly US$200–350/day (a 3–4 star hotel or Airbnb, a mix of local and nicer restaurants, a few tours); luxury US$500+/day (resort or boutique hotel, fine dining, private tours). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1. US dollars are widely accepted in tourist areas, though change may come back in XCD. Major cards work in most hotels, restaurants and larger shops, but smaller vendors and markets often prefer cash. ATMs are available in St. John's, major resorts and some villages; let your bank know you're travelling first.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, usually up to 30–90 days, with a valid passport and proof of onward travel. Always confirm current rules with the Antigua and Barbuda Immigration Department or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the island?",
        a: "Taxis are readily available at the airport, cruise port and major hotels; agree the fare in advance. Rental cars are available in St. John's and at the airport; driving is on the left, and roads are generally good but narrow and hilly in places. Local buses connect St. John's with many villages cheaply, though schedules are informal. Water taxis and ferries run for beach hops and trips to Barbuda.",
      },
      {
        q: "What local food should I try?",
        a: "Fungee and pepperpot is the national dish: a cornmeal-and-okra side (fungee) with a spiced stew (pepperpot) of spinach, eggplant, peas and meat. Also look for saltfish (a Sunday favourite), goat water, fresh grilled fish, lobster and conch, and bakes with saltfish or cheese as a street snack. Try the St. John's Public Market or the beach bars around English Harbour and Jolly Harbour.",
      },
      {
        q: "Is Antigua and Barbuda safe for tourists?",
        a: "Most visits are trouble-free. Use normal precautions: don't leave valuables in cars, avoid poorly lit areas at night, and keep an eye on belongings at the beach. Petty theft is the main risk, especially in crowded areas. Check your government's current travel advisory before you go.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds. July–October is the rainier, cheaper, hurricane-season stretch. For reliable sun, aim for December–April; for a better deal with decent weather, May–June or November.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals, a hat and sunglasses, plus sunscreen and insect repellent. A light jacket or sweater helps for air-conditioned spaces and breezy boat trips. Bring something a little more modest if you'll visit a church or formal venue, and a rain jacket or umbrella if travelling in the wetter months.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "A friendly \"good morning\" or \"good afternoon\" before asking a question is expected and appreciated. Dress is generally casual, but modest attire is expected in churches and some villages. Tipping 10–15% in restaurants is standard if a service charge isn't already included, and small tips for taxi drivers and tour guides are welcome. Sunday is traditionally quiet, with some shops and services on reduced hours.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "barbados",
    name: "Barbados",
    tagline: "The Caribbean's culinary capital: a former British colony turned republic, built around rum, reefs and Bajan cuisine.",
    overview:
      "Barbados is the easternmost Caribbean island, a former British colony that became a parliamentary republic in 2021. It combines well-developed tourism infrastructure with deep cultural heritage: historic Bridgetown, the birthplace of rum, and a food scene often called the best in the Caribbean.",
    photo: {
      src: "/destinations/barbados.jpg",
      alt: "Crane Beach, Barbados",
      credit: "Johnmartindavies, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Crane_Beach.JPG",
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
        "Barbados runs more expensive than most of its CARICOM neighbours, especially housing on the south and west coasts and imported goods. A public bus pass runs roughly US$25–30/month, though coverage is limited. Luxury villas and premium rentals can run well beyond US$7,000/month. Listed rents vary a lot by source, so treat the ranges above as a starting point rather than a fixed price.",
      sourceName: "Numbeo",
      sourceUrl: "https://www.numbeo.com/cost-of-living/in/Bridgetown",
      secondarySourceName: "current rental listings and relocation guides (typical and popular-parish figures)",
      asOf: "August 2026",
    },
    movingHere: {
      visaWorkPermit:
        "Barbados is one of the four CARICOM countries with full free movement: nationals of Barbados, Belize, Dominica and St. Vincent and the Grenadines can live and work in each other's countries without a CSME Skills Certificate. Other CARICOM nationals still apply for the CSME Skills Certificate; see the CSME steps for Barbados for the process. Non-CARICOM nationals can enter visa-free for up to 6 months as visitors but need an employer-sponsored work permit for local employment, or can apply for the Barbados Welcome Stamp, a renewable 12-month visa for people working remotely for an employer outside Barbados.",
      residency:
        "The Welcome Stamp requires proof of at least US$50,000 in income over the visa year, an application fee of US$2,000 for an individual (US$3,000 for a family), and comes with an exemption from Barbados income tax on that foreign income for the visa's term; it does not permit local employment. Standard permanent residence is available after 5 years of continuous residence, and citizenship after 7 years for Commonwealth nationals. A Special Entry and Reside Permit (SERP) exists for retirees over 60 and high-net-worth individuals with substantial income and assets.",
      healthcare:
        "Queen Elizabeth Hospital (QEH) in Bridgetown is the main public hospital, backed by six polyclinics for primary care, funded partly through National Insurance Scheme contributions. Private GP visits run roughly BBD 75-150 and specialists BBD 150-300; international health insurance, required for the Welcome Stamp, typically runs US$150-500/month depending on age and coverage.",
      taxes:
        "Barbados taxes residents on worldwide income on a progressive scale: the first roughly BBD 25,000 a year is tax-exempt, then rates rise through 17.5% and 28.5% to 33.5% on income above BBD 60,000 a year, with a further exemption for people over 60. VAT is 17.5% on most goods and services. Welcome Stamp holders pay no Barbados tax on the foreign income that qualified them for the visa, but still pay VAT on local purchases.",
      areas: [
        {
          name: "Bridgetown",
          description:
            "The capital and commercial centre. Two-bedroom apartments on the edges of town run roughly BBD 2,500-4,000/month.",
        },
        {
          name: "The Platinum Coast (Holetown, Speightstown)",
          description:
            "The well-known west-coast strip, popular with longer-term movers and retirees. Apartment rents start around BBD 5,000/month and go well beyond that for villas.",
        },
        {
          name: "The south coast (St. Lawrence Gap, Hastings, Worthing, Oistins)",
          description:
            "A livelier, more affordable strip mixing apartments, nightlife and the working fishing village at Oistins. Two-to-three-bedroom houses run roughly BBD 2,000-5,000/month.",
        },
        {
          name: "The interior and east coast",
          description:
            "Quieter parishes away from the tourist coasts, generally the most affordable option, with spacious houses from around BBD 1,500-3,500/month.",
        },
      ],
      sourceName: "Expat.com",
      sourceUrl: "https://www.expat.com/en/guide/central-america/barbados/",
      secondarySourceName: "Barbados Welcome Stamp (official, via Visit Barbados)",
      secondarySourceUrl: "https://visitbarbados.org/barbados-welcome-stamp",
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
          "The only house outside the continental US where George Washington lived: six weeks in 1751, aged 19. Now a museum within the Garrison, with access to old tunnels.",
      },
      {
        name: "St. Nicholas Abbey",
        description: "A well-preserved 1658 plantation house with its own rum distillery, gardens and a heritage railway.",
      },
      {
        name: "Carlisle Bay",
        description: "A calm, clear bay near Bridgetown with several shipwrecks close to shore, popular for snorkelling and swimming with sea turtles.",
      },
      {
        name: "Crane Beach",
        description: "Pink-tinged sand below 80-foot cliffs on the southeast coast, regularly ranked among the world's best beaches.",
      },
      {
        name: "Bathsheba and the east coast",
        description:
          "A rugged Atlantic coastline with the mushroom-shaped rock formations of the Soup Bowl: dramatic for photos and surfing, not for casual swimming.",
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
        description: "The south coast's dining and nightlife strip: everything from casual bars to gourmet restaurants, near Dover Beach.",
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
        description: "Baked, spiced macaroni and cheese: a Bajan Sunday-table staple, not a side dish to skip.",
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
        description: "Fine dining with a Michelin-trained chef and sea views over illuminated waters: a special-occasion splurge.",
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
        description: "A decades-old, no-frills stand famous for its fried marlin fish cutter sandwiches, one of the island's most-loved cheap eats.",
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
    visitorFaq: [
      {
        q: "How much does it cost to visit Barbados?",
        a: "Barbados is a premium Caribbean destination, priced higher than many smaller islands. A budget traveller can expect roughly US$120–180/day (guesthouse or budget hotel, local food, limited tours); mid-range roughly US$250–400/day (a 3–4 star hotel or nice Airbnb, a mix of local and nicer restaurants, several tours); luxury US$600+/day (upscale resort or boutique hotel, fine dining, private tours). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Barbadian dollar (BBD), fixed at BBD 2 to US$1. US dollars are widely accepted in tourist areas, though change may come back in BBD. Major cards work in most hotels, restaurants and larger shops, but smaller vendors and markets often prefer cash. ATMs are widely available in Bridgetown, the south coast and other tourist areas.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 90 days, with a valid passport and proof of onward travel. Always confirm current rules with the Barbados Immigration Department or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the island?",
        a: "Government and private buses cover most of the island cheaply and fairly reliably. Taxis are readily available at the airport, cruise port and major hotels; agree the fare in advance. Rental cars are available at the airport and in major towns; driving is on the left, and roads are generally good but narrower in rural areas. Route taxis and shared vans run along main routes and cost less than a private taxi.",
      },
      {
        q: "What are the must-do experiences in Barbados?",
        a: "Swim with sea turtles and snorkel shipwrecks on a catamaran cruise from Bridgetown or the south coast, walk historic Bridgetown and the Garrison (a UNESCO World Heritage Site) and George Washington House, tour St. Nicholas Abbey's plantation house and rum distillery, relax on Crane Beach or the south-coast beaches, catch the Oistins Fish Fry on a Friday night, and tour a rum distillery such as Mount Gay, Foursquare or St. Nicholas Abbey.",
      },
      {
        q: "What local food should I try?",
        a: "Cou-cou and flying fish is the national dish. Also look for macaroni pie, fish cakes, pudding and souse (a traditional Saturday dish), and fresh grilled fish, lobster and conch. The Oistins Fish Market and Fish Fry, south-coast beachfront grills, and local cookshops in Bridgetown and other towns are good places to start.",
      },
      {
        q: "Is Barbados safe for tourists?",
        a: "Barbados is generally considered one of the safer Caribbean destinations for tourists. Use normal precautions: don't leave valuables in cars, avoid poorly lit areas at night, and keep an eye on belongings at the beach. Petty theft can occur, especially in crowded areas and at night. Check your government's current travel advisory before you go.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds. July–October is the rainier, cheaper, hurricane-season stretch. Many visitors choose May–June or November for the best mix of weather and value.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals, a hat and sunglasses, plus sunscreen and insect repellent. A light jacket or sweater helps for air-conditioned spaces and evening breezes. Bring something a little more modest if you'll visit a church or formal venue, and a rain jacket or umbrella if travelling in the wetter months.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Barbadians (\"Bajans\") value good manners; a greeting before asking a question is appreciated. Dress is casual but neat, with modest attire expected in churches and some villages. Tipping 10–15% in restaurants is standard if a service charge isn't already included, and small tips for taxi drivers and tour guides are welcome. Friday night at Oistins Fish Fry draws a crowd, so expect music, noise and a lively atmosphere.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "belize",
    name: "Belize",
    tagline: "The only English-speaking CARICOM country in Central America: the world's second-largest barrier reef alongside Maya ruins and rainforest.",
    overview:
      "Belize is the only fully Central American member of CARICOM, and the only one with English as its official language. It's a dual destination: the Belize Barrier Reef and its cayes for diving and snorkelling, and Maya ruins, caves and rainforest inland, a mix of marine and jungle that few CARICOM countries can offer.",
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
      areaKm2: "≈22,966 km² (much larger than any other CARICOM member except Guyana and Suriname, since Belize is mainland Central America, not an island)",
      independence: "21 September 1981, from the United Kingdom",
      capital: "Belmopan, a small, purpose-built inland capital. Belize City, the former capital, remains the largest city and main commercial hub.",
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
      medianAge: "≈27–28 years (young relative to most CARICOM members)",
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
        "Belize is generally cheaper than the Caribbean islands, but costs vary sharply between mainland towns and the tourist cayes: a beachfront rental on Ambergris Caye or Placencia can run US$3,500–6,000+ a month all-in. A local bus fare runs roughly US$1–3, with fuel around US$1.30–1.70 per litre.",
      sourceName: "Numbeo",
      sourceUrl: "https://www.numbeo.com/cost-of-living/in/Belize-City",
      secondarySourceName: "rental listings and expat relocation guides (typical mainland and caye figures)",
      asOf: "August 2026",
    },
    movingHere: {
      visaWorkPermit:
        "Belize is one of the four CARICOM countries that have moved past the standard CSME certificate to full free movement: nationals of Belize, Barbados, Dominica and St. Vincent and the Grenadines can settle and work in each other's countries without any extra application. Other CARICOM nationals still need the CSME Skills Certificate; see the CSME steps for Belize for that process. Most non-CARICOM visitors get 30 to 90 days visa-free depending on nationality, but taking up a job requires a work permit sponsored by a Belizean employer, applied for through the Immigration Department.",
      residency:
        "Temporary residency suits people moving for work, family or retirement, and calls for proof of income plus a background check; a year on that status opens the door to permanent residency once further financial and background paperwork clears. Belize also runs a dedicated retirement route, the Qualified Retired Persons (QRP) programme: anyone 40 or older with at least US$2,000 a month (US$24,000 a year) coming in from outside the country can apply, and the only presence requirement is 30 consecutive days a year in Belize. QRP status also comes with duty-free import allowances for personal belongings.",
      healthcare:
        "Public clinics and hospitals handle emergencies well, and having English-speaking staff is a real advantage for newly arrived movers, but routine and specialist care thins out once you're away from Belize City. Anything more involved than a standard hospital stay often means travelling to Mexico, Guatemala or the US, so most movers pair local coverage with a policy that includes medical evacuation. Dial 911 for emergencies.",
      taxes:
        "Individual income above an exempt band of roughly BZ$26,000-29,000 a year is taxed at a flat 25%; the exact threshold shifts slightly depending on the source, so check the current figure with the Belize Tax Service before budgeting around it. QRP retirees get a further break, since approved retirement income brought in from abroad isn't taxed locally.",
      areas: [
        {
          name: "Belize City",
          description:
            "The country's largest city and commercial hub, with the main hospitals, schools and international airport, even though Belmopan is the capital.",
        },
        {
          name: "Ambergris Caye (San Pedro)",
          description:
            "The busiest and most developed of the cayes, with the largest concentration of long-term movers, dive operators and restaurants.",
        },
        {
          name: "Caye Caulker",
          description:
            "A quieter island a short boat ride from Ambergris Caye, with a slower pace that suits retirees and remote workers who want less going on.",
        },
        {
          name: "Placencia",
          description: "A laid-back peninsula village on the southern mainland coast with a long-established community of movers.",
        },
        {
          name: "San Ignacio",
          description:
            "An inland Cayo District town near the Guatemalan border, used as a base for rainforest and Maya-ruin trips, and generally cheaper than the coast.",
        },
        {
          name: "Corozal",
          description: "A northern town close to the Mexican border, popular with retirees for its lower cost of living.",
        },
      ],
      sourceName: "Expat.com",
      sourceUrl: "https://www.expat.com/en/guide/central-america/belize/",
      secondarySourceName: "Belize Tourism Board (QRP programme, official)",
      secondarySourceUrl: "https://www.belizetourismboard.org/programs-events/retirement-program/",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Belize Barrier Reef",
        description: "The second-largest barrier reef in the world and a UNESCO World Heritage Site, running the length of the coast and around dozens of cayes.",
      },
      {
        name: "Great Blue Hole",
        description: "A giant marine sinkhole on Lighthouse Reef: a signature dive site for the certified, and a dramatic sight from a scenic flight for everyone else.",
      },
      {
        name: "Hol Chan Marine Reserve & Shark Ray Alley",
        description: "A protected reef channel near San Pedro thick with fish, turtles and rays, next to a shallow sandbar where you can swim with nurse sharks and stingrays.",
      },
      {
        name: "Caye Caulker",
        description: "A laid-back island built around a \"Go Slow\" motto: golf carts instead of cars, easy snorkelling and day trips to the reef.",
      },
      {
        name: "Placencia & Hopkins",
        description: "Southern coastal villages with beaches, reef access, and Garifuna cultural heritage.",
      },
      {
        name: "Actun Tunichil Muknal (ATM Cave)",
        description: "A sacred Maya cave with calcified skeletal remains and ceramics still in place, reached by a jungle trek and river crossings, one of Belize's best-known adventures.",
      },
      {
        name: "Xunantunich",
        description: "A major Maya site near San Ignacio, with the climbable \"El Castillo\" pyramid and views into Guatemala.",
      },
      {
        name: "Caracol",
        description: "A large, remote Maya city deep in the Chiquibul Forest, a longer drive than Xunantunich, and a more adventurous ruins visit.",
      },
      {
        name: "Cockscomb Basin Wildlife Sanctuary",
        description: "A protected reserve known for jaguar conservation, hiking trails and waterfalls.",
      },
    ],
    experiences: [
      {
        title: "Snorkelling Hol Chan and Shark Ray Alley",
        description: "Drifting through a coral channel and swimming with nurse sharks and rays in shallow water, often the top first activity for visitors.",
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
        description: "Floating through underground river systems in inner tubes, usually combined with a rainforest walk, commonly run as a day trip from San Ignacio or Belize City.",
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
        description: "Fried corn masa turnovers filled with fish or beans: a Mestizo-influenced snack sold everywhere.",
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
        description: "A San Pedro institution since 1974, from a burger window to a full seafood restaurant: Belize Tourism Board's Restaurant of the Year in 2022.",
      },
      {
        name: "Estel's Dine by the Sea",
        area: "San Pedro, Ambergris Caye",
        description: "A family-run, beachfront spot for Belizean breakfast (fry jacks, chorizo and beans) right on the sand.",
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
    visitorFaq: [
      {
        q: "How much does it cost to visit Belize?",
        a: "Belize is moderate by regional standards: mainland towns are cheaper, and the cayes, especially San Pedro on Ambergris Caye, are pricier. A budget traveller can expect roughly US$80–130/day (hostel or guesthouse, local food, public transport, few tours); mid-range roughly US$180–300/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several tours); luxury US$400+/day (resort or eco-lodge, private tours, fine dining). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Belize dollar (BZD), fixed at BZ$2 to US$1. US dollars are widely accepted almost everywhere, though change may come back in BZD. Major cards work in many hotels, restaurants and larger shops, especially in tourist areas, but smaller vendors and rural spots often prefer cash. ATMs are available in Belize City, San Pedro, Caye Caulker, San Ignacio and other main towns.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 30 days and extendable, with a passport valid at least 6 months beyond your stay and proof of onward travel. Always confirm current rules with the Belize Immigration Department or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the country?",
        a: "Inexpensive inter-town buses connect Belize City, San Ignacio, Dangriga and Corozal, with informal but frequent schedules on main routes. Water taxis run fast boats between Belize City, San Pedro and Caye Caulker; book ahead in high season. Small domestic airlines link Belize City with San Pedro, Caye Caulker, Placencia and some inland airstrips. Taxis operate in towns and at the airport; agree the fare in advance. Rental cars are available at the airport and in major towns; unlike most of the Eastern Caribbean, driving in Belize is on the right, and roads range from paved highways to rough gravel in rural areas.",
      },
      {
        q: "What local food should I try?",
        a: "Look for rice and beans with chicken, beef or fish (often with potato salad and plantains), fry jacks for breakfast, hudut (a Garifuna dish of mashed plantains with fish or chicken in coconut broth), and Mestizo-influenced snacks like tamales, empanadas and panades. Fresh grilled fish, conch and ceviche are common on the coast and cayes. Try local eateries in San Ignacio, cook-shops in towns, beach grills on the cayes, and market stalls in Belize City.",
      },
      {
        q: "Is Belize safe for tourists?",
        a: "Belize can be visited safely, but it has higher crime rates in some urban areas, particularly parts of Belize City. Tourist areas like San Ignacio, the cayes, Placencia and major resorts are generally fine with normal precautions: avoid walking alone at night in unfamiliar urban areas, don't flash valuables, and use reputable tour operators and transport. Check your government's current travel advisory and ask your hotel or tour operator about areas to avoid.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is the rainier, hurricane-season stretch, with lower prices and some tours possibly limited. For diving, snorkelling and cave trips with reliable weather, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and sturdy shoes for hiking or cave trips, plus sunscreen, a hat, sunglasses and insect repellent (important in the jungle and in the evenings). Quick-dry clothes and a small dry bag help for boat trips and cave tubing. Bring a light rain jacket or poncho, especially in the wetter months. If you're visiting a cave, bring clothes you don't mind getting muddy; some operators require closed-toe shoes.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Belize is genuinely multicultural: Creole, Mestizo, Garifuna, Maya, Mennonite, East Indian, Chinese and more. Dress modestly in villages and churches. English is official, but you'll hear Kriol, Spanish, Garifuna and Maya languages daily; a friendly attitude goes a long way. Tipping 10–15% in restaurants is standard if a service charge isn't already included, with small tips for guides, boat captains and drivers appreciated. Life on the cayes runs slower than on the mainland, especially in the towns.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "dominica",
    name: "Dominica",
    tagline: "The \"Nature Isle of the Caribbean\": a mountainous, volcanic island built for hikers and divers, not beach loungers.",
    overview:
      "Dominica is a mountainous, volcanic island of rainforest, rivers and hot springs, and the only Eastern Caribbean island still home to a Kalinago (Carib) community, the region's last pre-Columbian population. It's less developed for mass tourism than most of its neighbours and has few sandy beaches: the draw here is hiking, diving and nature, not lounging.",
    photo: {
      src: "/destinations/dominica.jpg",
      alt: "Boiling Lake, Morne Trois Pitons National Park, Dominica",
      credit: "Bayukjdr, CC BY-SA 4.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Dominica_Boiling_Lake.jpg",
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
        "Parliamentary republic: one of the few CARICOM states never to retain the British monarch as head of state after independence. A President, elected by the House of Assembly, is head of state; a Prime Minister is head of government.",
      medianAge: "≈35.6 years (2023 estimate)",
      ageStructure: "0–14 years: ≈18–21%. 15–64 years: ≈66–69%. 65 years and over: ≈13–14%.",
      ethnicComposition: {
        value: "African descent ≈85%, mixed ≈9%, indigenous Kalinago (Carib) ≈4%, other/unspecified ≈3%",
        sourceName: "CIA World Factbook (2011 census, most recent available)",
      },
      urbanizationNote:
        "Most people live in and around Roseau and the southwest. Portsmouth is the second-largest town. Dominica is the only Eastern Caribbean island where a Kalinago community survived colonisation: around 3,000–3,500 people live in the Kalinago Territory on the east coast, though only a small number are considered \"pure\" Kalinago after generations of intermarriage.",
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
        "Dominica is one of the more affordable Eastern Caribbean islands, with cheap local food but pricier imports and electricity. A premium lifestyle (luxury rental, frequent dining and tours) can run US$3,500–5,000+/month. Minibus fares run roughly US$0.50–1.50 per trip.",
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
        description: "Home to the Caribbean's last Kalinago (Carib) community, on the east coast: craft, cultural sites and coastal scenery.",
      },
    ],
    experiences: [
      {
        title: "The Boiling Lake hike",
        description: "A full-day, guided trek through rainforest and the Valley of Desolation to the edge of the lake, one of the Caribbean's most demanding and iconic hikes.",
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
        description: "A 185km, 14-segment trail across the whole island, the Caribbean's only long-distance hiking trail, walkable in day-length sections or end to end.",
      },
    ],
    localDishes: [
      {
        name: "Callaloo",
        description: "A leafy-green soup, similar to spinach, cooked with okra, coconut milk and often crab or saltfish.",
      },
      {
        name: "Crab back",
        description: "Seasoned crab meat stuffed back into the shell: a festive, flavourful local specialty.",
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
          "Dominica's traditional national dish is actually a large frog (Leptodactylus fallax), not poultry. A chytrid fungus outbreak in 2002 wiped out over 80% of the wild population within 18 months, and it's now Critically Endangered: around 100 individuals remain in the wild across Dominica and Montserrat combined. Hunting has been banned since 2004. It's mentioned here for cultural context, not as something to order.",
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
        description: "A local favourite blending Italian and Caribbean cooking: lionfish and grilled mahi-mahi are the dishes to order.",
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
    visitorFaq: [
      {
        q: "How much does it cost to visit Dominica?",
        a: "Dominica is moderate to affordable by Caribbean standards, especially for nature-focused travellers. A budget traveller can expect roughly US$80–120/day (guesthouse or basic hotel, local food, public transport, self-guided hikes); mid-range roughly US$150–250/day (a comfortable hotel or eco-lodge, a mix of local and nicer restaurants, guided tours); luxury US$350+/day (a high-end eco-lodge or boutique hotel, private guides, fine dining). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1. US dollars are often accepted in tourist areas, though change may come back in XCD. Major cards work in many hotels, larger restaurants and some shops in Roseau, but smaller vendors, markets and rural spots often prefer cash. ATMs are available in Roseau and a few other towns but limited elsewhere, so carry cash for villages and trailheads.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 21–90 days, with a valid passport and proof of onward travel. Always confirm current rules with the Dominica Immigration Division or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the island?",
        a: "Inexpensive local buses and minibuses connect Roseau with many villages and key sites, though schedules can be informal. Taxis are available at the airport, cruise port and in Roseau; agree the fare in advance. Rental cars are available at the airport and in Roseau; driving is on the left, and roads are narrow, mountainous and can be challenging, with a 4x4 recommended for the interior. Major hikes like Boiling Lake are usually done through an organised tour, since a guide is effectively required and transport is included.",
      },
      {
        q: "What local food should I try?",
        a: "Callaloo (a leafy-green dish, often with crab or saltfish), crab back (stuffed crab shells, a festive specialty), rice and peas with dumplings and stewed fish or chicken, and fresh grilled fish, lobster in season and conch. Dominica's traditional national dish is actually mountain chicken, a large frog now critically endangered and protected since a 2004 hunting ban, so it's not something to order. Try the small local restaurants and cook-shops in Roseau and Portsmouth.",
      },
      {
        q: "Is Dominica safe for tourists?",
        a: "Dominica is generally considered one of the safer Caribbean islands for tourists. Violent crime against visitors is rare; petty theft can occur, especially in crowded areas or if valuables are left unattended. Use normal precautions: don't leave bags on the beach, avoid poorly lit areas at night, and secure valuables in your accommodation. For hikes, always use a reputable guide, especially for challenging trails like Boiling Lake. Check your government's current travel advisory before you go.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry season: the best weather for hiking and diving, and the busiest. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is rainier and more humid with higher hurricane risk, and some trails may be muddy or closed. For serious hiking and diving, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and sturdy hiking shoes with good grip, plus sunscreen, a hat, sunglasses and strong insect repellent. Bring a rain jacket or poncho and quick-dry clothes for hikes and waterfalls, and a small daypack with water, snacks and basic first aid for trails. For Boiling Lake or other strenuous hikes, lightweight long trousers and moisture-wicking shirts help, and trekking poles are worth considering.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Dominicans are generally friendly and a little reserved; a polite greeting before asking a question is appreciated. Dress is casual, with modest attire expected in churches and some villages. Tipping 10% in restaurants is standard if a service charge isn't already included, with small tips for guides and drivers welcome. Stay on marked trails, don't litter, and follow your guide's instructions, especially in the volcanic and rainforest areas.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "grenada",
    name: "Grenada",
    tagline: "The \"Spice Isle\": a tri-island state built on nutmeg, and home to the world's first underwater sculpture park.",
    overview:
      "Grenada is a tri-island state (Grenada, Carriacou and Petite Martinique) long known as the \"Spice Isle\" for the nutmeg, mace, cocoa and cinnamon grown on its slopes; nutmeg appears on the national flag. It's also a country that has rebuilt more than once: a 1979 revolution and its violent 1983 collapse brought a brief US-led intervention, and Hurricane Ivan in 2004 destroyed 90% of the island's buildings and nearly wiped out the nutmeg industry overnight. Today it's calm, green and mountainous, with diving, waterfalls and rainforest as much a draw as its beaches.",
    photo: {
      src: "/destinations/grenada.jpg",
      alt: "Grand Anse Beach, Grenada",
      credit: "Varun Kapoor, CC BY 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Grand_Anse_Beach_Grenada.jpg",
    },
    coordinates: { lat: 12.05, lng: -61.75, display: "12.05°N, 61.75°W" },
    demographics: {
      population: {
        value: "≈114,000–117,000 (2024–2025 estimate)",
        sourceName: "Worldometer / CIA World Factbook",
        sourceUrl: "https://www.worldometers.info/world-population/grenada-population/",
      },
      areaKm2: "≈344 km² across three inhabited islands: Grenada (≈311 km²), Carriacou (≈34 km²) and Petite Martinique (≈2.4 km²)",
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
        "Carriacou and the northern parishes (e.g. Sauteurs) run 50–70% cheaper than the south-coast expat corridor. A premium lifestyle (a beachfront rental near Grand Anse, frequent dining and tours) can run US$3,500–5,000+/month. Local minibuses (\"reggae buses\") cost roughly US$1–3 per trip; taxis run about US$1.50–3/km.",
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
        description: "Operating since 1785 and still turning a water wheel, the oldest functioning water-driven distillery in the Caribbean.",
      },
      {
        name: "Belmont Estate",
        description: "A 17th-century plantation turned working organic cocoa farm, with tours through the chocolate-making process.",
      },
      {
        name: "Carriacou",
        description: "Grenada's larger sister island, quieter and less developed: Hillsborough town, boatbuilding traditions, and its own set of beaches and dive sites.",
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
        description: "Grenada's carnival, centred on St. George's in early August after a season that builds from May: soca, costume bands and street parades.",
      },
      {
        title: "Diving the Bianca C wreck",
        description: "A 180-metre former passenger liner that sank in 1961, now one of the largest diveable shipwrecks in the Caribbean, for experienced divers only given its depth.",
      },
      {
        title: "Snorkelling the Underwater Sculpture Park",
        description: "Shallow enough for snorkellers, not just divers, to see the sculptures up close.",
      },
      {
        title: "Nutmeg and spice plantation tours",
        description: "Visits to working spice estates to see how nutmeg, mace and cocoa are grown and processed, the industry that gave Grenada its nickname.",
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
        description: "Conch meat, marinated and tenderised with local spices: grilled, stewed, or added to a seafood oil down.",
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
        description: "Grenadian food tapas-style: oil down, callaloo soup, ginger pork and fish cakes, all in small plates.",
      },
      {
        name: "Umbrella's Beach Bar",
        area: "Grand Anse Beach",
        description: "A women-run beach bar serving fresh, locally-sourced seafood on the sand.",
      },
      {
        name: "The Aquarium",
        area: "Magazine Beach",
        description: "Beachfront dining ranging from casual lunches to fine dining: grilled lobster, jerk chicken and callaloo cannelloni.",
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
        officialUrl: "https://en.wikipedia.org/wiki/Hail_Grenada",
      },
      pledge: {
        text: "I pledge allegiance to my flag and to the country for which it stands, with Liberty, Justice and Equality for all. I pledge also that I shall defend and uphold the Honour, Dignity and Laws and Institutions of my country.",
        sourceName: "Government of Grenada (gov.gd)",
        sourceUrl: "https://www.gov.gd/national-symbols",
      },
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit Grenada?",
        a: "Grenada is moderate to upper-moderate by Caribbean standards; Carriacou and Petite Martinique are quieter and can be cheaper for a simple stay. A budget traveller can expect roughly US$90–140/day (guesthouse or budget hotel, local food, public transport, few tours); mid-range roughly US$180–300/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several tours); luxury US$450+/day (upscale resort or boutique hotel, fine dining, private tours). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1. US dollars are widely accepted in tourist areas, though change may come back in XCD. Major cards work in many hotels, restaurants and larger shops, but smaller vendors, markets and rural spots often prefer cash. ATMs are available in St. George's, Grand Anse and a few other towns, but limited on Carriacou and Petite Martinique.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 90 days, with a valid passport and proof of onward travel. Always confirm current rules with the Grenada Immigration Department or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the island?",
        a: "Inexpensive local buses connect St. George's with most parishes, though schedules can be informal. Taxis are readily available at the airport, cruise port and major hotels; agree the fare in advance. Rental cars are available at the airport and in St. George's; driving is on the left, and roads are generally good but narrow and hilly. Ferries and boats run to Carriacou and Petite Martinique; check schedules ahead, as they vary.",
      },
      {
        q: "What local food should I try?",
        a: "Oil down is the national dish: salted meat or fish, callaloo, dumplings and breadfruit, cooked in coconut milk. Also look for callaloo soup, rice and peas with stewed chicken or fish and provision (root crops), and fresh grilled fish, lobster in season and conch. Try the local cook-shops and market eateries in St. George's, beachfront restaurants along Grand Anse and Lance aux Épines, and estate restaurants like Belmont.",
      },
      {
        q: "Is Grenada safe for tourists?",
        a: "Grenada is generally considered one of the safer Caribbean destinations for tourists. Violent crime against visitors is uncommon; petty theft can occur, especially on beaches or in crowded areas. Use normal precautions: don't leave valuables in cars or on the beach, avoid poorly lit areas at night, and secure belongings in your accommodation. Check your government's current travel advisory before you go.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is rainier and more humid with higher hurricane risk, and some tours may be limited. For beach time, hiking and diving with reliable weather, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and sturdy shoes for waterfall hikes, plus sunscreen, a hat, sunglasses and insect repellent. A light rain jacket or poncho helps, especially in the wetter months. Bring something a little more modest if you'll visit a church or formal venue, and clothes you don't mind getting a bit dirty or damp if you're visiting a spice estate or hiking.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Grenadians are generally warm and polite; a friendly greeting before asking a question is appreciated. Dress is casual but neat, with modest attire expected in churches and some villages. Tipping 10–15% in restaurants is standard if a service charge isn't already included, with small tips for taxi drivers and tour guides welcome. Sunday is traditionally quiet, with some shops and services on reduced hours.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "guyana",
    name: "Guyana",
    tagline: "Mainland South America's only English-speaking country: a vast, largely untouched interior of rainforest, savannah and waterfalls, transformed by a recent oil boom.",
    overview:
      "Guyana is the odd one out geographically among CARICOM's island states: mainland South America, over 80% covered in rainforest, and by far the largest country in the group at more than 200,000 km². Since offshore oil production began in 2019, its economy has grown faster than almost any country on Earth, transforming Georgetown's real estate market and cost of living in the space of a few years. Away from the capital, most of the country is still Amerindian villages, savannah ranches and unbroken forest.",
    photo: {
      src: "/destinations/guyana.jpg",
      alt: "Aerial view of Kaieteur Falls, Guyana",
      credit: "Amanda (amanderson), CC BY 2.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Kaieteur_Falls_Aerial_01.jpg",
    },
    coordinates: { lat: 6.8045, lng: -58.1553, display: "6.80°N, 58.16°W" },
    demographics: {
      population: {
        value: "1,025,334 at end of 2025 (Guyana passed 1 million people for the first time, up from 956,044 a year earlier)",
        sourceName: "Guyana Bureau of Statistics (announced July 2026, World Population Day)",
        sourceUrl: "https://kaieteurnewsonline.com/2026/07/13/guyanas-population-surpasses-1-million-chief-statistician/",
      },
      areaKm2: "≈214,970 km² (by far the largest CARICOM member, over 80% of it rainforest)",
      independence: "26 May 1966, from the United Kingdom. Became a Cooperative Republic on 23 February 1970.",
      capital: "Georgetown",
      officialLanguages: ["English (official)", "Guyanese Creole, widely spoken"],
      currency: "Guyanese dollar (GYD), floating since 2015, trading at roughly GY$209 to US$1",
      government:
        "Cooperative Republic. Unlike several smaller CARICOM states, Guyana's President is an executive head of state and head of government combined (since the 1980 constitution), not a ceremonial office.",
      medianAge: "≈27 years, one of the younger populations in CARICOM",
      ethnicComposition: {
        value: "East Indian ≈40%, African descent ≈29%, mixed ≈20%, Amerindian ≈10.5%, other ≈0.5%",
        sourceName: "CIA World Factbook (2012 census, most recent available)",
      },
      urbanizationNote:
        "Most of the population lives on a narrow coastal strip, with Georgetown the largest city by far. The vast interior (savannah, rainforest, and the Rupununi region bordering Brazil) is sparsely populated, largely by Amerindian communities.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$300–600/month in Georgetown suburbs (Providence, Diamond, East Bank Demerara) or other towns (Linden, New Amsterdam)",
      rentPremium1BR: "≈US$400–900/month for a standard central Georgetown unit, but specific reported cases show the top end running far higher; see notes",
      groceriesSingle: "≈US$150–400/month, wide because local produce is very cheap but imports are not",
      inexpensiveMeal: "≈US$3–15",
      midRangeMealForTwo: "≈US$30–80",
      utilities: "≈US$60–170/month for electricity, water and cooking gas combined (more with regular AC use)",
      budgetModestSingle: "≈US$1,000–1,400/month all-in",
      budgetComfortableSingle: "≈US$1,400–2,500/month all-in",
      notes:
        "Cost of living here needs an asterisk: Guyana's economy has grown faster than almost anywhere on Earth since offshore oil production started in 2019, and Georgetown rents have risen dramatically as a result. One widely reported example saw a property's rent rise over 165% in 2024 alone, and property values are up roughly 500% in five years. That surge is concentrated in oil-industry-driven premium listings; the ranges above reflect more typical local costs, but expect newer, furnished or secure buildings in central Georgetown to run well above them. A premium lifestyle (luxury rental in central Georgetown or an upscale suburb, frequent dining) can run US$2,500–4,000+/month. Minibus and taxi fares in Georgetown run roughly US$0.90–2.20 per ride.",
      sourceName: "Relocation and expat cost-of-living guides, and real-estate reporting on the oil boom",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Kaieteur Falls",
        description:
          "One of the world's most powerful single-drop waterfalls, roughly four times the height of Niagara. No road reaches it; visitors fly in on a small plane over unbroken rainforest.",
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
        description: "A wide, tiered waterfall on the Ireng River bordering Brazil, with warm, shallow pools over reddish jasper stone terraces: less dramatic in height than Kaieteur, more swimmable.",
      },
      {
        name: "Shell Beach",
        description: "One of only four major nesting sites in the world for the endangered leatherback sea turtle, on the remote north-west coast, with nesting season running March to August.",
      },
    ],
    experiences: [
      {
        title: "Flying to Kaieteur Falls",
        description: "A small-plane flight over rainforest canopy to reach the falls, where the journey is as much the experience as the waterfall itself.",
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
        description: "Guyana is one of the world's most serious birding destinations, with harpy eagles, macaws and hundreds of other species in largely untouched habitat.",
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
        description: "An everyday one-pot dish of rice and split peas cooked with meat and coconut milk, brought by enslaved West Africans and similar to Ghanaian waakye.",
      },
      {
        name: "Metemgee",
        description: "Ground provisions (cassava, eddoe, plantain, yam) cooked in coconut milk with dumplings and fish or meat.",
      },
      {
        name: "Roti and curry",
        description: "A strong Indo-Guyanese influence on everyday eating, reflecting the country's East Indian plurality: curried chicken, goat or vegetables wrapped in roti.",
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
        description: "A well-regarded Indian restaurant reflecting Guyana's large Indo-Guyanese population; the paneer tikka masala is a standout.",
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
      // is correct, it's left out, same policy as Belize.
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit Guyana?",
        a: "Guyana is affordable by regional standards, especially outside Georgetown; the oil boom has pushed up some prices in the capital, but overall costs remain low compared with many Caribbean islands. A budget traveller can expect roughly US$60–100/day (guesthouse or budget hotel, local food, public transport, few tours); mid-range roughly US$120–220/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several guided tours); luxury US$300+/day (an upscale Georgetown hotel or interior eco-lodge, private guides, fine dining). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Guyanese dollar (GYD), which floats, so exchange rates move; US dollars are often quoted informally. USD is widely accepted in Georgetown's business and tourist areas, but smaller towns and rural spots usually prefer GYD. Major cards work in many hotels, larger restaurants and some shops in Georgetown, but cash is standard outside the capital and for tours. ATMs are available in Georgetown and a few larger towns, but limited or nonexistent in the interior, so carry enough cash before heading inland.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free or with a visa on arrival for short stays, often up to 30–90 days, though rules vary by nationality and some passport holders must arrange a visa in advance. You'll need a passport valid at least 6 months beyond your stay and proof of onward travel. Always confirm current rules with Guyana's Passport, Immigration and Citizenship Office or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the country?",
        a: "Minibuses and taxis are common in and around Georgetown and between major towns, inexpensive but often crowded. Small domestic airlines link Georgetown's Cheddi Jagan International Airport with interior airstrips like Kaieteur, Lethem and Annai, essential for reaching remote eco-lodges and the Rupununi. River boats reach many interior communities and eco-lodges, usually arranged by a tour operator. Rental cars are available in Georgetown; driving is on the left, and a 4x4 is recommended for rougher interior roads. Guided, organised tours are the norm for Kaieteur Falls, Iwokrama and Rupununi safaris, with transport, guides and permits usually included.",
      },
      {
        q: "What local food should I try?",
        a: "Cook-up rice (a one-pot rice with beans or peas, meat, coconut milk and spices), pepperpot (a slow-cooked, Amerindian-origin stew with cassareep), roti with curried chicken, goat or shrimp, metemgee (a hearty stew of root crops, coconut milk and salted meat or fish), and fresh river or sea fish, grilled or curried. Try the local cook-shops and street stalls in Georgetown, small restaurants in Linden and New Amsterdam, and the interior eco-lodges, which usually serve traditional meals.",
      },
      {
        q: "Is Guyana safe for tourists?",
        a: "Guyana can be visited safely with proper planning, but it has higher crime rates in some urban areas, particularly parts of Georgetown. Main hotels, organised tours and interior eco-lodges are generally fine with normal precautions: avoid walking alone at night in unfamiliar urban areas, don't flash valuables, and use reputable tour operators and transport. In the interior, safety is more about logistics and health, guides, boats, wildlife, medical access, than crime. Check your government's current travel advisory and talk to your tour operator about current conditions.",
      },
      {
        q: "What is the best time to visit?",
        a: "Guyana has two dry seasons and two wet seasons rather than the single Caribbean dry/hurricane pattern. The long dry season (August–November) is often considered best overall for interior travel and wildlife; the short dry season (February–April) is also good, with more roads and trails accessible. May–July and December–January are wetter, and some roads, trails or lodges may be harder to reach or reduce operations. For Kaieteur, Iwokrama and Rupununi safaris, August–November and February–April are usually best.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, with long sleeves and trousers for jungle areas to help with insects and sun. Bring sturdy, closed-toe shoes for hiking and sandals for town or riverside, plus strong insect repellent, sunscreen, a hat and sunglasses. A rain jacket or poncho and quick-dry clothes help for boat trips and rainforest. Pack a basic first-aid kit, your personal medications and hand sanitiser, since medical facilities are limited in the interior; for Kaieteur or serious hikes, add lightweight long trousers, moisture-wicking shirts and a small daypack.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Guyana is highly multicultural: Indo-Guyanese, Afro-Guyanese, Indigenous, mixed, Chinese, Portuguese, Syrian-Lebanese and more, so respect local customs and religious practices. English is official, but you'll hear Guyanese Creole, Hindi, Urdu, Chinese and Indigenous languages in daily life. Tipping 10% in restaurants is standard if a service charge isn't already included, with small tips for guides, boat captains and drivers appreciated. In the interior, life is slower and community-oriented; be patient and respectful, and follow your guide's advice on behaviour in villages and protected areas.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    tagline: "The Caribbean's best-known island by far: reggae, jerk, and a coastline that runs from Blue Mountain coffee slopes to Seven Mile Beach.",
    overview:
      "Jamaica is the most populous English-speaking Caribbean country by a wide margin, and easily the best known internationally: reggae, Bob Marley and jerk cooking all trace back here. It's a bigger, more varied island than most of its CARICOM neighbours: mountains and coffee estates in the interior, resort coastline around Negril and Ocho Rios, and Kingston, the largest English-speaking city south of Miami, as its cultural and business centre. A 2022 government push to become a republic by 2025 was retracted in March 2025, so Jamaica remains a constitutional monarchy for now.",
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
      areaKm2: "≈10,990 km² (the largest English-speaking island in the Caribbean)",
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
        "Local wages are low relative to these costs, so day-to-day prices for residents can feel more expensive than the raw dollar figures suggest. A premium lifestyle (uptown Kingston or beachfront tourist area, frequent dining, high AC use) can run US$3,500–6,000+/month. Local route-taxi fares run roughly US$1–3 per trip.",
      sourceName: "Numbeo",
      sourceUrl: "https://www.numbeo.com/cost-of-living/in/Kingston-Jamaica",
      asOf: "August 2026",
    },
    movingHere: {
      visaWorkPermit:
        "CARICOM nationals can enter visa-free and apply for a CARICOM Skills Certificate (the CSME route) to live and work in Jamaica without a work permit; see the CSME steps for Jamaica for the application process. Non-CARICOM nationals need an employer-sponsored work permit from the Ministry of Labour and Social Security before starting work in Jamaica; permits are tied to a specific job and employer and are generally renewed annually.",
      residency:
        "Permanent residence is available after 3 or more continuous years of employment in Jamaica, through marriage to a Jamaican national, as a dependant of an existing permanent resident, or through a retirement category for those with sufficient pension or investment income. Applications go through the Passport, Immigration and Citizenship Agency (PICA) and are usually decided within 3 to 6 months.",
      healthcare:
        "Public hospitals and health centres are free at the point of use for residents but can mean long waits, and are often better resourced for emergencies than routine care. Most movers carry private health insurance, roughly US$150-500/month for solid coverage, and use private facilities such as Andrews Memorial Hospital in Kingston or private clinics in Montego Bay. Confirm what a home-country or employer policy actually covers on the island before relying on it.",
      taxes:
        "Jamaica taxes residents on worldwide income and non-residents only on Jamaica-sourced income, with the tax year running 1 April to 31 March. The annual tax-free threshold rises each April, sitting at roughly JMD 1.9 million for the 2026/2027 year; income above that is taxed at 25% up to JMD 6 million a year and 30% above that, while non-residents get no tax-free threshold and pay a flat 25% from the first dollar. Anyone earning income in Jamaica needs a Taxpayer Registration Number (TRN). US citizens remain subject to US filing requirements wherever they live, so check the Foreign Earned Income Exclusion and Foreign Tax Credit with a tax professional.",
      areas: [
        {
          name: "Kingston",
          description:
            "The capital and the country's business and cultural hub. New Kingston and Barbican suit professionals; Cherry Gardens, Norbrook and Liguanea are established, relatively secure neighbourhoods, at a price premium over the rest of the city.",
        },
        {
          name: "Montego Bay",
          description:
            "Jamaica's second city and main north-coast hub, popular with remote workers and retirees; Ironshore and Rose Hall offer gated communities close to Sangster International Airport.",
        },
        {
          name: "Mandeville",
          description:
            "A hill town at roughly 600m elevation with a noticeably cooler climate than the coast. A long-standing favourite with returning-resident Jamaicans and retirees, and generally cheaper than Kingston or Montego Bay.",
        },
        {
          name: "Ocho Rios and Negril",
          description:
            "North and west coast towns built around tourism, with ocean-view rentals around White River (Ocho Rios) and near Seven Mile Beach (Negril); more resort-paced than the cities, and geared toward shorter lets as well as long-term living.",
        },
        {
          name: "Portmore and Spanish Town",
          description:
            "Commuter towns just outside Kingston with more affordable housing for people working in the capital, at the cost of a longer commute.",
        },
      ],
      notes:
        "Work permit and residency rules change, so confirm current requirements directly with PICA or Jamaica's Ministry of Labour and Social Security before making plans around them.",
      sourceName: "Passport, Immigration and Citizenship Agency (PICA) and PwC Tax Summaries",
      sourceUrl: "https://www.pica.gov.jm/immigration/permanent-residence",
      secondarySourceName: "Expat.com",
      secondarySourceUrl: "https://www.expat.com/en/guide/central-america/jamaica/",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Dunn's River Falls",
        description: "A terraced waterfall near Ocho Rios that visitors climb hand in hand, cascading straight onto the beach: one of Jamaica's most-photographed sights.",
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
        description: "A historic Montego Bay beach that grew famous in the 1920s after a British osteopath publicised its supposedly restorative waters, and it's still one of the city's best-known beaches.",
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
        description: "A guided, hand-in-hand climb up the terraced falls, one of the most-repeated Jamaica experiences there is.",
      },
      {
        title: "Hiking Blue Mountain Peak",
        description: "A pre-dawn hike to the summit for sunrise views stretching across both the north and south coasts, with a coffee tour on the way.",
      },
      {
        title: "A jerk pit meal",
        description: "Chicken or pork slow-grilled over pimento wood, best eaten at a roadside jerk stand, not a hotel restaurant.",
      },
      {
        title: "Cliff diving at Rick's Café",
        description: "A Negril institution: sunset drinks and cliff jumps from platforms up to 35 feet above the water.",
      },
      {
        title: "Reggae and dancehall nightlife",
        description: "Live music, sound systems and street dances, especially in Kingston, the birthplace of both genres.",
      },
      {
        title: "Bamboo rafting on the Rio Grande",
        description: "A calm, poled bamboo-raft trip down the river that runs from the Blue Mountains to the Portland coast. River rafting as a leisure activity started here, popularised by Errol Flynn in the 1950s.",
      },
    ],
    localDishes: [
      {
        name: "Ackee and saltfish",
        description: "Jamaica's national dish: ackee, the national fruit, cooked with salted cod, onion and pepper. Traditionally a breakfast dish, served with fried dumplings or breadfruit.",
      },
      {
        name: "Jerk chicken or pork",
        description: "Meat marinated in Scotch bonnet pepper, allspice and thyme, then slow-cooked over pimento wood: Jamaica's best-known culinary export.",
      },
      {
        name: "Patties",
        description: "Flaky, turmeric-yellow pastry filled with spiced beef, chicken or vegetables: Jamaica's everyday fast food.",
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
        description: "Widely cited by locals as the city's best jerk: chicken, pork, festival and roast breadfruit off the pimento-wood grill.",
      },
      {
        name: "Sweetwood Jerk Joint",
        area: "Kingston, near Emancipation Park",
        description: "A wide jerk menu (chicken, pork, sausage, lamb, fish and conch) with traditional pimento-wood barbecue sides.",
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
        description: "One of Jamaica's most famous jerk centres: open-air, pimento-wood barbecue, wooden tables and barrel stools. The Montego Bay original is the one most people mean by \"Scotchies.\"",
      },
    ],
    symbols: {
      motto: "Out of Many, One People",
      anthem: {
        title: "Jamaica, Land We Love",
        lyricist: "Hugh Sherlock",
        composer: "Robert Lightbourne (arranged by Mapletoft Poulle)",
        adopted: "1962, at independence",
        officialUrl: "https://en.wikipedia.org/wiki/Jamaica,_Land_We_Love",
      },
      pledge: {
        text: "Before God and all mankind, I pledge the love and loyalty of my heart, the wisdom and courage of my mind, the strength and vigor of my body in the service of my fellow citizens, I promise to stand up for Justice, Brotherhood and Peace, to work diligently and creatively, to think generously and honestly, so that Jamaica may, under God, increase in beauty, fellowship and prosperity, and play her part in advancing the welfare of the whole human race.",
        sourceName: "Jamaica Information Service and Ministry of Foreign Affairs and Foreign Trade (mfaft.gov.jm)",
        sourceUrl: "https://mfaft.gov.jm/site/national-anthem-song-and-pledge/",
      },
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit Jamaica?",
        a: "Jamaica is moderate by Caribbean standards: all-inclusive resorts can be pricey, but independent travel can be quite affordable. A budget traveller can expect roughly US$70–120/day (guesthouse or budget hotel, local food, public transport, few tours); mid-range roughly US$150–280/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several tours); luxury US$400+/day (upscale resort or boutique hotel, fine dining, private tours). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Jamaican dollar (JMD), which floats. USD is accepted in many tourist areas, but you'll usually get better value paying in JMD, and change often comes back in JMD. Major cards work in most hotels, larger restaurants and shops in tourist areas, but smaller vendors, cookshops and rural spots often prefer cash. ATMs are widely available in Kingston, Montego Bay, Ocho Rios, Negril and other main towns.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 90 days, with a valid passport and proof of onward travel. Always confirm current rules with Jamaica's Passport, Immigration and Citizenship Agency (PICA) or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the island?",
        a: "Government and private buses connect major towns, relatively cheap but can be crowded. Route taxis and shared minibuses (\"coasters\") run on fixed routes and are cheap and common, if fast-paced and crowded. Licensed taxis, with red plates marked PP or PPV, are readily available at airports, cruise ports and major hotels; agree the fare in advance. Rental cars are available at airports and in major towns; driving is on the left, and roads range from good highways to narrow, winding mountain roads, so defensive driving matters. Organised tours are common for attractions like Dunn's River Falls, Blue Mountain coffee tours and river rafting, usually including transport and a guide.",
      },
      {
        q: "What are the must-do experiences in Jamaica?",
        a: "Climb Dunn's River Falls near Ocho Rios on a guided ascent of the terraced waterfall, watch the sunset (and try cliff-jumping) at the Negril Cliffs, tour a Blue Mountains coffee estate and hike its cool-climate scenery, spend time on Seven Mile Beach in Negril or Doctor's Cave Beach in Montego Bay, visit the Bob Marley Museum and take in Kingston's reggae and dancehall culture, go bamboo rafting on the Rio Grande in Portland, and explore inland spots like YS Falls or the Blue Hole.",
      },
      {
        q: "What local food should I try?",
        a: "Jerk chicken (marinated in Scotch bonnet, pimento and herbs, then grilled or smoked over pimento wood) is Jamaica's best-known culinary export. Ackee and saltfish is the national dish, alongside rice and peas, stewed chicken or fish, curry goat, festival, fried dumplings and bammy, plus fresh grilled or fried fish and seafood. Try local cookshops, street vendors, famous jerk centres like Scotchies in Montego Bay and Ocho Rios, and beach grills in Negril and Ocho Rios.",
      },
      {
        q: "Is Jamaica safe for tourists?",
        a: "Jamaica can be visited safely, but it has higher crime rates in some areas, especially parts of Kingston and some urban neighbourhoods. Major resorts, well-known beaches and organised tours are generally fine with normal precautions: avoid walking alone at night in unfamiliar areas, don't flash valuables, and use licensed taxis and reputable tour operators. Be cautious at ATMs and in crowded places, and keep bags and phones secure. Check your government's current travel advisory and ask your hotel or tour operator about areas to avoid.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is rainier and more humid with higher hurricane risk, and prices are lowest. For beach time, hiking and cultural events with reliable weather, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and comfortable shoes for walking and hikes, plus sunscreen, a hat, sunglasses and insect repellent. A light rain jacket or poncho helps, especially in the wetter months. Bring something a little more modest if you'll visit a church or formal venue. For hiking in the Blue Mountains or a long walk, add lightweight long trousers, moisture-wicking shirts and a small daypack.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Jamaicans are generally friendly and expressive; a polite greeting before asking a question is appreciated. Dress is casual but neat, with modest attire expected in churches and some communities. Tipping 10–15% in restaurants is standard if a service charge isn't already included, with small tips for taxi drivers, tour guides and hotel staff welcome. Reggae and dancehall are central to national identity; being open-minded and courteous about the music and culture goes a long way.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "st-kitts-and-nevis",
    name: "St. Kitts and Nevis",
    tagline: "The smallest sovereign state in the Americas: two volcanic islands, a UNESCO fortress, and a carnival held at Christmas instead of summer.",
    overview:
      "St. Kitts and Nevis is the smallest sovereign country in the Americas, by both area and population: a federation of two volcanic islands separated by a narrow strait called The Narrows. St. Kitts is the larger, more developed island, home to Brimstone Hill Fortress and the capital, Basseterre; Nevis is quieter, greener and more residential, with its own hot springs and a constitutional right to secede from the federation if it ever chooses to.",
    photo: {
      src: "/destinations/st-kitts-and-nevis.jpg",
      alt: "Brimstone Hill Fortress National Park, St. Kitts",
      credit: "Martin Falbisoner, CC BY-SA 4.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Saint_Kitts_-_Brimstone_Hill_Fortress_05.JPG",
    },
    coordinates: { lat: 17.2948, lng: -62.7261, display: "17.29°N, 62.73°W" },
    demographics: {
      population: {
        value: "≈47,000–53,000 (one of the smallest sovereign states in the world by population)",
        sourceName: "Worldometer / World Population Review",
        sourceUrl: "https://www.worldometers.info/world-population/saint-kitts-and-nevis-population/",
      },
      areaKm2: "≈261–269 km² depending on source (Saint Kitts ≈176 km², Nevis ≈93 km²), the smallest sovereign state in the Americas by area",
      independence: "19 September 1983, from the United Kingdom",
      capital: "Basseterre, on Saint Kitts",
      officialLanguages: ["English (official)"],
      currency: "Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1",
      government:
        "Federation and parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General. Unusually for a federation, the constitution gives Nevis a specific path to secede from St. Kitts if it chooses to.",
      ethnicComposition: {
        value: "African descent ≈93%, mixed ≈3%, White ≈2%, East Indian ≈1.5%, other ≈0.6%",
        sourceName: "CIA World Factbook (2001 census, most recent available)",
      },
      medianAge: "≈36.5 years",
      ageStructure: "0–14 years: ≈18–19%. 15–64 years: ≈68%. 65 years and over: ≈12–13%.",
      urbanizationNote:
        "Most people live on St. Kitts, concentrated around Basseterre. Nevis, reached by a short ferry, is smaller and more residential, centred on Charlestown.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$600–900/month outside Basseterre or in a modest unit",
      rentPremium1BR: "≈US$900–1,800/month in Basseterre, Frigate Bay, South Friars, or on Nevis near Charlestown/Pinney's Beach",
      groceriesSingle: "≈US$220–350/month, more if relying on imported goods",
      inexpensiveMeal: "≈US$10–22",
      midRangeMealForTwo: "≈US$90",
      utilities: "≈US$150–250/month for electricity alone (up to US$500+ with heavy AC use), plus roughly US$18–48 water and US$50–130 internet",
      budgetModestSingle: "≈US$1,700–2,500/month all-in",
      budgetComfortableSingle: "≈US$2,500–4,500/month all-in",
      notes:
        "Electricity here runs notably higher than almost anywhere else in the Caribbean: St. Kitts and Nevis reportedly pays around five times Trinidad and Tobago's rate and more than Antigua's, largely because of import-dependent power generation, so budget for it accordingly if you'll run air conditioning regularly. A premium lifestyle (Frigate Bay, South Friars or Nevis beachfront, frequent dining, high AC use) can run US$4,500–7,000+/month. A monthly public transport pass runs roughly US$80.",
      sourceName: "Global Citizen Solutions, Numbeo and other relocation guides",
      sourceUrl: "https://www.globalcitizensolutions.com/st-kitts-and-nevis-living-cost/",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Brimstone Hill Fortress National Park",
        description: "A UNESCO World Heritage Site (inscribed 1999): a hilltop fortress built by British engineers and enslaved African labour, finished in 1790, with sweeping views over the Caribbean Sea and neighbouring islands.",
      },
      {
        name: "The St. Kitts Scenic Railway",
        description: "A narrow-gauge railway built in 1912–1926 to move sugar cane, now a 30-mile tourist rail journey around the island's coastline and countryside.",
      },
      {
        name: "Romney Manor",
        description: "A 17th-century plantation estate, once owned by ancestors of Thomas Jefferson, with six acres of botanical gardens built around a Saman tree estimated at over 350 years old.",
      },
      {
        name: "Timothy Hill",
        description: "A viewpoint on St. Kitts's south-east peninsula where the Atlantic and Caribbean sides of the island are both visible at once.",
      },
      {
        name: "Nevis Peak",
        description: "The dormant volcano at the centre of Nevis, often cloud-wrapped, with a demanding hike to the summit through rainforest.",
      },
      {
        name: "South Friars Bay & Cockleshell Bay",
        description: "South-coast beaches on St. Kitts: South Friars for beach-accessible snorkelling on a reef just offshore, Cockleshell for its laid-back beach bar scene, both looking across to Nevis.",
      },
      {
        name: "Dieppe Bay's black sand beach",
        description: "A volcanic black-sand beach on the north coast, where the Caribbean and Atlantic meet.",
      },
      {
        name: "Pinney's Beach, Nevis",
        description: "A long, palm-fringed beach on Nevis's west coast lined with casual bars, one of the region's classic beach settings.",
      },
      {
        name: "Charlestown & the Alexander Hamilton Museum",
        description: "Nevis's small Georgian-era capital. The Museum of Nevis History sits on the site where US Founding Father Alexander Hamilton is believed to have been born, around 1754, though historians still debate the exact year.",
      },
    ],
    experiences: [
      {
        title: "Sugar Mas",
        description: "St. Kitts and Nevis's carnival, running from mid-December to early January: the only major Caribbean carnival held over Christmas and New Year rather than before Lent or in summer, ending with a Grand Parade on 1 January.",
      },
      {
        title: "Riding the Scenic Railway",
        description: "A slow loop of the island by rail, with rum punch and calypso on board, following the old sugar-cane tracks.",
      },
      {
        title: "Hiking Nevis Peak",
        description: "A steep, rope-assisted rainforest climb to the summit of Nevis's volcano.",
      },
      {
        title: "A ferry day trip to Nevis",
        description: "A short crossing of The Narrows for a quieter island, hot springs, and Charlestown's Georgian streets.",
      },
      {
        title: "Snorkelling South Friars Bay",
        description: "A reef running close and parallel to the beach, with turtles, stingrays and coral within easy swimming distance of the sand.",
      },
    ],
    localDishes: [
      {
        name: "Stewed saltfish, spicy plantains, seasoned breadfruit and coconut dumplings",
        description: "The current national dish, chosen by national poll in 2003 for the 20th anniversary of independence. Created by Jacqueline Ryan, it replaced goat water as the official dish.",
      },
      {
        name: "Goat water",
        description: "The former national dish: a hearty goat stew with papaya, breadfruit and dumplings, seasoned with herbs and hot peppers. Still widely eaten despite losing its official status.",
      },
      {
        name: "Conch (lambi)",
        description: "Conch meat, stewed or curried, common along the coast.",
      },
    ],
    placesToEat: [
      {
        name: "Ballahoo",
        area: "Basseterre",
        description: "Overlooking Basseterre's central square, with a wide menu from BBQ chicken wraps and sushi to West Indian curries.",
      },
      {
        name: "Sprat Net",
        area: "Basseterre",
        description: "A casual, reasonably priced spot with long wooden benches; locals rate it for pizza as much as seafood.",
      },
      {
        name: "Rosey's Art Gallery & Café",
        area: "Basseterre",
        description: "A relaxed café on the main square for bagels, cakes and frittatas.",
      },
      {
        name: "Sunset Restaurant & The Dock",
        area: "Frigate Bay",
        description: "Caribbean dining with ocean views on the Frigate Bay strip.",
      },
    ],
    symbols: {
      motto: "Country Above Self",
      anthem: {
        title: "O Land of Beauty!",
        lyricist: "Kenrick Georges",
        composer: "Kenrick Georges",
        adopted: "1983, chosen by national competition out of 45 entries, days before independence",
        officialUrl: "https://en.wikipedia.org/wiki/O_Land_of_Beauty!",
      },
      // No official National Pledge text found on the government's national
      // symbols pages (gov.kn's certificate has also expired, blocking direct
      // access). Left out rather than guessed.
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit St. Kitts and Nevis?",
        a: "St. Kitts and Nevis is moderate to high cost by Caribbean standards, especially in prime tourist and expat areas like Frigate Bay, South Friars and Nevis's beachfront. A budget traveller can expect roughly US$100–150/day (guesthouse or budget hotel, local food, public transport, few tours); mid-range roughly US$200–350/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several tours); luxury US$500+/day (upscale resort or boutique hotel, fine dining, private tours). For a longer stay, see the cost-of-living section above for typical monthly rent, including why electricity runs notably higher here than most of the Caribbean.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1. US dollars are widely accepted in tourist areas, though change may come back in XCD. Major cards work in many hotels, restaurants and larger shops, but smaller vendors, bars and rural spots often prefer cash. ATMs are available in Basseterre, Frigate Bay and a few other spots on St. Kitts, but limited on Nevis.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 90 days, with a valid passport and proof of onward travel. Always confirm current rules with the St. Kitts and Nevis Immigration Department or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the islands?",
        a: "Inexpensive local buses connect Basseterre with many villages and key sites, though schedules can be informal. Taxis are readily available at the airport, cruise port and major hotels; agree the fare in advance. Rental cars are available at the airport and in Basseterre; driving is on the left, and roads are generally good but narrow and hilly. A ferry runs between Basseterre and Charlestown on Nevis for day trips or an overnight stay; check current schedules before planning.",
      },
      {
        q: "What are the must-do experiences in St. Kitts and Nevis?",
        a: "Explore Brimstone Hill Fortress National Park, a UNESCO World Heritage Site and one of the best-preserved historic fortresses in the Caribbean. Relax on Frigate Bay or South Friars Bay, both with beach bars and water sports. Hike Nevis Peak with a guide for rainforest trails and panoramic views, or spend the day at Pinney's Beach, a long palm-fringed beach with casual bars and restaurants. Tour historic sugar-estate sites like Romney Manor, or take the ferry to Nevis for beaches, Charlestown and waterfront dining.",
      },
      {
        q: "What local food should I try?",
        a: "Stewed saltfish with spicy plantains, seasoned breadfruit and coconut dumplings is the current national dish, chosen by national poll in 2003. Goat water, a hearty goat stew with breadfruit and dumplings, was the dish it replaced and is still widely eaten. Also look for roti (curry chicken, goat or shrimp in flatbread), fried fish, grilled lobster and conch, and rice and peas with stewed chicken or fish and provision. Try the local bars and small restaurants in Basseterre, beach bars in Frigate Bay and South Friars, and the waterfront venues around Pinney's Beach on Nevis.",
      },
      {
        q: "Is St. Kitts and Nevis safe for tourists?",
        a: "The federation is generally considered relatively safe for tourists, with most visits trouble-free. Petty theft (bags, phones) can occur, especially on beaches or in crowded areas. Use normal precautions: don't leave valuables in cars or on the beach, avoid poorly lit areas at night, and secure belongings in your accommodation. Check your government's current travel advisory before you go.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is rainier and more humid with higher hurricane risk, and prices are lowest. For beach time, hiking and exploring with reliable weather, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and comfortable shoes for walking and light hikes, plus sunscreen, a hat, sunglasses and insect repellent. A light rain jacket or poncho helps, especially in the wetter months. Bring something a little more modest if you'll visit a church or formal venue. For hiking Nevis Peak or a longer walk, add lightweight long trousers, moisture-wicking shirts and a small daypack.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Kittitians and Nevisians are generally friendly and polite; a greeting before asking a question is appreciated. Dress is casual but neat, with modest attire expected in churches and some villages. Tipping 10–15% in restaurants is standard if a service charge isn't already included, with small tips for taxi drivers and tour guides welcome. Life runs relatively relaxed, especially on Nevis, so build in patience for schedules.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "saint-lucia",
    name: "Saint Lucia",
    tagline: "Home of the Pitons, a UNESCO World Heritage volcanic landmark, and a drive-in volcano you can walk right up to.",
    overview:
      "Saint Lucia is a mountainous, volcanic island in the Eastern Caribbean, best known for the Pitons (twin rainforest-covered spires rising straight out of the sea near Soufrière) and for the geothermal activity that also produced Sulphur Springs, billed as the world's only drive-in volcano. Away from the resort corridor around Rodney Bay in the north, the island is steep, green and rural: banana farms, fishing villages, and a strong Kwéyòl (French Creole) culture alongside English.",
    photo: {
      src: "/destinations/saint-lucia.jpg",
      alt: "Gros Piton and Petit Piton, near Soufrière, Saint Lucia",
      credit: "Aneil Lutchman, CC BY-SA 2.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG",
    },
    coordinates: { lat: 13.9094, lng: -60.9789, display: "13.91°N, 60.98°W" },
    demographics: {
      population: {
        value: "≈168,462 (CIA World Factbook, 2025 estimate) to ≈180,000–184,000 (UN World Population Prospects via Worldometer, 2025–2026 estimate); the two source families diverge by roughly 7–9%",
        sourceName: "CIA World Factbook / UN World Population Prospects (2024 revision), via Worldometer",
        sourceUrl: "https://www.worldometers.info/world-population/saint-lucia-population/",
      },
      areaKm2: "≈617 km²",
      independence: "22 February 1979, from the United Kingdom",
      capital: "Castries",
      officialLanguages: ["English (official)", "Saint Lucian French Creole / Kwéyòl (widely spoken; a Kwéyòl version of the anthem was approved in 2016)"],
      currency: "Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1",
      government:
        "Unitary parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General; a Prime Minister heads the government.",
      medianAge: "≈40.4 years (CIA World Factbook, 2025 estimate; male 38.4, female 40.9); other aggregators put it lower, around 35 years",
      ageStructure: "0–14 years: ≈17.9%. 15–64 years: ≈66.7%. 65 years and over: ≈15.4%. (CIA World Factbook, 2025 estimate)",
      ethnicComposition: {
        value: "Black/African descent ≈85.3%, mixed ≈10.9%, Indo-Caribbean ≈2.2%, White ≈0.6%, Indigenous ≈0.6%",
        sourceName: "2010 census",
      },
      urbanizationNote:
        "Nearly 40% of the population lives in and around Castries in the north. The rest is spread across smaller towns and villages, including Soufrière and Vieux Fort in the south, with a mountainous, forested interior that stays sparsely populated.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$325–510/month outside Castries city centre",
      rentPremium1BR: "≈US$510–1,200/month in Castries city centre, Rodney Bay or Gros Islet",
      groceriesSingle: "≈US$200–350/month for basics (rice, bread, chicken, beef, eggs, local produce)",
      inexpensiveMeal: "≈US$7–10",
      midRangeMealForTwo: "≈US$55, more at beachfront or resort restaurants in Rodney Bay",
      utilities: "≈US$90–160/month for electricity alone without heavy AC use, ≈US$160–300+/month with regular AC, plus roughly US$15–30/month water and US$35–70/month internet",
      budgetModestSingle: "≈US$1,500–2,000/month all-in (excluding-rent estimate of ≈US$883–2,500 plus rent)",
      budgetComfortableSingle: "≈US$2,500–3,500/month all-in",
      notes:
        "A Global Citizen Solutions \"basic utilities\" bundle quotes just US$115/month for electricity, water and garbage collection combined, but that undercounts electricity: Saint Lucia's utility, LUCELEC, charges roughly EC$0.86–0.91 (≈US$0.32–0.34) per kWh, which works out to the higher electricity-alone figures above for typical household use, so treat the bundled figure cautiously. Overall cost of living runs roughly 22% below the US, driven mainly by cheaper rent (about 74% lower than US averages). Castries and the Rodney Bay/Gros Islet tourist corridor in the north are noticeably pricier than the south (Soufrière, Vieux Fort) or rural interior villages. A family of four should budget roughly US$2,500–4,000/month excluding rent.",
      sourceName: "Global Citizen Solutions cost-of-living data",
      sourceUrl: "https://www.globalcitizensolutions.com/st-lucia-living-cost/",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "The Pitons (Gros Piton & Petit Piton)",
        description: "Twin volcanic spires rising directly from the sea near Soufrière, a UNESCO World Heritage Site since 2004 and the island's defining landmark.",
      },
      {
        name: "Sulphur Springs Park",
        description: "Billed as \"the world's only drive-in volcano\": a dormant volcanic crater you can drive up to and walk around, with bubbling sulphur pools and mud baths.",
      },
      {
        name: "Diamond Falls Botanical Gardens & Mineral Baths",
        description: "A waterfall stained mineral colours by sulphur and other minerals, set in botanical gardens with warm mineral baths originally built for French troops in 1784.",
      },
      {
        name: "Marigot Bay",
        description: "A palm-fringed, near-landlocked harbour often called one of the most beautiful bays in the Caribbean: a yachting hub with hillside restaurants overlooking the water.",
      },
      {
        name: "Pigeon Island National Landmark",
        description: "A former island, now connected to the mainland by a causeway, with 18th-century British fort ruins, hiking trails and beaches near Rodney Bay.",
      },
      {
        name: "Tet Paul Nature Trail",
        description: "A short, steep community-run trail above Soufrière with some of the best panoramic Piton views on the island, plus local history and plant life along the way.",
      },
      {
        name: "Sugar Beach",
        description: "A white-sand beach nestled directly between Gros Piton and Petit Piton, among the most photographed spots in the Caribbean.",
      },
      {
        name: "Anse Chastanet, Anse Mamin & Anse Cochon",
        description: "A trio of beaches near Soufrière backed by rainforest and reef, popular for snorkelling and diving right off the sand.",
      },
      {
        name: "Castries Central Market",
        description: "The capital's market, with a produce floor downstairs and a local-food floor upstairs serving stewed chicken, fish and other everyday Saint Lucian lunches.",
      },
      {
        name: "Toraille Waterfall",
        description: "An easily reached waterfall near Soufrière set in a garden, with a plunge pool for swimming.",
      },
    ],
    experiences: [
      {
        title: "Gros Piton hike",
        description: "A demanding but non-technical climb (roughly 3 hours up) with a certified local guide, required by park rules, up the taller of the two Pitons.",
      },
      {
        title: "Gros Islet Friday night street party",
        description: "A weekly open-air street party in the fishing village of Gros Islet: food stalls, sound systems and dancing that draws locals and visitors alike.",
      },
      {
        title: "Saint Lucia Carnival",
        description: "The island's carnival, held in July with soca, costume bands and parades through Castries. Moved off the traditional pre-Lenten calendar decades ago.",
      },
      {
        title: "Diving and snorkelling Anse Chastanet reef",
        description: "A reef starting just off the beach, with drop-offs further out: one of the more accessible reef-diving spots in the Eastern Caribbean.",
      },
      {
        title: "Saint Lucia Jazz & Arts Festival",
        description: "An annual music festival, usually held around May, that has drawn major international jazz and R&B acts to venues across the island for decades.",
      },
      {
        title: "Sailing or a catamaran trip to the Pitons",
        description: "A popular way to see the Pitons and Soufrière coastline from the water, often combined with snorkelling stops.",
      },
      {
        title: "Rainforest Adventures aerial tram and zipline",
        description: "A canopy tour above the rainforest near Chassin/Babonneau in the island's northeast, combining an open-air aerial tram, ziplines and nature trails.",
      },
    ],
    localDishes: [
      {
        name: "Green fig and saltfish",
        description: "Saint Lucia's national dish: boiled unripe green bananas (\"green figs\") with salted, flaked codfish, onions, peppers and local seasoning. Rooted in 19th-century provisions of cheap bananas and imported salt cod.",
      },
      {
        name: "Bouyon",
        description: "A hearty one-pot soup of root vegetables, dumplings and meat (often pig tail, salted beef or chicken), similar to dishes found across the French Creole Caribbean.",
      },
      {
        name: "Accra (saltfish fritters)",
        description: "Deep-fried saltfish fritters, a common street-food and breakfast snack.",
      },
      {
        name: "Lambi (conch)",
        description: "Conch meat, curried, stewed or grilled, popular along the coast.",
      },
    ],
    placesToEat: [
      {
        name: "Castries Central Market (upstairs food stalls)",
        area: "Castries",
        description: "Budget local lunches (stewed chicken or fish with rice), cooked fresh and often sold out by early afternoon.",
      },
      {
        name: "Flavours of the Grill",
        area: "Gros Islet",
        description: "Local seafood and meat grilled to order, including shrimp in coconut curry, curried goat and green fig pie.",
      },
      {
        name: "Jacques Waterfront Dining",
        area: "Rodney Bay",
        description: "Caribbean flavours with a French twist, on the water in Rodney Bay.",
      },
      {
        name: "Pink Plantation House",
        area: "Castries (Morne Fortune)",
        description: "French and Creole fusion in a restored plantation house overlooking Castries, known for lamb rack and grilled catch of the day.",
      },
      {
        name: "Spinnakers Beach Bar & Carvery",
        area: "Reduit Beach, Rodney Bay",
        description: "A relaxed beach bar with local and seafood dishes and views toward Pigeon Island.",
      },
    ],
    symbols: {
      motto: "The Land, The People, The Light",
      anthem: {
        title: "Sons and Daughters of Saint Lucia",
        lyricist: "Rev. Charles Jesse",
        composer: "Leton Felix Thomas",
        adopted: "1967, at self-government; reconfirmed as the national anthem at independence in 1979. A Kwéyòl-language version was approved in 2016",
        officialUrl: "https://en.wikipedia.org/wiki/Sons_and_Daughters_of_Saint_Lucia",
      },
      pledge: {
        text: "With God as my guide, I pledge allegiance to my country, Saint Lucia. I proclaim that I will serve my country with pride and dignity and will defend it with vigour and valour in the pursuit of excellence, justice and equality for all.",
        sourceName: "Government of Saint Lucia (govt.lc)",
        sourceUrl: "https://www.govt.lc/nationalpledge",
      },
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit Saint Lucia?",
        a: "Saint Lucia is moderate to high cost by Caribbean standards, especially in prime tourist areas like Rodney Bay, Soufrière and Cap Estate. A budget traveller can expect roughly US$100–150/day (guesthouse or budget hotel, local food, public transport, few tours); mid-range roughly US$200–350/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several tours); luxury US$500+/day (upscale resort or boutique hotel, fine dining, private tours). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1. US dollars are widely accepted in tourist areas, though change may come back in XCD. Major cards work in most hotels, restaurants and larger shops, but smaller vendors, markets and rural spots often prefer cash. ATMs are available in Castries, Rodney Bay, Vieux Fort and a few other towns.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 42–90 days, with a valid passport and proof of onward travel. Always confirm current rules with the Saint Lucia Immigration Department or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the island?",
        a: "Inexpensive local buses connect Castries with most parishes, though schedules can be informal. Taxis are readily available at the airport, cruise port and major hotels; agree the fare in advance. Rental cars are available at the airport and in Castries; driving is on the left, and roads are generally good but narrow, steep and winding in the interior. Water taxis and boats are used for some beach hops and trips along the west coast, often arranged by hotels or tour operators.",
      },
      {
        q: "What are the must-do experiences in Saint Lucia?",
        a: "Sail or take a catamaran trip past the Pitons, soak in the Sulphur Springs mud baths near Soufrière (the \"drive-in volcano\"), hike Gros Piton with a guide for a challenging trek and panoramic views, visit Diamond Falls Botanical Gardens and its waterfalls, relax on Reduit Beach in Rodney Bay or Sugar Beach between the Pitons, and explore Castries market, cathedral and the viewpoints over the harbour.",
      },
      {
        q: "What local food should I try?",
        a: "Green fig and saltfish is the national dish: boiled unripe green bananas with flaked salted cod. Also look for bouyon (a hearty one-pot stew of meat or fish with dasheen, pumpkin, carrots and spices), roti, rice and peas with stewed chicken or fish and provision, and fresh grilled fish, lobster in season and conch. Try the market eateries and small restaurants in Castries, local cook-shops in Soufrière and other towns, and beachfront venues in Rodney Bay and around the Pitons.",
      },
      {
        q: "Is Saint Lucia safe for tourists?",
        a: "Saint Lucia is generally considered moderately safe for tourists, with most visits trouble-free. Petty theft can occur, especially on beaches, in crowded areas or at night. Use normal precautions: don't leave valuables in cars or on the beach, avoid poorly lit areas at night, and secure belongings in your accommodation. Some areas outside the main tourist zones see more crime, so ask your hotel or tour operator about places to avoid, and check your government's current travel advisory before you go.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is rainier and more humid with higher hurricane risk, and prices are lowest. For hiking the Pitons, volcano visits and beach time with reliable weather, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and sturdy shoes for hiking the Pitons or waterfalls, plus sunscreen, a hat, sunglasses and insect repellent. A light rain jacket or poncho helps, especially in the wetter months. Bring something a little more modest if you'll visit a church or formal venue. For hiking Gros Piton, add lightweight long trousers, moisture-wicking shirts and a small daypack with water and snacks.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Saint Lucians are generally friendly and expressive; a polite greeting before asking a question is appreciated. Dress is casual but neat, with modest attire expected in churches and some villages. Tipping 10–15% in restaurants is standard if a service charge isn't already included, with small tips for taxi drivers and tour guides welcome. Many people speak Kwéyòl (French Creole) alongside English; a few basic Kwéyòl or French greetings are often welcomed but not required.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "st-vincent-and-the-grenadines",
    name: "St. Vincent and the Grenadines",
    tagline: "One volcanic mainland and 32 smaller islands and cays strung south to the Tobago Cays: one of the Caribbean's classic sailing grounds.",
    overview:
      "St. Vincent and the Grenadines is a multi-island nation: St. Vincent itself, mountainous and volcanic with the active La Soufrière at its northern end, plus a scattered chain of smaller Grenadine islands running south (Bequia, Mustique, Canouan, Union Island and dozens of smaller cays, including the Tobago Cays marine park). St. Vincent has most of the population and everyday life; the Grenadines are quieter, sail-in territory, ranging from Bequia's fishing-village character to Mustique's private-island exclusivity.",
    photo: {
      src: "/destinations/st-vincent-and-the-grenadines.jpg",
      alt: "Aerial view of the Tobago Cays, St. Vincent and the Grenadines",
      credit: "Iain Grant, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:TobagoCaysAerial.jpg",
    },
    coordinates: { lat: 13.16, lng: -61.2248, display: "13.16°N, 61.22°W" },
    demographics: {
      population: {
        value: "≈99,200–100,650 (2024–2026 estimate)",
        sourceName: "CIA World Factbook (2024) / Worldometer (2025–2026)",
        sourceUrl: "https://www.worldometers.info/world-population/saint-vincent-and-the-grenadines-population/",
      },
      areaKm2: "≈389 km² total: St. Vincent itself ≈344 km², plus ≈45 km² spread across 32 smaller Grenadine islands and cays (Bequia ≈18 km², Canouan ≈7.6 km², Mustique ≈5.7 km², and others)",
      independence: "27 October 1979, from the United Kingdom",
      capital: "Kingstown, on St. Vincent",
      officialLanguages: ["English (official)", "Vincentian Creole English (widely spoken)"],
      currency: "Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1",
      government:
        "Parliamentary constitutional monarchy within the Commonwealth. King Charles III is head of state, represented locally by a Governor-General; a Prime Minister heads the government.",
      medianAge: "≈34.7 years (Worldometer, 2026 estimate) to ≈38.1 years (CIA World Factbook, 2024 estimate), depending on source",
      ageStructure: "0–14 years: ≈18.8%. 15–64 years: ≈68.2%. 65 years and over: ≈13%.",
      ethnicComposition: {
        value: "African descent ≈71.2%, mixed ≈23%, Indigenous (Carib) ≈3%, European ≈1.5%, East Indian ≈1.1%, other ≈0.2%",
        sourceName: "2012 census",
      },
      urbanizationNote:
        "Most people live on St. Vincent, concentrated in and around Kingstown. Bequia, a short ferry away, is the largest and most populous of the Grenadines; the rest of the chain (Mustique, Canouan, Union Island, Palm Island, Petit St. Vincent and many smaller uninhabited cays) has only a fraction of the country's population between them.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$296/month outside Kingstown city centre (EC$800, Numbeo)",
      rentPremium1BR: "≈US$407/month in Kingstown city centre (EC$1,100, Numbeo); rentals on Bequia, Mustique or Canouan run well above this",
      groceriesSingle: "≈US$250–475/month depending on source and how much is imported versus local produce",
      inexpensiveMeal: "≈US$6 (EC$15)",
      midRangeMealForTwo: "≈US$61 (EC$165, 3-course), more in the Grenadines' resort restaurants",
      utilities: "≈US$45–120/month for electricity alone without heavy AC use, ≈US$120–210+/month with regular AC, plus roughly US$7–20/month water and US$30–65/month internet",
      budgetModestSingle: "≈US$900–1,400/month all-in",
      budgetComfortableSingle: "≈US$1,400–2,800/month all-in on St. Vincent; noticeably more to live in or near the Grenadines' resort islands",
      notes:
        "Numbeo's bundled \"basic utilities\" figure (EC$200 ≈ US$74/month total for electricity, water and garbage) undercounts electricity: VINLEC, the local utility, adds a fuel surcharge on top of its base rate that has run as high as EC$0.83/kWh on its own in 2026 as fuel costs rose, so real electricity bills swing with the surcharge month to month. The higher, unbundled figures above are more realistic. St. Vincent itself is the affordable option; Bequia is pricier, and Mustique, Canouan and the smaller private-island Grenadines are a different, much higher price tier built around tourism and second homes.",
      sourceName: "Numbeo and livingcost.org",
      sourceUrl: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Saint+Vincent+And+The+Grenadines",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Tobago Cays Marine Park",
        description: "A cluster of small, uninhabited islands and cays ringed by a horseshoe reef, protected as a marine park and one of the Caribbean's best-known sailing and snorkelling anchorages. Turtles are a regular sight in the shallows.",
      },
      {
        name: "La Soufrière",
        description: "St. Vincent's active volcano at the island's northern end, last erupting explosively in April 2021. A demanding hiking trail leads to the crater rim when conditions allow.",
      },
      {
        name: "St. Vincent Botanic Gardens",
        description: "Established in 1765, the oldest botanical garden in the Western Hemisphere, in Kingstown. Home to a breadfruit tree descended from Captain Bligh's original 1793 shipment from Tahiti.",
      },
      {
        name: "Falls of Baleine",
        description: "A waterfall on St. Vincent's remote northern coast, reachable only by boat, tumbling into a rocky pool a short walk from the beach landing.",
      },
      {
        name: "Dark View Falls",
        description: "Twin waterfalls with natural swimming pools, reached by a short trail and a bamboo bridge inside La Soufrière National Park.",
      },
      {
        name: "Bequia",
        description: "The largest of the Grenadines and a short ferry from St. Vincent, built around Port Elizabeth and Admiralty Bay: traditional boatbuilding, a whaling history, and a laid-back sailing-town feel.",
      },
      {
        name: "Wallilabou Bay",
        description: "A quiet bay on St. Vincent's west coast used as a filming location for Pirates of the Caribbean, with some of the set dressing still standing.",
      },
      {
        name: "Owia Salt Pond",
        description: "A natural tidal swimming pool cut into volcanic rock on St. Vincent's northeastern coast, protected from the Atlantic swell by a rock barrier.",
      },
      {
        name: "Fort Charlotte",
        description: "An 18th-century hilltop fort overlooking Kingstown and its harbour, with old cannons and wide coastal views.",
      },
      {
        name: "Mustique",
        description: "A small private island in the Grenadines known for celebrity homes and an exclusive resort. Day visits and boat trips are possible, though most of the island is private.",
      },
    ],
    experiences: [
      {
        title: "Sailing the Grenadines",
        description: "One of the Caribbean's classic sailing grounds: island-hopping by yacht or charter through Bequia, Mustique, Canouan, Union Island and the Tobago Cays.",
      },
      {
        title: "Hiking La Soufrière",
        description: "A challenging trail to the crater rim of St. Vincent's active volcano, best done with a local guide and only when conditions permit.",
      },
      {
        title: "Diving and snorkelling the Tobago Cays",
        description: "Clear, shallow water around the Cays with sea turtles, reef fish and coral, accessible by day trip or as part of a sailing charter.",
      },
      {
        title: "Bequia Easter Regatta",
        description: "A multi-day sailing regatta and festival held over the Easter weekend, drawing yachts and visitors from across the region.",
      },
      {
        title: "Birdwatching for the St. Vincent parrot on the Vermont Nature Trail",
        description: "A rainforest loop trail through Grand Bonhomme Mountain in the island's interior, one of the best places to spot the St. Vincent parrot (Amazona guildingii), the endemic national bird. Dawn and dusk are prime times.",
      },
      {
        title: "Vincy Mas",
        description: "St. Vincent and the Grenadines' carnival, held in late June/early July with soca, costume bands (mas) and parades through Kingstown.",
      },
    ],
    localDishes: [
      {
        name: "Roasted breadfruit and fried jackfish",
        description: "The national dish: breadfruit roasted over charcoal or wood until soft, served with pan-fried, well-seasoned jackfish (a small local fish). Breadfruit itself arrived on St. Vincent via Captain Bligh in 1793.",
      },
      {
        name: "Callaloo soup",
        description: "A soup built on callaloo (dasheen leaf), common across the Eastern Caribbean and a staple of Vincentian cooking.",
      },
      {
        name: "Bouyon",
        description: "A hearty one-pot stew of meat or fish with ground provisions and vegetables, also common across the French Creole-influenced Eastern Caribbean.",
      },
      {
        name: "Roti",
        description: "Flatbread wrapped around curried chicken, goat or vegetables, reflecting Indo-Caribbean influence.",
      },
      {
        name: "Ground provisions",
        description: "Root vegetables (dasheen, sweet potato, yam, breadfruit) typically served alongside stewed or fried fish and meat.",
      },
    ],
    placesToEat: [
      {
        name: "Vee Jay's Restaurant & Bar",
        area: "Kingstown",
        description: "A Kingstown institution serving traditional Vincy lunchtime fare: mutton or fish stew, curried goat, roti.",
      },
      {
        name: "Basil's Bar (Cobblestone Inn)",
        area: "Kingstown",
        description: "Local Caribbean dishes with international touches, in the historic Cobblestone Inn building.",
      },
      {
        name: "Flow Wine Bar and Kitchen",
        area: "Kingstown",
        description: "Fresh fish and pasta in a more upscale setting, with live music on some nights.",
      },
      {
        name: "Jack's Beach Bar",
        area: "Princess Margaret Beach, Bequia",
        description: "A beachfront bar and grill on Bequia: grilled fish burgers, jerk pork and plantain, and cocktails on the sand.",
      },
      {
        name: "Firefly Bequia Plantation",
        area: "Bequia",
        description: "Dining at a small plantation-turned-guesthouse on Bequia, with garden and hillside views over Admiralty Bay.",
      },
    ],
    symbols: {
      motto: "Pax et Justitia (Latin: \"Peace and Justice\")",
      anthem: {
        title: "Saint Vincent, Land So Beautiful",
        lyricist: "Phyllis Joyce McClean Punnett",
        composer: "Joel Bertram Miguel",
        adopted: "1979, at independence (written and first performed in 1967)",
        officialUrl: "https://en.wikipedia.org/wiki/Saint_Vincent,_Land_so_Beautiful",
      },
      pledge: {
        text: "Land of my birth I pledge to thee, my loyalty and devotion, in all I think or say or do.",
        sourceName: "Government of St. Vincent and the Grenadines, Ministry of Foreign Affairs (foreign.gov.vc)",
        sourceUrl: "https://foreign.gov.vc/foreign/index.php/the-national-pledge",
      },
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit St. Vincent and the Grenadines?",
        a: "SVG is moderate cost by Caribbean standards. St. Vincent itself is relatively affordable, while the Grenadines (Bequia, Canouan, Union Island and others) range from mid-range to very high-end. A budget traveller can expect roughly US$80–130/day (guesthouse or budget hotel, local food, public transport, few tours); mid-range roughly US$180–300/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several tours); luxury US$500+/day (a high-end resort or private villa in the Grenadines, fine dining, private boat charters). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Eastern Caribbean dollar (XCD), fixed at EC$2.70 to US$1. US dollars are widely accepted in tourist areas, though change may come back in XCD. Major cards work in many hotels, restaurants and larger shops on St. Vincent and in the busier Grenadines, but smaller vendors and rural spots often prefer cash. ATMs are available in Kingstown and a few other towns on St. Vincent, but limited or nonexistent on some of the smaller Grenadines.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 30–90 days, with a valid passport and proof of onward travel. Always confirm current rules with the SVG Immigration Department or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the islands?",
        a: "Inexpensive local buses connect Kingstown with many villages and key sites on St. Vincent, though schedules can be informal. Taxis are readily available at the airport, cruise port and major hotels; agree the fare in advance. Rental cars are available at the airport and in Kingstown; driving is on the left, and St. Vincent's roads are generally good but narrow and hilly. Ferries and boats handle island-hopping around the Grenadines (Bequia, Union Island, Canouan, the Tobago Cays and more); schedules vary, and private charters are common.",
      },
      {
        q: "What are the must-do experiences in St. Vincent and the Grenadines?",
        a: "Hike La Soufrière on St. Vincent, a strenuous cross-country trail to the crater; visit Dark View Falls, twin waterfalls with natural pools reached by a short adventurous walk; snorkel or sail the Tobago Cays Marine Park, a horseshoe-shaped reef with uninhabited cays and excellent marine life; explore Kingstown Botanic Gardens, one of the oldest in the Western Hemisphere; see Wallilabou Bay, a Pirates of the Caribbean filming location; and island-hop the Grenadines, from Bequia to Union Island and Canouan, for very different beach and resort experiences.",
      },
      {
        q: "What local food should I try?",
        a: "Roasted breadfruit and fried jackfish is the national dish: breadfruit roasted over charcoal or wood, served with pan-fried jackfish, a small local fish. Also look for callaloo soup, bouyon (a hearty one-pot stew of meat or fish with dasheen, pumpkin, carrots and spices), roti, and ground provisions (root vegetables) alongside stewed or fried fish and meat. Try the local cook-shops and market eateries in Kingstown, small restaurants elsewhere on St. Vincent, and waterfront venues in Bequia and Union Island.",
      },
      {
        q: "Is St. Vincent and the Grenadines safe for tourists?",
        a: "SVG is generally considered relatively safe for tourists, with most visits trouble-free. Petty theft can occur, especially on beaches or in crowded areas. Use normal precautions: don't leave valuables in cars or on the beach, avoid poorly lit areas at night, and secure belongings in your accommodation. Some areas outside the main tourist zones see more crime, so ask your hotel or tour operator about places to avoid, and check your government's current travel advisory before you go.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is rainier and more humid with higher hurricane risk, and prices are lowest. For hiking La Soufrière, snorkelling the Tobago Cays and beach time with reliable weather, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and sturdy shoes for volcano and waterfall hikes, plus sunscreen, a hat, sunglasses and insect repellent. A light rain jacket or poncho helps, especially in the wetter months. Bring something a little more modest if you'll visit a church or formal venue. For hiking La Soufrière, add lightweight long trousers, moisture-wicking shirts and a small daypack with water and snacks.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Vincentians are generally friendly and polite; a greeting before asking a question is appreciated. Dress is casual but neat, with modest attire expected in churches and some villages. Tipping 10–15% in restaurants is standard if a service charge isn't already included, with small tips for taxi drivers, boat captains and tour guides welcome. Life in the Grenadines runs slower and more relaxed than on the mainland, especially on the smaller islands, so build in patience for schedules.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "suriname",
    name: "Suriname",
    tagline: "The only Dutch-speaking country in the Americas: a Dutch colonial capital fronting a vast, largely untouched Amazon interior.",
    overview:
      "Suriname is the odd one out among CARICOM's mostly English-speaking, mostly Commonwealth members: a former Dutch colony, independent since 1975, where Dutch is the official language and Sranan Tongo the everyday lingua franca. Its capital, Paramaribo, is a UNESCO World Heritage city of wooden Dutch colonial buildings on the Suriname River; beyond the narrow coastal strip where most people live, the country is over 90% Amazon rainforest, rivers and Maroon and Indigenous villages, among the least densely populated and most forested countries on Earth.",
    photo: {
      src: "/destinations/suriname.jpg",
      alt: "Fort Zeelandia, Paramaribo, Suriname",
      credit: "Junie609, CC BY-SA 4.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Fort_Zeelandia_top_view_(photo_1)_located_at_Abraham_Crijnssenweg_1_paramaribo,_suriname.jpg",
    },
    coordinates: { lat: 5.852, lng: -55.2038, display: "5.85°N, 55.20°W" },
    demographics: {
      population: {
        value: "≈634,000–654,000 (2025–2026 estimate)",
        sourceName: "CIA World Factbook / Worldometer",
        sourceUrl: "https://www.worldometers.info/world-population/suriname-population/",
      },
      areaKm2: "≈163,820 km² (by far the largest CARICOM country by area, though one of the smallest by population)",
      independence: "25 November 1975, from the Netherlands",
      capital: "Paramaribo",
      officialLanguages: ["Dutch (official)", "Sranan Tongo (widely spoken lingua franca)", "Sarnami Hindustani, Javanese, Saramaccan and other heritage and Maroon languages also spoken"],
      currency: "Surinamese dollar (SRD), not pegged, and has depreciated significantly against the US dollar in recent years; an IMF-backed programme has brought inflation down from double digits but the exchange rate remains volatile",
      government:
        "Presidential republic. The President is both head of state and head of government, elected by the National Assembly. Suriname is not a Commonwealth realm.",
      medianAge: "≈28.9 years (Worldometer, 2026 estimate) to ≈32.3 years (CIA World Factbook, 2025 estimate), depending on source",
      ageStructure: "0–14 years: ≈22.5%. 15–64 years: ≈70%. 65 years and over: ≈7.5%. (CIA World Factbook, 2025 estimate)",
      ethnicComposition: {
        value: "Hindustani (East Indian descent) ≈27.4%, Maroon ≈21.7%, Creole ≈15.7%, Javanese ≈13.7%, mixed ≈13.4%, other/unspecified ≈8.2%",
        sourceName: "2012 census",
      },
      urbanizationNote:
        "Roughly two-thirds of the population lives on the narrow coastal strip, especially in and around Paramaribo. The vast interior, most of the country's land area, is covered in rainforest and sparsely populated by Maroon communities (descended from escaped enslaved Africans) and Indigenous villages, reachable mainly by river or small aircraft.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$200–350/month outside central Paramaribo",
      rentPremium1BR: "≈US$350–650/month in central Paramaribo, up to US$700–1,000+ for newer furnished or expat-oriented units",
      groceriesSingle: "≈US$150–250/month for basics; local produce, rice and fish are cheap, imports cost more",
      inexpensiveMeal: "≈US$3–8 (pom, roti, street food)",
      midRangeMealForTwo: "≈US$16–30, more at upscale hotel or international restaurants",
      utilities: "≈US$20–60/month for electricity without heavy AC, ≈US$60–140+/month with regular AC, plus roughly US$5–15/month water and US$2–10/month cooking gas",
      budgetModestSingle: "≈US$800–1,200/month all-in",
      budgetComfortableSingle: "≈US$1,200–2,500/month all-in",
      notes:
        "Suriname is generally the most affordable CARICOM country for rent and local food, but treat every dollar figure here as more time-sensitive than usual: the Surinamese dollar has been volatile, and prices quoted in SRD shift with the exchange rate faster than the fixed-peg Eastern Caribbean islands. Electricity comes from a mix of the Afobaka hydroelectric dam and thermal (diesel/heavy fuel oil) generation, so it isn't uniformly cheap the way hydro-only figures might suggest. Expect real bills toward the higher end of the range with regular AC use.",
      sourceName: "Numbeo and relocation cost-of-living guides",
      sourceUrl: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Suriname",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Historic Inner City of Paramaribo",
        description: "A UNESCO World Heritage Site since 2002: a largely intact 17th-century Dutch colonial streetplan of wooden buildings along the Suriname River, blending Dutch, other European and Creole architectural styles.",
      },
      {
        name: "Fort Zeelandia",
        description: "Built in 1667 and the oldest surviving building in Paramaribo, now home to the Surinaams Museum, standing out as one of the district's few stone structures amid the wooden colonial buildings.",
      },
      {
        name: "Central Suriname Nature Reserve",
        description: "A UNESCO World Heritage Site protecting 1.6 million hectares of pristine rainforest in the interior: jaguars, giant river otters, harpy eagles and over 400 bird species, reached by boat and small aircraft.",
      },
      {
        name: "Brownsberg Nature Park",
        description: "A tabletop mountain plateau about 130km south of Paramaribo, with hiking trails, waterfalls and panoramic views over the Brokopondo Reservoir; a strong spot for birdwatching.",
      },
      {
        name: "Jodensavanne",
        description: "The ruins of a 17th-century Jewish settlement and one of the oldest synagogues in the Americas, on the Suriname River. Designated a UNESCO World Heritage Site in 2023.",
      },
      {
        name: "Peperpot Nature Park",
        description: "A former 18th-century coffee and cocoa plantation in Commewijne, across the river from Paramaribo, now a nature reserve with monkeys, sloths and over 250 bird species alongside old plantation ruins.",
      },
      {
        name: "Galibi Nature Reserve",
        description: "A coastal reserve near the mouth of the Marowijne River, among the Western Hemisphere's most important nesting sites for leatherback and other sea turtles, April to August.",
      },
      {
        name: "Brokopondo Reservoir",
        description: "A large man-made lake formed by the Afobaka Dam, surrounded by rainforest, with drowned-forest boat trips, fishing and access to Maroon river communities.",
      },
    ],
    experiences: [
      {
        title: "Walking Paramaribo's UNESCO historic centre",
        description: "A self-guided or guided walk past the wooden colonial streetscape, the Presidential Palace, the Cathedral of St Peter and St Paul (one of the world's largest wooden buildings), and the Waterkant riverfront.",
      },
      {
        title: "Central Suriname Nature Reserve expedition",
        description: "Multi-day trips deep into pristine rainforest by boat and on foot, staying at eco-lodges: one of the least-visited, most intact rainforest experiences in South America.",
      },
      {
        title: "River trip to a Maroon village",
        description: "Boat trips up the Suriname or Commewijne rivers to visit Maroon communities descended from escaped enslaved Africans, with their own distinct culture, music and river-based way of life.",
      },
      {
        title: "Turtle nesting at Galibi",
        description: "Seasonal (April–August) night tours to watch leatherback and other sea turtles nest on the beaches near the Marowijne River mouth.",
      },
      {
        title: "Hiking and birdwatching at Brownsberg",
        description: "Trails through rainforest on the Brownsberg plateau to viewpoints over Brokopondo Reservoir, with strong odds of spotting toucans, macaws and other rainforest birds.",
      },
    ],
    localDishes: [
      {
        name: "Pom",
        description: "Suriname's best-known festive dish: grated pomtajer root baked with chicken (or fish), citrus and spices into a casserole. A Surinamese-Jewish dish now central to birthdays and celebrations across all communities. \"Without the pom, there are no birthdays,\" as the local saying goes.",
      },
      {
        name: "Roti",
        description: "Flatbread wrapped around curried chicken, goat or potato, reflecting the large Hindustani community: a staple lunch and dinner across the country.",
      },
      {
        name: "Nasi goreng and bami (mie goreng)",
        description: "Indonesian-style fried rice and fried noodles, widely eaten thanks to Suriname's large Javanese community.",
      },
      {
        name: "Pindasoep",
        description: "A peanut soup with West African roots, often served with rice, dumplings and meat.",
      },
    ],
    placesToEat: [
      {
        name: "Warung Saeri",
        area: "Paramaribo",
        description: "Javanese-Surinamese cooking (saoto soup, bakabana, nasi and bami), a long-running local favourite.",
      },
      {
        name: "Restaurant Sarinah",
        area: "Paramaribo",
        description: "Traditional Indonesian and Javanese dishes including rendang and nasi rames, one of the city's best-known Indonesian restaurants.",
      },
      {
        name: "De Gadri",
        area: "Paramaribo, near Fort Zeelandia",
        description: "Javanese and Indonesian cuisine (nasi goreng, satay, gado-gado), conveniently placed for a stop after visiting the fort.",
      },
      {
        name: "Mirosso",
        area: "Paramaribo",
        description: "A long-established, family-run Indonesian and Javanese-Surinamese restaurant.",
      },
      {
        name: "Waterkant market stalls",
        area: "Paramaribo riverfront",
        description: "Casual food stalls along the historic riverfront serving inexpensive local plates.",
      },
    ],
    symbols: {
      motto: "Justitia – Pietas – Fides (Latin: \"Justice, Piety, Loyalty\")",
      anthem: {
        title: "God zij met ons Suriname (\"God Be with Our Suriname\")",
        composer: "Johannes Corstianus de Puy",
        lyricist: "Cornelis Atses Hoekstra (original Dutch verse, 1893); Henri Frans de Ziel added a Sranan Tongo verse on unity in 1959",
        adopted: "1975, at independence (music composed in 1876)",
        officialUrl: "https://en.wikipedia.org/wiki/God_zij_met_ons_Suriname",
      },
      // No consistent, officially-sourced National Pledge text found for
      // Suriname; left out rather than guessed, same policy as Belize and
      // Guyana.
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit Suriname?",
        a: "Suriname is very affordable by regional standards, especially for housing and local food, one of the least expensive countries in South America and the Caribbean. A budget traveller can expect roughly US$50–90/day (guesthouse or budget hotel, local food, public transport, few tours); mid-range roughly US$100–180/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several guided tours); luxury US$250+/day (an upscale Paramaribo hotel or interior eco-lodge, private guides, fine dining). For a longer stay, see the cost-of-living section above for typical monthly rent.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Surinamese dollar (SRD), which has been volatile against the US dollar in recent years; USD is often quoted informally. USD is accepted in some tourist areas and for larger transactions, but many smaller vendors and rural spots prefer SRD. Major cards work in some hotels, larger restaurants and shops in Paramaribo, but cash is standard outside the capital and for most tours. ATMs are available in Paramaribo and a few larger towns, but limited or nonexistent in the interior, so carry enough cash before heading inland.",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Visa rules vary widely by nationality: some, including certain CARICOM and EU passport holders, may get visa-free or simplified entry, while others need to arrange a visa or e-visa in advance. You'll need a passport valid at least 6 months beyond your stay and proof of onward travel. Always confirm current rules with Suriname's Immigration Service or your nearest Surinamese embassy before travelling.",
      },
      {
        q: "How do I get around the country?",
        a: "Minibuses and taxis are common in and around Paramaribo and between major towns, inexpensive but often crowded. River boats are essential for reaching many interior communities, Maroon villages and some eco-lodges, usually arranged by a tour operator. Small domestic airlines link Paramaribo's Johan Adolf Pengel International Airport with interior airstrips, important for remote eco-tourism. Rental cars are available in Paramaribo; driving is on the left, unusually for a former Dutch colony, and a 4x4 is required for many interior roads. Guided, organised tours are the norm for Brownsberg, the Central Suriname Nature Reserve, and Maroon or Indigenous village visits, with transport, guides and permits usually included.",
      },
      {
        q: "What are the must-do experiences in Suriname?",
        a: "Explore Paramaribo's UNESCO historic inner city: Dutch colonial wooden architecture, the Waterkant riverfront, markets and historic buildings. Hike and birdwatch in Brownsberg Nature Park, with waterfalls and viewpoints over the Brokopondo Reservoir. Take a multi-day expedition into the Central Suriname Nature Reserve's pristine rainforest, or visit Maroon villages along the Suriname and Commewijne rivers. Tour former plantations in Commewijne, like Peperpot, now nature parks and heritage sites, or join a seasonal turtle nesting tour at Galibi to see leatherbacks come ashore.",
      },
      {
        q: "What local food should I try?",
        a: "Pom is Suriname's best-known festive dish: grated pomtajer root baked with chicken or fish, citrus and spices into a casserole, central to birthdays and celebrations. Also look for roti (curry chicken, goat or potato in flatbread, reflecting the Hindustani community), nasi goreng and bami (Indonesian-style fried rice and noodles, reflecting the Javanese community), and pindasoep, a West African-rooted peanut soup. Try the local eateries and street stalls in Paramaribo, the Waterkant and central market area, and the interior eco-lodges, which usually serve traditional meals.",
      },
      {
        q: "Is Suriname safe for tourists?",
        a: "Suriname can be visited safely with proper planning, but it has higher crime rates in some urban areas, particularly parts of Paramaribo. Main hotels, organised tours and interior eco-lodges are generally fine with normal precautions: avoid walking alone at night in unfamiliar urban areas, don't flash valuables, and use reputable tour operators and transport. In the interior, safety is more about logistics and health, guides, boats, wildlife, medical access, than crime. Check your government's current travel advisory and talk to your tour operator about current conditions.",
      },
      {
        q: "What is the best time to visit?",
        a: "Suriname has two dry seasons and two wet seasons rather than the single Caribbean dry/hurricane pattern. The long dry season (August–November) is often considered best overall for interior travel and wildlife; the short dry season (February–April) is also good, with more roads and trails accessible. May–July and December–January are wetter, and some roads, trails or lodges may be harder to reach or reduce operations. For Brownsberg, the Central Suriname Nature Reserve and river trips, August–November and February–April are usually best.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, with long sleeves and trousers for jungle areas to help with insects and sun. Bring sturdy, closed-toe shoes for hiking and sandals for town or riverside, plus strong insect repellent, sunscreen, a hat and sunglasses. A rain jacket or poncho and quick-dry clothes help for boat trips and rainforest. Pack a basic first-aid kit, your personal medications and hand sanitiser, since medical facilities are limited in the interior; for Brownsberg or serious hikes, add lightweight long trousers, moisture-wicking shirts and a small daypack.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Suriname is highly multicultural: Hindustani, Maroon, Creole, Javanese, mixed, Indigenous, Chinese, European and more, so respect local customs and religious practices. Dutch is official, but you'll hear Sranan Tongo, Hindi, Javanese, Chinese and Indigenous languages daily; English is spoken in many tourist contexts but not universally. Tipping 10% in restaurants is standard if a service charge isn't already included, with small tips for guides, boat captains and drivers appreciated. In the interior, life is slower and community-oriented; be patient and respectful, and follow your guide's advice on behaviour in villages and protected areas.",
      },
    ],
    lastUpdated: "August 2026",
  },
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    tagline: "The most populous, most industrialised CARICOM state, and home of the world's biggest Carnival, calypso, soca and steelpan.",
    overview:
      "Trinidad and Tobago is a twin-island republic at the southern tip of the Caribbean chain, just off Venezuela. Trinidad is the larger, more urban and industrial island: an oil and gas economy, the region's most ethnically diverse population, and the home of Carnival, calypso, soca and the steelpan (invented here). Tobago, a short flight or ferry away, is smaller, quieter and built around beaches, reef and rainforest rather than industry.",
    photo: {
      src: "/destinations/trinidad-and-tobago.jpg",
      alt: "Pitch Lake, La Brea, Trinidad",
      credit: "Martina Jackson, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Pitch_Lake.JPG",
    },
    coordinates: { lat: 10.6918, lng: -61.2225, display: "10.69°N, 61.22°W" },
    demographics: {
      population: {
        value: "≈1,410,000 (CIA World Factbook, 2025 estimate) to ≈1,513,000 (UN World Population Prospects via Worldometer, 2026 estimate)",
        sourceName: "CIA World Factbook / Worldometer",
        sourceUrl: "https://www.worldometers.info/world-population/trinidad-and-tobago-population/",
      },
      areaKm2: "≈5,128 km² total: Trinidad ≈4,768 km², Tobago ≈300 km²",
      independence: "31 August 1962, from the United Kingdom; became a republic within the Commonwealth in 1976",
      capital: "Port of Spain, on Trinidad",
      officialLanguages: ["English (official)", "Trinidadian and Tobagonian English Creole (widely spoken); Trinidadian Hindustani and other heritage languages spoken by some communities"],
      currency: "Trinidad and Tobago dollar (TTD)",
      government:
        "Parliamentary republic within the Commonwealth. A President is head of state; a Prime Minister heads the government.",
      medianAge: "≈39.1 years (2025 estimate)",
      ageStructure: "0–14 years: ≈18.7%. 15–64 years: ≈67.2%. 65 years and over: ≈14.1%.",
      ethnicComposition: {
        value: "East Indian descent ≈35.4%, African descent ≈34.2%, mixed (other) ≈15.3%, mixed African/East Indian ≈7.7%, other ≈1.3%, unspecified ≈6.2%",
        sourceName: "2011 census",
      },
      urbanizationNote:
        "Most of the population lives on Trinidad, concentrated in and around Port of Spain and the east-west corridor through Chaguanas, San Fernando and Arima. Tobago has a much smaller, more dispersed population centred on Scarborough and the southwest coast around Crown Point.",
    },
    costOfLiving: {
      rentTypical1BR: "≈US$295–665/month outside Port of Spain's city centre (Numbeo)",
      rentPremium1BR: "≈US$515–1,105/month in Port of Spain's city centre; Tobago's tourist zones (Crown Point, Canaan) run similarly high",
      groceriesSingle: "≈US$220–400/month for basics; imported goods cost noticeably more than local produce",
      inexpensiveMeal: "≈US$3–8 (doubles, roti, a plate from a \"cookshop\")",
      midRangeMealForTwo: "≈US$30–60, more at upscale Port of Spain or Tobago resort restaurants",
      utilities: "≈US$25–60/month for electricity without heavy AC, ≈US$60–120/month with regular AC use, plus roughly US$9–20/month water and US$5–15/month cooking gas",
      budgetModestSingle: "≈US$1,200–1,800/month all-in",
      budgetComfortableSingle: "≈US$1,800–2,800/month all-in",
      notes:
        "Electricity is genuinely cheap here relative to the rest of the Caribbean: T&TEC's residential rate runs around US$0.05–0.06/kWh, among the lowest in the world, because natural gas (Trinidad produces its own) is priced to the utility well below international market rates. That's a real, durable cost-of-living advantage over the smaller islands, not just a marketing line. The main expenses are imported goods, private healthcare and car ownership. San Fernando, Chaguanas and Arima run cheaper than Port of Spain; Tobago's tourist areas run closer to Port of Spain prices.",
      sourceName: "Numbeo (Port of Spain)",
      sourceUrl: "https://www.numbeo.com/cost-of-living/in/Port-Of-Spain",
      asOf: "August 2026",
    },
    placesToSee: [
      {
        name: "Pitch Lake",
        description: "The world's largest natural deposit of asphalt, at La Brea in southwest Trinidad: a semi-solid, walkable lake covering about 40 hectares, in use since Sir Walter Raleigh caulked his ships with it in 1595.",
      },
      {
        name: "Caroni Bird Sanctuary",
        description: "A mangrove swamp on Trinidad's west coast, famous for the nightly return of thousands of scarlet ibis (the national bird) to roost, best seen by guided boat tour at sunset.",
      },
      {
        name: "Asa Wright Nature Centre",
        description: "A rainforest reserve and former plantation house in Trinidad's Northern Range, known for birdwatching: hummingbirds at close range and dozens of other species on its trails.",
      },
      {
        name: "Fort George",
        description: "An 1804 hilltop fort overlooking Port of Spain and the Gulf of Paria, built by enslaved labourers led by Jonas Mohammed Bath. Its cannons never fired in anger, but the view over the capital is one of the best on the island.",
      },
      {
        name: "Queen's Park Savannah",
        description: "A large city park in Port of Spain ringed by the Magnificent Seven colonial-era mansions, and the epicentre of Carnival's biggest stage shows.",
      },
      {
        name: "Main Ridge Forest Reserve",
        description: "Declared a protected forest reserve in 1776, the oldest legally protected rainforest in the Western Hemisphere: over 10,000 acres of rainforest across Tobago's central spine, with hiking trails and dense birdlife.",
      },
      {
        name: "Pigeon Point Heritage Park",
        description: "Tobago's best-known beach, fronted by a thatched-roof jetty that's become the island's signature image, with calm, clear water.",
      },
      {
        name: "Buccoo Reef & Nylon Pool",
        description: "A protected reef system off Tobago's southwest coast, rated among the world's best reefs by Jacques Cousteau, with glass-bottom boat tours stopping at the shallow, crystal-clear Nylon Pool sandbar.",
      },
      {
        name: "Argyle Falls",
        description: "Tobago's tallest waterfall at about 54 metres, dropping across three tiers near Roxborough, with natural pools for swimming after a short rainforest walk.",
      },
      {
        name: "Fort King George",
        description: "An 18th-century fort above Scarborough, Tobago, that changed hands between the British and French several times. Now home to the Tobago Museum, with cannons and colonial-era buildings intact.",
      },
    ],
    experiences: [
      {
        title: "Trinidad Carnival",
        description: "The pre-Lenten Carnival that Caribbean carnivals across the region take their cue from: soca, calypso, steelpan and elaborate costume bands filling Port of Spain for days.",
      },
      {
        title: "Walking Pitch Lake",
        description: "Guided walks across the semi-solid asphalt surface of the world's largest natural bitumen deposit, with a guide explaining the geology and the small freshwater pools that support unusual microbial life.",
      },
      {
        title: "Scarlet ibis watching at Caroni Swamp",
        description: "A sunset boat tour through mangrove channels to watch thousands of scarlet ibis return to roost, one of the most reliable big wildlife spectacles in the Caribbean.",
      },
      {
        title: "Diving or snorkelling Buccoo Reef",
        description: "Boat trips from Pigeon Point or Store Bay out to the reef and the Nylon Pool, usually combined as a half-day tour.",
      },
      {
        title: "Hiking Main Ridge Forest Reserve",
        description: "Trails through Tobago's rainforest interior, including routes to Argyle Falls, with a good chance of spotting endemic and migratory birds.",
      },
      {
        title: "Doubles at dawn",
        description: "Trinidad's street-food ritual: curried channa in fried bara, bought from a stand that's often only open in the early morning, eaten standing up.",
      },
    ],
    localDishes: [
      {
        name: "Crab and callaloo",
        description: "The national dish: callaloo (dasheen leaf) stewed with coconut milk, okra and crab, traditionally the centrepiece of Sunday lunch.",
      },
      {
        name: "Doubles",
        description: "Trinidad's iconic street food, not the official national dish but arguably more eaten day to day: curried chickpeas (channa) between two pieces of fried flatbread (bara), dressed with chutneys and pepper sauce.",
      },
      {
        name: "Roti",
        description: "Flatbread wrapped around curried chicken, goat, shrimp or potato: a staple lunch across both islands, reflecting the country's large Indo-Trinidadian population.",
      },
      {
        name: "Pelau",
        description: "A one-pot rice dish with meat (often chicken), pigeon peas and coconut milk, browned with caramelised sugar: an everyday dish and a Carnival/liming staple.",
      },
    ],
    placesToEat: [
      {
        name: "Patraj Roti Shop",
        area: "Port of Spain",
        description: "A locally popular spot for roti and curry, best visited around 11:30am before the lunch rush.",
      },
      {
        name: "George & Son Doubles and Pies",
        area: "Woodbrook, Port of Spain",
        description: "One of the city's well-known doubles stands, a quick, cheap classic Trini breakfast.",
      },
      {
        name: "D'Lime Cafe",
        area: "Port of Spain",
        description: "Casual Trini fare (doubles, roti and curries) at reasonable prices in a laid-back setting.",
      },
      {
        name: "Store Bay food stalls",
        area: "Crown Point, Tobago",
        description: "A cluster of local food stalls near the beach serving crab and dumpling, curried shrimp and other Tobagonian specialties.",
      },
      {
        name: "Buccoo Bay beachside grills",
        area: "Buccoo, Tobago",
        description: "Casual, sea-view spots serving grilled and curried fish, crab and other local plates.",
      },
    ],
    symbols: {
      motto: "Together We Aspire, Together We Achieve",
      anthem: {
        title: "Forged from the Love of Liberty",
        lyricist: "Patrick S. Castagne",
        composer: "Patrick S. Castagne",
        adopted: "1962, at independence (originally written as \"A Song for the Islands\" for the proposed West Indies Federation, then revised for Trinidad and Tobago)",
        officialUrl: "https://en.wikipedia.org/wiki/Forged_from_the_Love_of_Liberty",
      },
      pledge: {
        text: "I solemnly pledge to dedicate my life to the service of my God and my country. I will honour my parents, my teachers, my leaders and my elders and those in authority. I will be clean and honest in all my thoughts, my words and my deeds. I will strive in everything I do to work together with my fellowmen of every creed and race for the greater happiness of all and the honour and glory of my country.",
        sourceName: "National Library and Information System Authority (NALIS), Government of Trinidad and Tobago",
        sourceUrl: "https://www.nalis.gov.tt/resources/tt-content-guide/national-symbols/",
      },
    },
    visitorFaq: [
      {
        q: "How much does it cost to visit Trinidad and Tobago?",
        a: "Trinidad and Tobago is moderate cost by Caribbean standards. Trinidad is more business-oriented and affordable for everyday items; Tobago is more tourism-focused and can be pricier in resort areas. A budget traveller can expect roughly US$70–120/day (guesthouse or budget hotel, local food like doubles and roti, public transport, few tours); mid-range roughly US$150–280/day (a comfortable hotel or Airbnb, a mix of local and nicer restaurants, several tours); luxury US$400+/day (an upscale Tobago resort or Trinidad boutique hotel, fine dining, private tours). For a longer stay, see the cost-of-living section above for typical monthly rent, and note that electricity here is genuinely cheap by Caribbean standards.",
      },
      {
        q: "What is the currency and do I need cash?",
        a: "The currency is the Trinidad and Tobago dollar (TTD). USD is sometimes accepted in tourist areas, but you'll usually get better value paying in TTD, and change often comes back in TTD. Major cards work in most hotels, larger restaurants and shops in Port of Spain, Chaguanas, San Fernando and the main Tobago towns, but smaller vendors, street food stalls and rural spots often prefer cash. ATMs are widely available in Port of Spain, major Trinidad towns, and in Tobago (Scarborough, Crown Point, Canaan).",
      },
      {
        q: "Do I need a visa to visit as a tourist?",
        a: "Many nationalities, including the US, UK, Canada, the EU and CARICOM, can enter visa-free for short stays, often up to 90 days, with a valid passport and proof of onward travel. Always confirm current rules with the Trinidad and Tobago Immigration Division or your nearest embassy before travelling.",
      },
      {
        q: "How do I get around the islands?",
        a: "Buses and \"maxi taxis\" (route taxis and minibuses on fixed routes) are inexpensive and common for getting between Port of Spain, Chaguanas, San Fernando and other Trinidad towns. Taxis are readily available at airports, cruise ports and major hotels; agree the fare in advance. Rental cars are available at airports and in major towns; driving is on the left, and Trinidad's roads range from good highways to congested urban streets, while Tobago's are generally smaller and quieter. Short domestic flights connect Piarco (Trinidad) and Tobago, useful if you're splitting time between the islands, and passenger and vehicle ferries also run between the two; check schedules ahead either way.",
      },
      {
        q: "What are the must-do experiences in Trinidad and Tobago?",
        a: "Experience Carnival in Port of Spain in the pre-Lenten season, with calypso, soca, steelpan, costumes and street parties. Visit Pitch Lake in La Brea, one of the world's largest natural asphalt lakes, and walk its semi-solid surface. Go birdwatching at Asa Wright Nature Centre and the Caroni Bird Sanctuary, especially for scarlet ibis at sunset. Explore Tobago's beaches: Pigeon Point, the Nylon Pool sandbar, Buccoo Bay and Store Bay. Hike the Main Ridge Forest Reserve on Tobago, one of the oldest legally protected rainforest reserves in the world. Or just take in Port of Spain's street food and urban culture: doubles, roti, markets and music.",
      },
      {
        q: "What local food should I try?",
        a: "Crab and callaloo is the official national dish: callaloo stewed with coconut milk, okra and crab, traditionally the centrepiece of Sunday lunch. Doubles, curried chickpeas in fried bara, isn't the official national dish but is arguably eaten more often day to day, and is the country's best-known street food. Also look for roti, pelau (a one-pot rice dish with meat, pigeon peas, coconut milk and spices), and fresh grilled or curried fish, crab and lobster, especially in Tobago. Try the doubles stands and cookshops in Port of Spain, San Fernando and Chaguanas, beachside grills in Tobago (Store Bay, Buccoo), and mid-range to upscale restaurants on both islands.",
      },
      {
        q: "Is Trinidad and Tobago safe for tourists?",
        a: "Trinidad and Tobago can be visited safely, but it has higher crime rates in some urban areas, especially parts of Port of Spain and certain neighbourhoods. Major Tobago resorts, well-known beaches and organised tours are generally fine with normal precautions: avoid walking alone at night in unfamiliar urban areas, don't flash valuables, and use licensed taxis and reputable tour operators. Be cautious at ATMs and in crowded places, and keep bags and phones secure. Check your government's current travel advisory and ask your hotel or tour operator about areas to avoid.",
      },
      {
        q: "What is the best time to visit?",
        a: "December to April is the dry, sunny, busiest and most expensive stretch, and includes Carnival season. May–June and November are shoulder season: good weather, fewer crowds, better deals. July–October is rainier and more humid with higher hurricane risk, and prices are lowest. For Carnival, plan around the weeks leading up to Lent, usually February or early March. For beach time and diving with reliable weather, aim for December–April or May–June.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing, swimwear, sandals and comfortable shoes for walking and hikes, plus sunscreen, a hat, sunglasses and insect repellent. A light rain jacket or poncho helps, especially in the wetter months. Bring something a little more modest if you'll visit a church or formal venue. If you're visiting for Carnival, pack colourful clothes, comfortable shoes for dancing and walking, and protection from both sun and rain.",
      },
      {
        q: "Any cultural tips I should know?",
        a: "Trinidad and Tobago is highly multicultural: Afro-Trinbagonian, Indo-Trinbagonian, mixed, Chinese, Syrian-Lebanese, European and more, so respect local customs and religious practices. English is official, but you'll hear Trinidadian and Tobagonian English Creole daily, alongside Hindi, Spanish and other languages. Tipping 10–15% in restaurants is standard if a service charge isn't already included, with small tips for taxi drivers, tour guides and hotel staff welcome. During Carnival season, expect large crowds, loud music and a party atmosphere, so book accommodation and transport well in advance.",
      },
    ],
    lastUpdated: "August 2026",
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((g) => g.slug === slug);
}
