// Data for the "On The Ground" survey hub (/survey): the CARICOM salary
// survey, utility cost survey, and rent survey. All fully anonymous, no name
// or email is collected. Country options are the 12 CSME free-movement
// countries this site already covers, kept in one place (csmeData.ts) so
// the surveys' country lists can't drift from the rest of the site.

export const SURVEY_INDUSTRIES = [
  "Accounting & Auditing",
  "Agriculture & Fishing",
  "Banking & Financial Services",
  "Construction",
  "Education",
  "Energy & Oil & Gas",
  "Engineering",
  "Entertainment & Creative Industries",
  "Government & Public Administration",
  "Healthcare & Pharmaceuticals",
  "Hospitality & Tourism",
  "Insurance",
  "IT & Technology",
  "Legal Services",
  "Manufacturing",
  "Marketing, Advertising & Public Relations",
  "Media & Communications",
  "Real Estate",
  "Retail & Wholesale",
  "Security & Protective Services",
  "Telecommunications",
  "Transportation & Logistics",
  "Utilities",
  "Other / Not Listed",
] as const;

export const EXPERIENCE_OPTIONS = ["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "11–15 years", "16+ years"] as const;

export const EDUCATION_OPTIONS = [
  "Secondary school",
  "Certificate/Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other",
] as const;

export const COMMISSION_OPTIONS = ["Fully commission based", "Commission with a base", "Not commission based"] as const;

export const EMPLOYER_TYPE_OPTIONS = ["Private sector", "Government", "Self-employed", "Other"] as const;

export const PAY_FREQUENCY_OPTIONS = ["Monthly", "Every Two Weeks", "Weekly", "10th and 25th", "Other"] as const;

// --- utilities survey -----------------------------------------------------

export const UTILITY_TYPES = [
  "Electricity",
  "Water",
  "Internet",
  "Mobile Phone",
  "Cable/TV",
  "Cooking Gas/LPG",
  "Garbage/Waste Collection",
  "Other",
] as const;

// --- rent survey ------------------------------------------------------------

export const RENT_PROPERTY_TYPES = [
  "Studio",
  "1-bedroom apartment",
  "2-bedroom apartment",
  "3-bedroom apartment",
  "4+ bedroom apartment",
  "1-bedroom house",
  "2-bedroom house",
  "3-bedroom house",
  "4+ bedroom house",
  "Room",
  "Townhouse",
  "Other",
] as const;

// "None" is mutually exclusive with the rest; enforced in the form UI.
export const RENT_INCLUDED_OPTIONS = [
  "Electricity",
  "Water",
  "Internet",
  "Cable/TV",
  "Gas",
  "Garbage collection",
  "Security",
  "Maintenance",
  "None",
  "Other",
] as const;

export const FURNISHED_OPTIONS = ["Fully furnished", "Partially furnished", "Unfurnished"] as const;

export const AREA_TYPE_OPTIONS = ["Urban/City", "Suburban", "Rural"] as const;

export const RENT_DURATION_OPTIONS = ["Less than 1 year", "1–2 years", "3–5 years", "6+ years"] as const;

export const RENT_INCREASE_OPTIONS = ["Within the last year", "1–2 years ago", "3+ years ago", "It has never increased", "Not sure"] as const;

export const RENT_REASONABLE_OPTIONS = ["Yes", "No", "Unsure"] as const;

// --- currency ---------------------------------------------------------------

// ISO 4217 code for each survey country, keyed by the exact country name used
// in the survey dropdowns (CSME_COUNTRIES[].name). fixedRate is "local units
// per 1 USD" for the Eastern Caribbean dollar and other currency-board pegs;
// left undefined for currencies that float, so the collection sheet looks up
// a live rate instead. symbol is the short prefix shown on amount inputs,
// matching the convention already used elsewhere on the site (EC$, TT$, etc).
export const CURRENCY_BY_COUNTRY: Record<string, { code: string; symbol: string; fixedRate?: number }> = {
  "Antigua and Barbuda": { code: "XCD", symbol: "EC$", fixedRate: 2.7 },
  Barbados: { code: "BBD", symbol: "BDS$", fixedRate: 2.0 },
  Belize: { code: "BZD", symbol: "BZ$", fixedRate: 2.0 },
  Dominica: { code: "XCD", symbol: "EC$", fixedRate: 2.7 },
  Grenada: { code: "XCD", symbol: "EC$", fixedRate: 2.7 },
  Guyana: { code: "GYD", symbol: "G$" },
  Jamaica: { code: "JMD", symbol: "J$" },
  "St. Kitts and Nevis": { code: "XCD", symbol: "EC$", fixedRate: 2.7 },
  "Saint Lucia": { code: "XCD", symbol: "EC$", fixedRate: 2.7 },
  "St. Vincent and the Grenadines": { code: "XCD", symbol: "EC$", fixedRate: 2.7 },
  Suriname: { code: "SRD", symbol: "SRD " },
  "Trinidad and Tobago": { code: "TTD", symbol: "TT$" },
};
