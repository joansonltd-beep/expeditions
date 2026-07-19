// CSME (CARICOM Single Market and Economy) Skills Certificate reference data.
// Researched from official government and CARICOM sources (July 2026). Rules and
// fees change, so each country panel and page carry a "confirm with the official
// source" note. Edit here to update.

export type CsmeStep = { title: string; text: string };

// Per-country detail. Anything omitted falls back to the general guidance
// (CSME_STEPS / CSME_DOCUMENTS) on the page.
export type CsmeDetail = {
  steps?: CsmeStep[]; // country-specific ordered steps
  documents?: string[]; // country-specific required documents
  processingTime?: string;
  submit?: string; // where/how to submit
  address?: string;
  phone?: string;
  email?: string;
  notes?: string[]; // extra requirements / things to know
};

export type CsmeCountry = {
  slug: string;
  name: string;
  authority: string; // the designated ministry / body that issues the certificate
  howTo: string;
  officialUrl?: string;
  fullFreeMovement?: boolean; // implemented full free movement on 1 Oct 2025
  // Application fee in the country's own currency, human-readable. Omit when the
  // country does not publish a fee (the page then tells the reader to confirm).
  fee?: string;
  formUrl?: string; // direct link to the application form, if known
  detail?: CsmeDetail;
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
export const CSME_STEPS: CsmeStep[] = [
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
    a: "Processing usually takes about 3 to 6 weeks, though some countries take 6 to 8 weeks. The certificate does not have an expiry date.",
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
    detail: {
      submit: "Apply in person at the Ministry of Labour.",
      address: "Nevis Street & Friendly Alley, St. John's",
      notes: [
        "Antigua and Barbuda does not publish a fixed fee or document checklist online — confirm both with the Ministry of Labour before you apply.",
      ],
    },
  },
  {
    slug: "barbados",
    name: "Barbados",
    authority: "Barbados Accreditation Council",
    howTo:
      "Applications are addressed to the Executive Director of the Barbados Accreditation Council, which verifies your qualification and issues the certificate.",
    officialUrl: "https://bac.gov.bb/caricom-skills-certificate/",
    fullFreeMovement: true,
    fee: "Bds$100 (BBD) per application; Bds$100 to replace a lost certificate.",
    detail: {
      steps: [
        { title: "Confirm you qualify", text: "You must be a CARICOM national engaged in a legitimate economic activity in one of the approved skill categories." },
        { title: "Complete and sign the form", text: "Fill in the application form and have it signed and stamped by a Justice of the Peace." },
        { title: "Gather your documents", text: "Collect everything on the list below, including two professional references addressed to the Executive Director, BAC." },
        { title: "Submit in person", text: "Hand in your application and documents in person, or through an authorised agent with written consent and valid ID." },
        { title: "Pay the fee", text: "Pay the Bds$100 application fee." },
        { title: "Collect your certificate or verification letter", text: "This must be collected in person by the applicant." },
      ],
      documents: [
        "Completed application form, signed and stamped by a Justice of the Peace",
        "Birth certificate",
        "Proof of CARICOM national status",
        "Marriage certificate (if applicable)",
        "Your qualification (undergraduate, postgraduate or professional)",
        "Two professional reference letters addressed to the Executive Director, BAC",
        "Copy of your passport (bio-data page and date of issue)",
        "Two passport-sized photos with your name in block letters on the back",
        "Nurses: a letter from the General Nursing Council; artistes, media, musicians and sportspersons: a letter from the relevant national federation or ministry and previous employer letters",
      ],
      processingTime: "About 7 working days to issue; about 10 working days to verify a certificate from another country.",
      submit: "In person (or via an authorised agent). Incomplete documentation is not accepted.",
      address: "First Floor, The Phoenix Centre, George Street, St. Michael, BB11114",
      phone: "(246) 535-6740",
      email: "info@bac.gov.bb",
      notes: [
        "A lost certificate requires a police report filed in the country where it was lost.",
      ],
    },
  },
  {
    slug: "belize",
    name: "Belize",
    authority: "Immigration Department",
    howTo:
      "Apply through the Belize Immigration Department, which handles the CSME Skilled Certificate.",
    officialUrl: "https://immigration.gov.bz/other-services/csme/",
    fullFreeMovement: true,
    fee: "BZ$225 (BZD) new certificate; dependants BZ$50 (under 18) or BZ$100 (18+); replacement BZ$50; amendment, upgrade or verification BZ$25.",
    detail: {
      steps: [
        { title: "Complete the application", text: "Fill in the application form and gather your original documents plus one copy of each." },
        { title: "Submit to Immigration", text: "Hand everything in at the Immigration Office in Belmopan." },
        { title: "Document review", text: "Immigration checks that your documents are complete and in order." },
        { title: "Approval and issue", text: "Once approved, your Skilled Certificate is issued for an indefinite period." },
      ],
      documents: [
        "Birth certificate",
        "Marriage certificate (if applicable)",
        "Three passport-sized photographs",
        "Valid passport",
        "Degree, diploma or certificate proving your qualification",
        "Original documents plus one copy of each",
        "Non-Belizeans: a police record from your country of origin and any country where you have lived for 6 months or more",
      ],
      processingTime: "About 8 weeks.",
      submit: "In person at the Immigration Office in Belmopan only.",
      notes: [
        "The certificate is valid indefinitely.",
        "You get a minimum initial stay of six months in the host country. Fees are effective from 1 May 2020.",
      ],
    },
  },
  {
    slug: "dominica",
    name: "Dominica",
    authority: "Ministry of National Security, Immigration and Labour",
    howTo:
      "Apply through the Ministry responsible for Immigration and Labour in Roseau.",
    formUrl: "https://dominica.gov.dm/forms/34-application-form-checklist-application-for-caricome-skills-certificate",
    fullFreeMovement: true,
    detail: {
      submit: "Download the application form and checklist, then submit to the Government Headquarters in Roseau.",
      address: "Ground Floor, Government Headquarters, Kennedy Avenue, Roseau",
      phone: "+1 767 266 3000 / 3500",
      email: "cscentre@dominica.gov.dm",
      notes: [
        "Dominica does not publish a fee online — confirm the current cost with the CSME centre.",
        "The exact document checklist is inside the downloadable application form.",
      ],
    },
  },
  {
    slug: "grenada",
    name: "Grenada",
    authority: "Ministry of Foreign Affairs, Trade & Export Development",
    howTo:
      "Apply online through csmeonline.org and submit your documents to the Ministry of Foreign Affairs, Trade & Export Development in St. George's.",
    officialUrl: "https://llca.gov.gd/labour/services/caricom-skills-certificate/",
    detail: {
      steps: [
        { title: "Check that you qualify", text: "Confirm you fall into one of the approved skill categories." },
        { title: "Register online", text: "Start your application at csmeonline.org and complete the applicant details." },
        { title: "Download and complete the form", text: "A downloadable application form is available through the Department of Labour." },
        { title: "Submit to the Ministry", text: "Take your form and documents to the Ministry of Foreign Affairs, Trade & Export Development." },
        { title: "Wait for verification and collect", text: "Your qualification is verified and the certificate is issued." },
      ],
      submit: "Apply online at csmeonline.org, then submit documents to the Ministry.",
      address: "Ministerial Complex, 4th Floor, Sir Eric M. Gairy Botanical Gardens, Tanteen, St. George's",
      phone: "(473) 440-2640 / 2712 / 3036 ext. 23501",
      email: "registry@mofa.gov.gd",
      notes: [
        "Grenada does not publish a fixed fee online — confirm the current cost with the Ministry.",
      ],
    },
  },
  {
    slug: "guyana",
    name: "Guyana",
    authority: "Ministry of Foreign Affairs and International Cooperation",
    howTo:
      "Submit your documents and the applicant particulars form to the Ministry of Foreign Affairs. Note that Guyana now requires an in-person step.",
    officialUrl: "https://www.minfor.gov.gy/csme",
    fee: "G$1,500 (GYD) application fee.",
    detail: {
      steps: [
        { title: "Confirm your category", text: "Check you fall into one of the approved wage-earner categories." },
        { title: "Complete the form", text: "Print and complete the 'Particulars Relating to the Applicant' form." },
        { title: "Gather your documents", text: "Collect the general documents below plus anything specific to your category." },
        { title: "Submit in person and pay", text: "Submit your originals to the Free Movement Unit and pay the G$1,500 fee." },
        { title: "Wait for verification", text: "Processing takes about 3 to 6 weeks, longer if verification takes time." },
        { title: "Receive your certificate", text: "The certificate has no expiry date." },
      ],
      documents: [
        "Birth certificate",
        "Deed poll, marriage certificate or divorce absolute (if applicable)",
        "Letter of citizenship (if applicable)",
        "CARICOM passport",
        "Recent passport-sized photograph",
        "Valid police clearance",
        "Proof of payment",
        "Your qualification, plus any category extras (e.g. accreditation verification letter for non-UG/UWI degrees; portfolio and three character references for musicians and artistes; federation and club letters for sportspersons; Guyana Press Association membership and verification for media workers; Nursing Council verification for nurses)",
      ],
      processingTime: "3 to 6 weeks (longer if verification takes time).",
      submit: "In person to the Free Movement Unit, Ministry of Foreign Affairs.",
      address: "Free Movement Unit, Ministry of Foreign Affairs ('Takuba Lodge'), 254 South Road, Georgetown",
      phone: "(592) 225-3982 / 226-1606",
      email: "minfor@minfor.gov.gy",
    },
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    authority: "Ministry of Labour and Social Security",
    howTo:
      "Apply through the Ministry of Labour and Social Security. In Jamaica the Skills Certificate is issued by the Labour Ministry.",
    officialUrl: "https://www.mlss.gov.jm/",
    fee: "J$2,000 (JMD) application fee plus J$8,000 processing, and J$2,000 for each dependant. Amendment J$2,000; replacement J$3,000.",
    formUrl: "https://www.mlss.gov.jm/download/csme-skills-certificate-application-form/",
    detail: {
      steps: [
        { title: "Get your documents certified", text: "Have photocopies of your documents signed by a Justice of the Peace." },
        { title: "Get a verification letter", text: "Obtain a letter from the institution where you qualified, certifying you completed the programme." },
        { title: "University Council check (if needed)", text: "If your qualification is not from a recognised university, it must be verified by the University Council of Jamaica." },
        { title: "Submit with fees", text: "Submit your completed application, documents and fees at the Work Permit Department, North Street." },
      ],
      documents: [
        "Completed application form",
        "Photocopied documents signed by a Justice of the Peace",
        "Letter of verification from the institution where you qualified",
        "University Council of Jamaica verification, if your qualification is not from a recognised university",
      ],
      processingTime: "Not officially stated — allow several weeks.",
      submit: "In person at the Work Permit Department, Ministry of Labour and Social Security (North Street office only).",
      address: "1F North Street, Kingston",
      phone: "(876) 922-9500-8",
      notes: [
        "Recognised universities include UWI, University of Technology, Northern Caribbean University, Mico University College, University of Guyana and University of Suriname; other qualifications need verification.",
      ],
    },
  },
  {
    slug: "montserrat",
    name: "Montserrat",
    authority: "Labour Department / Office of the Premier",
    howTo:
      "Apply through the Government of Montserrat's Labour Department. Contact them to confirm the current requirements.",
    detail: {
      notes: [
        "Montserrat is only a partial participant in the CSME, so the free movement of skills does not fully apply and a work permit is generally still required.",
        "Contact the Labour Department directly for the current process, documents and any fee.",
      ],
    },
  },
  {
    slug: "st-kitts-and-nevis",
    name: "St. Kitts and Nevis",
    authority: "Ministry of International Trade, Industry and Commerce",
    howTo:
      "Apply through the Ministry of International Trade, Industry and Commerce, which handles CSME matters.",
    officialUrl: "https://miticca.gov.kn/csme/",
    detail: {
      steps: [
        { title: "Identify your category", text: "Work out which of the approved categories matches your qualification or skill." },
        { title: "Submit to the CSME Desk Officer", text: "Hand in your application form and documents to the CSME Desk Officer at the Ministry of International Trade." },
        { title: "Committee review", text: "The Free Movement of Skilled Persons Committee reviews your application." },
        { title: "Decision", text: "You are notified of the decision and, if approved, receive your Skills Certificate and decision letter." },
        { title: "Endorse your passport", text: "Present your CARICOM passport to the Ministry of National Security for an indefinite-stay endorsement." },
      ],
      processingTime: "Minimum 6 weeks (longer if verification with the issuing country is needed).",
      submit: "In person to the CSME Desk Officer, Ministry of International Trade.",
      address: "2nd Floor, Nagico Building, Bladen Commercial Development, Basseterre",
      phone: "(869) 467-1636 / 467-1203",
      email: "foreigntrade@gov.kn",
      notes: [
        "You must hold a CARICOM passport. Your spouse and dependants can benefit from your status.",
        "St. Kitts and Nevis does not publish a fixed fee online — confirm it with the Ministry.",
      ],
    },
  },
  {
    slug: "saint-lucia",
    name: "Saint Lucia",
    authority: "Ministry of External Affairs",
    howTo:
      "Complete the application form and return it to the Ministry of External Affairs (CSME unit).",
    officialUrl: "https://www.govt.lc/services/csme-skills-certificate",
    fee: "EC$200 (XCD), paid when you collect the certificate.",
    detail: {
      documents: [
        "Application form",
        "Two passport photos",
        "Original passport and a copy of the bio-data page",
        "University certificates",
        "Birth certificate",
        "Police certificate of character from your birth country and your country of residence",
        "Marriage certificate (if applicable)",
        "For dependants: birth certificate, police record and marriage certificate",
      ],
      processingTime: "Minimum 3 weeks.",
      submit: "Consular Division (CSME unit), Ministry of External Affairs. Office hours 8:00 a.m. to 4:30 p.m.",
      notes: [
        "Contacts: Ms. Clenie Greer or Ms. Zizi Pitcairn at the Consular Division.",
      ],
    },
  },
  {
    slug: "st-vincent-and-the-grenadines",
    name: "St. Vincent and the Grenadines",
    authority: "Ministry of Foreign Affairs (CSME unit)",
    howTo:
      "Apply through the Ministry of Foreign Affairs (CSME unit) in Kingstown.",
    officialUrl: "https://foreign.gov.vc/",
    fullFreeMovement: true,
    fee: "EC$250 (XCD) processing fee.",
    formUrl: "https://pmoffice.gov.vc/pmoffice/images/stories/Forms/CSME_Application_for_Certificate_of_Recognition_of_Skills.pdf",
    detail: {
      submit: "Ministry of Foreign Affairs (CSME unit), Kingstown.",
      notes: [
        "On first arrival the certificate gives a definite entry of six months in the receiving country.",
        "Confirm the full document list with the Ministry — it is not published in full online.",
      ],
    },
  },
  {
    slug: "suriname",
    name: "Suriname",
    authority: "Ministry of Labour, Technological Development and Environment",
    howTo:
      "Apply through the Ministry of Labour. Contact them to confirm the current documents and process.",
    detail: {
      documents: [
        "Letter from the relevant Ministry confirming you are registered in your field, with copies of your qualifications",
        "Certified copy of your birth certificate",
        "Copy of your passport bio-data page, signed by a Justice of the Peace",
        "Police report for the country where you have lived for the last three years",
      ],
      submit: "Free Movement of Skills unit, Ministry of Labour, Technological Development and Environment.",
      address: "Wagenwegstraat 22, Paramaribo",
      notes: [
        "Suriname does not publish a fee online — confirm the current cost with the Ministry.",
      ],
    },
  },
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    authority: "Ministry of Foreign and CARICOM Affairs",
    howTo:
      "Apply through the Ministry of Foreign and CARICOM Affairs. Trinidad and Tobago offers an online CSME e-Application, and biometrics or in-person steps may apply.",
    officialUrl: "https://foreign.gov.tt/services/csme/",
    fee: "Free — the Ministry charges no fee to apply for or verify the Skills Certificate.",
    formUrl: "https://csme.foreign.gov.tt/",
    detail: {
      steps: [
        { title: "Start the e-Application", text: "Begin online through the CSME e-Application at csme.foreign.gov.tt, or prepare a paper application." },
        { title: "Gather your documents", text: "Get the documents below ready. Your name must match your passport exactly." },
        { title: "Appear in person", text: "Attend with your original documents and copies. The Ministry certifies and keeps the copies and returns your originals on the spot." },
        { title: "Committee review", text: "A committee reviews all applications; they cannot be expedited." },
        { title: "Receive your certificate", text: "Processing takes about 6 to 8 weeks." },
      ],
      documents: [
        "Your actual degree or qualification certificate (transcripts and university letters are not accepted)",
        "Police Certificate of Character (valid within 6 months of issue)",
        "Passport",
        "Medical forms (for non-nationals)",
      ],
      processingTime: "6 to 8 weeks.",
      submit: "Online via the CSME e-Application (csme.foreign.gov.tt), or in person with originals and copies.",
      address: "2 Prada Street, St. Clair, Newtown, Port of Spain",
      phone: "(868) 623-6894 / 285-5029",
      email: "website@foreign.gov.tt",
      notes: [
        "You must work in the field the certificate was issued for.",
        "Common-law spouses are not recognised as dependants.",
      ],
    },
  },
];
