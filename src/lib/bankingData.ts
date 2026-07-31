// Personal banking reference data for CARICOM islands, used by /finance and
// /finance/[island].
//
// Coverage rule: an island is listed when Republic Bank or Scotiabank has a
// retail presence there. Where both operate (Barbados, Guyana), Republic Bank
// is the one we point people to. Islands with neither are omitted — see
// UNCOVERED below for who they are and why.
//
// Researched July 2026 from the banks' own product pages. Fees, minimums and
// document lists change, so every island page carries a "confirm with the
// branch" note and links to the bank's own page.

export type Bank = "republic" | "scotia";

export type BankingIsland = {
  slug: string; // matches the CSME country slugs so URLs stay consistent
  name: string;
  bank: Bank;
  bankName: string; // the legal entity that operates on that island
  bankUrl: string;
  accountName: string; // the basic account we point people to
  accountUrl?: string;
  currency: string;
  minOpening?: string; // human-readable; omitted when the bank does not publish it
  // Set when the island's basic account is NOT the bank's electronic-access
  // product (e.g. Scotiabank Jamaica, which does not offer one). The text
  // explains what they get instead.
  noElectronicAccount?: string;
  alsoHas?: string; // the other bank present, when we had to pick
  notes?: string[];
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
    notes: [
      "No monthly service charge, and you get three free in-branch debits a month. Go over that and a flat TT$18 monthly fee applies.",
      "Free transactions at Republic's Blue Machines (ABMs), with a TT$5,000 daily limit, and free LINX point-of-sale purchases up to TT$10,000 a day.",
      "Balances of TT$500 or more earn 0.25% interest.",
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
    alsoHas: "Scotiabank",
    notes: ["Confirm the current minimum opening deposit with the branch — Republic Barbados does not publish it online."],
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
    alsoHas: "Scotiabank",
    notes: ["Confirm the current minimum opening deposit with the branch — Republic Guyana does not publish it online."],
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
    minOpening: "EC$25",
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
    currency: "XCD",
    minOpening: "EC$25",
    notes: [
      "No monthly maintenance fee, with three free in-branch transactions a month and an EC$15 monthly charge beyond that.",
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
    currency: "XCD",
    minOpening: "EC$25",
    notes: [
      "No monthly maintenance fee, with three free in-branch transactions a month and an EC$15 monthly charge beyond that.",
      "Republic Bank (EC) Limited took over Scotiabank's Eastern Caribbean branches, so an old Scotiabank account here is now a Republic account.",
    ],
  },
  {
    slug: "st-kitts-and-nevis",
    name: "St Kitts and Nevis",
    bank: "republic",
    bankName: "Republic Bank (EC) Limited",
    bankUrl: "https://republicbankec.com",
    accountName: "e-Free Account",
    currency: "XCD",
    minOpening: "EC$25",
    notes: [
      "No monthly maintenance fee, with three free in-branch transactions a month and an EC$15 monthly charge beyond that.",
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
    currency: "SRD",
    notes: [
      "Confirm the current minimum opening deposit with the branch — Republic Suriname does not publish it online.",
      "Banking here is conducted in Dutch as well as English. Ask whether your documents need a translation.",
    ],
  },
  {
    slug: "the-bahamas",
    name: "The Bahamas",
    bank: "scotia",
    bankName: "Scotiabank (Bahamas) Limited",
    bankUrl: "https://bs.scotiabank.com",
    accountName: "Electronic Access Account",
    accountUrl: "https://bs.scotiabank.com/personal/chequing-and-savings/electronic-access-account.html",
    currency: "BSD",
    notes: [
      "One low monthly fee covers unlimited self-service banking. You pay only when you use a teller or write a cheque.",
      "No fee for using your ScotiaCard to shop, or for Scotia OnLine and mobile banking.",
      "Confirm the current monthly fee against Scotiabank's rate and fee schedule before you open the account.",
    ],
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    bank: "scotia",
    bankName: "Scotiabank Jamaica",
    bankUrl: "https://jm.scotiabank.com",
    accountName: "Savings or Day-To-Day account",
    accountUrl: "https://jm.scotiabank.com/personal/chequing-and-savings/opening-a-new-account-requirements.html",
    currency: "JMD",
    minOpening: "J$5,000",
    noElectronicAccount:
      "Scotiabank Jamaica does not offer the Electronic Access Account. Its everyday Savings and Day-To-Day accounts are the equivalent starting point, and both come with Scotia OnLine and mobile banking.",
    notes: [
      "Local residents need a TRN (Tax Registration Number). If you have not been issued one yet, the tax ID from your current country of residence is accepted while you apply for a TRN.",
      "You can start the application online. Expect it to take about 20 minutes and to need photos of your ID and uploads of your documents.",
    ],
  },
];

// CARICOM members left off the list, and why. Surfaced on the hub page so the
// omission is explicit rather than looking like an oversight.
export const UNCOVERED: { name: string; reason: string }[] = [
  {
    name: "Antigua and Barbuda",
    reason:
      "Scotiabank sold its branches to Eastern Caribbean Amalgamated Bank (ECAB) in 2021, and Republic Bank does not operate here.",
  },
  {
    name: "Belize",
    reason: "Scotiabank sold its operations to Belize Bank in 2021, and Republic Bank does not operate here.",
  },
  {
    name: "Haiti",
    reason: "Scotiabank left in 2017, selling to Unibank. Republic Bank does not operate here.",
  },
  {
    name: "Montserrat",
    reason: "Neither bank has a branch. Banking is handled by the Bank of Montserrat and the local credit union.",
  },
];

export function getIsland(slug: string): BankingIsland | undefined {
  return BANKING_ISLANDS.find((i) => i.slug === slug);
}

export const BANK_LABEL: Record<Bank, string> = {
  republic: "Republic Bank",
  scotia: "Scotiabank",
};
