// Bundled defaults for the home page and the insurance "we have moved" page.
// These are editable in Studio (homeContent / insurancePage documents); this
// file is the fallback so the site always renders even before seeding.

export type HomeStat = { value: string; label: string };
export type HomePillar = { icon: string; title: string; text: string; href: string };
export type HomeStep = { title: string; text: string };
export type HomeWhy = { icon: string; title: string; text: string };
export type HomeTile = { emoji: string; label: string };
export type HomeMovedCard = { scope: string; title: string; blurb: string; features: string[] };

export type HomeContent = {
  heroStats: HomeStat[];
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsIntro: string;
  pillars: HomePillar[];
  travelEyebrow: string;
  travelTitle: string;
  travelIntro: string;
  notSureTitle: string;
  notSureText: string;
  bundleEyebrow: string;
  bundleTitle: string;
  bundleText: string;
  localEyebrow: string;
  localTitle: string;
  localIntro: string;
  localMoved: HomeMovedCard;
  howEyebrow: string;
  howTitle: string;
  howIntro: string;
  steps: HomeStep[];
  whyEyebrow: string;
  whyTitle: string;
  why: HomeWhy[];
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  contactEyebrow: string;
  contactTitle: string;
  contactIntro: string;
  gallery: HomeTile[];
};

export const DEFAULT_HOME: HomeContent = {
  heroStats: [
    { value: "12 states", label: "CSME free movement" },
    { value: "Step by step", label: "paperwork guidance" },
    { value: "One contact", label: "for the whole move" },
  ],
  pillarsEyebrow: "How we help you move",
  pillarsTitle: "Everything for your move in one place",
  pillarsIntro:
    "From the CSME Skills Certificate that lets you live and work on another island to the bank account and business you will need once you land, we handle the details.",
  pillars: [
    {
      icon: "📜",
      title: "CSME Skills Certificate",
      text: "Country-by-country guidance to the certificate that lets CARICOM nationals live and work on another member state.",
      href: "/caricom-skills-certificate",
    },
    {
      icon: "🏢",
      title: "Business Setup",
      text: "Register your business on your new island, from name search to a ready-to-use business bank account.",
      href: "/business-setup",
    },
    { icon: "💰", title: "Banking", text: "Open accounts and prepare loan and credit card applications for your new home.", href: "/finance" },
    { icon: "🧭", title: "Relocation Guides", text: "Plain-language guides to certificates, documents, and getting settled.", href: "/guides" },
    {
      icon: "🗺️",
      title: "Destinations",
      text: "Cost of living, places to see, local food and what to expect in every CARICOM country we cover.",
      href: "/destinations",
    },
  ],
  travelEyebrow: "When you need to travel",
  travelTitle: "Getting there is the easy part",
  travelIntro:
    "Every move comes with a few journeys. When yours does, we can arrange flights, stays, transfers and travel visas too.",
  notSureTitle: "Not sure where to start?",
  notSureText:
    "Tell us which island you are moving from and where you are headed. We will map out the paperwork, timelines and costs for you.",
  bundleEyebrow: "Relocation plan",
  bundleTitle: "Certificate, bank account and business setup, one plan",
  bundleText:
    "Moving is a dozen small tasks in the right order. We put your CSME application, banking and business registration into a single plan, so nothing stalls your move.",
  localEyebrow: "Settling in",
  localTitle: "Insurance and banking for your new home",
  localIntro: "Based in Trinidad and Tobago and ready to help you put down roots on your new island.",
  localMoved: {
    scope: "Now at joansonbjames.com",
    title: "Insurance",
    blurb:
      "We have moved. Our insurance services are now handled at joansonbjames.com, in partnership with Guardian Life of the Caribbean.",
    features: [
      "Life, health and critical illness",
      "Retirement and income protection",
      "Visit the site or book a consultation",
    ],
  },
  howEyebrow: "How it works",
  howTitle: "Your move, step by step",
  howIntro: "A clear process with support at every stage of the relocation.",
  steps: [
    { title: "Tell us your move", text: "Which island you are leaving, where you are headed, and whether you plan to work or start a business." },
    { title: "Get your roadmap", text: "We lay out the documents, fees and timelines for your CSME certificate and everything after it." },
    { title: "Paperwork handled", text: "Certificate application, bank account and business registration, guided step by step." },
    { title: "Settle in", text: "Insurance, banking and any flights or stays you need while you find your feet." },
  ],
  whyEyebrow: "Why move with us",
  whyTitle: "One contact for the whole move",
  why: [
    { icon: "🤝", title: "One contact, one plan", text: "Certificate, banking and business setup handled together, so nothing falls through the gaps." },
    { icon: "💬", title: "Real support", text: "Clear updates and someone to talk to before, during and after your move." },
    { icon: "🗺️", title: "Country-specific guidance", text: "Requirements, fees and offices for each CARICOM member state, not generic advice." },
    { icon: "👪", title: "Families welcome", text: "Moving with a spouse, children or elderly relatives? We plan around the whole household." },
    { icon: "📍", title: "Caribbean roots", text: "Based in Trinidad and Tobago, serving movers across all of CARICOM." },
    { icon: "✅", title: "Done right the first time", text: "We guide you through applications and paperwork so nothing gets bounced back." },
  ],
  testimonialsEyebrow: "Where are you moving?",
  testimonialsTitle: "Choose your destination",
  contactEyebrow: "Get started",
  contactTitle: "Tell us about your move",
  contactIntro:
    "Fill in the form and we will come back with a clear plan for your relocation. Prefer to talk now? Message us on WhatsApp or use the chat.",
  gallery: [
    { emoji: "📜", label: "CSME Certificate" },
    { emoji: "🏢", label: "Business Setup" },
    { emoji: "💰", label: "Banking" },
    { emoji: "🧭", label: "Guides" },
    { emoji: "✈️", label: "Flights" },
    { emoji: "🏡", label: "Stays" },
  ],
};

export type InsurancePage = {
  title: string;
  intro: string;
  body: string;
  bookNote: string;
  bookLabel: string;
  visitLabel: string;
};

export const DEFAULT_INSURANCE: InsurancePage = {
  title: "We have moved",
  intro: "Our insurance services now have their own dedicated home.",
  body: "For life, health, critical illness, income protection and retirement planning, visit Joanson Baptiste James's dedicated insurance site, in partnership with Guardian Life of the Caribbean.",
  bookNote: "You can still book a consultation directly on the new site.",
  bookLabel: "Book a consultation",
  visitLabel: "Visit joansonbjames.com",
};
