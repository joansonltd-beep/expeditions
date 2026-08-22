// Personal banking reference data for CARICOM islands, used by /finance and
// /finance/[island].
//
// Coverage rule: an island is listed when Republic Bank or Scotiabank has a
// retail presence there. Where both operate (Barbados, Guyana), Republic Bank
// is the one we point people to. Antigua and Barbuda has neither, so it uses
// ACB Caribbean, the largest indigenous bank on the island. Remaining members
// with no listed bank are omitted; see UNCOVERED below.
//
// Researched July 2026 from the banks' own product pages. Fees, minimums and
// document lists change, so every island page carries a "confirm with the
// branch" note and links to the bank's own page.

export type Bank = "republic" | "scotia" | "acb" | "ncb";

// A second bank worth knowing about on an island, with enough detail to act on
// rather than just a name.
export type BankOption = {
  bank: Bank;
  bankName: string;
  bankUrl: string;
  accountName: string;
  accountUrl?: string;
  minOpening?: string;
  note?: string;
};

export type BankingIsland = {
  slug: string; // matches the CSME country slugs so URLs stay consistent
  name: string;
  bank: Bank;
  bankName: string; // the legal entity that operates on that island
  bankUrl: string;
  accountName: string; // the basic account we point people to
  accountUrl?: string;
  currency: string;
  minOpening?: string; // human-readable; omitted when the bank genuinely does not publish it
  phone?: string; // shown alongside a "confirm with the branch" fallback
  // Set when the island's basic account is NOT the bank's electronic-access
  // product (e.g. Scotiabank Jamaica, which does not offer one). The text
  // explains what they get instead.
  noElectronicAccount?: string;
  alsoHas?: string; // the other bank present, when we had to pick
  alternative?: BankOption; // a second bank documented in full on the island page
  // A requirement that applies to every bank on the island, not just the one we
  // recommend. Shown up front so it is read before any bank-specific detail.
  keyRequirement?: string;
  notes?: string[];
  // Island-specific document lists, sourced from that island's own bank page,
  // overriding the generic BANK_DOCUMENTS[bank] / BANK_NONRESIDENT_DOCUMENTS[bank]
  // fallback below. Use these whenever an island's own page differs from the
  // regional default (different local agencies, a longer or shorter list, etc).
  documents?: string[];
  nonResidentDocuments?: string[];
};

// What each bank asks for. Individual islands can add to this via `notes`.
export const REPUBLIC_DOCUMENTS = [
  "A completed account application, done in branch or through Republic's online onboarding",
  "One or two valid forms of photo identification: passport, national ID card or driver's permit",
  "Proof of address dated within the last three months, such as a utility bill. If the bill is not in your name, bring the lease plus an authorisation letter from the account holder",
  "Proof of income: a job letter, a recent payslip, or business financials if you are self-employed",
  "The minimum opening deposit for the account",
];

export const REPUBLIC_NONRESIDENT_DOCUMENTS = [
  "A utility bill covering the last three months, or your lease agreement",
  "Proof of income: job letter and payslip, or financials if you run a business",
  "A banker's reference letter from your current bank",
  "Your work permit, CARICOM Skills Certificate or student documentation, where these apply",
];

export const SCOTIA_DOCUMENTS = [
  "One valid government-issued photo ID: passport, driver's licence, voter's ID or national ID",
  "Proof of address: a utility bill, rent receipt, lease agreement, property tax receipt, or a statement from a licensed financial institution",
  "Proof of employment: a job letter, a payslip, or a business registration certificate if you are self-employed",
  "Your tax number, or the tax ID issued by your country of residence if you are not yet resident",
  "Two references, each with a name, address, telephone number and occupation",
  "Documentation showing your original source of funds and your ongoing source of funds",
];

