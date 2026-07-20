// Bundled defaults for the Business Setup page. Editable in Studio
// (businessSetupPage document); this file is the fallback so the page always
// renders even before seeding. The country eligibility gate itself is not
// CMS content — it is a hard requirement enforced in the enquiry component.

export type BusinessSetupService = { title: string; description: string };

export type BusinessSetupPage = {
  eyebrow: string;
  title: string;
  intro: string;
  services: BusinessSetupService[];
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
  eligibilityTitle: "Where are you based?",
  eligibilityIntro:
    "This service is currently available only to citizens and residents of Trinidad and Tobago and Grenada. Select your country to continue.",
  ineligibleMessage:
    "Sorry, business setup support is currently only available to citizens and residents of Trinidad and Tobago and Grenada. We hope to expand to more countries soon. In the meantime, take a look at our travel and finance services, or message us on WhatsApp with any questions.",
};
