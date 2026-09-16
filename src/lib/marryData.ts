// Per-country content for the /weddings/[country] pages.
//
// WHAT GOES HERE, AND WHAT DELIBERATELY DOES NOT:
//
// These pages sell the service. They are not a how-to. Exact waiting periods,
// licence fees and document lists are NOT published, because they differ per
// country, they change without notice, and working them out for a particular
// couple is what the consultation is for. Publishing a stale fee is also how
// you end up with somebody turning up at a registry with the wrong paperwork.
//
// `timing` is the one concession: a coarse band, never a number. It exists so
// a couple can tell at a glance whether a country fits the leave they have,
// which is the single most common reason a plan falls apart. If even that
// feels like too much, drop the field and the pages still stand up.
//
// Suriname is the exception to everything: its rule rules most couples out
// entirely, so it has to be said plainly and up front rather than discovered
// after flights are booked.

export type MarryTiming =
  | "arrive" // effectively no wait
  | "short" // about a day
  | "few" // a few days
  | "long" // a week or more
  | "resident-only"; // not available unless one partner lives there

export const TIMING_LABEL: Record<MarryTiming, string> = {
  arrive: "Little to no waiting once you land",
  short: "Around a day on the island first",
  few: "A few days on the island first",
  long: "A week or more on the island first",
  "resident-only": "Only if one of you lives there",
};

export type MarryStatus =
  | "open" // procedure confirmed at source, we can quote and take the work
  | "soon"; // researched but not yet confirmed with the registry itself

export type MarryCountry = {
  slug: string; // matches COUNTRY_GUIDES
  name: string;
  /**
   * Only "open" countries are offered. Flip a country here the day its
   * procedure is confirmed with the registry, not before: a "coming soon"
   * costs an enquiry, a wrong answer costs somebody their wedding.
   */
  status: MarryStatus;
  /** Shown only when status is "open". We do not publish timing we have not confirmed. */
  timing: MarryTiming;
  /** Why a couple picks this one. Customer facing, specific, no legal detail. */
  pitch: string;
  /** The kind of wedding this country is good for. One line. */
  suits: string;
};

export const MARRY_COUNTRIES: MarryCountry[] = [
  {
    slug: "antigua-and-barbuda",
    name: "Antigua and Barbuda",
    status: "soon",
    timing: "arrive",
    pitch:
      "Antigua counts a beach for every day of the year, and the Georgian dockyard at English Harbour is still a working one. Barbuda next door is quieter still, with pink sand and almost nobody on it.",
    suits: "Couples who want the ceremony and the honeymoon in the same place, without a long run-up.",
  },
  {
    slug: "barbados",
    name: "Barbados",
    status: "soon",
    timing: "arrive",
    pitch:
      "The easiest of the twelve to organise around, and the best fed. Barbados has the most direct flights from the UK and North America, which matters enormously when your guest list is spread across both.",
    suits: "A guest list flying in from several countries at once.",
  },
  {
    slug: "belize",
    name: "Belize",
    status: "soon",
    timing: "few",
    pitch:
      "The only English-speaking CARICOM country in Central America, with the world's second-largest barrier reef off one side and rainforest on the other. A wedding here is rarely only a wedding.",
    suits: "Couples building a proper trip around the day rather than a long weekend.",
  },
  {
    slug: "dominica",
    name: "Dominica",
    status: "soon",
    timing: "long",
    pitch:
      "The Nature Island: rainforest, rivers and hot springs rather than resort strips. It asks more of your calendar than anywhere else here, and rewards couples who were going to stay a while anyway.",
    suits: "A long stay, an elopement, or a couple with family on the island already.",
  },
  {
    slug: "grenada",
    name: "Grenada",
    status: "soon",
    timing: "few",
    pitch:
      "Grand Anse runs for two miles, the Carenage is one of the prettiest harbours in the region, and the whole island smells faintly of nutmeg. Small enough that your guests will keep bumping into each other.",
    suits: "An intimate wedding where everybody is in walking distance of everybody else.",
  },
  {
    slug: "guyana",
    name: "Guyana",
    status: "soon",
    timing: "long",
    pitch:
      "Mainland South America's only English-speaking country, with a huge diaspora in New York, Toronto and London. Most weddings here are family coming home rather than couples discovering the place.",
    suits: "Guyanese families abroad marrying at home, with relatives already on the ground.",
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    status: "soon",
    timing: "short",
    pitch:
      "The best-connected island in the Caribbean and the one your guests will need least persuading about. Everything from a Negril beach to a Blue Mountain great house, and flights from almost anywhere.",
    suits: "Large guest lists, and anyone who wants the widest choice of venue.",
  },
  {
    slug: "saint-lucia",
    name: "Saint Lucia",
    status: "soon",
    timing: "short",
    pitch:
      "The Pitons are the most photographed backdrop in the Caribbean for a reason. If the pictures matter more to you than anything else on the list, this is the one.",
    suits: "Couples choosing on the strength of the photographs.",
  },
  {
    slug: "st-kitts-and-nevis",
    name: "St. Kitts and Nevis",
    status: "soon",
    timing: "few",
    pitch:
      "Two small volcanic islands, a UNESCO fortress above Basseterre, and a short ferry between them. Nevis in particular is quiet, green and built around a handful of old plantation inns.",
    suits: "A small wedding with an unhurried, old-Caribbean feel.",
  },
  {
    slug: "st-vincent-and-the-grenadines",
    name: "St. Vincent and the Grenadines",
    status: "soon",
    timing: "short",
    pitch:
      "One volcanic mainland and a string of small islands running south to the Tobago Cays. If you have ever pictured marrying somewhere you arrive at by boat, this is where that happens.",
    suits: "Island-hopping weddings, and anyone chartering a boat for the day.",
  },
  {
    slug: "suriname",
    name: "Suriname",
    status: "soon",
    timing: "resident-only",
    pitch:
      "The only Dutch-speaking country in the Americas, with a colonial capital on the edge of a vast Amazonian interior. Beautiful, and the one country on this list where a destination wedding is usually not possible.",
    suits: "Couples where one partner already lives in Suriname.",
  },
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    status: "open",
    timing: "long",
    pitch:
      "Trinidad brings the music, the food and the biggest Carnival in the world. Tobago, a short hop away, brings the beaches. Plenty of couples use both: the wedding on one island, the rest on the other.",
    suits: "Big, loud family weddings, and anyone timing it near Carnival.",
  },
];

export const OPEN_COUNTRIES = MARRY_COUNTRIES.filter((c) => c.status === "open");
export const SOON_COUNTRIES = MARRY_COUNTRIES.filter((c) => c.status === "soon");

const BY_SLUG = new Map(MARRY_COUNTRIES.map((c) => [c.slug, c]));

export function marryCountry(slug: string): MarryCountry | undefined {
  return BY_SLUG.get(slug);
}