export const ACB_DOCUMENTS = [
  "Two pieces of government-issued photo identification: a passport (valid, and clearly showing both your photograph and your signature), driver's licence or voter's ID",
  "Proof of address, dated within the last three months: a statement from a reputable bank, a statement from a recognised credit card provider, or a utility bill",
  "Source of funds: a letter from your employer stating your position, years of service and monthly salary or weekly wage. If you are self-employed, the latest financial statements, invoices of purchases, an estimate of sales and a completed Declaration of Income form",
  "Original source of wealth: 12 months of bank statements for accumulated savings, a solicitor's or agent's letter for a property sale or inheritance, or a pension letter",
  "The minimum opening deposit for the account",
];

export const ACB_NONRESIDENT_DOCUMENTS = [
  "A reference letter from a financial institution",
  "Valid government-issued photo identification evidencing your nationality or residence, such as a passport, driver's licence or national ID",
  "Two reference letters from two different well-known banks, addressed to ACB Caribbean. If two are not possible, ask the bank what it will accept instead",
];

export const NCB_DOCUMENTS = [
  "One valid photo ID: driver's licence (both sides), National ID (Elector Registration Identification Card), passport, diplomatic ID, or the National Council for Senior Citizens card. Without a driver's licence, your TRN card works",
  "Your Taxpayer Registration Number (TRN)",
  "Proof of address, no more than six months old: a utility bill, a current credit card or bank statement, a postmarked envelope addressed to you, or your National ID",
  "Proof of income, no more than six months old: a letter from your employer, a payslip, or proof of salary paid into an account for the last three months. If you are self-employed, an accountant's letter stating your salary range and title, your tax return, or bank statements",
  "Two referees, each with a name, telephone number and occupation. A referee must have been an NCB customer for at least a year and cannot be an immediate family member",
];

// Per-bank document lists, so the pages do not branch on the bank name.
export const BANK_DOCUMENTS: Record<Bank, string[]> = {
  republic: REPUBLIC_DOCUMENTS,
  scotia: SCOTIA_DOCUMENTS,
  acb: ACB_DOCUMENTS,
  ncb: NCB_DOCUMENTS,
};

// Extra documents for people opening before they have moved. Scotiabank does
// not publish a separate non-resident list, so it is absent here.
export const BANK_NONRESIDENT_DOCUMENTS: Partial<Record<Bank, string[]>> = {
  republic: REPUBLIC_NONRESIDENT_DOCUMENTS,
  acb: ACB_NONRESIDENT_DOCUMENTS,
};

