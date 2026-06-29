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

export const DEFAULT_ARTICLES: Article[] = [
  {
    slug: "canadian-visa-from-trinidad",
    title: "How to Apply for a Canadian Visa from Trinidad",
    excerpt:
      "A simple, step-by-step guide for CARICOM citizens applying for a Canadian visitor visa from Trinidad, including biometrics in Port of Spain.",
    publishedAt: "2026-06-01",
    body: [
      {
        paragraphs: [
          "If you are a CARICOM citizen planning a trip to Canada, you will usually need a visitor visa (also called a Temporary Resident Visa). Many applicants from across the Caribbean complete the process from Trinidad, where the biometrics collection point is located. This guide walks through the steps in plain language.",
        ],
        note: "This is general guidance. Always check the current official requirements on the Government of Canada (IRCC) website before you apply.",
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
    publishedAt: "2026-06-02",
    body: [
      {
        paragraphs: [
          "Grenada does not have its own biometrics collection point for Canadian visa applications, so Grenadian applicants typically travel to Port of Spain, Trinidad, to complete that step. We help Grenadians through the whole process so the trip is worth it and nothing is missed.",
        ],
        note: "This is general guidance. Always confirm the latest requirements on the official IRCC website.",
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
    slug: "booking-cheap-flights-from-trinidad",
    title: "Booking Cheaper Flights from Trinidad: A Travel Agent's Tips",
    excerpt:
      "Simple ways to find better value on flights out of Trinidad and Tobago, and when it helps to book through a travel agent.",
    publishedAt: "2026-06-03",
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
];
