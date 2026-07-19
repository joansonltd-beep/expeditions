// CSME (CARICOM Single Market and Economy) Skills Certificate reference data.
// Researched from official government and CARICOM sources (June 2026). Rules
// change, so each country panel and the page carry a "confirm with the official
// source" note. Edit here to update.

export type CsmeCountry = {
  slug: string;
  name: string;
  authority: string; // the designated ministry / body that issues the certificate
  howTo: string;
  officialUrl?: string;
  fullFreeMovement?: boolean; // implemented full free movement on 1 Oct 2025
  // Application fee in the country's own currency, human-readable. Omit when the
  // country does not publish a fee (the page then tells the reader to confirm).
  // Sourced from official/government pages; fees change, so each panel carries a
  // "confirm" note.
  fee?: string;
};

// The 12 approved categories of skilled CARICOM nationals (CARICOM, Aug 2024).
export const CSME_CATEGORIES = [
  "University graduates (now includes associate degrees, two A-levels or CAPE)",
  "Artistes",
  "Musicians",
  "Media workers",
  "Sportspersons",
  "Nurses",
  "Teachers",
  "Artisans (with a CARICOM Vocational Qualification, CVQ Level 2)",
  "Holders of associate degrees",
  "Domestic workers (with a CVQ Level 2)",
  "Agricultural workers",
  "Private security officers",
];

// Documents usually required (varies by country and category).
export const CSME_DOCUMENTS = [
  "Original birth certificate",
  "Valid passport",
  "Your qualification (degree, diploma, or CVQ certificate)",
  "Marriage certificate or deed poll, if your name has changed",
  "Passport-sized photographs (usually three)",
  "The completed application form for your country",
];

// The general steps, the same idea everywhere.
export const CSME_STEPS = [
  {
    title: "Check that you qualify",
    text: "Confirm you fall into one of the 12 approved categories of skilled CARICOM nationals.",
  },
  {
    title: "Gather your documents",
    text: "Get your birth certificate, passport, qualification and photos ready. Some offices want certified copies.",
  },
  {
    title: "Apply to the right office",
    text: "Submit your application and documents to the designated office, in your home country or in the country where you want to work.",
  },
  {
    title: "Wait for verification",
    text: "Processing usually takes about 3 to 6 weeks while your qualification is verified.",
  },
  {
    title: "Receive your certificate",
    text: "You are issued a Certificate of Recognition of CARICOM Skills Qualification. It does not expire.",
  },
  {
    title: "Use it at the border",
    text: "Travel to the participating country, get an initial entry stamp, start work, then apply for an indefinite stay once the local authority verifies your certificate.",
  },
];

export const CSME_FAQS: { q: string; a: string }[] = [
  {
    q: "What is a CARICOM Skills Certificate?",
    a: "It is the Certificate of Recognition of CARICOM Skills Qualification. It lets an eligible skilled CARICOM national live and work in another participating CARICOM country without a work permit.",
  },
  {
    q: "Who can apply for a CSME Skills Certificate?",
    a: "CARICOM nationals in one of the 12 approved categories, including university graduates, nurses, teachers, artisans with a CVQ, artistes, media workers, sportspersons, and more.",
  },
  {
    q: "Where do I apply for the Skills Certificate?",
    a: "You can apply in your home country or in the country where you want to work, through that country's designated ministry or body. Each country's office is listed on this page.",
  },
  {
    q: "How long does it take and does it expire?",
    a: "Processing usually takes about 3 to 6 weeks. The certificate does not have an expiry date.",
  },
  {
    q: "Do I still need a Skills Certificate after full free movement started?",
    a: "Barbados, Belize, Dominica and St. Vincent and the Grenadines began full free movement on 1 October 2025, so their nationals can live and work among those four countries without a certificate. For everyone else, and for movement to other CARICOM countries, the Skills Certificate is still required.",
  },
];

