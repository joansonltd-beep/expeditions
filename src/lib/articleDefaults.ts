import type { ContentSection } from "@/lib/defaults";

// Bundled default guides/articles. Editable in Studio (post documents); these
// are the fallback so the section always has content.
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // YYYY-MM-DD
  body: ContentSection[];
  keywords?: string[];
};

export const DEFAULT_ARTICLES: Article[] = [
  {
    slug: "belize-permanent-residence-guide",
    title: "How to Apply for Permanent Residence in Belize",
    excerpt:
      "A year of legal residence, no more than 14 days away in total, a clean record and proof you can support yourself. Here's what Belize's Department of Immigration actually asks for.",
    publishedAt: "2026-08-23",
    keywords: [
      "Belize permanent residence",
      "how to apply for permanent residence Belize",
      "Belize immigration permanent residence requirements",
      "Belize residence documents",
      "moving to Belize permanently",
    ],
    body: [
      {
        paragraphs: [
          "Belize's permanent residence is separate from the CSME Skills Certificate: CSME covers CARICOM nationals in one of 12 approved work categories, while permanent residence through the Department of Immigration and Nationality Services is open to anyone who meets its requirements, CARICOM national or not, and grants a more settled status than a work permit.",
        ],
      },
      {
        heading: "The core requirements",
        bullets: [
          "At least 1 year of legal residence in Belize before you submit your application",
          "No more than 14 days spent outside Belize in total during that year",
          "No conviction anywhere carrying a possible sentence of 12 months or more, without a free pardon",
          "Proof you have been, and will continue to be, financially able to support yourself",
        ],
        note: "There's a separate route for people who entered Belize as minors (under 16): they may qualify after 10 years of residence, legal or otherwise.",
      },
      {
        heading: "Documents you'll need",
        bullets: [
          "Your passport, showing an arrival stamp dated at least a year before you apply",
          "A medical exam (the Residence Medical Examination Form), completed by a licensed medical practitioner in Belize, not one from your home country",
          "Two photographs",
          "Bank statements, from a local bank, a foreign bank, or both, showing you can support yourself",
          "A police record",
        ],
      },
      {
        heading: "The process and the fee",
        paragraphs: [
          "Approval takes at least 3 months, and includes both an immigration interview and a police interview. The fee depends on your nationality, so confirm the current amount for your country with the Department of Immigration before you apply. While your application is pending, you'll typically need to keep renewing a temporary extension so your stay in Belize stays legal in the meantime.",
        ],
      },
      {
        heading: "If you're a CARICOM national",
        paragraphs: [
          "If your work falls into one of the 12 approved CSME categories, the CSME Skills Certificate gets you working in Belize faster, without the year of prior residence or the fee. Belize is also one of four CARICOM countries with full free movement, so nationals of Barbados, Dominica and St. Vincent and the Grenadines can skip both routes entirely.",
        ],
        note: "See the CSME Skills Certificate steps for Belize, or Belize at a glance for cost of living and what to expect once you're there.",
      },
    ],
  },
  {
    slug: "jamaica-permanent-residence-guide",
    title: "How to Apply for Permanent Residence in Jamaica",
    excerpt:
      "Permanent residence in Jamaica goes through PICA, has to be applied for in person in Jamaica, and costs J$100,000. Here's the full document checklist and what to expect.",
    publishedAt: "2026-08-23",
    keywords: [
      "Jamaica permanent residence",
      "PICA permanent residence application",
      "how to apply for permanent residence Jamaica",
      "Jamaica permanent residence documents",
      "Jamaica permanent residence fee",
    ],
    body: [
      {
        paragraphs: [
          "Permanent residence is a separate track from the CSME Skills Certificate: where CSME is specifically for CARICOM nationals in one of 12 approved work categories, permanent residence through the Passport, Immigration and Citizenship Agency (PICA) is open to anyone who fits one of its categories, CARICOM national or not, and grants a more settled status. The application has to be made in person in Jamaica. It can't be submitted through the Jamaican High Commission or a Consulate abroad.",
        ],
      },
      {
        heading: "Who can apply, and under which category",
        bullets: [
          "Employment: at least 3 years of continuous employment in Jamaica",
          "Retirement",
          "Marriage to a Jamaican citizen",
          "Dependent of someone who already holds permanent residence",
          "Previous Unconditional Landing holders, by virtue of a prior marriage",
        ],
      },
      {
        heading: "Documents you'll need",
        bullets: [
          "A valid passport with at least 6 months left on it",
          "Your original birth certificate",
          "If married, your marriage certificate (officially translated if it isn't in English), plus details of your spouse, children and any other dependents",
          "A medical certificate confirming good health, officially translated if needed",
          "A police certificate from your country of residence, such as a UK DBS/Criminal Record check, officially translated if needed",
          "Two identical passport-sized photographs, certified in Jamaica by a bank manager or Justice of the Peace",
          "Evidence of your financial status: bank accounts, property you own, or business and other investments",
          "A letter explaining your reasons for seeking permanent residence, plus two reference letters from reputable Jamaican nationals or acquaintances, all addressed to the Chief Immigration Officer at PICA",
        ],
      },
      {
        heading: "The fee, the interview, and how long it takes",
        paragraphs: [
          "The application fee is J$100,000, payable to PICA and non-refundable. As part of the approval process, every applicant is interviewed by PICA's Investigation and Surveillance Unit. Processing typically takes 3 to 6 months from submission.",
        ],
      },
      {
        heading: "If you're a CARICOM national",
        paragraphs: [
          "If your work falls into one of the 12 approved CSME categories, the CSME Skills Certificate is usually the faster route to living and working in Jamaica, and it doesn't carry this fee or in-person-only restriction. Permanent residence is worth considering once you want a more settled status than the certificate gives you, or if your situation fits one of the categories above instead.",
        ],
        note: "See the CSME Skills Certificate steps for Jamaica, or Jamaica at a glance for cost of living and what to expect once you're there.",
      },
    ],
  },
  {
    slug: "csme-categories-explained",
    title: "CSME Skills Certificate: The 12 Approved Categories Explained",
    excerpt:
      "Only these 12 categories of CARICOM national qualify for a Skills Certificate. Here's what each one covers and what you'll need to prove you fit it.",
    publishedAt: "2026-07-20",
    keywords: [
      "CSME Skills Certificate categories",
      "who qualifies for CSME Skills Certificate",
      "CARICOM skilled national categories",
      "CSME categories explained",
      "CARICOM Vocational Qualification CVQ",
    ],
    body: [
      {
        paragraphs: [
          "The CSME Skills Certificate isn't open to every CARICOM national who wants to work on another island: it's limited to 12 approved categories of skilled worker, set by CARICOM Heads of Government. If your work doesn't fall into one of these, the certificate route isn't available to you, though other routes (covered below) might still apply.",
        ],
      },
      {
        heading: "The 12 categories",
        bullets: [
          "University graduates (now includes associate degrees, two A-levels or CAPE)",
          "Artistes",
          "Musicians",
          "Media workers",
          "Sportspersons",
          "Nurses",
          "Teachers",
          "Artisans, with a CARICOM Vocational Qualification (CVQ) Level 2",
          "Holders of associate degrees",
          "Domestic workers, with a CVQ Level 2",
          "Agricultural workers",
          "Private security officers",
        ],
      },
      {
        heading: "What you'll need to prove your category",
        paragraphs: [
          "University graduates and associate degree holders provide the actual degree or diploma certificate, not a transcript or a letter confirming enrolment. Artisans and domestic workers need a CARICOM Vocational Qualification at Level 2, issued by a recognised body in their home country. Nurses and teachers typically need their professional registration or licence alongside their qualification. Artistes, musicians, media workers and sportspersons usually support their application with evidence of their professional work: portfolios, contracts, or membership in a relevant professional body.",
          "Requirements vary a little by country and by the specific office processing your application, so confirm exactly what's expected with the designated authority in the country you're applying through before you gather documents.",
        ],
      },
      {
        heading: "If your work doesn't fit a category",
        paragraphs: [
          "Two other routes exist. If you're self-employed, the Right of Establishment under the Treaty of Chaguaramas lets CARICOM nationals set up and run a business in another member state without a Skills Certificate at all, since it's a separate treaty right covering business activity rather than employment. And if you're a national of Barbados, Belize, Dominica or St. Vincent and the Grenadines moving to one of the other three, full free movement means you don't need a certificate or a category either way.",
        ],
        note: "See the CSME Skills Certificate steps for your specific country for the exact office, fee and documents.",
      },
    ],
  },
  {
    slug: "full-free-movement-vs-csme-certificate",
    title: "Full Free Movement vs the CSME Certificate: What's the Difference",
    excerpt:
      "Barbados, Belize, Dominica and St. Vincent and the Grenadines skipped the certificate step for each other. Here's what that means, and why everyone else moving within CARICOM still needs one.",
    publishedAt: "2026-08-10",
    keywords: [
      "CARICOM full free movement countries",
      "OECS free movement",
      "CSME vs full free movement",
      "move from Jamaica to Barbados",
      "CARICOM Skills Certificate not needed",
    ],
    body: [
      {
        paragraphs: [
          "Every CARICOM country covered on this site recognises the CSME Skills Certificate, but a handful of countries have gone further and dropped the certificate requirement between themselves entirely. Knowing which group you're in changes what you actually need to do before you move.",
        ],
      },
      {
        heading: "The four full free-movement countries",
        paragraphs: [
          "As of 1 October 2025, nationals of Barbados, Belize, Dominica and St. Vincent and the Grenadines can live and work in any of those four countries without a CSME Skills Certificate or a work permit, regardless of what category of work they do. This is a step beyond standard CSME: it doesn't matter whether your job is one of the 12 approved categories, since no certificate is needed at all between these four.",
          "Moving between any of these four and a country outside the group still requires the standard route: the CSME Skills Certificate if you qualify under one of the 12 categories, or a work permit if you don't.",
        ],
      },
      {
        heading: "The separate OECS free movement arrangement",
        paragraphs: [
          "A different, overlapping group exists under the Organisation of Eastern Caribbean States (OECS): Antigua and Barbuda, Dominica, Grenada, St. Kitts and Nevis, Saint Lucia and St. Vincent and the Grenadines. Citizens of these six can also live in any of the other five indefinitely and work without a permit, under a 2011 OECS protocol that predates and is legally separate from the CSME free-movement group above. Dominica and St. Vincent and the Grenadines happen to sit in both groups, which is where the two regimes are easiest to mix up.",
        ],
      },
      {
        heading: "Everyone else: apply for the certificate",
        paragraphs: [
          "If neither group applies to your move, the CSME Skills Certificate is the route: confirm you fall into one of the 12 approved categories, then apply through the designated authority in your home country or your destination.",
        ],
        note: "See the CSME Skills Certificate steps for your specific country to check which group applies to your move.",
      },
    ],
  },
];
