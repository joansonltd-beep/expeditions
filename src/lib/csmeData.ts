// CSME (CARICOM Single Market and Economy) Skills Certificate reference data.
// Researched from official government sources and the countries' own application
// forms (July 2026). Rules and fees change, so each country page carries a
// "confirm with the official source" note. Edit here to update.

export type CsmeStep = { title: string; text: string; tips?: string[] };

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
  "Completed application form",
  "Original birth certificate, plus a copy",
  "Valid passport, with a copy of the bio-data page and the issue and expiry pages",
  "Your qualification (degree, diploma, or CVQ certificate). Bring the actual certificate, not a transcript or a letter",
  "Police Certificate of Character (usually valid for only six months from issue)",
  "Marriage certificate, divorce decree or deed poll, if your name has changed",
  "Two passport-sized photographs",
];

// The general steps, the same idea everywhere.
export const CSME_STEPS: CsmeStep[] = [
  {
    title: "Check that you qualify",
    text: "Confirm you fall into one of the 12 approved categories of skilled CARICOM nationals. Your supporting documents depend on your category, so check this first.",
  },
  {
    title: "Gather your documents",
    text: "Get your birth certificate, passport, qualification, police certificate and photos ready, with copies of each. Some offices want certified copies.",
    tips: [
      "Get your Police Certificate of Character early, but not too early. They are typically valid for only six months from the date of issue.",
      "Bring actual certificates, not substitutes. Letters from a university or transcripts are generally not accepted in place of the degree certificate itself.",
    ],
  },
  {
    title: "Apply to the right office",
    text: "Submit your application and documents to the designated office, in your home country or in the country where you want to work. Call ahead to confirm the current fee and whether you need an appointment.",
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
    title: "Use it abroad",
    text: "When you arrive in another member state, present the certificate to immigration for an initial six-month entry stamp. You can begin work immediately, then receive an indefinite stay stamp once that country's competent authority verifies the certificate. Your spouse and dependants get the same rights to live and work with you.",
    tips: [
      "Travel with your original qualification documents and a fresh Police Certificate of Character. The receiving country will want them for verification.",
    ],
  },
];