export const CSME_COUNTRIES: CsmeCountry[] = [
  {
    slug: "antigua-and-barbuda",
    name: "Antigua and Barbuda",
    authority: "Ministry of Labour (Labour, Public Administration and Empowerment)",
    howTo:
      "Apply through the Ministry of Labour in St. John's. Bring your qualification, passport and birth certificate to start the process.",
  },
  {
    slug: "barbados",
    name: "Barbados",
    authority: "Barbados Accreditation Council",
    howTo:
      "Applications are addressed to the Executive Director of the Barbados Accreditation Council, which verifies your qualification and issues the certificate.",
    officialUrl: "https://bac.gov.bb/caricom-skills-certificate/",
    fullFreeMovement: true,
    fee: "Bds$100 (BBD) application fee, per application.",
  },
  {
    slug: "belize",
    name: "Belize",
    authority: "Immigration Department",
    howTo:
      "Apply through the Belize Immigration Department, which handles the CSME Skilled Certificate.",
    officialUrl: "https://immigration.gov.bz/other-services/csme/",
    fullFreeMovement: true,
    fee: "BZ$225 (BZD) for a new Skills Certificate.",
  },
  {
    slug: "dominica",
    name: "Dominica",
    authority: "Ministry of National Security, Immigration and Labour",
    howTo:
      "Apply through the Ministry responsible for Immigration and Labour in Roseau.",
    fullFreeMovement: true,
  },
  {
    slug: "grenada",
    name: "Grenada",
    authority: "Department of Labour (Ministry of Foreign Affairs, Trade & Export Development)",
    howTo:
      "Apply through the Department of Labour, or the Ministry of Foreign Affairs, Trade & Export Development in St. George's.",
    officialUrl: "https://llca.gov.gd/labour/services/caricom-skills-certificate/",
  },
  {
    slug: "guyana",
    name: "Guyana",
    authority: "Ministry of Foreign Affairs and International Cooperation",
    howTo:
      "Submit your documents and the applicant particulars form to the Ministry of Foreign Affairs. Note that Guyana now requires an in-person step.",
    officialUrl: "https://www.minfor.gov.gy/csme",
    fee: "G$1,500 (GYD) application fee.",
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    authority: "Ministry of Labour and Social Security",
    howTo:
      "Apply through the Ministry of Labour and Social Security. In Jamaica the Skills Certificate is issued by the Labour Ministry.",
    officialUrl: "https://www.mlss.gov.jm/",
    fee: "J$2,000 (JMD) application fee plus J$8,000 processing, and J$2,000 for each dependent.",
  },
  {
    slug: "montserrat",
    name: "Montserrat",
    authority: "Labour Department / Office of the Premier",
    howTo:
      "Apply through the Government of Montserrat's Labour Department. Contact them to confirm the current requirements.",
  },
  {
    slug: "st-kitts-and-nevis",
    name: "St. Kitts and Nevis",
    authority: "Ministry of International Trade, Industry and Commerce",
    howTo:
      "Apply through the Ministry of International Trade, Industry and Commerce, which handles CSME matters.",
    officialUrl: "https://miticca.gov.kn/csme/",
  },
  {
    slug: "saint-lucia",
    name: "Saint Lucia",
    authority: "Ministry of External Affairs",
    howTo:
      "Complete the application form and return it to the Ministry of External Affairs (CSME unit).",
    officialUrl: "https://www.govt.lc/services/csme-skills-certificate",
    fee: "EC$200 (XCD), payable when you collect the certificate.",
  },
  {
    slug: "st-vincent-and-the-grenadines",
    name: "St. Vincent and the Grenadines",
    authority: "Ministry of Foreign Affairs",
    howTo:
      "Apply through the Ministry of Foreign Affairs (CSME unit) in Kingstown.",
    officialUrl: "https://foreign.gov.vc/",
    fullFreeMovement: true,
    fee: "EC$250 (XCD) processing fee.",
  },
  {
    slug: "suriname",
    name: "Suriname",
    authority: "Ministry of Labour, Technological Development and Environment",
    howTo:
      "Apply through the Ministry of Labour. Contact them to confirm the current documents and process.",
  },
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    authority: "Ministry of Foreign and CARICOM Affairs",
    howTo:
      "Apply through the Ministry of Foreign and CARICOM Affairs. Trinidad and Tobago offers an online CSME e-Application, and biometrics or in-person steps may apply.",
    officialUrl: "https://foreign.gov.tt/services/csme/",
    fee: "Free — the Ministry charges no fee to apply for or verify the Skills Certificate.",
  },
];
