// Bundled default content (seed source + offline fallback). Plain module so
// both the server data layer (siteData.ts) and the seed script can import it.
// Until a Sanity project id is set, the whole site renders from this file.

// --- shared shapes ------------------------------------------------------
export type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
};

export type LinkRef = { label: string; href: string };

// --- site settings ------------------------------------------------------
export type SiteSettings = {
  businessName: string;
  tagline: string;
  whatsappNumber: string; // digits only, international form
  chatbotUrl: string;
  generalEmail: string;
  staysEmail: string;
  flightsEmail: string;
  supportEmail: string;
  queriesEmail: string;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  tiktokUrl: string | null;
  youtubeUrl: string | null;
  xUrl: string | null;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubcopy: string;
  paymentNote: string;
  footerBlurb: string;
  logoUrl: string | null;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  businessName: "Expeditions With Jo",
  tagline: "Getting from one CARICOM country to another",
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8687236644").replace(/\D/g, ""),
  chatbotUrl: "https://chatbot-c359f6.zapier.app",
  generalEmail: "info@expeditionswithjo.com",
  staysEmail: "stays@expeditionswithjo.com",
  flightsEmail: "flights@expeditionswithjo.com",
  supportEmail: "support@expeditionswithjo.com",
  queriesEmail: "queries@expeditionswithjo.com",
  facebookUrl: "https://www.facebook.com/profile.php?id=61575932890445",
  instagramUrl: "https://www.instagram.com/expeditionswithjo",
  linkedinUrl: null,
  tiktokUrl: null,
  youtubeUrl: null,
  xUrl: null,
  heroEyebrow: "Moving around CARICOM",
  heroHeadline: "Thinking about working, studying or visiting another CARICOM country?",
  heroSubcopy:
    "Tell Jo where you are starting and where you want to go. We will help you work out what to check first, and organise the flights, papers and arrival details around it.",
  paymentNote:
    "Secure payments via Fygaro and First Citizens Bank. Visa and Mastercard accepted.",
  footerBlurb:
    "Help for CARICOM citizens working out how to visit, work or study in another CARICOM country, and getting the paperwork and travel organised once they know.",
  logoUrl: null,
};

// --- services -----------------------------------------------------------
export type ServiceCategory = "travel" | "local" | "visa";

export type ServiceFaq = { q: string; a: string };

// The standard blocks every important service page carries, so a visitor can
// see who it is for, what they get, what they have to supply, and where our
// responsibility stops and a third party's decision begins. All optional: a
// page renders only the blocks that are filled in.
export type ServiceDetail = {
  whoFor?: string[];
  included?: string[];
  youProvide?: string[];
  notControlled?: string[];
  process?: string[];
  feesNote?: string;
  faqs?: ServiceFaq[];
  disclaimer?: string;
  related?: LinkRef[];
};

export type Service = {
  slug: string;
  title: string;
  icon: string;
  scope: string; // e.g. "Worldwide", "Trinidad Only", "CARICOM Only"
  category: ServiceCategory;
  order: number;
  shortBlurb: string; // home-page card text
  cardFeatures: string[]; // up to 3 bullets on the home card
  intro: string; // sub-page hero subcopy
  body: ContentSection[];
  primaryLink: LinkRef | null; // service-specific CTA (booking url, request email)
  detail?: ServiceDetail;
};

