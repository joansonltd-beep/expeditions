// Reference data for the Job Seekers enquiry form on the Go Work page.

export const EDUCATION_OPTIONS = [
  "Primary school",
  "Secondary school (CSEC/O-Levels)",
  "CAPE/A-Levels",
  "Technical/vocational certificate",
  "Associate degree",
  "Bachelor's degree",
  "Master's degree",
  "Doctorate",
  "Other professional certification",
] as const;

// Pulled from real degree programs listed on the Go Study page, so the field
// list overlaps with what CARICOM nationals are actually studying, not just
// generic job-board categories.
export const PROFESSION_OPTIONS = [
  "Banking & Finance",
  "Accounting",
  "Business & Administration",
  "Sales & Marketing",
  "Customer Service",
  "Human Resources",
  "Information Technology",
  "Engineering",
  "Construction & Trades",
  "Healthcare & Nursing",
  "Medicine",
  "Veterinary Medicine",
  "Pharmacy",
  "Psychology",
  "Education & Teaching",
  "Hospitality & Tourism",
  "Legal",
  "Criminal Justice & Law Enforcement",
  "Government & Public Service",
  "Agriculture",
  "Architecture",
  "Environmental Science",
  "Retail",
  "Transportation & Logistics",
  "Manufacturing",
  "Energy & Utilities",
  "Creative & Media",
  "Other",
] as const;
