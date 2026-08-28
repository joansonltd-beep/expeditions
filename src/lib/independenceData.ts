// Independence days for the CARICOM countries covered by the country guides.
//
// Every country in COUNTRY_GUIDES is a sovereign state, so all twelve have one.
// Montserrat is deliberately absent from the guides (a British Overseas
// Territory, so it has no independence day), and so is absent here.
//
// The prose version of each date already lives on the country guide itself, at
// demographics.independence, with the sourcing and any republic-day detail.
// This file is the machine-readable twin: it exists so the site can work out
// which anniversary is coming up. Keep the two in step when editing either.
//
// Dates are the anniversary each country actually observes as its national
// independence day. Where a country later became a republic on a different
// date (Guyana, Trinidad and Tobago) that is recorded in `note`, not treated
// as the independence day.

export type IndependenceDay = {
  slug: string; // matches COUNTRY_GUIDES / CSME_COUNTRIES
  name: string;
  day: number; // day of month
  month: number; // 1-12
  year: number; // year independence was gained
  from: string; // the state it became independent from
  note?: string;
};

export const CARICOM_INDEPENDENCE: IndependenceDay[] = [
  { slug: "jamaica", name: "Jamaica", day: 6, month: 8, year: 1962, from: "the United Kingdom" },
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    day: 31,
    month: 8,
    year: 1962,
    from: "the United Kingdom",
    note: "Became a republic within the Commonwealth on 24 September 1976, marked separately as Republic Day.",
  },
  {
    slug: "barbados",
    name: "Barbados",
    day: 30,
    month: 11,
    year: 1966,
    from: "the United Kingdom",
    note: "Became a parliamentary republic on 30 November 2021, the same calendar date.",
  },
  {
    slug: "guyana",
    name: "Guyana",
    day: 26,
    month: 5,
    year: 1966,
    from: "the United Kingdom",
    note: "Became a Cooperative Republic on 23 February 1970, marked separately as Republic Day.",
  },
  { slug: "grenada", name: "Grenada", day: 7, month: 2, year: 1974, from: "the United Kingdom" },
  { slug: "suriname", name: "Suriname", day: 25, month: 11, year: 1975, from: "the Netherlands" },
  { slug: "dominica", name: "Dominica", day: 3, month: 11, year: 1978, from: "the United Kingdom" },
  { slug: "saint-lucia", name: "Saint Lucia", day: 22, month: 2, year: 1979, from: "the United Kingdom" },
  {
    slug: "st-vincent-and-the-grenadines",
    name: "St. Vincent and the Grenadines",
    day: 27,
    month: 10,
    year: 1979,
    from: "the United Kingdom",
  },
  { slug: "antigua-and-barbuda", name: "Antigua and Barbuda", day: 1, month: 11, year: 1981, from: "the United Kingdom" },
  { slug: "belize", name: "Belize", day: 21, month: 9, year: 1981, from: "the United Kingdom" },
  { slug: "st-kitts-and-nevis", name: "St. Kitts and Nevis", day: 19, month: 9, year: 1983, from: "the United Kingdom" },
];

const BY_SLUG = new Map(CARICOM_INDEPENDENCE.map((d) => [d.slug, d]));

export function independenceFor(slug: string): IndependenceDay | undefined {
  return BY_SLUG.get(slug);
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "31 August" — the anniversary, without a year. */
export function formatDayMonth(d: IndependenceDay): string {
  return `${d.day} ${MONTHS[d.month - 1]}`;
}

// Every CARICOM country this site covers sits in Atlantic Standard Time
// (UTC-4) and none of them observe daylight saving, so a fixed offset is
// correct year-round. Vercel runs in UTC, and without this a banner for the
// 31st would switch on at 8pm on the 30th local time.
const AST_OFFSET_MS = -4 * 60 * 60 * 1000;

/** Today's date in Atlantic Standard Time, as {year, month, day}. */
export function astToday(now: Date = new Date()): { year: number; month: number; day: number } {
  const shifted = new Date(now.getTime() + AST_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
}

/** Whole days from today until the next occurrence of this anniversary. 0 = today. */
export function daysUntil(d: IndependenceDay, now: Date = new Date()): number {
  const t = astToday(now);
  const today = Date.UTC(t.year, t.month - 1, t.day);
  let next = Date.UTC(t.year, d.month - 1, d.day);
  if (next < today) next = Date.UTC(t.year + 1, d.month - 1, d.day);
  return Math.round((next - today) / 86_400_000);
}

/** How many years the country will be marking at its next anniversary. */
export function anniversaryYears(d: IndependenceDay, now: Date = new Date()): number {
  const t = astToday(now);
  const passedThisYear = t.month > d.month || (t.month === d.month && t.day > d.day);
  return (passedThisYear ? t.year + 1 : t.year) - d.year;
}

// How long before the day the site starts marking it, and how long after.
// TRAIL_DAYS is 0 so the celebration ends with the day itself: Trinidad and
// Tobago's runs to the end of 31 August and the site is back to normal on
// 1 September, in Atlantic Standard Time.
export const LEAD_DAYS = 10;
export const TRAIL_DAYS = 0;

/**
 * The anniversary the site should currently be marking, if any: the soonest one
 * inside the run-up window, or one that has just passed.
 */
export function currentIndependence(now: Date = new Date()): { day: IndependenceDay; daysAway: number; years: number } | null {
  const t = astToday(now);
  const today = Date.UTC(t.year, t.month - 1, t.day);

  let best: { day: IndependenceDay; daysAway: number; years: number } | null = null;
  for (const d of CARICOM_INDEPENDENCE) {
    const away = daysUntil(d, now);

    // Just passed: daysUntil has already rolled to next year, so check the
    // occurrence that fell within the last TRAIL_DAYS separately.
    const thisYears = Date.UTC(t.year, d.month - 1, d.day);
    const sincePassed = Math.round((today - thisYears) / 86_400_000);
    const inTrail = sincePassed > 0 && sincePassed <= TRAIL_DAYS;

    if (away <= LEAD_DAYS || inTrail) {
      const effective = inTrail ? -sincePassed : away;
      if (!best || effective < best.daysAway) {
        best = { day: d, daysAway: effective, years: anniversaryYears(d, now) - (inTrail ? 1 : 0) };
      }
    }
  }
  return best;
}

// Flag palettes, applied site-wide for the run-up to a country's independence
// day. Only countries with a palette that has been checked for contrast get
// one; everything else keeps the usual CARICOM blue. Add a country here only
// after verifying its colours pass AA against white.
//
// `colours` is how the palette is named in the banner copy, so it has to read
// naturally in a sentence and match the theme block in globals.css.
export type FlagTheme = { theme: string; colours: string };

export const FLAG_THEMES: Record<string, FlagTheme> = {
  "trinidad-and-tobago": { theme: "tt", colours: "red, black, and white" },
};

/** The flag theme to apply right now, or null for the normal palette. */
export function currentFlagTheme(now: Date = new Date()): string | null {
  const current = currentIndependence(now);
  if (!current) return null;
  return FLAG_THEMES[current.day.slug]?.theme ?? null;
}