export const DEFAULT_SERVICES: Service[] = [
  {
    slug: "flights",
    title: "Flights",
    icon: "✈️",
    scope: "Worldwide",
    category: "travel",
    order: 1,
    shortBlurb:
      "Affordable, reliable flights for your move or a scouting trip beforehand, with the details handled for you.",
    cardFeatures: ["One-way or round-trip", "Baggage and special requests", "Senior and mobility support"],
    intro:
      "Moving to another island, or need to visit before you relocate? We help you find and book flights at great prices, no matter where you are headed.",
    body: [
      {
        paragraphs: [
          "Whether it is the flight for your move itself, a scouting trip beforehand, or a quick visit back home, we will guide you to the best options that fit your budget and schedule. We handle the logistics so you do not have to.",
        ],
      },
      {
        heading: "Our flight services include",
        bullets: [
          "Personalised flight booking based on your needs",
          "Fares that ensure you get the best value",
          "Simple one-way or round-trip bookings",
          "Assistance with baggage info and special airline requests",
          "Travel itinerary planning and confirmations",
          "Support for seniors and travellers needing extra care",
          "WhatsApp updates and guidance before and during your journey",
        ],
      },
    ],
    primaryLink: { label: "Flight request", href: "mailto:flights@expeditionswithjo.com?subject=Flight%20Request" },
    detail: {
      whoFor: [
        "Anyone visiting another CARICOM country for a holiday, a family visit or business",
        "People travelling to start work after a Skills Certificate is issued",
        "Students travelling to begin a course, and family travelling with them",
        "Anyone making a scouting trip before committing to a longer stay",
      ],
      included: [
        "Options matched to your dates, budget and baggage needs",
        "Booking and confirmation handled for you",
        "Guidance on baggage allowances and special airline requests",
        "Support for seniors and travellers needing extra assistance",
        "WhatsApp updates before and during your journey",
      ],
      youProvide: [
        "Names exactly as they appear on the passports being travelled on",
        "Travel dates, or the range you are flexible across",
        "Departure and destination cities",
        "Your budget, and any airline or routing preference",
      ],
      notControlled: [
        "Airline fares, which change constantly and are set by the airline",
        "Seat availability and schedule changes, delays or cancellations",
        "Whether you are admitted at the border on arrival",
        "Airline decisions on baggage, upgrades or special assistance requests",
      ],
      process: [
        "Send your dates and destination by WhatsApp or email.",
        "We come back with options and what each one costs.",
        "You choose, and we confirm the booking.",
        "You receive your itinerary and confirmations.",
      ],
      feesNote:
        "Any service charge is confirmed to you in writing before you commit. You always see the fare before booking.",
      faqs: [
        {
          q: "Can you get a cheaper fare than booking myself?",
          a: "Sometimes, and sometimes not. We look for the best value across the options for your dates rather than promising to beat any particular price. If booking direct is cheaper for your trip, we will tell you.",
        },
        {
          q: "Do you book flights outside CARICOM?",
          a: "Yes. Flight booking is worldwide, even though the rest of what we do is focused on CARICOM.",
        },
        {
          q: "What if my flight is cancelled or delayed?",
          a: "Tell us and we will help you work through the airline's options. The airline sets what it will offer, and any rebooking or refund is its decision under its own conditions of carriage.",
        },
      ],
      disclaimer:
        "A booked flight is not permission to enter a country. Entry, visas and length of stay are decided by the immigration authority of the country you are travelling to.",
      related: [
        { label: "Accommodation", href: "/accommodations" },
        { label: "Airport transfers", href: "/transfers" },
        { label: "Go Visit", href: "/getting-there" },
      ],
    },
  },
  {
    slug: "accommodations",
    title: "Accommodation",
    icon: "🏡",
    scope: "Worldwide",
    category: "travel",
    order: 2,
    shortBlurb:
      "Hotels, Airbnb and short-stay apartments while you settle in or scout your new island.",
    cardFeatures: ["Hotel and guesthouse bookings", "Airbnb and vacation rentals", "Best available prices"],
    intro:
      "Need somewhere to stay while you settle in, or for a scouting trip before you move? We help you find and book the right accommodation, whether it is a hotel, an Airbnb, or a short-stay apartment.",
    body: [
      {
        paragraphs: [
          "We work with a range of options to match your comfort, location, and budget needs, whether you are staying a few nights while you get your bearings or a few weeks while your certificate and bank account come through.",
        ],
        note: "For more information, send an email with your itinerary to stays@expeditionswithjo.com or use the chat button.",
      },
    ],
    primaryLink: { label: "Email your itinerary", href: "mailto:stays@expeditionswithjo.com" },
    detail: {
      whoFor: [
        "Visitors who want somewhere booked before they land",
        "People arriving to start work and needing a base while they find a longer-term home",
        "Students needing somewhere for the first few weeks or a first semester",
        "Anyone on a scouting trip before committing to a move",
      ],
      included: [
        "Hotel, guesthouse, Airbnb and short-stay apartment options",
        "Choices matched to your location, comfort level and budget",
        "Booking and confirmation handled for you",
        "Advice on which areas suit your purpose and how to get around from them",
      ],
      youProvide: [
        "Your dates and the town or area you need to be near",
        "How many people are staying, and their ages if children are travelling",
        "Your nightly or total budget",
        "Anything you need in the property, such as a kitchen, wifi or step-free access",
      ],
      notControlled: [
        "Availability and nightly rates, which are set by the property or platform",
        "Property standards, cleanliness and the accuracy of a host's listing",
        "Cancellation terms, which belong to the property or platform",
        "Whether a landlord or host accepts a particular guest or booking",
      ],
      process: [
        "Email your itinerary to stays@expeditionswithjo.com or message us on WhatsApp.",
        "We come back with options and what each one costs.",
        "You choose, and we confirm the booking.",
        "You receive your confirmation and check-in details.",
      ],
      feesNote:
        "Any service charge is confirmed in writing before you commit. You always see the nightly rate and the total before booking.",
      faqs: [
        {
          q: "Can you find me a long-term rental or an apartment to live in?",
          a: "We arrange short-stay accommodation, which is what most people need while they get settled. We can research options and point you in the right direction for a longer lease, but we are not a letting agency and we do not sign tenancies on your behalf.",
        },
        {
          q: "Can I book somewhere before I know whether my certificate or visa comes through?",
          a: "You can, but think about the cancellation terms first. We will flag which options are refundable so you are not locked into dates that may move.",
        },
      ],
      disclaimer:
        "Bookings are made with third-party properties and platforms under their terms. Their cancellation and refund policies apply, not ours.",
      related: [
        { label: "Flights", href: "/flights" },
        { label: "Airport transfers", href: "/transfers" },
        { label: "Country guides", href: "/destinations" },
      ],
    },
  },
  {
    slug: "transfers",
    title: "Transfers",
    icon: "🚗",
    scope: "Worldwide",
    category: "travel",
    order: 3,
    shortBlurb:
      "Pre-booked, English-speaking drivers in over 100 cities through Welcome Pickups, plus local rides in Trinidad.",
    cardFeatures: ["Airport pickups and drop-offs", "Over 100 cities worldwide", "Door-to-door, no taxi lines"],
    intro:
      "Landing on your new island, or just need a ride while you're there? Book reliable international airport transfers with ease, door to door, wherever you are headed.",
    body: [
      {
        heading: "International airport transfers",
        paragraphs: [
          "Through our partnership with Welcome Pickups, you can pre-book reliable, English-speaking drivers in over 100 cities worldwide. Whether it is an airport pickup or drop-off, avoid the hassle of long taxi lines and enjoy a smooth, door-to-door experience.",
        ],
        bullets: [
          "Pre-booked, English-speaking drivers",
          "Available in over 100 cities worldwide",
          "Airport pickups and drop-offs",
          "Door-to-door service, no long taxi lines",
        ],
        note: "Local Trinidad transfers, including airport pick up and drop off, are available for $5 USD each.",
      },
    ],
    primaryLink: { label: "Book your transfers", href: "https://www.book-online-transfers.com/en/expeditionswithjo" },
    detail: {
      whoFor: [
        "Anyone landing somewhere unfamiliar who would rather not negotiate a taxi on arrival",
        "Families arriving with luggage, children or elderly relatives",
        "Students arriving for the start of a course",
        "Visitors needing local rides around Trinidad",
      ],
      included: [
        "Pre-booked, English-speaking drivers through Welcome Pickups in over 100 cities",
        "Airport pickups and drop-offs, door to door",
        "A driver waiting for you rather than a taxi queue",
        "Local Trinidad airport pickup and drop-off",
      ],
      youProvide: [
        "Your flight number and arrival time",
        "The exact address you are going to",
        "How many passengers and how many bags",
        "Any child seat or accessibility requirement",
      ],
      notControlled: [
        "Traffic, weather and road conditions",
        "Driver allocation and vehicle type, which the transfer operator assigns",
        "Delays caused by immigration or baggage reclaim at the airport",
        "Welcome Pickups' own cancellation and refund terms",
      ],
      process: [
        "Book directly through our Welcome Pickups link, or send us your flight details.",
        "You receive a confirmation with your driver's details.",
        "Your driver meets you in arrivals and takes you to your address.",
      ],
      feesNote:
        "Local Trinidad transfers, including airport pickup and drop-off, are $5 USD each. International transfer prices are shown on the booking link before you pay.",
      faqs: [
        {
          q: "What happens if my flight is delayed?",
          a: "Transfers are tracked against your flight number, which is why we ask for it. Give us the flight number rather than just the landing time and the driver adjusts to the actual arrival.",
        },
        {
          q: "Is this available everywhere in CARICOM?",
          a: "Welcome Pickups covers over 100 cities worldwide, but not every island. Tell us your destination and we will confirm whether it is covered before you rely on it.",
        },
      ],
      related: [
        { label: "Flights", href: "/flights" },
        { label: "Accommodation", href: "/accommodations" },
      ],
    },
  },
  {
    slug: "travel-visas",
    title: "Travel Visas",
    icon: "🛂",
    scope: "CARICOM Only",
    category: "visa",
    order: 5,
    shortBlurb:
      "Free, step-by-step help with the Canadian visa process from Trinidad, open to all CARICOM citizens.",
    cardFeatures: ["Free assistance", "Application form guidance", "Biometrics in Port of Spain", "US visas coming soon"],
    intro:
      "We guide CARICOM citizens through every step of the Canadian visa application process from Trinidad, completely free of charge.",
    body: [
      {
        heading: "How we help",
        bullets: [
          "Step-by-step help with visa application forms",
          "Booking biometrics appointments in Port of Spain",
          "Reviewing your documents before you submit them",
          "Answering the questions CARICOM applicants ask most often",
        ],
        note: "This assistance is completely free. You only ever pay the Canadian government's own visa and biometrics fees directly to IRCC; we never charge for our help.",
      },
    ],
    primaryLink: null,
    detail: {
      whoFor: [
        "CARICOM citizens applying for a Canadian visitor visa from Trinidad",
        "Applicants who find the online forms and document lists hard to work through",
        "Anyone who wants a second pair of eyes on a file before submitting it",
      ],
      included: [
        "Walking through the application form question by question",
        "Explaining which supporting documents are being asked for and why",
        "Help booking a biometrics appointment in Port of Spain",
        "A review of your document set before you submit",
      ],
      youProvide: [
        "Your own accurate information and genuine supporting documents",
        "Your passport details, shared securely once we are in touch rather than through this website",
        "The government fees, paid directly to IRCC by you",
        "Attendance at your own biometrics appointment",
      ],
      notControlled: [
        "Whether a visa is granted or refused, which is decided solely by IRCC",
        "How long IRCC takes to process an application",
        "IRCC fees, forms and requirements, which can change at any time",
        "Appointment availability at the biometrics centre",
      ],
      process: [
        "Message us on WhatsApp and tell us what you are applying for.",
        "We go through the form and the document list with you.",
        "You gather your documents and we review them before submission.",
        "You submit, pay IRCC directly, and attend biometrics.",
        "IRCC decides.",
      ],
      feesNote:
        "We charge nothing for this service. The only money you pay is the Canadian government's own visa and biometrics fees, paid by you directly to IRCC.",
      faqs: [
        {
          q: "Is this really free?",
          a: "Yes. We do not charge for Canadian visa guidance. Anyone asking you to pay us for it is not us.",
        },
        {
          q: "Can you guarantee my visa will be approved?",
          a: "No, and nobody can. IRCC decides every application on its own merits. What we can do is help you submit a complete, accurate, well-prepared application.",
        },
        {
          q: "Do you help with US visas?",
          a: "Not yet. We can tell you where to go for the current process in the meantime.",
        },
        {
          q: "Is this only for Grenadian applicants?",
          a: "No. It is open to CARICOM citizens generally. Grenadian applicants were simply the first group we worked with.",
        },
      ],
      disclaimer:
        "We are not immigration lawyers or licensed immigration consultants, and nothing here is legal advice. We help you understand and prepare your own application. Always confirm current requirements with IRCC directly.",
      related: [
        { label: "Flights", href: "/flights" },
        { label: "CARICOM Skills Certificate", href: "/caricom-skills-certificate" },
      ],
    },
  },
  {
    slug: "insurance",
    title: "Insurance",
    icon: "🛡️",
    scope: "Trinidad Only",
    category: "local",
    order: 6,
    shortBlurb:
      "A free, no-pressure consultation to help you understand your options and what makes sense for you.",
    cardFeatures: ["Life and health cover", "Income protection and disability", "Annuities, retirement and critical illness"],
    intro:
      "Life is unpredictable, and the right coverage can make all the difference. We offer a free, no-pressure consultation to help you understand your options.",
    body: [
      {
        paragraphs: ["Whether you are just getting started or want to review what you already have, we are here to help you make sense of it. We can assist with:"],
        bullets: [
          "Life insurance",
          "Health and medical coverage",
          "Income protection and disability",
          "Annuities and retirement planning",
          "Critical illness coverage",
        ],
      },
      {
        paragraphs: [
          "Not sure what you need? That is exactly what the consultation is for. We will look at where you are, what you are working with, and what makes sense for you, without the jargon and without the hard sell.",
        ],
        note: "All insurance consultations and products are provided through Guardian Life of the Caribbean. Available in Trinidad and Tobago only.",
      },
    ],
    primaryLink: null,
  },
  {
    slug: "finance",
    title: "Banking",
    icon: "💰",
    scope: "Across CARICOM",
    category: "local",
    order: 7,
    shortBlurb:
      "Guidance on preparing to open a local bank account, including the documents and practical steps that may apply to your move.",
    cardFeatures: [
      "Republic Bank e-Free and Scotiabank accounts",
      "Document checklist for your island",
      "Loans, credit cards and business registration in Trinidad",
    ],
    intro:
      "A local bank account is usually the first thing you need after you arrive. We give you guidance on preparing to open one, including the documents and practical steps that may apply to your move.",
    body: [
      {
        heading: "Loans & Credit Card Applications (Free)",
        paragraphs: ["Applying for a loan or credit card can be tricky if you are not sure what is needed. We will walk you through it by:"],
        bullets: [
          "Checking that you have the right documents",
          "Making sure your application is properly prepared",
          "Helping you feel ready before you submit anything",
        ],
        note: "All loan, credit card, and account applications are officially processed through First Citizens Bank.",
      },
      {
        heading: "Business Registration & Account Opening (Paid Service)",
        paragraphs: [
          "Starting a business is exciting, but the paperwork can feel like a maze. We will help you register your business name with the right offices, pull together the documents you need, and get everything ready to open your business bank account. It is about making sure the setup is done right, without the stress, so you can focus on actually running your business.",
        ],
      },
    ],
    primaryLink: null,
    detail: {
      whoFor: [
        "People arriving in a new CARICOM country who need a local account",
        "Anyone in Trinidad and Tobago preparing a loan or credit card application",
        "New business owners who need a business account opened",
      ],
      included: [
        "Guidance on preparing to open a local account, including the documents and practical steps that may apply to you",
        "Checking your documents against the bank's own published requirements",
        "Preparing loan and credit card applications so they are complete before you submit",
        "Business registration and getting your documents ready for a business account",
      ],
      youProvide: [
        "Valid identification and proof of address in the form the bank asks for",
        "Proof of income or employment where the product requires it",
        "Your own accurate financial information",
        "Attendance in person where the bank requires it",
      ],
      notControlled: [
        "Whether the bank opens an account for you",
        "Whether a loan or credit card application is approved, and on what terms",
        "The bank's interest rates, fees and processing times",
        "Changes a bank makes to its own document requirements",
      ],
      process: [
        "Tell us which country you are in and what you need.",
        "We confirm the bank, the product and the document checklist.",
        "You gather the documents and we check them before you go.",
        "You attend the bank and submit.",
        "The bank decides.",
      ],
      feesNote:
        "Loan and credit card application help is free. Business registration and account opening is a paid service with published packages, priced on this page.",
      faqs: [
        {
          q: "Can you open an account for me before I arrive?",
          a: "No. Banks require you to attend in person and to hold valid local identification or immigration status. What we can do is make sure you walk in with everything they will ask for.",
        },
        {
          q: "Will I definitely be approved for a loan?",
          a: "No. Approval is the bank's decision, based on its own criteria. We help you submit a complete and properly prepared application, which is a different thing from a guaranteed outcome.",
        },
        {
          q: "Do you need my bank details or passwords?",
          a: "Never. We will not ask for account passwords, PINs or online banking credentials, and you should not send them to us or anyone else.",
        },
      ],
      disclaimer:
        "Loan, credit card and account applications are processed through the bank itself. We are not a bank, a lender or a licensed financial adviser, and nothing here is financial advice.",
      related: [
        { label: "Business setup", href: "/business-setup" },
        { label: "Country guides", href: "/destinations" },
        { label: "CARICOM Skills Certificate", href: "/caricom-skills-certificate" },
      ],
    },
  },
];

