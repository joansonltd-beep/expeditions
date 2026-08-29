// What Jo charges, by journey. All figures in USD, supplied by Joanson.
//
// EDIT HERE. This is the only place the numbers live. The Visit, Work and
// Study pages each read their own entry.
//
// "The twelve" throughout means the twelve CSME free movement states the site
// covers. Anywhere outside those carries a higher fee, because the research is
// not already done.
//
// Two rules for editing:
//   - `includes` is work Jo does or costs he absorbs. Nothing goes in it that
//     he does not actually pay for or carry out.
//   - `excludes` exists so nobody reads "groceries" as "Jo buys my groceries".
//     Keep it blunt.

export type PriceLine = { when: string; amount: string };

export type JourneyPricing = {
  headline: string; // the figure someone remembers
  lead: string; // one line explaining the headline
  lines: PriceLine[]; // the variants
  includesTitle: string;
  includes: string[];
  excludes: string[];
  // An optional extra that sits ON TOP of whichever line above applies,
  // rather than replacing it. Rendered as its own block so nobody reads it
  // as an alternative price.
  addOn?: { title: string; amount: string; text: string };
  note?: string; // the limit that has to sit next to the price
};

export const VISIT_PRICING: JourneyPricing = {
  headline: "Free",
  lead: "Planning a visit to any of the twelve CARICOM countries we cover costs nothing. Ask as much as you need.",
  lines: [
    { when: "Anywhere in the twelve CARICOM countries we cover", amount: "Free" },
    { when: "Travelling somewhere outside those twelve", amount: "$50" },
  ],
  includesTitle: "What you get",
  includes: [
    "Working out what your passport needs for that country",
    "Flights, somewhere to stay and airport transfers, arranged around your dates",
    "Someone to message while you are travelling",
  ],
  excludes: [
    "The cost of the flights, the accommodation and the transfers themselves",
    "Any visa or government fee, which you pay directly",
  ],
  note: "Whether you are admitted at the border is the immigration officer's decision on the day.",
};

export const WORK_PRICING: JourneyPricing = {
  headline: "From $100",
  lead:
    "$100 if you already have all three: a job offer, a CSME Skills Certificate, and somewhere to stay. Each one you are missing adds $200.",
  lines: [
    { when: "You have the job offer, the certificate and somewhere to stay", amount: "$100" },
    { when: "You are missing one of the three", amount: "$300" },
    { when: "You are missing two of the three", amount: "$500" },
    { when: "You are starting with none of them", amount: "$700" },
    // Same figure as "missing one", but a different job: this is that one
    // process on its own, without the flights, orientation and setup below.
    // Worded to make the difference obvious rather than look like a duplicate.
    { when: "You want help with one of the three on its own, and nothing else", amount: "$300" },
  ],
  includesTitle: "What the fee covers",
  includes: [
    "Getting every document ready for the Skills Certificate application",
    "Dealing with the ministry myself, and chasing them when they go quiet",
    "Keeping you updated as it moves, rather than leaving you wondering",
    "Searching for jobs and putting your applications in",
    "Setting up your interviews",
    "Telling you straight when a role is not a good fit, instead of letting you take it",
    "Finding housing at a sensible price, and vetting the landlord so you are not walking into a bad situation",
    "Flights, and working out how you get around once you are there",
    "An orientation tour of the places you will need: healthcare, groceries and the rest",
    "Setting up communications including internet, with the provider's installation fee covered",
    "Registering you with the public health system where that applies, including the registration cost",
  ],
  excludes: [
    "Rent, groceries, utility bills after setup, and anything else ongoing",
    "Medical treatment. Registration is covered, care is not",
    "Government fees, which you pay directly to the office concerned",
  ],
  note: "I will search and apply with you, but no one can make an employer hire you, and the Skills Certificate is the government office's decision.",
};

export const STUDY_PRICING: JourneyPricing = {
  headline: "From $150",
  lead:
    "$150 if you have already applied, been accepted, and have somewhere to stay. Each one of those you are missing adds $200.",
  lines: [
    { when: "You have applied, been accepted, and have somewhere to stay", amount: "$150" },
    { when: "You are missing one of the three", amount: "$350" },
    { when: "You are missing two of the three", amount: "$550" },
    { when: "You are starting with none of them", amount: "$750" },
    { when: "You want help with one of the three on its own, and nothing else", amount: "$300" },
    { when: "Studying outside the twelve countries we cover", amount: "Add $200" },
  ],
  includesTitle: "What the fee covers",
  includes: [
    "The application to the school, prepared and submitted for you",
    "Finding room and board, and negotiating the rate",
    "Flights, and working out how you get around locally once you land",
    "An orientation tour of the places you will actually need: healthcare, groceries and the rest of the essentials",
    "Setting up communications including internet, with the provider's installation fee covered",
    "Registering you with the public health system where that applies, including the registration cost",
  ],
  excludes: [
    "Tuition, rent, groceries, utility bills after setup, and anything else ongoing",
    "Medical treatment. Registration is covered, care is not",
    "Government and school fees, which you pay directly",
  ],
  addOn: {
    title: "Want me there in person?",
    amount: "Add $2,000 + airfare",
    text: "I travel out with you and stay up to ten days, getting you settled on the ground. Everything above still applies; this is me there as well. People take it when they would rather not handle the first week on their own, or when a parent cannot travel with them.",
  },
  note: "Making the application is work I do for you. Whether the school accepts you is the school's decision.",
};