export const BANKING_ISLANDS: BankingIsland[] = [
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    bank: "republic",
    bankName: "Republic Bank Limited",
    bankUrl: "https://republictt.com",
    accountName: "e-Free",
    accountUrl: "https://republictt.com/personal/e-free",
    currency: "TTD",
    minOpening: "TT$100",
    alsoHas: "Scotiabank",
    documents: [
      "One form of ID that clearly states your nationality, such as a national ID card or passport. A driver's permit without a nationality statement needs a second, supporting ID. Dual nationals bring ID for each nationality",
      "A recent utility bill for proof of address (with an authorisation letter if it isn't in your name); if you are not yet resident, a utility bill from the last three months, or a lease agreement or landlord's letter instead",
      "Proof of income: a job letter and a pay stub from the last three months if employed; audited financials for the last three years, management accounts, or a Statement of Affairs and Statement of Income and Expenditure if self-employed. A start-up provides an opening balance sheet and cash flow projections",
    ],
    nonResidentDocuments: [
      "A banking reference from your current overseas institution (waived if you've already been legally resident for 5+ years)",
      "Your work permit or, for students, a letter of enrolment, where applicable",
    ],
    notes: [
      "No monthly service charge, and you get three free in-branch debits a month. Go over that and a flat TT$18 monthly fee applies.",
      "Free transactions at Republic's Blue Machines (ABMs), with a TT$5,000 daily limit, and free LINX point-of-sale purchases up to TT$10,000 a day.",
      "Balances of TT$500 or more earn 0.25% interest, paid on the last working day of the month.",
    ],
  },
  {
    slug: "barbados",
    name: "Barbados",
    bank: "republic",
    bankName: "Republic Bank (Barbados) Limited",
    bankUrl: "https://republicbarbados.com",
    accountName: "e-Free",
    accountUrl: "https://www.republicbarbados.com/personal/e-free",
    currency: "BBD",
    minOpening: "BDS$100",
    alsoHas: "Scotiabank",
    documents: [
      "One of the following: a National ID card, a passport, or a driver's licence (a driver's licence is only accepted alongside another form of valid photo ID)",
      "Proof of address dated within the last three months: a utility bill (excluding cell phone bills), another bank's statement (excluding credit union or other financial-institution statements), an official government or tax document such as correspondence from the BRA or NIS, or a rental agreement or contract from your landlord. If the bill isn't in your name, Republic Bank will provide an authorisation letter for the bill-holder to complete",
      "Proof of income: if employed, a job letter or your most recent pay slip. If self-employed, up-to-date audited financial statements for the last three years, or a Statement of Affairs and a Statement of Income and Expenditure. A start-up entity (in operation less than three years) provides an opening balance sheet and cash flow projections for three years instead",
    ],
    nonResidentDocuments: [
      "A foreign banker's reference, or a bank statement from the last three months",
      "If self-employed, a utility bill confirming your permanent foreign address",
      "A work permit, CARICOM Skills Certificate, or other official document granting permission to work. Students provide a missionary permit, student visa, or a letter of enrolment or acceptance from a Barbados educational institution instead",
    ],
    notes: [
      "Republic Bank markets e-Free around banking free, easy and convenient through RepublicOnline and its Blue Machine ABMs rather than in-branch: no monthly maintenance fee, plus a free OneCard Visa Debit for 24-hour ABM and point-of-sale access, a pocket wallet to protect it, and monthly e-statements.",
    ],
  },
  {
    slug: "guyana",
    name: "Guyana",
    bank: "republic",
    bankName: "Republic Bank (Guyana) Limited",
    bankUrl: "https://republicguyana.com",
    accountName: "e-Free",
    accountUrl: "https://www.republicguyana.com/personal/e-free",
    currency: "GYD",
    minOpening: "GY$5,000",
    alsoHas: "Scotiabank",
    keyRequirement:
      "You need a TIN Certificate to open a bank account in Guyana, and that includes foreign nationals working there. Sort it out before you go to the branch.",
    documents: [
      "One valid ID: a passport, a Guyana identification card, or a Guyana e-Identification card",
      "Proof of address: a utility bill (electricity, water or landline) issued within the last eight months, a longer window than most of the region allows",
      "Proof of income: a job letter or payslip if employed; an income and expenditure statement if self-employed",
      "Your TIN Certificate, required of every applicant including foreign nationals",
    ],
    nonResidentDocuments: ["A banker's reference, subject to the bank's conditions"],
    notes: [
      "No monthly maintenance fee and no restrictions on deposits or withdrawals. ATM, point-of-sale and mobile banking (RepublicMobile) transactions are free; the first in-branch withdrawal each month is free, and further ones cost G$300 each.",
      "Interest is only calculated on a minimum monthly balance of G$25,000 and over, paid on the last day of the month. The current rate is 0.082%.",
      "Daily limits total G$700,000: G$200,000 at ATMs and G$500,000 online and at point of sale, with a G$75,000 contactless limit.",
    ],
  },
  {
    slug: "grenada",
    name: "Grenada",
    bank: "republic",
    bankName: "Republic Bank (Grenada) Limited",
    bankUrl: "https://republicgrenada.com",
    accountName: "e-Free",
    accountUrl: "https://republicgrenada.com/personal/e-free",
    currency: "XCD",
    minOpening: "EC$1",
    documents: [
      "One valid photo ID: a passport, national ID card, or driver's permit (must not be expired)",
      "Proof of address: a utility bill, or the bank's confirmation-of-address form if the bill isn't in your name",
      "Proof of income: a job letter and a copy of your contract if employed; up-to-date financial statements or tax returns if self-employed",
    ],
    notes: [
      "No monthly maintenance fee, and no interest paid on the balance. An activity fee of EC$11.50 a month applies only if you use branch teller services.",
      "Non-resident applicants need extra documents that the bank does not publish online. Call the branch on 1-473-444-2265 before you apply.",
    ],
  },
  {
    slug: "dominica",
    name: "Dominica",
    bank: "republic",
    bankName: "Republic Bank (EC) Limited",
    bankUrl: "https://www.republicbankdominica.com",
    accountName: "e-Free Account",
    accountUrl: "https://www.republicbankdominica.com/personal/e-free-account",
    currency: "XCD",
    minOpening: "EC$25",
    notes: [
      "No monthly maintenance fee. Three in-branch transactions a month are free; after that a monthly charge of EC$15 applies.",
      "Republic Bank (EC) Limited took over Scotiabank's Eastern Caribbean branches, so an old Scotiabank account here is now a Republic account.",
    ],
  },
  {
    slug: "saint-lucia",
    name: "Saint Lucia",
    bank: "republic",
    bankName: "Republic Bank (EC) Limited",
    bankUrl: "https://www.republicbankstlucia.com",
    accountName: "e-Free Account",
    accountUrl: "https://www.republicbankstlucia.com/personal/e-free-account",
    currency: "XCD",
    minOpening: "EC$25",
    notes: [
      "No monthly maintenance fee, with three free in-branch transactions a month and an EC$15 monthly charge beyond that. The account does not earn interest.",
      "Republic Bank (EC) Limited took over Scotiabank's Eastern Caribbean branches, so an old Scotiabank account here is now a Republic account.",
    ],
  },
  {
    slug: "st-vincent-and-the-grenadines",
    name: "St Vincent and the Grenadines",
    bank: "republic",
    bankName: "Republic Bank (EC) Limited",
    bankUrl: "https://www.republicbankstvincent.com",
    accountName: "e-Free Account",
    accountUrl: "https://www.republicbankstvincent.com/personal/e-free-account",
    currency: "XCD",
    minOpening: "EC$25",
    notes: [
      "No monthly maintenance fee, with three free in-branch transactions a month and an EC$15 monthly charge beyond that. The account does not earn interest.",
      "Republic Bank (EC) Limited took over Scotiabank's Eastern Caribbean branches, so an old Scotiabank account here is now a Republic account.",
    ],
  },
  {
    slug: "st-kitts-and-nevis",
    name: "St Kitts and Nevis",
    bank: "republic",
    bankName: "Republic Bank (EC) Limited",
    bankUrl: "https://www.republicbankstkitts.com",
    accountName: "e-Free Account",
    accountUrl: "https://www.republicbankstkitts.com/personal/e-free-account",
    currency: "XCD",
    minOpening: "EC$25",
    notes: [
      "No monthly maintenance fee. Three free in-branch teller debits a month, then an EC$17.55 monthly fee applies. No charge for using Republic's Blue Machine ABMs, and the account does not earn interest.",
      "Republic Bank (EC) Limited took over Scotiabank's Eastern Caribbean branches, so an old Scotiabank account here is now a Republic account.",
    ],
  },
  {
    slug: "suriname",
    name: "Suriname",
    bank: "republic",
    bankName: "Republic Bank (Suriname) N.V.",
    bankUrl: "https://republicbanksr.com",
    accountName: "e-Free",
    accountUrl: "https://republicbanksr.com/personal/e-free",
    currency: "SRD",
    minOpening: "SRD 25",
    documents: [
      "One form of ID that clearly states your nationality, such as a national ID card or passport. A driver's licence without a nationality statement needs a second, supporting ID (national ID, passport or nationality certificate). Dual nationals bring ID for each nationality",
      "A recent utility bill, plus an authorisation letter if it isn't in your name",
      "A job letter and pay slip. A reference letter may also be asked for, depending on your situation",
    ],
    notes: [
      "No monthly maintenance fee. One free in-branch debit a month; further ones cost SRD 75 plus 10% VAT. ATM withdrawals cost SRD 11 each, but point-of-sale transactions are free up to SRD 100,000 a day.",
      "Balances of SRD 500,000 or more earn 0.25% interest, paid on the last working day of the month.",
      "Banking here is conducted in Dutch as well as English. Ask whether your documents need a translation.",
    ],
  },
  // The Bahamas deliberately excluded: it's a CARICOM member but not a CSME
  // free-movement participant, so it's out of scope for this site, same
  // reasoning as Montserrat.
  {
    slug: "antigua-and-barbuda",
    name: "Antigua and Barbuda",
    bank: "acb",
    bankName: "ACB Caribbean",
    bankUrl: "https://ag.acbonline.com",
    accountName: "Regular Savings Account",
    accountUrl: "https://ag.acbonline.com/personal/savings-account-2/",
    currency: "XCD",
    minOpening: "EC$100",
    noElectronicAccount:
      "ACB Caribbean does not offer a dedicated electronic-access account in Antigua. The Regular Savings Account is the everyday starting point, and it comes with a debit card, ATM access and mobile banking.",
    notes: [
      "Pays 2% interest. You need to keep EC$100 in the account: fall below it and a EC$10 fee applies.",
      "Neither Republic Bank nor Scotiabank operates here. Scotiabank's old branches became Eastern Caribbean Amalgamated Bank (ECAB) in 2021, so ACB Caribbean, the island's largest indigenous bank, is where we send people.",
      "You can start by phone on 1-268-481-4200, Monday to Friday, 8am to 4:30pm, or download the application form and take it into a branch.",
    ],
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    bank: "ncb",
    bankName: "NCB (National Commercial Bank Jamaica)",
    bankUrl: "https://www.jncb.com",
    accountName: "On-The-Go Standard",
    accountUrl: "https://www.jncb.com/personal/banking/bank-accounts",
    currency: "JMD",
    minOpening: "J$2,000",
    alternative: {
      bank: "scotia",
      bankName: "Scotiabank Jamaica",
      bankUrl: "https://jm.scotiabank.com",
      accountName: "Savings or Day-To-Day account",
      accountUrl: "https://jm.scotiabank.com/personal/chequing-and-savings/opening-a-new-account-requirements.html",
      minOpening: "J$5,000",
      note: "Scotiabank Jamaica does not offer the Electronic Access Account it runs elsewhere in the region, so its everyday Savings and Day-To-Day accounts are the starting point. Both come with Scotia OnLine and mobile banking. The TRN requirement applies here too, and the rest of its document list differs from NCB's, so check with the branch.",
    },
    keyRequirement:
      "You need a Taxpayer Registration Number (TRN) to open any bank account in Jamaica, at any bank. There is no way around it and no account you can open without one, so if you do not have a TRN yet, apply for that before anything else.",
    notes: [
      "No monthly service charge and no minimum balance fee. You get four free NCB ATM withdrawals a month and free online bill payment.",
      "The account is non-interest bearing, so it is for day-to-day money rather than savings. Pair it with a savings account if you want interest.",
      "You can open it online through NCB's remote onboarding, without visiting a branch, if you have a driver's licence, National ID or passport.",
    ],
  },
];

// CARICOM members left off the list, and why. Surfaced on the hub page so the
// omission is explicit rather than looking like an oversight.
export const UNCOVERED: { name: string; reason: string }[] = [
  {
    name: "Belize",
    reason: "Scotiabank sold its operations to Belize Bank in 2021, and Republic Bank does not operate here.",
  },
  {
    name: "Haiti",
    reason: "Scotiabank left in 2017, selling to Unibank. Republic Bank does not operate here.",
  },
];

export function getIsland(slug: string): BankingIsland | undefined {
  return BANKING_ISLANDS.find((i) => i.slug === slug);
}

export const BANK_LABEL: Record<Bank, string> = {
  republic: "Republic Bank",
  scotia: "Scotiabank",
  acb: "ACB Caribbean",
  ncb: "NCB",
};
