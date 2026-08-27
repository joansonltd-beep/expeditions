import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead } from "@/components/ui";
import { CaribbeanGlobe } from "@/components/icons";
import BankingPicker from "@/components/BankingPicker";
import CtaButtons from "@/components/CtaButtons";
import { BANKING_ISLANDS } from "@/lib/bankingData";
import { BUSINESS_BANKING_COUNTRIES } from "@/lib/businessBankingData";

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
        icon={<CaribbeanGlobe className="h-9 w-9 text-brand" />}
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

      {/* BUSINESS ACCOUNTS */}
      <Section alt id="business">
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Self-employed or running a company"
            title="Opening a business bank account"
            intro="Business accounts ask for more than personal ones. Here's what each bank actually publishes, country by country, for the three places we currently handle business setup in."
            center={false}
          />
          <div className="space-y-4">
            {BUSINESS_BANKING_COUNTRIES.map((c) => (
              <details key={c.slug} className="group rounded-2xl border border-slate-200 bg-white p-6 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  <span>
                    {c.name} <span className="font-normal text-slate-500">— {c.bankName}</span>
                  </span>
                  <span className="text-brand transition group-open:rotate-180">▾</span>
                </summary>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  {c.keyRequirement ? (
                    <p className="mb-3 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
                      {c.keyRequirement}
                    </p>
                  ) : null}
                  <ul className="space-y-2">
                    {c.documents.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span aria-hidden="true" className="mt-0.5 text-brand">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  {c.minOpening ? (
                    <p className="mt-3 text-sm text-slate-500">
                      <span className="font-semibold text-slate-700">Minimum opening: </span>
                      {c.minOpening}
                    </p>
                  ) : null}
                  {c.notes?.map((n, i) => (
                    <p key={i} className="mt-2 text-sm text-slate-500">
                      {n}
                    </p>
                  ))}
                  <a
                    href={c.bankUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
                  >
                    See {c.bankName}&rsquo;s own page →
                  </a>
                </div>
              </details>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Requirements come straight from each bank&rsquo;s own page and can change, and branches sometimes ask for more
            than their website lists, so confirm before you go in. If you would rather not chase this down yourself,{" "}
            <Link href="/business-setup" className="font-semibold text-brand hover:underline">
              our Business Setup service
            </Link>{" "}
            handles it as part of registering your business.
          </p>
        </div>
      </Section>

      {/* WE HANDLE THIS */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Every step, one contact"
            title="We can handle this and everything else"
            intro="Banking is one piece of the move. From your visa or CSME certificate, to flights, housing and getting your account opened, we handle every step of a successful relocation."
            center={false}
          />
          <CtaButtons message="Hi Jo, I'd like help opening a bank account and relocating." />
        </div>
      </Section>
    </>
  );
}
