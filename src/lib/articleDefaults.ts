import type { ContentSection } from "@/lib/defaults";

// Bundled default guides/articles. Editable in Studio (post documents); these
// are the fallback so the section always has content.
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // YYYY-MM-DD
  body: ContentSection[];
};

const VISA_DISCLAIMER =
  "This is general guidance. Always check the current official requirements on the Government of Canada (IRCC) website before you apply.";

export const DEFAULT_ARTICLES: Article[] = [
  {
    slug: "canadian-visa-from-trinidad",
    title: "How to Apply for a Canadian Visa from Trinidad",
    excerpt:
      "A simple, step-by-step guide for CARICOM citizens applying for a Canadian visitor visa from Trinidad, including biometrics in Port of Spain.",
    publishedAt: "2025-04-09",
    body: [
      {
        paragraphs: [
          "If you are a CARICOM citizen planning a trip to Canada, you will usually need a visitor visa (also called a Temporary Resident Visa). Many applicants from across the Caribbean complete the process from Trinidad, where the biometrics collection point is located. This guide walks through the steps in plain language.",
        ],
        note: VISA_DISCLAIMER,
      },
      {
        heading: "The steps at a glance",
        bullets: [
          "Complete the online visitor visa application and pay the fees",
          "Receive your biometrics instruction letter",
          "Book and attend your biometrics appointment in Port of Spain",
          "Wait for a decision and the return of your passport",
        ],
      },
      {
        heading: "Biometrics in Port of Spain",
        paragraphs: [
          "After you submit your application, you are asked to give your fingerprints and photo (biometrics). For applicants in this region, that is done in Port of Spain, Trinidad. You book an appointment, attend in person, and it usually takes only a few minutes.",
          "If you are travelling to Trinidad just for the appointment, we can also arrange your flights, a place to stay near the airport, and your transfers, so the whole visit is simple.",
        ],
      },
      {
        heading: "Documents you will usually need",
        bullets: [
          "A valid passport",
          "Proof of funds for your trip",
          "Travel history and a travel plan or invitation",
          "Proof of ties to your home country (job, school, family)",
          "Any documents specific to your situation",
        ],
      },
      {
        heading: "How we help",
        paragraphs: [
          "We guide CARICOM citizens through every step from Trinidad: completing the forms correctly, booking your biometrics appointment in Port of Spain, reviewing your documents, and answering your questions along the way.",
        ],
        note: "Ready to start? Use the Travel Visas page to get in touch.",
      },
    ],
  },
  {
    slug: "canadian-visa-help-for-grenadians",
    title: "Canadian Visa Help for Grenadians",
    excerpt:
      "Grenadian citizens applying for a Canadian visa complete biometrics in Trinidad. Here is what to expect and how we make it easier.",
    publishedAt: "2025-06-18",
    body: [
      {
        paragraphs: [
          "Grenada does not have its own biometrics collection point for Canadian visa applications, so Grenadian applicants typically travel to Port of Spain, Trinidad, to complete that step. We help Grenadians through the whole process so the trip is worth it and nothing is missed.",
        ],
        note: VISA_DISCLAIMER,
      },
      {
        heading: "What the process looks like",
        bullets: [
          "Complete the online application and pay the fees",
          "Get your biometrics letter",
          "Travel to Port of Spain for the biometrics appointment",
          "Wait for the decision",
        ],
      },
      {
        heading: "Making the Trinidad trip simple",
        paragraphs: [
          "Because Grenadian applicants travel to Trinidad for biometrics, we can bundle the whole visit: a flight, an affordable place to stay close to the airport, and your airport transfers. You focus on the appointment, we handle the logistics.",
        ],
      },
      {
        heading: "How we help Grenadian applicants",
        bullets: [
          "Step-by-step help with the visa application forms",
          "Booking your biometrics appointment in Port of Spain",
          "Document review before you submit",
          "Answers to common questions for Grenadian applicants",
        ],
      },
    ],
  },
  {
    slug: "biometrics-appointment-port-of-spain",
    title: "What to Expect at Your Biometrics Appointment in Port of Spain",
    excerpt:
      "A quick walkthrough of the biometrics step for Canadian visa applicants in Port of Spain: what to bring, what happens, and how long it takes.",
    publishedAt: "2025-08-05",
    body: [
      {
        paragraphs: [
          "Once you have submitted your Canadian visa application and paid the biometrics fee, you book an appointment to give your fingerprints and photo. For applicants across the region, this is done at the collection point in Port of Spain, Trinidad. The appointment itself is short and straightforward.",
        ],
        note: "General guidance only. Follow the exact instructions in your biometrics letter.",
      },
      {
        heading: "What to bring",
        bullets: [
          "Your biometrics instruction letter",
          "Your valid passport",
          "Your appointment confirmation",
          "Arrive a little early to allow for check-in",
        ],
      },
      {
        heading: "What happens at the appointment",
        paragraphs: [
          "Your fingerprints are scanned and a photo is taken. It usually takes only a few minutes. There is no interview at this stage; it is simply collecting your biometrics so your application can continue.",
        ],
      },
      {
        heading: "Travelling in for the appointment",
        paragraphs: [
          "If you are coming from another island, we can arrange your flight, a comfortable place to stay close to the airport, and your transfers, so the trip is quick and stress free.",
        ],
        note: "Need to plan the trip? We can sort flights, a stay and transfers in one booking.",
      },
    ],
  },
  {
    slug: "documents-for-canadian-visitor-visa",
    title: "Documents You Need for a Canadian Visitor Visa",
    excerpt:
      "A general checklist of the documents usually needed when applying for a Canadian visitor visa from the Caribbean.",
    publishedAt: "2025-10-14",
    body: [
      {
        paragraphs: [
          "Strong, well-organised documents make a real difference to a visitor visa application. While every case is different, most applicants are asked for a similar core set. Use this as a starting point and tailor it to your situation.",
        ],
        note: VISA_DISCLAIMER,
      },
      {
        heading: "Documents usually requested",
        bullets: [
          "A valid passport",
          "Your completed application forms",
          "Proof of funds, such as recent bank statements",
          "A travel plan, or an invitation letter if you are visiting someone",
          "Proof of ties to your home country (a job letter, property, or family)",
          "Photos that meet the required specifications",
          "Any previous travel history",
        ],
      },
      {
        heading: "A few tips",
        bullets: [
          "Keep your documents clear, recent and easy to read",
          "Make sure your proof of funds is consistent and well explained",
          "Be honest and keep the details consistent across forms",
        ],
      },
      {
        heading: "How we help",
        paragraphs: [
          "We review your documents before you submit, so you can spot gaps early and apply with confidence.",
        ],
      },
    ],
  },
  {
    slug: "where-to-stay-for-visa-appointment-trinidad",
    title: "Travelling to Trinidad for a Visa Appointment? Where to Stay",
    excerpt:
      "Coming to Trinidad for a Canadian visa biometrics appointment? Here is how to keep the trip simple, affordable and close to the airport.",
    publishedAt: "2025-11-30",
    body: [
      {
        paragraphs: [
          "Many applicants travel to Trinidad just for their biometrics appointment. A short, well-planned visit keeps your costs down and your stress low. The two things that matter most are where you stay and how you get around.",
        ],
      },
      {
        heading: "Stay close to the airport and your appointment",
        paragraphs: [
          "We offer our own room, A Likkle Rest by Jo, in a quiet, convenient area under ten minutes from the airport and a short walk from malls and restaurants. It is a clean, comfortable place to rest before or after your appointment, at $30 USD a night, the cheapest option on the island.",
        ],
      },
      {
        heading: "Sort your transfers",
        paragraphs: [
          "Airport pick up and drop off for guests is just $5 USD each way, so you do not have to worry about finding a ride when you land or when it is time to head home.",
        ],
      },
      {
        heading: "Bundle it and keep it simple",
        paragraphs: [
          "Book your flight, stay and transfers together and we will line everything up for you. All you do is show up for your appointment.",
        ],
        note: "Tell us your appointment date and we will put together the trip.",
      },
    ],
  },
  {
    slug: "booking-cheap-flights-from-trinidad",
    title: "Booking Cheaper Flights from Trinidad: A Travel Agent's Tips",
    excerpt:
      "Simple ways to find better value on flights out of Trinidad and Tobago, and when it helps to book through a travel agent.",
    publishedAt: "2025-02-21",
    body: [
      {
        paragraphs: [
          "Flights are often the biggest cost of a trip. A few habits can make a real difference to what you pay, whether you are heading to Canada, the US, or elsewhere in the Caribbean.",
        ],
      },
      {
        heading: "A few things that help",
        bullets: [
          "Be flexible with your dates where you can, mid-week often costs less",
          "Book ahead for busy periods like Carnival and the holidays",
          "Compare round-trip against two one-way fares",
          "Watch baggage rules, a cheap fare can cost more once bags are added",
          "Travel light when the trip is short",
        ],
      },
      {
        heading: "When booking through us is worth it",
        paragraphs: [
          "We look across options to find fares that fit your schedule and budget, handle the details like baggage and special requests, and stay reachable before and during your trip. For seniors, families, or anyone who would rather not deal with the back and forth, that support is the real value.",
        ],
        note: "Tell us where you want to go and your budget, and we will put together options.",
      },
    ],
  },
  {
    slug: "planning-your-first-caribbean-cruise",
    title: "Planning Your First Caribbean Cruise",
    excerpt:
      "New to cruising? Here is how to choose the right Caribbean cruise and what to expect on board your first sailing.",
    publishedAt: "2026-01-16",
    body: [
      {
        paragraphs: [
          "A cruise is one of the easiest ways to see several places on one trip. You unpack once, settle in, and wake up somewhere new. If it is your first time, a little planning goes a long way.",
        ],
      },
      {
        heading: "Choosing the right cruise",
        bullets: [
          "Decide how long you want to be away, from a few nights to a week or more",
          "Look at the ports, the islands and stops you most want to see",
          "Match the cruise line to your style, family friendly, lively or relaxed",
          "Set a budget and check what is included before you book",
        ],
      },
      {
        heading: "What is usually included",
        paragraphs: [
          "Your cabin, main meals and most onboard entertainment are typically included. Drinks packages, specialty dining, shore excursions and tips are often extra, so it helps to know before you go.",
        ],
      },
      {
        heading: "Tips for first-time cruisers",
        bullets: [
          "Arrive in the port city the day before to avoid travel stress",
          "Pack a small day bag for your first few hours on board",
          "Book popular shore excursions early",
        ],
      },
      {
        heading: "How we help",
        paragraphs: [
          "We give honest advice on cruise lines and itineraries that fit your style and budget, handle the booking, and support you before, during and after your trip.",
        ],
      },
    ],
  },
];