// --- finance packages ---------------------------------------------------
// Prices are set in USD and converted to TTD or XCD (rounded up to the
// nearest 100) depending on the country the visitor selects. Trinidad-only
// inclusions (LLC + BIR registration) are appended in the Professional card
// at render time rather than stored here, since they never apply to Grenada.
export type Package = {
  name: string;
  priceUsd: number;
  features: string[];
  featured: boolean;
  order: number;
};

export const DEFAULT_PACKAGES: Package[] = [
  {
    name: "Starter",
    priceUsd: 110,
    features: [
      "Business name search & reservation",
      "Registration as Sole Trader or Partnership",
      "Checklist and documents for opening a business bank account",
      "Social media setup",
    ],
    featured: false,
    order: 1,
  },
  {
    name: "Professional",
    priceUsd: 250,
    features: [
      "All Starter services",
      "Preparation of bank account opening documents",
      "In-person or virtual assistance at the bank",
      "Branded invoice & receipt template for your new business",
      "Website setup",
    ],
    featured: true,
    order: 2,
  },
  {
    name: "Premium",
    priceUsd: 450,
    features: [
      "All Professional services",
      "VAT registration (if required)",
      "One-on-one advisory session (banking, taxes & compliance tips)",
      "Professional letterhead & business email setup",
      "Referrals to accountants & marketing experts to grow your business",
    ],
    featured: false,
    order: 3,
  },
];

