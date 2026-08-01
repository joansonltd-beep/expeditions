import type { Metadata } from "next";
import { Section, PageHeader } from "@/components/ui";
import { CaribbeanGlobe } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import BankingPicker from "@/components/BankingPicker";
import { BANKING_ISLANDS } from "@/lib/bankingData";

export const metadata: Metadata = {
  title: "Open a Bank Account in the Caribbean",
  description:
    "How to open a basic bank account when you move to another CARICOM island: which bank to use on each island, the documents you need, and the minimum opening deposit. Republic Bank e-Free, Scotiabank Electronic Access and NCB On-The-Go accounts.",
  keywords: [
    "open bank account Caribbean",
    "open bank account CARICOM",
    "Republic Bank e-Free account",
    "Scotiabank Electronic Access Account",
    "NCB On-The-Go account",
    "bank account requirements Trinidad",
    "bank account requirements Jamaica",
    "banking for CARICOM nationals",
  ],
  alternates: { canonical: "/finance" },
};

export default function BankingHubPage() {
  return (
    <>
      <PageHeader
        icon={<CaribbeanGlobe className="h-12 w-12 text-brand" />}
        title="Open a bank account on your new island"
        crumb="Banking"
        intro="A local bank account is usually the first thing you need after you move, and it is the thing that unlocks everything else: your salary, your rent, your bills. Choose your island to see which bank to go to and exactly what to bring."
      />

      {/* PICKER */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <BankingPicker islands={BANKING_ISLANDS} />
        </div>
      </Section>

      {/* CTA */}
      <Section alt>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Want help getting it opened?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            We will check your documents before you go, tell you which branch to use, and walk you through the
            application so it is not a wasted trip.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButtons message="Hi Jo, I need help opening a bank account when I move." />
          </div>
        </div>
      </Section>
    </>
  );
}
