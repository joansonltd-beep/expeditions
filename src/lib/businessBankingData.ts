// Business/commercial bank account reference data, scoped to the three
// countries Business Setup currently covers (Trinidad and Tobago, Jamaica,
// Grenada). Distinct from bankingData.ts, which covers personal accounts
// across all of CARICOM.
//
// Researched August 2026 directly from each bank's own commercial/business
// account pages. Coverage is uneven because not every bank publishes a full
// document checklist online: where a bank's own page didn't list one, that is
// noted rather than filled in from another bank's list or general knowledge.

export type BusinessBankingCountry = {
  slug: string; // matches the CSME/business-setup country slugs
  name: string;
  bankName: string;
  bankUrl: string;
  documents: string[];
  keyRequirement?: string;
  minOpening?: string;
  notes?: string[];
  // Set when the bank's own page does not publish a document checklist, so
  // the section can say so plainly instead of implying one was found.
  noPublishedChecklist?: boolean;
};

export const BUSINESS_BANKING_COUNTRIES: BusinessBankingCountry[] = [
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    bankName: "Republic Bank Limited",
    bankUrl: "https://republictt.com/commercialaccount",
    documents: [
      "Certificate of Incorporation or Continuance, Notice of Address, Notice of Directors and Notice of Secretary",
      "Beneficial Ownership declaration (Form 45), if the company hasn't issued shares",
      "Most recent Annual Return, for a company that has existed more than a year",
      "Audited financial statements or management accounts for the last 3 years, or an opening balance sheet and cash flow projection for a start-up",
      "A Board Resolution authorising the account opening",
      "A utility bill in the company's registered name (within the last 3 months), plus a utility bill and valid photo ID for each director, signatory, secretary and any shareholder holding 10% or more",
      "The company stamp, for registered entities",
    ],
    minOpening: "TT$1 (no meaningful minimum published)",
    notes: [
      "Published fees: TT$25 a month plus TT$1 per transaction, a TT$23 overdraft facility fee, and TT$43 per 100 cheques.",
      "Non-resident applicants also need a reference letter from their bank abroad, proof of income, and FATCA/IRS forms if a US person is involved in the business.",
    ],
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    bankName: "Scotiabank Jamaica",
    bankUrl: "https://jm.scotiabank.com/scotia-investments/open-an-account/corporate-accounts.html",
    keyRequirement:
      "Every signatory and the business itself need a TRN (Taxpayer Registration Number), the same rule as personal accounts in Jamaica.",
    documents: [
      "Certificate of Incorporation, Articles and Memorandum of Association (waived for companies incorporated after 1 February 2005)",
      "A Directors' Resolution authorising the account",
      "Valid ID and TRN for every signatory, and the company's own TRN",
      "Names and addresses of principal owners, directors, beneficiaries, management and signatories, with ID for beneficial owners",
      "A financial statement, or 12 months of bank statements if the business doesn't have one yet",
      "A description of the business and its major suppliers, and the source of funds",
      "For a sole trader or partnership instead of a company: a Certificate of Business Name Registration and the business's written governing rules (a constitution or partnership deed) in place of incorporation documents",
    ],
    notes: [
      "This list comes from Scotiabank Jamaica's investment-account onboarding pages; its everyday Business Chequing Account page does not publish its own checklist and just gives a phone number, so confirm with the branch that it matches for a standard chequing account.",
      "National Commercial Bank Jamaica (NCB) also offers business accounts, but its site blocks automated access, so we could not verify its checklist directly. Expect it to ask for the same core documents: incorporation certificate, TRN, director ID and financials.",
    ],
  },
  {
    slug: "grenada",
    name: "Grenada",
    bankName: "Republic Bank (Grenada) Limited",
    bankUrl: "https://republicgrenada.com/commercial/commercial-business-packages",
    documents: [
      "Certificate of Registration for a sole trader or partnership, or Certificate of Incorporation for a company",
      "For limited companies: Certificate of Continuance (if registered after 1995), notice of registered address, directors, secretary and shareholders, and the Articles of Incorporation/Association and by-laws",
      "Two forms of valid photo ID (ID card, driver's permit or passport) for each director and signatory",
      "Audited financial statements for the last 3 years, plus a cash flow analysis or projection",
      "Bank statements showing existing capital or loan balances",
      "A business plan, for a new business",
    ],
    notes: ["Republic Bank Grenada does not publish a minimum deposit or fee schedule online; confirm both with the branch."],
  },
];

export function getBusinessBankingCountry(slug: string): BusinessBankingCountry | undefined {
  return BUSINESS_BANKING_COUNTRIES.find((c) => c.slug === slug);
}
