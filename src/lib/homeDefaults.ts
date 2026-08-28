// Bundled defaults for the home page and the insurance "we have moved" page.
// These are editable in Studio (homeContent / insurancePage documents); this
// file is the fallback so the site always renders even before seeding.

export type HomeStat = { value: string; label: string };
export type HomeJourney = { title: string; text: string; cta: string; href: string };
export type HomePillar = { icon: string; title: string; text: string; href: string };
export type HomeStep = { title: string; text: string };
export type HomeWhy = { icon: string; title: string; text: string };
export type HomeFaq = { q: string; a: string };
export type HomeTile = { emoji: string; label: string };
export type HomeMovedCard = { scope: string; title: string; blurb: string; features: string[] };

export type HomeContent = {
  heroStats: HomeStat[];
  heroTrustNote: string;
  journeysEyebrow: string;
  journeysTitle: string;
  journeysIntro: string;
  journeys: HomeJourney[];
  journeysNote: string;
  ladderEyebrow: string;
  ladderTitle: string;
  ladderIntro: string;
  howEyebrow: string;
  howTitle: string;
  howIntro: string;
  steps: HomeStep[];
  howNote: string;
  csmeEyebrow: string;
  csmeTitle: string;
  csmeText: string;
  studyEyebrow: string;
  studyTitle: string;
  studyText: string;
  supportEyebrow: string;
  supportTitle: string;
  supportIntro: string;
  pillars: HomePillar[];
  notSureTitle: string;
  notSureText: string;
  localMoved: HomeMovedCard;
  whyEyebrow: string;
  whyTitle: string;
  why: HomeWhy[];
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: HomeFaq[];
  contactEyebrow: string;
  contactTitle: string;
  contactIntro: string;
  gallery: HomeTile[];
};