// --- finance add-ons ------------------------------------------------------
// Either usdPrice (converted + rounded up to the nearest 100 in the visitor's
// currency) or amountText (an existing figure shown as-is, just tagged with
// TTD/XCD) is set, never both.
export type AddOn = {
  title: string;
  usdPrice?: number;
  amountText?: string;
  trinidadOnly?: boolean;
  order: number;
};

export const DEFAULT_ADDONS: AddOn[] = [
  { title: "BIR File Number registration", amountText: "$100", trinidadOnly: true, order: 1 },
  { title: "NIS staff registration", amountText: "1-10 $200, 11-100 $300, 101+ $300", order: 2 },
  { title: "Logo design & social media page setup", amountText: "$300 for all Meta apps, $100 per additional app", order: 3 },
  { title: "Business plan template", amountText: "$200", order: 4 },
  { title: "Starter bookkeeping package", amountText: "$200", order: 5 },
  { title: "Business Stamp", usdPrice: 50, order: 6 },
  { title: "Website setup", usdPrice: 250, order: 7 },
];

// --- testimonials -------------------------------------------------------
export type Testimonial = { quote: string; person: string; context: string };

// Deliberately empty. The site renders no testimonial section at all until real
// client quotes are added in Studio, so nothing invented or placeholder can
// ever appear. Add each one with a real first name and last initial, plus the
// destination or service it relates to, and only with the client's permission.
export const DEFAULT_TESTIMONIALS: Testimonial[] = [];

