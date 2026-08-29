// The three levels of paid support, in order of commitment.
//
// Deliberately held in code rather than in Sanity: these are service
// definitions with legal weight, not marketing copy. What a tier does and does
// not cover, and the line between guidance and a decision made by a government
// office, should change through a reviewed edit rather than a quick CMS tweak.
//
// NO PRICES. None are published anywhere on the site, and none should be added
// here without Joanson confirming the actual figures. Every CTA asks for a
// conversation instead.

export type ServiceTier = {
  id: string; // anchor on /services
  title: string;
  cardText: string; // short version, home page card
  cardCta: string; // button label on the home page card
  intro: string; // longer version, /services
  whoFor?: string[]; // who this tier suits
  reviews?: string[]; // what we look at during it
  youReceive?: string[]; // what the customer walks away with
  duration?: string | null; // null renders the "to be confirmed" placeholder
  price?: string | null; // null renders the "to be confirmed" placeholder
  includes: string[];
  notIncluded: string[];
  waMessage: string; // prefilled WhatsApp opener naming this tier
};

// Shared across every service section. Kept in one place so the wording cannot
// drift between pages.
export const SERVICE_DISCLAIMER =
  "Government requirements, processing times and fees may vary by country and may change. Our service fee is separate from any government or third-party fee. We provide guidance and practical support, but final decisions are made by the relevant authorities.";

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "consultation",
    title: "Move Planning Consultation",
    cardText:
      "Not sure where to begin? We review your nationality, destination, purpose, documents and timeline, then recommend the right next step for your journey.",
    cardCta: "Book a Consultation",
    intro:
      "The starting point, and the right choice if you are not yet sure which pathway applies to you. We go through your situation together and you come away knowing what your next step actually is.",
    whoFor: [
      "Anyone who knows they want to move but not where to start",
      "People weighing up two or three destinations against each other",
      "Anyone told to 'get a Skills Certificate' who is not sure it applies to them",
      "People who have started, got stuck, and want someone to untangle it",
    ],
    reviews: [
      "Your nationality and the passport you will travel on",
      "Where you are now and where you want to go",
      "Whether you are visiting, working, studying or moving for good",
      "Your occupation or field of study, where it affects the pathway",
      "Which documents you already hold and which you still need",
      "The timeframe you are working to, and whether it is realistic",
    ],
    youReceive: [
      "A clear answer on which pathway applies to your situation",
      "A document checklist built around your circumstances, not a generic one",
      "The order the steps have to happen in, and which ones gate the others",
      "The offices, schools or employers you will be dealing with",
      "An honest view of what is achievable in your timeframe",
    ],
    // Not published on the site until Joanson confirms them. Fill both in and
    // they render in place of the "to be confirmed" note on /services.
    duration: null,
    price: null,
    includes: [
      "Reviewing your circumstances: nationality, destination, purpose and timeline",
      "Identifying which pathway applies to you, whether that is visiting, working or studying",
      "A tailored checklist of the documents your situation calls for",
      "Explaining the order of the steps, and which ones have to happen before others",
      "Pointing you to the right office, school or employer to deal with",
      "An honest view of what is realistic in your timeframe",
    ],
    notIncluded: [
      "A decision on your eligibility. That rests with the relevant authority, not with us.",
      "Submitting anything on your behalf at this stage.",
      "Any government or third-party fee, which you pay directly.",
    ],
    waMessage: "Hi Jo, I'd like to book a Move Planning Consultation.",
  },
  {
    id: "skills-certificate",
    title: "CSME Skills Certificate Assistance",
    cardText:
      "Planning to work in another CARICOM country? Get guidance on eligibility, documents, application preparation and the next steps in the process.",
    cardCta: "Get Certificate Assistance",
    intro:
      "For people whose next step is working in another CARICOM country. The Skills Certificate is what lets an eligible skilled CARICOM national work in another member state without a work permit, and this is hands-on support through preparing that application.",
    includes: [
      "Working out which of the approved categories fits your qualification",
      "A document checklist built around your category and your destination",
      "Reviewing your documents for completeness before you submit",
      "Explaining what the office you are applying to expects, and in what order",
      "Flagging the timing traps, such as a police certificate expiring mid-application",
      "Help understanding what happens after you submit",
    ],
    notIncluded: [
      "Approval. The certificate is issued or refused by the designated government office, and we have no influence over that decision.",
      "Any guarantee of eligibility, processing time or outcome.",
      "The government's own application fee, which you pay directly to them.",
    ],
    waMessage: "Hi Jo, I'd like help with a CSME Skills Certificate application.",
  },
  {
    id: "complete-package",
    title: "Complete Relocation Support",
    cardText:
      "Need support with more than one part of the move? We can help coordinate planning, paperwork guidance, travel, banking and settling-in support where applicable.",
    cardCta: "Explore the Full Package",
    intro:
      "For people with several moving parts to line up at once. Rather than handling the paperwork in one place and the travel in another, this coordinates the pieces that apply to your situation so they happen in a sensible order.",
    includes: [
      "Everything in the Move Planning Consultation",
      "Document preparation support across the steps that apply to you",
      "Coordinating flights, accommodation and airport transfers around your dates",
      "Guidance on opening a bank account once you arrive",
      "A practical arrival checklist and settling-in support",
      "Updates and someone to talk to as things progress",
    ],
    notIncluded: [
      "Job placement or recruitment. We do not place people in jobs or guarantee employment.",
      "Immigration, admission, banking or tenancy decisions, all of which belong to the relevant authority or provider.",
      "Third-party costs such as flights, accommodation and government fees, which are separate from our service fee.",
    ],
    waMessage: "Hi Jo, I'd like to talk about Complete Relocation Support.",
  },
];

export function tierById(id: string): ServiceTier | undefined {
  return SERVICE_TIERS.find((t) => t.id === id);
}

// "Where are you in your journey?" Maps how ready someone is onto the right
// destination, which is a different question from visit / work / study.
export type JourneyStage = { label: string; text: string; href: string; cta: string };

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    label: "I am still researching",
    text: "Start with the free guides and get a feel for what your journey involves.",
    href: "/guides",
    cta: "Read the Free Guides",
  },
  {
    label: "I have a job offer",
    text: "Work through the Skills Certificate and the paperwork that turns an offer into a move.",
    href: "/services#skills-certificate",
    cta: "Get Certificate Assistance",
  },
  {
    label: "I want help planning everything",
    text: "Have the planning, paperwork, travel and arrival coordinated together.",
    href: "/services#complete-package",
    cta: "Explore the Full Package",
  },
];
