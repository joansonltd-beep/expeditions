import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Free Canadian Visa Help from Trinidad",
  description:
    "Free, step-by-step Canadian visa help from Trinidad for Grenadian, Jamaican and CARICOM citizens: application forms, biometrics appointments in Port of Spain, and document review, at no cost. US visas coming soon.",
  keywords: [
    "free Canadian visa help",
    "Canadian visa from Trinidad",
    "Canadian visa Grenada",
    "Canadian visa Jamaica",
    "Canadian visa appointment Port of Spain",
    "biometrics Port of Spain",
    "CARICOM Canadian visa help",
  ],
  alternates: { canonical: "/travel-visas" },
};

// FAQ structured data — can earn rich results for common visa questions.
const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I apply for a Canadian visa from Trinidad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We guide CARICOM citizens, including Grenadians and Jamaicans, through the Canadian visa application from Trinidad, including completing the forms and booking biometrics in Port of Spain.",
      },
    },
    {
      "@type": "Question",
      name: "Where are biometrics appointments for a Canadian visa done?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biometrics for Canadian visa applicants are done in Port of Spain, Trinidad. We help you book the appointment and prepare your documents.",
      },
    },
    {
      "@type": "Question",
      name: "Do you help Grenadian citizens apply for a Canadian visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We especially help Grenadian applicants through every step of the Canadian visa process from Trinidad, from the application forms to booking biometrics.",
      },
    },
    {
      "@type": "Question",
      name: "Do you help with US visas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "US visa support is coming soon. Contact us and we will let you know when it is available.",
      },
    },
    {
      "@type": "Question",
      name: "Is Canadian visa assistance free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All of our Canadian visa assistance, from application form guidance to booking your biometrics appointment, is completely free. The only fees involved are the Canadian government's own visa and biometrics fees, paid directly to IRCC.",
      },
    },
  ],
};

export default async function TravelVisasPage() {
  const service = await getService("travel-visas");
  if (!service) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <ServicePage
        service={service}
        ctaTitle="Need to travel for your appointment?"
        ctaText="We can also sort your flights, a place to stay, and airport transfers while you are in Trinidad."
      />
    </>
  );
}