// --- about --------------------------------------------------------------
export type AboutData = {
  intro: string;
  sections: ContentSection[];
};

export const DEFAULT_ABOUT: AboutData = {
  intro:
    "I am Joanson Baptiste James. I moved from Grenada to Trinidad, then from Trinidad to Jamaica, and I started this because of how much harder those moves were than they needed to be.",
  sections: [
    {
      heading: "I have done this myself",
      paragraphs: [
        "I am Grenadian. I moved to Trinidad in 2020, in the middle of the pandemic, which made that process about as painstaking as it gets. Then I moved again to Jamaica in 2025. Before deciding either time, I worked through what all twelve CSME countries require, so I was choosing where to go rather than guessing. So you would be dealing with someone who knows beyond theory what the process involves, and who knows how to avoid the pitfalls and the delays, especially the unnecessary administrative ones.",
        "To be clear about that last part: I cannot speed up or override anybody's process. What I can do is make sure the only waiting you do is the waiting that is built in, rather than extra weeks caused by something missing or wrong in your application.",
        "Travelling is the easy part. As a former travel agency owner I can handle that side for you without any fuss: airfare, ground transfers and accommodation. My services tend to be cheaper than other travel agencies. It was so frustrating going through the rest of it myself that I decided to start doing it for other people.",
        "I ran a travel agency alongside it, so flights, hotels and transfers were the easy half. Plenty of my customers were not going on holiday either. They were going to take up a job, join family or start a course, and they were stuck on exactly the same things I had been stuck on. So the business grew around that instead.",
      ],
    },
    {
      heading: "Who this is for",
      paragraphs: [
        "Most people who contact me are somewhere in one of these situations.",
      ],
      bullets: [
        "You have a job offer in another CARICOM country and you are not sure what has to happen before you can take it up.",
        "You have been accepted on a course, or you are still choosing one, and the visa and the travel are now the problem.",
        "Somebody told you to get a Skills Certificate and you do not know what that is or where to apply.",
        "You are going to see family, or going for a short trip, and you would rather someone else handled the arrangements.",
        "You started the process yourself, got stuck, and want someone to untangle it.",
      ],
    },
    {
      heading: "What I actually do",
      paragraphs: [
        "Two things, and it helps to keep them separate in your head.",
      ],
      bullets: [
        "I explain the process. What your destination asks for, which office handles it, what order things go in, and where people usually come unstuck.",
        "I organise the parts that are mine to organise. Flights, somewhere to stay, transfers, appointments, and the checklist you work from.",
      ],
      note: "Grenada, Trinidad and Tobago and Jamaica I know first hand, because I have moved between them. The other nine I researched properly when I was working out where to go: Antigua and Barbuda, Barbados, Belize, Dominica, Guyana, St. Kitts and Nevis, Saint Lucia, St. Vincent and the Grenadines, and Suriname. Where something has changed since and I am not certain, I will tell you that rather than guess.",
    },
    {
      heading: "What I do not decide",
      paragraphs: [
        "A Skills Certificate, a visa, a place on a course, a job, a bank account, a tenancy. None of those are mine to give. They belong to the office, school, employer, bank or landlord you are dealing with, and no one outside those rooms can promise you an answer.",
        "So I will not tell you that you will be approved. I will tell you what they ask for, help you put it together properly, and be straight with you about what I think your chances look like. If anyone in this line of work promises you an outcome, walk away.",
      ],
    },
    {
      heading: "Our vision",
      paragraphs: [
        "A Caribbean Community connected enough that deciding to visit, work or study in another member state is no harder than travelling inside your own country. The right to move is already ours under the Treaty.",
      ],
    },
    {
      heading: "Getting in touch",
      bullets: [
        "WhatsApp or call 868-723-6644, or email info@expeditionswithjo.com.",
        "I aim to answer within one business day. Weekends and public holidays usually roll to the next working day.",
        "Please do not send passport numbers or bank details through the website, by social media, or by ordinary email. Once we are talking I will tell you how to send documents safely.",
        "Payment, cancellation and refund terms are on the Policies page.",
      ],
      note: "Loans, credit cards and account applications go through First Citizens Bank. Insurance moved to its own site and is handled at joansonbjames.com, in partnership with Guardian Life of the Caribbean.",
    },
  ],
};

