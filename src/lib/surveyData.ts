// Data for the "On The Ground" survey hub (/survey): the CARICOM salary
// survey and the utility cost survey. Both are fully anonymous, no name or
// email is collected. Country options are the 12 CSME free-movement
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
