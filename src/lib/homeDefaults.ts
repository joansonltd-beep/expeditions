// Bundled defaults for the home page and the insurance "we have moved" page.
// These are editable in Studio (homeContent / insurancePage documents); this
// file is the fallback so the site always renders even before seeding.

export type HomeStat = { value: string; label: string };
export type HomeJourney = { title: string; text: string; cta: string; href: string };
// `cta` overrides the card's default link text, for cards where a specific
// action reads better than a generic one.
export type HomePillar = { icon: string; title: string; text: string; href: string; cta?: string };
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
    { value: "Visit, work, study", label: "the three routes" },
    { value: "12 states", label: "CSME free movement" },
    { value: "One person", label: "start to arrival" },
  ],
  heroTrustNote:
    "We explain the process and organise the arrangements. The offices, schools, employers and banks make their own decisions.",

  journeysEyebrow: "Start here",
  journeysTitle: "Why are you going?",
  journeysIntro:
    "Visiting, working and studying each follow a different process, with different rules. Pick the one that fits you.",
  journeys: [
    {
      title: "I want to visit",
      text: "A holiday, family, or a short work trip. We check what your passport needs for that country, then sort the flights and somewhere to stay.",
      cta: "See what visiting involves",
      href: "/getting-there",
    },
    {
      title: "I want to work",
      text: "This usually starts with the Skills Certificate. We work out whether it applies to you, what your destination asks for, and what to do first.",
      cta: "See what working involves",
      href: "/getting-started",
    },
    {
      title: "I want to study",
      text: "Free movement does not cover study, so this is a different process. We help with the school, the permit, and getting you there.",
      cta: "See what studying involves",
      href: "/study",
    },
  ],
  journeysNote:
    "What applies to you depends on your passport, where you are going and why. Two people on the same flight can face completely different requirements.",

  // The paid service ladder. The tiers themselves live in src/lib/serviceTiers.ts,
  // deliberately in code rather than the CMS; only these headings are editable.
  ladderEyebrow: "Working with me",
  ladderTitle: "How much help do you want?",
  ladderIntro:
    "Some people only need to know what to check first. Others want the whole thing organised for them. Both are fine, and you can start small.",

  howEyebrow: "How it works",
  howTitle: "What working with me looks like",
  howIntro: "No mystery to it.",
  steps: [
    {
      title: "You tell me the plan",
      text: "Where you are, where you want to go, and why. Usually enough to start.",
    },
    {
      title: "I tell you what applies",
      text: "Which route fits your situation, and what the office handling it will ask you for.",
    },
    {
      title: "We get it organised",
      text: "Papers in order, flights booked, somewhere to stay, transfers arranged. As much or as little as you want.",
    },
    {
      title: "You go",
      text: "With a checklist you can actually follow, and my number if something comes up.",
    },
  ],
  howNote:
    "I help you get your documents in order, put the application together, and once something is approved, carry it out. What I cannot do is approve it. A CSME certificate, a student permit, a place at a school, a bank account, a tenancy: each one is somebody else's decision, and nobody outside those offices can promise you an answer.",

  csmeEyebrow: "Working in another CARICOM country",
  csmeTitle: "The Skills Certificate, country by country",
  csmeText:
    "This is the document that lets an eligible skilled CARICOM national work in another member state without a work permit. Our guide covers who can apply and which office handles it, wherever you are.",

  studyEyebrow: "Studying in another CARICOM country",
  studyTitle: "Studying works differently to working",
  studyText:
    "People are often surprised by this one. Free movement covers work, not study, so a student still needs the destination country's own student visa or permit. We help you sort that out along with the travel and somewhere to live.",

  supportEyebrow: "Supporting services",
  supportTitle: "The rest of it",
  supportIntro:
    "Flights, somewhere to stay, transfers, banking, setting up a business. You may need all of it or none of it. It depends on where you are going and why.",
  pillars: [
    {
      icon: "📜",
      title: "CARICOM Skills Certificate",
      text: "The document that lets an eligible CARICOM national work in another member state without a work permit.",
      href: "/caricom-skills-certificate",
    },
    {
      icon: "🏢",
      title: "Business Setup",
      text: "Registering a business where you are going, from the name search to what the bank will want to see.",
      href: "/business-setup",
    },
    {
      icon: "💰",
      title: "Banking",
      text: "Guidance on preparing to open a local bank account, including the documents and practical steps that may apply to your move.",
      href: "/finance",
      cta: "See how we help",
    },
    {
      icon: "🧭",
      title: "CARICOM Move Basics",
      text: "The general picture of how a move works, free to read. For what your own situation needs, ask me.",
      href: "/guides",
      cta: "Explore Move Basics",
    },
    {
      icon: "🗺️",
      title: "Country Guides",
      text: "What it costs to live there, and what to expect once you land.",
      href: "/destinations",
    },
  ],
  notSureTitle: "Not sure which one you are?",
  notSureText:
    "Tell Jo where you are now and where you are thinking of going. We will tell you what applies and what to sort out first.",
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

  // Only claims the business can actually stand behind. No client numbers,
  // years in business, partnerships, accreditations or review scores: none of
  // those are verified, so none of them appear.
  whyEyebrow: "Why people call",
  whyTitle: "Why people work with me",
  why: [
    {
      icon: "🗺️",
      title: "CARICOM is all I do",
      text: "Not one destination on a long list. This region is the whole business.",
    },
    {
      icon: "🤝",
      title: "You deal with one person",
      text: "Papers, flights and arrival all sit with me, so nothing gets lost between offices.",
    },
    {
      icon: "📍",
      title: "Country by country",
      text: "What each member state asks for, taken from the official sources rather than what worked for somebody else.",
    },
    {
      icon: "💬",
      title: "Still there after you land",
      text: "Most questions turn up in the first month, not before you go.",
    },
    {
      icon: "✅",
      title: "Straight answers",
      text: "Including when the answer is that I cannot help, or that you do not need me for this one.",
    },
  ],

  testimonialsEyebrow: "Where are you going?",
  testimonialsTitle: "Choose your destination",

  faqEyebrow: "FAQ",
  faqTitle: "Common questions",
  faqs: [
    {
      q: "Can you guarantee I get the certificate, the visa or the job?",
      a: "No, and be careful of anyone who says they can. Those decisions sit with the government office, the school or the employer. What I can do is make sure what you hand in is complete and in the right order.",
    },
    {
      q: "Do I need a Skills Certificate just to visit?",
      a: "No. The Skills Certificate is about working in another member state. Visiting is a different process, and studying is different again. Tell me which one you are planning and I will point you at the right requirements.",
    },
    {
      q: "Does free movement cover studying?",
      a: "No, and this catches people out. Free movement is about the right to work. A student normally still has to apply to the destination country's own immigration authority for a student visa or permit.",
    },
    {
      q: "What does it cost?",
      a: "Depends on the route. Visiting is free to plan. Working starts at $100 and studying at $150, both depending on how much is already sorted. Business registration has its own prices. Ask and I will tell you before you commit to anything.",
    },
    {
      q: "How do I send you documents?",
      a: "Not through this website. Do not put passport numbers or bank details in any form here. Once we are talking I will tell you how to send them safely.",
    },
  ],

  contactEyebrow: "Get in touch",
  contactTitle: "Tell Jo about your plans",
  contactIntro:
    "Fill in the form and I will come back to you, usually within a business day. If you would rather just talk, WhatsApp is quickest.",
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