// --- policies -----------------------------------------------------------
export type PoliciesData = {
  intro: string;
  sections: ContentSection[];
};

export const DEFAULT_POLICIES: PoliciesData = {
  intro: "Our refund, fraud, and data protection policies. Please read these before booking.",
  sections: [
    { heading: "Refund Policy" },
    {
      heading: "Cancellations by Customer",
      bullets: [
        "More than 14 days before expedition: Full refund, minus any non-refundable third-party booking fees (e.g., park permits, boat rentals).",
        "7 to 13 days before expedition: 50% refund of the total paid.",
        "Less than 7 days before expedition or no-show: No refund unless in cases of death or documented medical emergencies occurring after the date of booking.",
      ],
    },
    {
      heading: "Cancellations by Expeditions With Jo",
      paragraphs: [
        "Full refund issued if we cancel due to weather, safety concerns, or low bookings (minimum participant threshold not met). You may choose to reschedule instead of a refund; credit will remain valid for 6 months.",
      ],
    },
    {
      heading: "Refund Processing",
      paragraphs: [
        "Refunds are issued within 7 business days to the original payment method. For card payments, processing times may vary depending on your bank or card issuer.",
      ],
    },
    { heading: "Fraud Policy" },
    {
      heading: "Booking Security Measures",
      paragraphs: [
        "All online bookings must include a valid ID and contact number. For high-value or group bookings, we may request additional confirmation via email or phone.",
      ],
    },
    {
      heading: "Suspicious Transactions",
      paragraphs: ["We reserve the right to cancel and refund bookings flagged for:"],
      bullets: [
        "Name mismatch on credit card",
        "Multiple failed payment attempts",
        "Use of VPNs/proxies or known fraudulent IPs",
        "Discrepancies in contact info",
      ],
    },
    {
      heading: "Chargeback Policy",
      paragraphs: [
        "Unauthorised disputes or chargebacks without first contacting us will be reported and challenged. Repeated or fraudulent chargebacks may result in a ban from future bookings.",
        "If you suspect fraud on your account or need help with a payment issue, please contact us immediately at support@expeditionswithjo.com.",
      ],
    },
    { heading: "Data Protection Policy" },
    {
      paragraphs: [
        "Effective Date: November 5, 2025",
        "At Expeditions With Jo (the \"Company,\" \"we,\" \"us,\" or \"our\"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.expeditionswithjo.com (the \"Site\"), book a service, make purchases, or interact with our services. By using the Site or our services, you consent to the practices described in this policy.",
        "This policy complies with applicable laws, including but not limited to the General Data Protection Regulation (GDPR) for EU residents, the California Consumer Privacy Act (CCPA) for California residents, the Gramm-Leach-Bliley Act (GLBA) for financial information handling, and relevant Trinidad and Tobago data protection regulations. We also adhere to Payment Card Industry Data Security Standards (PCI DSS) for secure payment processing to enable acceptance of Visa, Mastercard, and other major credit cards. Our payment processing is handled through Fygaro, integrated with First Citizens Bank's e-commerce gateway, which supports 3D Secure (3DS) authentication for enhanced transaction security. If you do not agree with this policy, please do not use the Site or our services.",
      ],
    },
    {
      heading: "1. Information We Collect",
      paragraphs: ["We collect information to provide and improve our relocation and travel booking services, process payments, and communicate with you. The types of information include:"],
      bullets: [
        "Personal Information: Name, email address, phone number, mailing address, date of birth, and emergency contact details (collected during booking or registration).",
        "Payment Information: Credit/debit card details (e.g., card number, expiration date, CVV), billing address. Note: We do not store full card details on our servers; payment processing is handled securely by Fygaro via First Citizens Bank's PCI DSS-compliant gateway, including 3D Secure authentication where applicable.",
        "Relocation and Travel Information: CSME application and supporting documents, dietary or medical needs disclosed for safety on a booked trip, passport details (for international travel).",
        "Usage Data: IP address, browser type, device information, pages visited, and time spent on the Site (collected via cookies and analytics tools).",
        "Communication Data: Information you provide in inquiries, reviews, or support requests.",
      ],
      note: "We collect this information directly from you (e.g., via forms) or automatically through cookies and similar technologies. For minors under 18, we require parental consent for any data collection.",
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: ["We use your information for legitimate business purposes, including:"],
      bullets: [
        "Processing bookings, payments, and refunds.",
        "Communicating about your application, booking, updates, and promotions (with opt-out options).",
        "Enhancing Site functionality and personalising your experience.",
        "Ensuring safety and compliance (e.g., sharing emergency contacts if needed during travel bookings).",
        "Analysing usage to improve services and prevent fraud.",
        "Complying with legal obligations, such as tax reporting or health/safety regulations for travel.",
      ],
      note: "For payment processing, we use your card information solely to complete transactions via Fygaro and First Citizens Bank's gateway. We obtain explicit consent before storing any payment details for recurring bookings or subscriptions, as required by Visa and Mastercard rules. 3D Secure may be prompted during checkout to verify your identity and reduce fraud risk.",
    },
    {
      heading: "3. How We Share Your Information",
      paragraphs: ["We do not sell your personal information. We may share it in limited circumstances:"],
      bullets: [
        "Service Providers: With trusted third parties for payment processing (Fygaro integrated with First Citizens Bank), email services, analytics, or travel logistics (e.g., airlines, transfer operators). These providers are contractually obligated to protect your data and comply with PCI DSS where applicable.",
        "Legal Requirements: If required by law, subpoena, or to protect our rights, safety, or property.",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets.",
        "With Your Consent: For marketing partners or shared experiences (e.g., client testimonials or photos, with opt-in).",
      ],
      note: "Under CCPA, California residents have the right to know about sales (none occur) or disclosures. For international users, data may be transferred to Trinidad and Tobago or other regions where we operate. We use appropriate safeguards, such as Standard Contractual Clauses (SCCs), for GDPR compliance.",
    },
    {
      heading: "4. Data Security",
      paragraphs: ["Protecting your information, especially payment data, is a priority. We implement reasonable administrative, technical, and physical safeguards, including:"],
      bullets: [
        "Encryption of data in transit (HTTPS/TLS) and at rest.",
        "PCI DSS Level 1 compliance through Fygaro and First Citizens Bank's payment gateway to protect cardholder data.",
        "Support for 3D Secure (3DS) authentication protocols (e.g., Verified by Visa, Mastercard SecureCode).",
        "Regular security audits, firewalls, and access controls.",
        "Anonymisation of usage data where possible.",
      ],
      note: "Despite these measures, no system is completely secure. We cannot guarantee absolute security but will notify affected users and authorities of any breach as required by law (e.g., within 72 hours under GDPR).",
    },
    {
      heading: "5. Cookies and Tracking Technologies",
      paragraphs: ["We use cookies, pixels, and similar tools to enhance your experience. These may include:"],
      bullets: [
        "Essential Cookies: For Site functionality (e.g., cart persistence).",
        "Analytics Cookies: To track usage (e.g., Google Analytics; you can opt out via tools like Google Analytics Opt-Out).",
        "Marketing Cookies: For personalised ads (managed by partners like Facebook Pixel).",
      ],
      note: "You can manage cookies via browser settings. Disabling them may limit Site features.",
    },
    {
      heading: "6. Your Rights and Choices",
      paragraphs: ["Depending on your location, you have rights regarding your data:"],
      bullets: [
        "Access, Correction, Deletion: Request a copy, updates, or deletion of your information.",
        "Opt-Out: Unsubscribe from emails (via link in messages) or marketing.",
        "Do Not Sell/Share: Under CCPA, opt out of any \"sales\" (we do not sell data).",
        "GDPR Rights: Withdraw consent, object to processing, or data portability.",
      ],
      note: "To exercise rights, email queries@expeditionswithjo.com. We respond within 30-45 days. For CCPA, verified requests are free (up to twice yearly). We retain data only as long as needed (e.g., 7 years for financial records per IRS rules) or as required by law, then securely delete it.",
    },
    {
      heading: "7. Children's Privacy",
      paragraphs: [
        "Our Site is not intended for children under 13 (or 16 in some jurisdictions). We do not knowingly collect data from children without parental consent. If we discover such data, we delete it promptly.",
      ],
    },
    {
      heading: "8. Changes to This Policy",
      paragraphs: [
        "We may update this policy to reflect changes in our practices or laws. Significant changes will be posted here with a new effective date. Check periodically.",
      ],
    },
    {
      heading: "9. Contact Us",
      paragraphs: ["For questions, concerns, or complaints, contact:"],
      bullets: ["Email: queries@expeditionswithjo.com", "Phone/WhatsApp: 868-723-6644"],
      note: "If in the EU, you may also contact your local data protection authority.",
    },
  ],
};