// Shared final step for the country pages.
const USE_IT_ABROAD: CsmeStep = {
  title: "Use it abroad",
  text: "When you arrive in another member state, present the certificate to immigration for an initial six-month entry stamp. You can begin work immediately, then receive an indefinite stay stamp once that country's competent authority verifies the certificate. Spouses and dependants enjoy the same rights to live and work with you.",
  tips: [
    "Travel with your original qualification documents and a fresh Police Certificate of Character. The receiving country will want them for verification.",
  ],
};

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
      steps: [
        {
          title: "Confirm you qualify",
          text: "The certificate is open to CARICOM nationals in the twelve approved categories of skilled nationals, from university graduates and nurses to artisans with a CVQ. Check which category fits you, since your supporting documents depend on it.",
        },
        {
          title: "Contact the Ministry of Labour first",
          text: "Antigua and Barbuda does not publish its requirements online, so call or visit the Ministry of Labour at Nevis Street and Friendly Alley in St. John's to get the current form, document list and fee before you gather anything.",
        },
        {
          title: "Gather your documents",
          text: "Expect the standard CSME package: the completed form, your passport bio page, birth certificate, marriage certificate if applicable, a Police Certificate of Character, your qualification, and passport-sized photos. Bring originals and copies.",
          tips: [
            "Police Certificates of Character are typically valid for only six months, so time yours to land inside your application window.",
            "Bring the actual degree or CVQ certificate. Transcripts and university letters are generally not accepted in its place.",
          ],
        },
        {
          title: "Submit in person",
          text: "Hand in your application at the Ministry of Labour and pay whatever fee they confirm. Ask for a receipt and a contact for follow-up.",
        },
        {
          title: "Wait for processing and collect",
          text: "Your qualification is verified before the certificate is issued. Allow several weeks and follow up if you have not heard back.",
        },
        USE_IT_ABROAD,
      ],
      submit: "In person at the Ministry of Labour.",
      address: "Nevis Street & Friendly Alley, St. John's",
      notes: [
        "Antigua and Barbuda does not publish a fixed fee or document checklist online. Confirm both with the Ministry of Labour before you apply.",
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
        {
          title: "Confirm you qualify",
          text: "You must be a CARICOM national in one of the approved skill categories, engaged in a legitimate economic activity. Free movement does not cover moving for residency or citizenship alone.",
        },
        {
          title: "Complete the form and have it signed by a Justice of the Peace",
          text: "Fill in the application form and have it signed and stamped by a Justice of the Peace. The Council will not accept the form without the JP's official stamp.",
        },
        {
          title: "Gather your documents",
          text: "Collect everything on the list below. Two professional reference letters must be addressed to the Executive Director of the Barbados Accreditation Council.",
          tips: [
            "Write your name in block letters on the back of both passport photos.",
            "Nurses need a letter from the General Nursing Council. Artistes, media workers, musicians and sportspersons need a letter from their national federation or ministry plus previous employer letters.",
            "Incomplete documentation is not accepted, so check the list twice before you go.",
          ],
        },
        {
          title: "Submit in person and pay Bds$100",
          text: "Hand in your application at the Phoenix Centre on George Street, St. Michael. An authorised agent can submit for you if they bring your written consent and valid ID.",
        },
        {
          title: "Wait about 7 working days",
          text: "The Council issues certificates in a minimum of 7 working days, and verifies certificates from other countries in about 10 working days. That makes Barbados one of the fastest issuers in the region.",
        },
        {
          title: "Collect in person",
          text: "The certificate or Letter of Verification must be collected in person by the applicant, even if an employer submitted the application for you.",
        },
        USE_IT_ABROAD,
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
      submit: "In person (or via an authorised agent with written consent and valid ID). Incomplete documentation is not accepted.",
      address: "First Floor, The Phoenix Centre, George Street, St. Michael, BB11114",
      phone: "(246) 535-6740",
      email: "info@bac.gov.bb",
      notes: [
        "If you lose your certificate, file a police report in the country where it was lost, then apply for a replacement (Bds$100).",
        "Online submission is not available yet; the Council has said e-commerce facilities are coming.",
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
        {
          title: "Confirm you qualify",
          text: "Check that you fall into one of the approved categories of skilled CARICOM nationals. Your category decides which qualification documents you need.",
        },
        {
          title: "Gather your documents",
          text: "Collect the originals below plus one copy of each. Immigration reviews the copies against the originals when you submit.",
          tips: [
            "Non-Belizeans also need a police record from their country of origin and from any country where they lived for six months or more.",
            "Bring the actual degree, diploma or certificate. Substitutes are generally not accepted.",
          ],
        },
        {
          title: "Submit in Belmopan only",
          text: "All documents must be submitted at the Immigration Office in Belmopan. Applications are not taken at other offices.",
        },
        {
          title: "Pay the fees",
          text: "A new Skills Certificate costs BZ$225. Add BZ$50 for each dependant under 18 or BZ$100 for each dependant 18 and over. Replacements are BZ$50, and amendments, upgrades or verifications are BZ$25.",
        },
        {
          title: "Wait about 8 weeks",
          text: "Immigration reviews your documents and, once everything is in order, issues the certificate. It is valid indefinitely.",
        },
        USE_IT_ABROAD,
      ],
      documents: [
        "Completed application form",
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
        "You get a minimum initial stay of six months in the host country.",
        "The fee schedule has been in effect since 1 May 2020. Confirm it is current when you apply.",
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
      steps: [
        {
          title: "Confirm you qualify",
          text: "Check that you fall into one of the twelve approved categories of skilled CARICOM nationals. Your supporting documents depend on your category.",
        },
        {
          title: "Download the form and checklist",
          text: "Dominica publishes the application form together with its own document checklist on the government portal. Download it and read the checklist first, since that is where the exact requirements live.",
        },
        {
          title: "Gather your documents",
          text: "Expect the standard CSME package: passport bio page, birth certificate, marriage certificate if applicable, a Police Certificate of Character, your qualification and passport photos, with originals and copies.",
          tips: [
            "Police Certificates of Character are typically valid for only six months from issue, so time yours carefully.",
            "Bring actual certificates, not transcripts or letters.",
          ],
        },
        {
          title: "Submit at Government Headquarters",
          text: "Take your completed form and documents to the Ground Floor of Government Headquarters on Kennedy Avenue in Roseau, or contact the CSME centre by email first to confirm the process.",
        },
        {
          title: "Confirm the fee and wait",
          text: "Dominica does not publish a fee online, so confirm the current cost when you submit. Allow several weeks for verification, then collect your certificate when notified.",
        },
        USE_IT_ABROAD,
      ],
      submit: "In person at Government Headquarters in Roseau, or start by email with the CSME centre.",
      address: "Ground Floor, Government Headquarters, Kennedy Avenue, Roseau",
      phone: "+1 767 266 3000 / 3500",
      email: "cscentre@dominica.gov.dm",
      notes: [
        "The exact document checklist is inside the downloadable application form.",
        "Dominica does not publish a fee online. Confirm the current cost with the CSME centre before you go.",
      ],
    },
  },
  {
    slug: "grenada",
    name: "Grenada",
    authority: "Ministry of Foreign Affairs, Trade & Export Development",
    howTo:
      "Complete the application form and submit it in person, with your fee receipt from the treasury, to the Ministry of Foreign Affairs in St. George's.",
    officialUrl: "https://llca.gov.gd/labour/services/caricom-skills-certificate/",
    formUrl: "https://llca.gov.gd/labour/wp-content/uploads/sites/3/2023/12/CSME_skills_certificate_application_form.pdf",
    fee: "EC$250 (XCD) per application, paid to the treasury. Present the treasury receipt with your completed application.",
    detail: {
      steps: [
        {
          title: "Confirm you qualify",
          text: "The certificate is open to CARICOM nationals in the twelve approved categories of skilled nationals, including university graduates, nurses, teachers, holders of associate degrees, artistes, musicians, media workers, sportspersons, artisans, domestic workers, agricultural workers and private security officers. Check which category fits you, since your supporting documents depend on it.",
        },
        {
          title: "Gather your documents",
          text: "Grenada's application form lists the package: your university degree, birth certificate, passport copies, marriage certificate if applicable, and two passport-sized photographs. You must bring originals and certified copies of everything.",
          tips: [
            "No university degree? Artistes, musicians, media workers and sportspersons submit a letter from their respective organisation or association plus a letter from their employer as supporting evidence.",
            "Teachers need their Teacher's Training Certificate. Nurses need their nursing certificates together with registration with the Nursing Council.",
            "Get your Police Certificate of Character from the Royal Grenada Police Force early, but not too early. They are typically valid for only six months from issue.",
            "Artisans and skilled tradespeople usually need a CVQ or verification through the Grenada National Accreditation Board.",
          ],
        },
        {
          title: "Have your academic documents verified",
          text: "University degrees and all academic documents must be presented to the Grenada National Accreditation Board to be verified before your certificate can be issued.",
        },
        {
          title: "Pay EC$250 at the treasury",
          text: "The fee is EC$250 per application, payable to the treasury. Keep the treasury receipt, because it must be presented together with your completed application.",
        },
        {
          title: "Submit in person to the Ministry of Foreign Affairs",
          text: "Applicants must appear in person with originals and certified copies at the Ministry of Foreign Affairs, Trade & Export Development, Ministerial Complex, 4th Floor, Sir Eric M. Gairy Botanical Gardens, Tanteen, St. George's. Your original degree, marriage and birth certificates are returned to you.",
          tips: [
            "Call ahead on (473) 440-2640 ext. 23501 to confirm current requirements and whether you need an appointment. Grenada's process is still paper-based and details like photo specs can shift.",
          ],
        },
        {
          title: "Wait for processing and collect",
          text: "Processing typically takes around five to six weeks, since a committee reviews each application. Collect your certificate when notified.",
        },
        USE_IT_ABROAD,
      ],
      documents: [
        "Completed application form",
        "University degree, presented to the Grenada National Accreditation Board for verification (originals and certified copies)",
        "No degree? Artistes, musicians, media workers and sportspersons: a letter from your organisation or association plus a letter from your employer",
        "Teachers: Teacher's Training Certificate; nurses: nursing certificates plus Nursing Council registration",
        "Birth certificate",
        "Passport (copy of the pages with biographical details, date of issue and expiry)",
        "Marriage certificate (if applicable)",
        "Two passport-sized photographs",
        "Treasury receipt for the EC$250 fee",
      ],
      processingTime: "Around five to six weeks. A committee reviews each application.",
      submit: "In person, with originals and certified copies. Originals are returned to you.",
      address: "Ministerial Complex, 4th Floor, Sir Eric M. Gairy Botanical Gardens, Tanteen, St. George's",
      phone: "(473) 440-2640 / 2712 / 3036 ext. 23501",
      email: "registry@mofa.gov.gd",
      notes: [
        "Call the Ministry before you go. The process is paper-based, and requirements like fees and photo specs can shift, so a two-minute phone call saves a wasted trip into town.",
      ],
    },
  },
  {
    slug: "guyana",
    name: "Guyana",
    authority: "Ministry of Foreign Affairs and International Cooperation",
    howTo:
      "Submit your documents and the applicant particulars form to the Free Movement Unit at the Ministry of Foreign Affairs. Guyana requires an in-person step.",
    officialUrl: "https://www.minfor.gov.gy/csme",
    fee: "G$1,500 (GYD) application fee.",
    detail: {
      steps: [
        {
          title: "Confirm your category",
          text: "Check that you fall into one of the approved wage-earner categories. Guyana asks for different supporting evidence per category, so identify yours before gathering anything.",
        },
        {
          title: "Complete the form",
          text: "Print and complete the 'Particulars Relating to the Applicant' form from the Ministry of Foreign Affairs website.",
        },
        {
          title: "Gather your documents",
          text: "Collect the general documents below plus your category extras. Guyana is specific about these, so read the tips for your field.",
          tips: [
            "Degrees not issued by the University of Guyana or UWI need a verification letter from the Accreditation Council.",
            "Musicians and artistes: at least three character references on letterhead with a direct contact number and email, plus a portfolio showing years of work (CV, photos of you at work, at least three financial receipts, press clippings).",
            "Sportspersons: a letter from your national federation or association and from your local club, plus three character references and photos or press clippings.",
            "Media workers must be members of the Guyana Press Association and include its verification letter plus employer reference letters.",
            "Nurses: Nursing Council verification letter and your nurse registration card.",
          ],
        },
        {
          title: "Submit in person and pay G$1,500",
          text: "Submit your originals to the Free Movement Unit at Takuba Lodge, 254 South Road, Georgetown, and pay the G$1,500 processing fee. Keep your receipt, since proof of payment is part of the application.",
        },
        {
          title: "Wait 3 to 6 weeks",
          text: "Processing takes about three to six weeks, longer if verification of your qualification takes time. The certificate has no expiry date.",
        },
        USE_IT_ABROAD,
      ],
      documents: [
        "Completed 'Particulars Relating to the Applicant' form",
        "Birth certificate",
        "Deed poll, marriage certificate or divorce absolute (if applicable)",
        "Letter of citizenship (if applicable)",
        "CARICOM passport",
        "Recent passport-sized photograph",
        "Valid police clearance",
        "Proof of payment (G$1,500)",
        "Your qualification, plus the category extras listed in the steps above",
      ],
      processingTime: "3 to 6 weeks (longer if verification takes time).",
      submit: "In person to the Free Movement Unit, Ministry of Foreign Affairs. Office hours: Mon-Thu 8:00 am to 4:30 pm, Fri 8:00 am to 3:30 pm.",
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
      "Apply through the Work Permit Department of the Ministry of Labour and Social Security at North Street, Kingston. No other office accepts Skills Certificate applications.",
    officialUrl: "https://www.mlss.gov.jm/",
    fee: "J$2,000 (JMD) application fee plus J$8,000 processing, and J$2,000 for each dependant. Amendment J$2,000; replacement J$3,000.",
    formUrl: "https://www.mlss.gov.jm/download/csme-skills-certificate-application-form/",
    detail: {
      steps: [
        {
          title: "Confirm you qualify",
          text: "Check that you fall into one of the twelve approved categories of skilled CARICOM nationals. Your supporting documents depend on your category.",
        },
        {
          title: "Have your copies signed by a Justice of the Peace",
          text: "Photocopy your documents and have every copy signed by a Justice of the Peace. Unsigned copies are not accepted.",
        },
        {
          title: "Get your qualification verified",
          text: "Obtain a letter of verification from the institution where you qualified, certifying that you completed the programme of study.",
          tips: [
            "Recognised universities include UWI, University of Technology, Northern Caribbean University, Mico University College, University of Guyana and University of Suriname.",
            "If your qualification is from anywhere else, it must first be verified by the University Council of Jamaica, so build in extra time for that.",
          ],
        },
        {
          title: "Submit at North Street with your fees",
          text: "Submit your completed application, JP-signed documents and fees at the Work Permit Department, Ministry of Labour and Social Security, 1F North Street, Kingston. The application fee is J$2,000 (non-refundable) plus J$8,000 processing, and J$2,000 for each dependant.",
        },
        {
          title: "Wait for processing and collect",
          text: "Jamaica does not publish an official processing time, so allow several weeks and follow up with the Ministry. Amendments later cost J$2,000 and replacing a lost certificate costs J$3,000.",
        },
        USE_IT_ABROAD,
      ],
      documents: [
        "Completed application form",
        "Photocopies of all documents, each signed by a Justice of the Peace",
        "Letter of verification from the institution where you qualified",
        "University Council of Jamaica verification, if your qualification is not from a recognised university",
        "Birth certificate, passport and passport photos (standard CSME package)",
      ],
      processingTime: "Not officially stated. Allow several weeks.",
      submit: "In person at the Work Permit Department, Ministry of Labour and Social Security (North Street office only).",
      address: "1F North Street, Kingston",
      phone: "(876) 922-9500-8",
      notes: [
        "Applications made anywhere other than the Labour Ministry's North Street office are not valid. The Ministry has publicly warned against third parties offering to process certificates.",
      ],
    },
  },
  {
    slug: "montserrat",
    name: "Montserrat",
    authority: "Labour Department / Office of the Premier",
    howTo:
      "Contact the Government of Montserrat's Labour Department before doing anything else. Montserrat participates in the CSME only partially, so the usual free movement of skills does not fully apply.",
    detail: {
      steps: [
        {
          title: "Understand Montserrat's special position",
          text: "Montserrat is a British Overseas Territory and only a partial participant in the CSME. The free movement of skills regime does not fully apply, and a work permit is generally still required to work there.",
        },
        {
          title: "Contact the Labour Department",
          text: "Call or write to the Labour Department in Brades to explain your situation, whether you are a Montserratian seeking a certificate or a CARICOM national wanting to work in Montserrat. They will tell you the current process, documents and any fee.",
        },
        {
          title: "Gather the standard package",
          text: "Have the standard CSME documents ready: passport, birth certificate, qualification, police certificate, marriage certificate if applicable, and passport photos, with originals and copies.",
          tips: [
            "Police Certificates of Character are typically valid for only six months from issue.",
          ],
        },
        {
          title: "Follow the Department's guidance",
          text: "Submit whatever the Labour Department asks for and confirm the fee at that point, since none is published.",
        },
        USE_IT_ABROAD,
      ],
      notes: [
        "Montserrat is only a partial participant in the CSME, so the free movement of skills does not fully apply and a work permit is generally still required.",
        "No fee or document checklist is published. Confirm everything with the Labour Department directly.",
      ],
    },
  },
  {
    slug: "st-kitts-and-nevis",
    name: "St. Kitts and Nevis",
    authority: "Ministry of International Trade, Industry and Commerce",
    howTo:
      "Apply through the CSME Desk Officer at the Ministry of International Trade, Industry and Commerce in Basseterre.",
    officialUrl: "https://miticca.gov.kn/csme/",
    detail: {
      steps: [
        {
          title: "Identify your category",
          text: "Work out which of the approved categories matches your qualification or skill. You must hold a CARICOM passport to benefit from the regime.",
        },
        {
          title: "Get the form and confirm the document list",
          text: "Collect the application form from the Ministry or request it by email. St. Kitts and Nevis does not publish its full document checklist online, so confirm it with the CSME Desk Officer. Expect the standard package: passport, birth certificate, qualification, police certificate, marriage certificate if applicable, and photos.",
          tips: [
            "Police Certificates of Character are typically valid for only six months from issue.",
            "Bring actual certificates, not transcripts or letters.",
          ],
        },
        {
          title: "Submit to the CSME Desk Officer",
          text: "Hand in your application form and documents to the CSME Desk Officer at the Ministry of International Trade, 2nd Floor, Nagico Building, Bladen Commercial Development, Basseterre. Confirm the fee when you submit, since none is published.",
        },
        {
          title: "Committee review",
          text: "The Free Movement of Skilled Persons Committee reviews your application. This takes a minimum of six weeks, longer if your qualification has to be verified with another country.",
        },
        {
          title: "Collect your certificate and endorse your passport",
          text: "If approved, you receive your Skills Certificate and a decision letter. Then present your CARICOM passport to the Ministry of National Security for an indefinite-stay endorsement.",
        },
        USE_IT_ABROAD,
      ],
      processingTime: "Minimum 6 weeks (longer if verification with the issuing country is needed).",
      submit: "In person to the CSME Desk Officer, Ministry of International Trade.",
      address: "2nd Floor, Nagico Building, Bladen Commercial Development, Basseterre",
      phone: "(869) 467-1636 / 467-1203",
      email: "foreigntrade@gov.kn",
      notes: [
        "You must hold a CARICOM passport. Your spouse and dependants can benefit from your status.",
        "St. Kitts and Nevis does not publish a fixed fee online. Confirm it with the Ministry.",
      ],
    },
  },
  {
    slug: "saint-lucia",
    name: "Saint Lucia",
    authority: "Ministry of External Affairs",
    howTo:
      "Complete the application form and return it to the Consular Division (CSME unit) of the Ministry of External Affairs.",
    officialUrl: "https://www.govt.lc/services/csme-skills-certificate",
    fee: "EC$200 (XCD), paid when you collect the certificate.",
    detail: {
      steps: [
        {
          title: "Confirm you qualify",
          text: "Check that you fall into one of the twelve approved categories of skilled CARICOM nationals. Your supporting documents depend on your category.",
        },
        {
          title: "Gather your documents",
          text: "Saint Lucia publishes its own list, below. Note that the police certificate must come from both your birth country and your country of residence.",
          tips: [
            "Police Certificates of Character are typically valid for only six months from issue, so time yours to land inside your application window.",
            "Applying with dependants? Each needs a birth certificate, police record (where applicable) and marriage certificate.",
          ],
        },
        {
          title: "Submit to the Consular Division",
          text: "Return the completed form with your documents to the Consular Division (CSME unit) of the Ministry of External Affairs. Office hours are 8:00 a.m. to 4:30 p.m. Ask for Ms. Clenie Greer or Ms. Zizi Pitcairn.",
        },
        {
          title: "Wait a minimum of 3 weeks",
          text: "Processing takes a minimum of three weeks while your qualification is verified.",
        },
        {
          title: "Pay EC$200 on collection",
          text: "The EC$200 fee is paid when you collect the certificate, not when you apply.",
        },
        USE_IT_ABROAD,
      ],
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
      "Complete the application form and submit it with your documents to the Ministry of Foreign Affairs (CSME unit) in Kingstown.",
    officialUrl: "https://foreign.gov.vc/",
    fullFreeMovement: true,
    fee: "EC$250 (XCD), as stated on the official application form.",
    formUrl: "https://pmoffice.gov.vc/pmoffice/images/stories/Forms/CSME_Application_for_Certificate_of_Recognition_of_Skills.pdf",
    detail: {
      steps: [
        {
          title: "Confirm you qualify",
          text: "The form lists the eligible categories: graduates, media persons, sports persons, artistes, musicians, nurses, teachers, artisans and holders of an associate degree or comparable qualification. Check which fits you, since your supporting documents depend on it.",
        },
        {
          title: "Download and complete the form",
          text: "Fill in the official application form carefully and exactly as your passport reads. The form warns that false or misleading statements can result in permanent refusal of your application.",
        },
        {
          title: "Gather your documents",
          text: "The form requires originals and a copy of each document, listed below. Your degree or diploma must be certified by the Accreditation Unit.",
          tips: [
            "The police certificate requirement is strict: an original Police Certificate of Good Character from your country of origin AND from any other country where you lived for more than three months. This applies to nationals and non-nationals alike.",
            "Artistes, media workers, musicians and sportspersons also need a letter from their National Federation or Ministry confirming registration in their field, plus letters from previous employers stating what they did.",
            "Listing children as dependants? Include a birth certificate for each.",
            "The two passport photos must be identical.",
          ],
        },
        {
          title: "Submit to the Ministry and pay EC$250",
          text: "Submit everything to the Ministry of Foreign Affairs (CSME unit) in Kingstown. The cost stated on the form is EC$250. Your original documents are returned to you.",
        },
        {
          title: "Wait for processing and collect",
          text: "Allow several weeks for verification, then collect your certificate when notified.",
        },
        USE_IT_ABROAD,
      ],
      documents: [
        "Completed application form (names exactly as in your passport)",
        "University degree certificate or diploma, certified by the Accreditation Unit (original and copy)",
        "Artistes, media workers, musicians, sportspersons: a letter from your National Federation or Ministry confirming registration in your field, plus letters from previous employers stating your function",
        "Birth certificate, plus birth certificates of any children listed as dependants",
        "Passport (copy of the pages with biographical details, date of issue and expiry)",
        "Marriage certificate, divorce decree or deed of separation (if applicable)",
        "Two identical passport-sized photographs",
        "Original Police Certificate of Good Character from your country of origin and from any country where you lived for more than three months",
      ],
      submit: "Ministry of Foreign Affairs (CSME unit), Kingstown. Originals are returned to you.",
      notes: [
        "On first arrival the certificate gives a definite entry of six months in the receiving country.",
        "False or misleading statements on the form can lead to permanent refusal, so double-check every answer.",
      ],
    },
  },
  {
    slug: "suriname",
    name: "Suriname",
    authority: "Ministry of Labour, Technological Development and Environment",
    howTo:
      "Apply through the Free Movement of Skills unit at the Ministry of Labour in Paramaribo.",
    detail: {
      steps: [
        {
          title: "Confirm you qualify",
          text: "Check that you fall into one of the twelve approved categories of skilled CARICOM nationals. Your supporting documents depend on your category.",
        },
        {
          title: "Contact the Ministry first",
          text: "Suriname publishes little online, so contact the Ministry of Labour at Wagenwegstraat 22 in Paramaribo to confirm the current form, document list and fee before you gather anything.",
        },
        {
          title: "Gather your documents",
          text: "The known requirements are listed below. Note that your passport bio page copy must be signed by a Justice of the Peace.",
          tips: [
            "The police report must cover the country where you have lived for the last three years.",
            "Ask your professional ministry or body for the letter confirming you are registered in your field. It goes in with copies of your qualifications.",
          ],
        },
        {
          title: "Submit and confirm the fee",
          text: "Submit your application to the Free Movement of Skills unit and confirm the cost at that point, since no fee is published.",
        },
        {
          title: "Wait for processing and collect",
          text: "Allow several weeks for verification, then collect your certificate when notified.",
        },
        USE_IT_ABROAD,
      ],
      documents: [
        "Letter from the relevant Ministry confirming you are registered in your field, with copies of your qualifications",
        "Certified copy of your birth certificate",
        "Copy of your passport bio-data page, signed by a Justice of the Peace",
        "Police report for the country where you have lived for the last three years",
      ],
      submit: "Free Movement of Skills unit, Ministry of Labour, Technological Development and Environment.",
      address: "Wagenwegstraat 22, Paramaribo",
      notes: [
        "Suriname does not publish a fee online. Confirm the current cost with the Ministry.",
      ],
    },
  },
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    authority: "Ministry of Foreign and CARICOM Affairs",
    howTo:
      "Apply through the Ministry of Foreign and CARICOM Affairs, either online through the CSME e-Application or in person at Prada Street.",
    officialUrl: "https://foreign.gov.tt/services/csme/",
    fee: "Free. The Ministry charges no fee to apply for or verify the Skills Certificate.",
    formUrl: "https://csme.foreign.gov.tt/",
    detail: {
      steps: [
        {
          title: "Confirm you qualify",
          text: "Check that you fall into one of the twelve approved categories of skilled CARICOM nationals. Whichever field your certificate is issued for is the field you must work in.",
        },
        {
          title: "Start the e-Application",
          text: "Trinidad and Tobago is the only country with a full online portal. Begin at csme.foreign.gov.tt, or prepare a paper application if you prefer.",
        },
        {
          title: "Gather your documents",
          text: "The Ministry is strict about the list below. Your name on every document must match your passport exactly.",
          tips: [
            "Bring your actual degree certificate. Transcripts and university letters are not accepted in its place.",
            "The Police Certificate of Character is only valid for six months from its issue date, so time yours to land inside your application window.",
            "Non-nationals also need completed medical forms.",
          ],
        },
        {
          title: "Appear in person with originals and copies",
          text: "Attend at 2 Prada Street, St. Clair with your original documents and copies. The Ministry certifies and keeps the copies and returns your originals on the spot, so you are never without them.",
        },
        {
          title: "Committee review, 6 to 8 weeks",
          text: "A committee reviews every application and the process cannot be expedited. Expect six to eight weeks. There is no fee at any stage.",
        },
        USE_IT_ABROAD,
      ],
      documents: [
        "Your actual degree or qualification certificate (transcripts and university letters are not accepted)",
        "Police Certificate of Character (valid within 6 months of issue)",
        "Passport (name must match your documents exactly)",
        "Medical forms (for non-nationals)",
      ],
      processingTime: "6 to 8 weeks. Applications cannot be expedited.",
      submit: "Online via the CSME e-Application (csme.foreign.gov.tt), then in person with originals and copies.",
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
