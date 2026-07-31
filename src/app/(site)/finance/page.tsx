import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead, PageHeader, CheckList } from "@/components/ui";
import { CaribbeanGlobe, Icon } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import BankingPicker from "@/components/BankingPicker";
import { BANKING_ISLANDS, UNCOVERED, BANK_LABEL, REPUBLIC_DOCUMENTS, SCOTIA_DOCUMENTS, ACB_DOCUMENTS } from "@/lib/bankingData";

export const metadata: Metadata = {
  title: "Open a Bank Account in the Caribbean",
  description:
    "How to open a basic bank account when you move to another CARICOM island: which bank to use on each island, the documents you need, and the minimum opening deposit. Republic Bank e-Free and Scotiabank Electronic Access accounts.",
  keywords: [
    "open bank account Caribbean",
    "open bank account CARICOM",
    "Republic Bank e-Free account",
    "Scotiabank Electronic Access Account",
    "bank account requirements Trinidad",
    "bank account requirements Jamaica",
    "banking for CARICOM nationals",
  ],
  alternates: { canonical: "/finance" },
};

export default function BankingHubPage() {
  const republic = BANKING_ISLANDS.filter((i) => i.bank === "republic");
  const scotia = BANKING_ISLANDS.filter((i) => i.bank === "scotia");
  const acb = BANKING_ISLANDS.filter((i) => i.bank === "acb");

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

      {/* ISLAND LISTS */}
      <Section alt>
        <SectionHead
          eyebrow="Where we can help"
          title="Banking across the Caribbean"
          intro="We cover the islands served by Republic Bank or Scotiabank, plus Antigua and Barbuda through ACB Caribbean. Where both of the regional banks operate, we point you to Republic Bank."
        />

        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name="landmark" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Republic Bank</h3>
                <p className="text-sm text-slate-500">The e-Free account, built for people who bank on their phone.</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {republic.map((i) => (
                <Link
                  key={i.slug}
                  href={`/finance/${i.slug}`}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand"
                >
                  {i.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name="creditCard" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Scotiabank</h3>
                <p className="text-sm text-slate-500">
                  The Electronic Access Account where it is offered, and the everyday savings account where it is not.
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {scotia.map((i) => (
                <Link
                  key={i.slug}
                  href={`/finance/${i.slug}`}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand"
                >
                  {i.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name="building" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">ACB Caribbean</h3>
                <p className="text-sm text-slate-500">
                  Where neither Republic nor Scotiabank operates, the island&rsquo;s own bank.
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {acb.map((i) => (
                <Link
                  key={i.slug}
                  href={`/finance/${i.slug}`}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand"
                >
                  {i.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT YOU NEED, GENERALLY */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What you need, wherever you are opening</h2>
          <p className="mt-3 text-slate-600">
            The details differ by island, but every bank in the region is working to the same anti-money-laundering
            rules. Get these together before you go and you can usually open an account in a single visit.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">At {BANK_LABEL.republic}</h3>
          <CheckList items={REPUBLIC_DOCUMENTS} className="mt-4" />

          <h3 className="mt-8 text-lg font-semibold text-slate-900">At {BANK_LABEL.scotia}</h3>
          <CheckList items={SCOTIA_DOCUMENTS} className="mt-4" />

          <h3 className="mt-8 text-lg font-semibold text-slate-900">At {BANK_LABEL.acb}</h3>
          <CheckList items={ACB_DOCUMENTS} className="mt-4" />

          <div className="mt-8 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            Moving without a job lined up? Say so at the counter rather than skipping the income question. Banks will
            usually take a CARICOM Skills Certificate, proof of savings or a letter from a sponsor instead of a job
            letter, but only if you ask.
          </div>
        </div>
      </Section>

      {/* NOT COVERED */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Islands we do not cover yet</h2>
          <p className="mt-3 text-slate-600">
            We have not set up guidance for these CARICOM member states yet. If you are moving to one of them, get in
            touch anyway and we will point you to the local banks.
          </p>
          <ul className="mt-5 grid gap-3">
            {UNCOVERED.map((u) => (
              <li key={u.name} className="rounded-xl border border-slate-200 bg-white px-4 py-3.5">
                <span className="font-semibold text-slate-900">{u.name}</span>
                <span className="mt-1 block text-sm text-slate-600">{u.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Section>
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
