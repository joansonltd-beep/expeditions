// Bundled defaults for the Business Setup page. Editable in Studio
// (businessSetupPage document); this file is the fallback so the page always
// renders even before seeding. The country eligibility gate itself is not
// CMS content: it is a hard requirement enforced in the enquiry component.

export type BusinessSetupService = { title: string; description: string };

export type BusinessSetupPage = {
  eyebrow: string;
  title: string;
  intro: string;
  services: BusinessSetupService[];
  establishmentTitle: string;
  establishmentParagraphs: string[];
  establishmentNote: string;
  comingSoonTitle: string;
  comingSoonText: string;
  eligibilityTitle: string;
  eligibilityIntro: string;
  ineligibleMessage: string;
};

export const DEFAULT_BUSINESS_SETUP: BusinessSetupPage = {
  eyebrow: "Small business setup",
  title: "Business Setup",
  intro:
    "Starting a small business takes more than an idea. We help you handle the setup steps properly, from registration to getting paid, so you can focus on running things.",
  services: [
    {
      title: "Business Registration",
      description:
        "Registering your business name with the right offices and getting the paperwork sorted so you are operating legally from day one.",
    },
    {
      title: "Bank Account Setup",
      description:
        "Pulling together the documents you need and guiding you through opening a business bank account.",
    },
    {
      title: "Accounting / Bookkeeping Setup",
      description:
        "Getting a simple bookkeeping system in place so you can track income and expenses without the headache.",
    },
    {
      title: "Social Media Setup",
      description:
        "Setting up your business pages across the platforms that matter, with a consistent look so customers can find you.",
    },
    {
      title: "Website Setup",
      description:
        "A simple, professional website so your business has a home online, built around what your customers need to know.",
    },
    {
      title: "Payment Processing / Online Shop Setup",
      description:
        "Getting you set up to accept payments online or in person, including an online shop if you plan to sell that way.",
    },
  ],
  establishmentTitle: "Your right to set up a business anywhere in CARICOM",
  establishmentParagraphs: [
    "Under Chapter Three (Articles 32 to 34) of the Revised Treaty of Chaguaramas, CARICOM nationals have the Right of Establishment: the right to set up and run a business in any other member state, and member states are required to remove restrictions that get in the way of it. It covers non-wage-earning activity of a commercial, industrial, agricultural, professional or artisanal nature, and the right to create and manage economic enterprises, including setting up agencies, branches or subsidiaries. It applies to companies as well as individuals, as long as the business is more than 50% owned by CARICOM nationals.",
    "This is worth understanding if you are moving to work for yourself, because it is a different route from the one most people know. The CSME Skills Certificate covers wage-earning employment, taking a job with an employer on another island. Establishing your own business is a separate right, and self-employed CARICOM nationals do not need a Skills Certificate to exercise it. If you plan to provide services rather than trade in goods, you will usually need to register as a CARICOM Service Provider instead.",
    "What the treaty does not do is fill in the forms. Every member state still runs its own company registry, tax office and banking rules, in its own order, with its own paperwork. That is the part we handle.",
  ],
  establishmentNote:
    "The Right of Establishment is a treaty right, not an automatic approval. Member states still apply their own registration requirements, so confirm what your destination asks for before you commit to a move.",
  comingSoonTitle: "More countries coming soon",
  comingSoonText:
    "Business setup is available today in Trinidad and Tobago, Jamaica and Grenada. We are working through the company registry, tax and banking requirements for the rest of CARICOM one country at a time, and will open each up as it is ready. Tell us where you are headed and we will let you know as soon as yours goes live.",
  eligibilityTitle: "Where are you based?",
  eligibilityIntro:
    "This service is currently available only to citizens and residents of Trinidad and Tobago, Jamaica and Grenada. Select your country to continue.",
  ineligibleMessage:
    "Sorry, business setup support is currently only available to citizens and residents of Trinidad and Tobago, Jamaica and Grenada. We hope to expand to more countries soon. In the meantime, take a look at our travel and finance services, or message us on WhatsApp with any questions.",
};