export const DEFAULT_HOME: HomeContent = {
  // Keep these SHORT. They sit in a max-w-2xl column and must stay on one row:
  // roughly 12 characters for a value and 20 for a label.
  heroStats: [
    { value: "3 journeys", label: "visit, work or study" },
    { value: "12 states", label: "CSME free movement" },
    { value: "One contact", label: "start to arrival" },
  ],
  heroTrustNote:
    "Practical guidance and coordination for your CARICOM journey. Final decisions are made by the relevant government offices, schools, employers, and service providers.",

  journeysEyebrow: "Where do you want to go?",
  journeysTitle: "Start with what you want to do",
  journeysIntro:
    "Every CARICOM journey begins with one of these. Pick the one that fits and we will show you what it actually involves.",
  journeys: [
    {
      title: "I want to visit",
      text: "Plan your visit with help understanding travel requirements, arranging flights and accommodation, and preparing for arrival.",
      cta: "Plan my visit",
      href: "/getting-there",
    },
    {
      title: "I want to work",
      text: "Understand the CARICOM Skills Certificate pathway, document requirements, destination process, and travel arrangements.",
      cta: "Explore the work pathway",
      href: "/getting-started",
    },
    {
      title: "I want to study",
      text: "Prepare for study in another CARICOM country with support for research, documentation, travel, accommodation, and practical arrival arrangements.",
      cta: "Plan my study journey",
      href: "/study",
    },
  ],
  journeysNote:
    "Requirements vary by country, institution, nationality, and purpose. We help you understand the process and prepare for the next step. Admission, work authorisation, immigration, and government decisions are made by the relevant authorities.",

  // The paid service ladder. The tiers themselves live in src/lib/serviceTiers.ts,
  // deliberately in code rather than the CMS; only these headings are editable.
  ladderEyebrow: "Working with us",
  ladderTitle: "Choose the support that fits your journey",
  ladderIntro:
    "Whether you need a clear plan, help preparing for work in another CARICOM country, or support coordinating the wider move, we can help you choose the right next step.",

  howEyebrow: "How it works",
  howTitle: "How Expeditions With Jo helps",
  howIntro: "Four steps, with someone to talk to at each one.",
  steps: [
    {
      title: "Tell us your goal",
      text: "Visit, work, study, or prepare for a new opportunity in another CARICOM country.",
    },
    {
      title: "Understand your pathway",
      text: "We help identify the relevant requirements, documents, offices, schools, employers, and next steps.",
    },
    {
      title: "Arrange the practical details",
      text: "This may include flights, accommodation, transfers, travel insurance, banking support, or other available services.",
    },
    {
      title: "Prepare for your journey",
      text: "Receive a clearer plan and practical checklist for travel, work, or study.",
    },
  ],
  howNote:
    "What we provide is guidance, preparation and coordination. Approval of a certificate, a visa, a place on a course, a job, an account or a tenancy rests with the government office, school, employer, bank or landlord involved.",

  csmeEyebrow: "Working in another CARICOM country",
  csmeTitle: "The CARICOM Skills Certificate, explained country by country",
  csmeText:
    "The Skills Certificate is what lets an eligible skilled CARICOM national work in another member state without a work permit. We set out who can apply, which documents each country asks for, where to submit, and what the office decides.",

  studyEyebrow: "Studying in another CARICOM country",
  studyTitle: "Studying abroad in the region works differently",
  studyText:
    "Free movement covers work, not study, so a student needs the destination country's own student visa or permit. We help you research institutions, organise documents, and handle travel, accommodation and arrival.",

  supportEyebrow: "Supporting services",
  supportTitle: "The practical pieces, whichever journey you are on",
  supportIntro:
    "These sit underneath the visit, work and study journeys rather than standing on their own. Use as many or as few as you need.",
  pillars: [
    {
      icon: "📜",
      title: "CARICOM Skills Certificate",
      text: "Country-by-country guidance to the certificate that lets eligible CARICOM nationals work in another member state.",
      href: "/caricom-skills-certificate",
    },
    {
      icon: "🏢",
      title: "Business Setup",
      text: "Register a business in your destination country, from name search to the documents a business bank account needs.",
      href: "/business-setup",
    },
    {
      icon: "💰",
      title: "Banking",
      text: "Which bank to approach on your island and exactly what to bring, plus help preparing loan and card applications.",
      href: "/finance",
    },
    {
      icon: "🧭",
      title: "CARICOM Move Basics",
      text: "Free, plain-language guides to certificates, documents and the practical steps involved.",
      href: "/guides",
    },
    {
      icon: "🗺️",
      title: "Country Guides",
      text: "Cost of living, places to see, local food and what to expect in every CARICOM country we cover.",
      href: "/destinations",
    },
  ],
  notSureTitle: "Not sure which of the three fits you?",
  notSureText:
    "Tell us where you are, where you are thinking of going, and what you want to do when you get there. We will map out the requirements, timelines and costs.",
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

  whyEyebrow: "Why work with Jo",
  whyTitle: "One contact for the whole journey",
  why: [
    {
      icon: "🤝",
      title: "One contact, one plan",
      text: "Requirements, documents and travel handled together, so nothing falls through the gaps between offices.",
    },
    {
      icon: "💬",
      title: "Real support",
      text: "Clear updates and someone to talk to before you go, while you are arranging things, and after you land.",
    },
    {
      icon: "🗺️",
      title: "Country-specific guidance",
      text: "Requirements, fees and offices for each CARICOM member state, drawn from the official sources, not generic advice.",
    },
    {
      icon: "👪",
      title: "Families welcome",
      text: "Travelling with a spouse, children or elderly relatives? We plan around the whole household.",
    },
    {
      icon: "📍",
      title: "Caribbean roots",
      text: "Based in Trinidad and Tobago, working with CARICOM nationals across the region.",
    },
    {
      icon: "✅",
      title: "Honest about limits",
      text: "We tell you plainly what we can arrange and what only a government office, school or employer can decide.",
    },
  ],

  testimonialsEyebrow: "Where are you going?",
  testimonialsTitle: "Choose your destination",

  faqEyebrow: "FAQ",
  faqTitle: "Common questions",
  faqs: [
    {
      q: "Who is Expeditions With Jo for?",
      a: "CARICOM citizens who want to visit, work or study in another CARICOM country. We help you understand what your destination requires, prepare your information, and arrange the practical side of getting there.",
    },
    {
      q: "Can you guarantee I will get a Skills Certificate, a visa, a job or a place on a course?",
      a: "No. Those decisions belong to the relevant government office, school, employer or other authority, and no one outside those bodies can promise an outcome. What we do is help you understand the process, prepare properly, and arrange the travel and practical details around it.",
    },
    {
      q: "Do I need a CARICOM Skills Certificate just to visit?",
      a: "No. The Skills Certificate relates to working in another member state. Visiting another CARICOM country is a different process, and studying is different again. Tell us which one you are planning and we will point you to the right requirements.",
    },
    {
      q: "Does free movement cover studying in another CARICOM country?",
      a: "No. CSME free movement and the Skills Certificate are about the right to work. A student normally has to apply to the destination country's own immigration authority for a student visa or permit, separately from anything CSME covers.",
    },
    {
      q: "Do you only handle travel bookings?",
      a: "Flights, accommodation and transfers are part of what we arrange, but they sit inside the bigger journey. Most people come to us because they want to understand the requirements first, then have the travel handled once the plan is clear.",
    },
    {
      q: "What does it cost?",
      a: "It depends on what you need. Some services, including Canadian visa guidance and loan or card application help, carry no charge from us. Business registration and setup are paid services with published packages. Ask on WhatsApp or through the enquiry form and we will tell you what applies before you commit to anything.",
    },
    {
      q: "How do I send documents securely?",
      a: "Not through the website. Do not put passport numbers, bank details or other sensitive information in the enquiry form. Once you get in touch we will explain how to share documents securely.",
    },
  ],

  contactEyebrow: "Get started",
  contactTitle: "Tell us about your CARICOM journey",
  contactIntro:
    "Fill in the form and we will come back with a clear picture of what your plan involves. Prefer to talk now? Message us on WhatsApp or use the chat.",
  gallery: [
    { emoji: "🧭", label: "Visit" },
    { emoji: "📜", label: "Work" },
    { emoji: "🎓", label: "Study" },
    { emoji: "✈️", label: "Flights" },
    { emoji: "🏡", label: "Stays" },
    { emoji: "💰", label: "Banking" },
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
