import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, CheckList } from "@/components/ui";
import { Icon } from "@/components/icons";
import FindMyPathwayForm from "@/components/FindMyPathwayForm";
import ServiceDisclaimer from "@/components/ServiceDisclaimer";

export const metadata: Metadata = {
  title: "Find My Pathway: Visit, Work or Study in CARICOM",
  description:
    "Answer a few short questions about your nationality, destination and purpose, and we will point you at the right pathway for visiting, working or studying in another CARICOM country.",
  keywords: [
    "find my CARICOM pathway",
    "which CARICOM pathway applies to me",
    "work in another CARICOM country",
    "study in another CARICOM country",
    "CSME Skills Certificate eligibility",
  ],
  alternates: { canonical: "/find-my-pathway" },
  openGraph: {
    title: "Find My Pathway | Expeditions With Jo",
    description:
      "A few short questions about where you are, where you want to go and why. We will point you at the right pathway and the next step.",
    url: "/find-my-pathway",
  },
};

export default function FindMyPathwayPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="compass" className="h-7 w-7 text-brand" />}
        title="Find my pathway"
        crumb="Find my pathway"
        intro="Visiting, working and studying in another CARICOM country are three different processes with three different sets of requirements. Answer a few questions and we will tell you which one applies to you."
        footnote="Takes about a minute. No passport numbers, bank details or document uploads, here or ever."
      />

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-xl font-bold text-slate-900">What you get back</h2>
            <CheckList
              className="mt-4"
              items={[
                "Which of the three pathways your situation falls under",
                "What that pathway generally involves for your destination",
                "The guides worth reading before you go further",
                "Whether a consultation would actually help you, or whether the free guides are enough",
              ]}
            />
            <h2 className="mt-8 text-xl font-bold text-slate-900">What happens next</h2>
            <p className="mt-3 text-slate-600">
              You will see your next step straight away, with a WhatsApp link and the guides that match your purpose.
              We usually reply within one business day.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Prefer to talk it through first?{" "}
              <Link href="/services#consultation" className="font-semibold text-brand hover:underline">
                See what a Move Planning Consultation covers
              </Link>
              .
            </p>
          </div>
          <div>
            <FindMyPathwayForm />
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
          <ServiceDisclaimer />
        </div>
      </Section>
    </>
  );
}
