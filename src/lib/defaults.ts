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
  tagline: "CARICOM Relocation & Settlement",
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
  heroEyebrow: "CARICOM-to-CARICOM relocation",
  heroHeadline: "Want to work or study in another CARICOM country? Let's go, together.",
  heroSubcopy:
    "Expeditions With Jo helps CARICOM nationals move between member states: whether to live, work or study, we will work with you step by step to make the idea a reality. Just want to visit instead? We arrange that too.",
  paymentNote:
    "Secure payments via Fygaro and First Citizens Bank. Visa and Mastercard accepted.",
  footerBlurb:
    "Relocation support for CARICOM nationals moving between member states: CSME Skills Certificates, banking, business setup and settling-in help, with travel arranged when you need it.",
  logoUrl: null,
};

// --- services -----------------------------------------------------------
export type ServiceCategory = "travel" | "local" | "visa";

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
  },
  {
    slug: "travel-visas",
    title: "Travel Visas",
    icon: "🛂",
    scope: "CARICOM Only",
    category: "visa",
    order: 5,
    shortBlurb:
      "Free, step-by-step help with the Canadian visa process from Trinidad, especially for Grenadian applicants.",
    cardFeatures: ["100% free assistance", "Application form guidance", "Biometrics in Port of Spain", "US visas coming soon"],
    intro:
      "We guide CARICOM citizens, especially Grenadians, through every step of the Canadian visa process from Trinidad, completely free of charge.",
    body: [
      {
        heading: "How we help",
        bullets: [
          "Step-by-step help with visa application forms",
          "Booking biometrics appointments in Port of Spain",
          "Document review and approval guidance",
          "Answers to frequently asked questions for Grenadian applicants",
        ],
        note: "This assistance is completely free. You only ever pay the Canadian government's own visa and biometrics fees directly to IRCC; we never charge for our help. US visas coming soon.",
      },
    ],
    primaryLink: null,
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
      "Open a local bank account on your new island. We tell you which bank to use and exactly what to bring.",
    cardFeatures: [
      "Republic Bank e-Free and Scotiabank accounts",
      "Document checklist for your island",
      "Loans, credit cards and business registration in Trinidad",
    ],
    intro:
      "A local bank account is the first thing you need after you move. We tell you which bank to go to on your island and exactly what to bring.",
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

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Jo walked me through my CSME Skills Certificate step by step. I knew exactly what to submit and what it would cost before I ever left home.",
    person: "Sample client",
    context: "Moved from Grenada to Trinidad",
  },
  {
    quote: "Bank account, business name, everything was ready when I landed. Settling in felt like a checklist, not a scramble.",
    person: "Sample client",
    context: "New business in Trinidad",
  },
  {
    quote: "They sorted the paperwork for the move and still found us affordable flights and a place to stay while we searched for a home.",
    person: "Sample client",
    context: "Family relocation",
  },
];

// --- about --------------------------------------------------------------
export type AboutData = {
  intro: string;
  sections: ContentSection[];
};

export const DEFAULT_ABOUT: AboutData = {
  intro:
    "Expeditions With Jo is the brainchild of Joanson Baptiste James, who started it as a Trinidad travel agency and has grown it into a relocation-first service helping CARICOM citizens move between member states to work, under the free movement provisions of the Treaty of Chaguaramas.",
  sections: [
    {
      paragraphs: [
        "The Treaty of Chaguaramas gives skilled CARICOM nationals the right to live and work in another participating member state without a work permit. Our sole mission is to make that move simple: the CSME Skills Certificate you need to apply for, the bank account and business registration you'll want once you land, and the settling-in details that are hard to research from another island. We cover the 12 CARICOM states that actually participate in CSME free movement, not every CARICOM member, since a few (like Montserrat and The Bahamas) sit outside that regime and a work permit still applies there.",
        "It's still run with the same one-to-one attention it started with.",
      ],
    },
    {
      heading: "Relocation support",
      bullets: [
        "CSME Skills Certificate: Step-by-step guidance on qualifying, gathering documents and applying in your destination country.",
        "Banking: Help opening a bank account in the CARICOM state you're moving to.",
        "Business setup: Registering a business and getting your documents ready, in Trinidad and Tobago, Jamaica or Grenada.",
        "Countries at a glance: What to expect once you arrive, including cost of living, places to see, local food and more.",
      ],
    },
    {
      heading: "Travel support",
      bullets: [
        "Flights: Affordable one-way or round-trip options for your move or a scouting trip beforehand.",
        "Accommodation: Comfortable, safe places to stay while you get settled.",
        "Transfers: Reliable rides for airports and getting around a new city.",
        "Canadian visa help: Step-by-step support for CARICOM citizens applying from Trinidad.",
      ],
    },
    {
      heading: "Also available (Trinidad & Tobago)",
      bullets: [
        "Loans & Credit Cards (Free Service): Help preparing applications for personal loans, car loans, mortgages and credit cards.",
        "Insurance (Free Consultation): Consultations covering life, health, income protection and retirement planning.",
      ],
      note: "Loan, credit card and account applications are processed through First Citizens Bank. Insurance consultations and products are provided through Guardian Life of the Caribbean.",
    },
    {
      paragraphs: [
        "Whether you're applying for your CSME Skills Certificate, opening a bank account in a new country, or just need a flight booked, Expeditions With Jo is here to make the move easier, every step of the way.",
      ],
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
