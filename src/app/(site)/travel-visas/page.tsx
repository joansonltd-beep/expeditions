import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";
import { Section, SectionHead } from "@/components/ui";
import CtaButtons from "@/components/CtaButtons";

const US_NO_EMBASSY_COUNTRIES = [
  "Antigua and Barbuda",
  "Dominica",
  "Grenada",
  "St. Kitts and Nevis",
  "Saint Lucia",
  "St. Vincent and the Grenadines",
];

export const metadata: Metadata = {
  title: "Free Canadian Visa Help from Trinidad",
  description:
    "Free, step-by-step Canadian visa help from Trinidad for Grenadian, Jamaican and CARICOM citizens: application forms, biometrics appointments in Port of Spain, and document review, at no cost. Plus where to actually go for a US visa if there's no US Embassy on your island.",
  keywords: [
    "free Canadian visa help",
    "Canadian visa from Trinidad",
    "Canadian visa Grenada",
    "Canadian visa Jamaica",
    "Canadian visa appointment Port of Spain",
    "biometrics Port of Spain",
    "CARICOM Canadian visa help",
    "US Embassy Grenada",
    "US visa Grenada",
    "US Embassy Barbados",
    "US visa Antigua and Barbuda",
    "US visa Saint Lucia",
    "US visa St Vincent and the Grenadines",
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
        text: "Full US visa application support is coming soon. Contact us and we will let you know when it is available.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a US Embassy in Grenada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Grenada does not have its own US Embassy. Visa services for Grenada are handled by the U.S. Embassy in Bridgetown, Barbados, which also covers Antigua and Barbuda, Dominica, St. Kitts and Nevis, Saint Lucia, and St. Vincent and the Grenadines.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I go for a US visa interview if my island has no US Embassy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You need to travel to the U.S. Embassy in Bridgetown, Barbados, at Wildey Business Park, Wildey, St. Michael. Visa services are not available locally in Antigua and Barbuda, Dominica, Grenada, St. Kitts and Nevis, Saint Lucia, or St. Vincent and the Grenadines, even though some of these islands have limited consular touchpoints for US citizen services like passport renewals.",
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
        title="Leaving CARICOM?"
        intro="We guide CARICOM citizens, especially Grenadians, through every step of the US and Canadian visa process.*"
        footnote="* The Canadian visa process is completely free. You only ever pay the Canadian government's own visa and biometrics fees, directly to IRCC."
        ctaSubject="Travel Visas"
        ctaTitle="Need to travel for your appointment?"
        ctaText="Whether it's Port of Spain for a Canadian visa or Bridgetown for a US visa, we can sort your flights, a place to stay, and transfers too."
      >
        <Section alt>
          <div className="mx-auto max-w-3xl">
            <SectionHead
              eyebrow="US Visas"
              title="No US Embassy on your island? Here's where you actually go"
              intro="Several of the countries we cover don't have their own US Embassy, so visa applicants have to travel to the embassy that serves their island."
              center={false}
            />
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-slate-600">
                Grenada does not have a US Embassy. Along with five other countries, it falls under the{" "}
                <span className="font-semibold text-slate-900">U.S. Embassy in Bridgetown, Barbados</span>, which
                is the only place visa interviews and issuance happen for:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {US_NO_EMBASSY_COUNTRIES.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-slate-600">
                <span className="font-semibold text-slate-900">Embassy address:</span> Wildey Business Park, Wildey,
                St. Michael, Barbados.
              </p>
              <p className="mt-3 text-slate-600">
                Some of these islands have limited local touchpoints for American citizen services, like passport
                renewals for US citizens, but none of them handle visa applications. If you&rsquo;re applying for a US
                visa from Grenada or any of the other five, your interview happens in Barbados, in person.
              </p>
              <div className="mt-6 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
                Full step-by-step US visa application help, like what we already offer for Canadian visas, is coming
                soon. In the meantime, reach out and we can help arrange your travel to Barbados for the interview:
                flights, a place to stay, and transfers.
              </div>
              <div className="mt-6">
                <CtaButtons message="Hi Jo, I need to travel to Barbados for a US visa interview and would like help arranging it." />
              </div>
            </div>
          </div>
        </Section>
      </ServicePage>
    </>
  );
}
