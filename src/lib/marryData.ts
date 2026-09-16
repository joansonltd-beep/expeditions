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


/**
 * A published, country-specific guide.
 *
 * Only two countries have one, and that is deliberate. A guide goes up when
 * the procedure is confirmed and stable enough to put our name to. Everywhere
 * else stays consultation only: we will tell a couple what applies to them,
 * we will not publish a half-checked procedure for a country we have not rung.
 *
 * These are written to be genuinely useful and still land the point that
 * doing it is a different job from reading about it. Do not strip the detail
 * to drive enquiries. A guide that withholds the obvious does not rank, and
 * the couples who would have booked anyway resent it.
 *
 * `checked` prints on the page. Update it whenever you re-confirm, and
 * re-confirm at least twice a year.
 */
export type GuideStep = { title: string; body: string };

export type MarryGuide = {
  checked: string; // human readable, e.g. "September 2026"
  /** One line under the H2, sets up what makes this country what it is. */
  summary: string;
  licences: { name: string; detail: string; forYou: boolean }[];
  /** The rule that decides the trip. */
  waiting: string;
  office: string;
  documents: string[];
  /** Things that get couples turned away. The most useful part of the page. */
  catches: string[];
  steps: GuideStep[];
  /** Roughly what the paperwork costs, separate from anything we charge. */
  officialCost: string;
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
  /** Present only where we publish the procedure. Absent means consultation only. */
  guide?: MarryGuide;
};

export const MARRY_COUNTRIES: MarryCountry[] = [
  {
    slug: "antigua-and-barbuda",
    name: "Antigua and Barbuda",
    status: "open",
    guide: {
      checked: "September 2026",
      summary:
        "Antigua and Barbuda runs two different licences, and which one you use changes your trip from a fortnight to a couple of days. Visiting couples want the special licence.",
      licences: [
        {
          name: "Special Marriage Licence",
          detail:
            "Written for non-residents. There is no fifteen day wait, and once the application and documents are accepted the licence is typically issued very quickly, often within a day.",
          forYou: true,
        },
        {
          name: "Ordinary Marriage Licence",
          detail:
            "Requires at least fifteen consecutive days in the country immediately before you apply. Fine if you were already spending a long stay, impractical for most weddings.",
          forYou: false,
        },
      ],
      waiting:
        "On a special licence there is no residency period. You can apply soon after arrival, provided your documents are complete and in the right form.",
      office: "The Ministry of Legal Affairs. Both of you normally have to attend in person to sign the forms and declarations.",
      documents: [
        "Valid passports for both of you, and be ready to show the pages carrying your entry stamps",
        "Original or certified birth certificates showing your parents' names",
        "If single, a declaration of single status, which is often sworn locally rather than brought with you",
        "If divorced, the original Decree Absolute or a certified copy under court seal",
        "If widowed, the previous marriage certificate together with the death certificate",
        "A Deed Poll or equivalent if either of you has changed name",
        "A notarised affidavit of parental consent if either of you is under 18",
        "A certified English translation of anything not already in English",
      ],
      catches: [
        "Choosing the wrong licence is the expensive mistake here. The ordinary licence's fifteen day residency has caught couples who booked a week and assumed one licence was the same as another.",
        "Both of you normally have to appear at Legal Affairs in person, which means office hours, which means not a weekend and not a public holiday.",
        "Some documents may be asked for notarised or apostilled even though many are not. It is worth confirming for your specific papers rather than assuming, because getting a document legalised from abroad takes weeks.",
        "The single status declaration is usually sworn on the island. If you were planning to arrive the night before, that is one more thing competing for the same morning.",
      ],
      steps: [
        {
          title: "Before you fly",
          body: "Gather passports, birth certificates, and the divorce or death paperwork if it applies. Decide at this stage that you are using the special licence, and build the trip around it.",
        },
        {
          title: "Arriving",
          body: "Give yourself a day or two before the ceremony. The law allows this to move quickly, but Legal Affairs keeps office hours and both of you have to be there.",
        },
        {
          title: "The licence and the day",
          body: "Complete the application, swear the single status declaration if you have not already, and collect the licence. Your marriage officer then conducts the ceremony and signs the register.",
        },
        {
          title: "Afterwards",
          body: "Request the official marriage certificate from the Registrar General or Legal Affairs. That is the document everything else depends on later.",
        },
      ],
      officialCost:
        "Expect the special licence to be in the region of US$150 at the time of writing, with the marriage officer charging separately, usually around US$100 more for a ceremony away from the court house. Fees are set by Antigua and Barbuda and change without notice.",
    },
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
    status: "open",
    guide: {
      checked: "September 2026",
      summary:
        "Jamaica asks less of your calendar than almost anywhere else in the region. You need to be on the island a day before you marry, and that is the whole of the timing rule.",
      licences: [
        {
          name: "Minister's Marriage Licence",
          detail:
            "The licence nearly every visiting couple uses. Issued by the Ministry of Justice and valid for 90 days from the date of issue, so it can be obtained ahead of your date rather than in a rush on arrival.",
          forYou: true,
        },
      ],
      waiting:
        "Both of you have to be physically in Jamaica for at least 24 hours before the ceremony. There is no longer residency requirement, and no blood test or medical.",
      office: "Ministry of Justice, with the marriage recorded afterwards by the Registrar General's Department.",
      documents: [
        "Valid passports for both of you",
        "Certified copies of both birth certificates, which must show your father's name",
        "If either of you is divorced, the original or a certified copy of the Decree Absolute",
        "If either of you is widowed, the previous marriage certificate together with the death certificate",
        "Written, witnessed parental consent if either of you is under 18",
        "A certified English translation of anything not already in English",
      ],
      catches: [
        "A birth certificate that does not name your father will be refused. This is the single most common reason a Jamaican application stalls, and it is not something you can fix from a hotel room the day before.",
        "The licence can be applied for in advance, and it should be. Leaving it until you land turns a paperwork question into a wedding-day question.",
        "No apostille is required on foreign documents, which catches people out in the other direction: couples spend money having documents legalised that Jamaica never asked for.",
        "Twenty four hours is the legal minimum, not a sensible plan. One delayed connection and the minimum becomes the problem.",
      ],
      steps: [
        {
          title: "Before you fly",
          body: "Get your birth certificates out and check them for your father's name before anything else. Gather passports, and the divorce or death paperwork if it applies. The licence application can begin at this stage rather than on arrival.",
        },
        {
          title: "Arriving",
          body: "Land at least a full day before the ceremony, and preferably two. The 24 hour rule runs to the ceremony itself, so a late flight eats into it.",
        },
        {
          title: "The licence and the day",
          body: "Once the licence is issued, your marriage officer conducts the ceremony and the register is signed by the two of you, the officer and the witnesses.",
        },
        {
          title: "Afterwards",
          body: "Apply to the Registrar General's Department for the official marriage certificate. You will need it for any name change, immigration matter or bank.",
        },
      ],
      officialCost:
        "The licence itself is inexpensive, in the region of US$40 at the time of writing, plus the marriage officer's own fee. Fees are set by Jamaica and change without notice.",
    },
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

/** Countries whose procedure we publish in full. Everything else is consultation only. */
export const GUIDE_COUNTRIES = MARRY_COUNTRIES.filter((c) => c.guide);

const BY_SLUG = new Map(MARRY_COUNTRIES.map((c) => [c.slug, c]));

export function marryCountry(slug: string): MarryCountry | undefined {
  return BY_SLUG.get(slug);
}
