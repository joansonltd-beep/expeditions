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
    { value: "Worldwide", label: "flights & stays" },
    { value: "Free", label: "finance guidance" },
    { value: "One booking", label: "for the whole trip" },
  ],
  pillarsEyebrow: "What we do",
  pillarsTitle: "Everything for your journey in one place",
  pillarsIntro: "From the first booking to the ride home, we handle the details so you can focus on the trip.",
  pillars: [
    { icon: "✈️", title: "Travel Booking", text: "Flights, stays, transfers and cruises, coordinated worldwide.", href: "/flights" },
    { icon: "🛡️", title: "Insurance", text: "We have moved. Our insurance services are now at joansonbjames.com.", href: "/insurance" },
    { icon: "💰", title: "Finance", text: "Help with loans, credit cards and registering your business.", href: "/finance" },
    { icon: "🛂", title: "Travel Visas", text: "Step-by-step support with the Canadian visa process from Trinidad.", href: "/travel-visas" },
  ],
  travelEyebrow: "Travel, worldwide",
  travelTitle: "Book the whole trip with one team",
  travelIntro: "Comfortable, reliable options at the best available prices, wherever you are headed.",
  notSureTitle: "Not sure where to start?",
  notSureText: "Tell us where you want to go and your budget. We will put together options that work for you.",
  bundleEyebrow: "Bundle & save",
  bundleTitle: "Flight + stay + transfers, one simple booking",
  bundleText:
    "Book your trip together for a smoother, discounted experience. From planning to boarding, we make it easy. A credit card is required to confirm travel bookings.",
  localEyebrow: "Trinidad and Tobago",
  localTitle: "Insurance and finance, sorted locally",
  localIntro: "Based in Trinidad and Tobago and ready to help you get things in order.",
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
  howTitle: "Simple from start to finish",
  howIntro: "A clear process with support at every step.",
  steps: [
    { title: "Reach out", text: "Send us your dates, destination, budget or the help you need." },
    { title: "Get options", text: "We put together options that fit your needs and your budget." },
    { title: "Confirm", text: "Pick what works and we handle the booking and paperwork." },
    { title: "Travel easy", text: "You get updates and support before and during your trip." },
  ],
  whyEyebrow: "Why book with us",
  whyTitle: "One contact for the whole journey",
  why: [
    { icon: "🤝", title: "One team, one booking", text: "Flights, stays and transfers handled together, so nothing falls through the gaps." },
    { icon: "💬", title: "Real support", text: "Clear updates and someone to talk to before and during your trip." },
    { icon: "💵", title: "Best available prices", text: "We look for options that fit your budget, then bundle to save you more." },
    { icon: "🧓", title: "Senior and group friendly", text: "Mobility support, accessibility needs and group travel are all welcome." },
    { icon: "📍", title: "Local roots", text: "Based in Trinidad and Tobago, serving travelers everywhere." },
    { icon: "✅", title: "Done right the first time", text: "We guide you through bookings, visas and paperwork step by step." },
  ],
  testimonialsEyebrow: "What travelers say",
  testimonialsTitle: "Trusted by travelers and families",
  contactEyebrow: "Get started",
  contactTitle: "Tell us about your trip or what you need",
  contactIntro:
    "Fill in the form and we will get back to you with options. Prefer to talk now? Message us on WhatsApp or use the chat.",
  gallery: [
    { emoji: "✈️", label: "Flights" },
    { emoji: "🏡", label: "Stays" },
    { emoji: "🚗", label: "Transfers" },
    { emoji: "🚢", label: "Cruises" },
    { emoji: "🛂", label: "Visas" },
    { emoji: "💰", label: "Finance" },
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
