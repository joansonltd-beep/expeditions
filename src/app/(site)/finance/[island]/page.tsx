import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader, SectionHead, CheckList } from "@/components/ui";
import { CaribbeanGlobe } from "@/components/icons";
import ContentSections from "@/components/ContentSections";
import FinancePricing from "@/components/FinancePricing";
import CtaButtons from "@/components/CtaButtons";
import { getService, getPackages, getAddOns } from "@/lib/siteData";
import { BANKING_ISLANDS, BANK_LABEL, BANK_DOCUMENTS, BANK_NONRESIDENT_DOCUMENTS } from "@/lib/bankingData";

// Trinidad also carries our own local services (loans, credit cards and
// business registration through First Citizens), which exist nowhere else.
const TRINIDAD = "trinidad-and-tobago";

export function generateStaticParams() {
  return BANKING_ISLANDS.map((i) => ({ island: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ island: string }> }): Promise<Metadata> {
  const { island } = await params;
  const i = BANKING_ISLANDS.find((x) => x.slug === island);
  if (!i) return { title: "Banking" };
  return {
    title: `Open a Bank Account in ${i.name}`,
    description: `How to open a basic bank account in ${i.name}: ${i.bankName}'s ${i.accountName}, the documents you need, the minimum opening deposit and what to expect at the branch.`,
    keywords: [
      `open bank account ${i.name}`,
      `bank account requirements ${i.name}`,
      `${BANK_LABEL[i.bank]} ${i.name}`,
      `${i.accountName} ${i.name}`,
      `moving to ${i.name} banking`,
    ],
    alternates: { canonical: `/finance/${i.slug}` },
  };
}

export default async function IslandBankingPage({ params }: { params: Promise<{ island: string }> }) {
  const { island } = await params;
  const i = BANKING_ISLANDS.find((x) => x.slug === island);
  if (!i) notFound();

  const isTrinidad = i.slug === TRINIDAD;
  const documents = i.documents ?? BANK_DOCUMENTS[i.bank];
  const nonResidentDocs = i.nonResidentDocuments ?? BANK_NONRESIDENT_DOCUMENTS[i.bank];
  const others = BANKING_ISLANDS.filter((x) => x.slug !== i.slug);

  // Trinidad-only: our First Citizens loan/credit-card/business-registration
  // service and the business setup packages.
  const [service, packages, addOns] = isTrinidad
    ? await Promise.all([getService("finance"), getPackages(), getAddOns()])
    : [null, [], []];

  return (
    <>
      <PageHeader
        icon={<CaribbeanGlobe className="h-9 w-9 text-brand" />}
        title={`Open a bank account in ${i.name}`}
        crumb={i.name}
        intro={`Which bank to use in ${i.name}, the account to ask for, and exactly what to bring to the branch.`}
      />

      {/* THE BANK */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm">
            <Link href="/finance" className="font-semibold text-brand hover:underline">
              ← All islands
            </Link>
          </p>

          {i.keyRequirement ? (
            <div className="mt-6 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3.5 text-sm text-slate-700">
              <span className="block font-semibold text-slate-900">Before anything else</span>
              <span className="mt-1 block">{i.keyRequirement}</span>
            </div>
          ) : null}

          <h2 className="mt-6 text-2xl font-bold text-slate-900">Where to go in {i.name}</h2>
          <p className="mt-3 text-slate-600">
            <span className="font-semibold text-slate-900">Bank:</span> {i.bankName}
          </p>
          <p className="mt-2 text-slate-600">
            <span className="font-semibold text-slate-900">Account to ask for:</span> {i.accountName}
          </p>

          {i.alsoHas ? (
            <div className="mt-4 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
              {i.alsoHas} also operates in {i.name}. We point people to {BANK_LABEL[i.bank]} because its branch network
              and electronic account are the stronger fit for someone just arriving, but either will work.
            </div>
          ) : null}

          {i.alternative ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand">The other option</h3>
              <p className="mt-2 font-semibold text-slate-900">{i.alternative.bankName}</p>
              <p className="mt-1 text-sm text-slate-600">
                Ask for the {i.alternative.accountName}
                {i.alternative.minOpening ? `, ${i.alternative.minOpening} to open` : ""}.
              </p>
              {i.alternative.note ? <p className="mt-2 text-sm text-slate-600">{i.alternative.note}</p> : null}
              <a
                href={i.alternative.accountUrl ?? i.alternative.bankUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
              >
                {i.alternative.bankName} details →
              </a>
            </div>
          ) : null}

          {i.noElectronicAccount ? (
            <div className="mt-4 rounded-xl border-l-4 border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {i.noElectronicAccount}
            </div>
          ) : null}

          <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <span className="shrink-0 font-semibold text-slate-900 sm:w-44">Currency</span>
              <span className="text-slate-600">{i.currency}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <span className="shrink-0 font-semibold text-slate-900 sm:w-44">Minimum to open</span>
              <span className="text-slate-600">
                {i.minOpening ?? `Confirm with the branch${i.phone ? ` on ${i.phone}` : ""}.`}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {i.accountUrl ? (
              <a
                href={i.accountUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                {i.accountName} details →
              </a>
            ) : null}
            <a
              href={i.bankUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft"
            >
              {i.bankName} →
            </a>
          </div>
        </div>
      </Section>

      {/* DOCUMENTS */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What to bring</h2>
          <p className="mt-2 text-slate-600">
            What {BANK_LABEL[i.bank]} asks for when you open a {i.accountName} in {i.name}:
          </p>
          <CheckList items={documents} className="mt-4" />

          {nonResidentDocs ? (
            <>
              <h3 className="mt-10 text-lg font-semibold text-slate-900">If you are not resident yet</h3>
              <p className="mt-2 text-slate-600">
                Opening before you have moved, or while your status is still being sorted out? {BANK_LABEL[i.bank]} asks
                for these on top of the documents above
                {i.bank === "acb" ? ", as notarised copies" : ""}:
              </p>
              <CheckList items={nonResidentDocs} className="mt-4" />
            </>
          ) : null}

          {i.notes?.length ? (
            <>
              <h3 className="mt-10 text-lg font-semibold text-slate-900">Good to know</h3>
              <ul className="mt-4 space-y-2">
                {i.notes.map((n, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-600">
                    <span aria-hidden="true" className="mt-0.5 text-brand">
                      •
                    </span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-8 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            This is guidance, and banks change their fees and document lists. Confirm the current requirements with{" "}
            {i.bankName} before you travel to a branch.
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">We can handle this for you</h3>
            <p className="mt-2 text-slate-600">
              Gathering documents, opening the account and everything else needed for a successful move to{" "}
              {i.name}, from your visa or CSME certificate to flights, housing and banking, is exactly what we do
              every day. Reach out and we'll walk you through it.
            </p>
            <div className="mt-4">
              <CtaButtons message={`Hi Jo, I'd like help opening a bank account and relocating to ${i.name}.`} />
            </div>
          </div>
        </div>
      </Section>

      {/* TRINIDAD ONLY — our local First Citizens services */}
      {isTrinidad && service ? (
        <>
          <Section>
            <div className="mx-auto max-w-3xl">
              <SectionHead
                eyebrow="Trinidad and Tobago only"
                title="Loans, credit cards and business registration"
                intro="Beyond opening an account, these are the local services we handle in Trinidad and Tobago."
                center={false}
              />
              <ContentSections sections={service.body} />
            </div>
          </Section>

          <Section alt>
            <SectionHead
              eyebrow="Packages"
              title="Business setup packages"
              intro="Select your country to see pricing in your local currency. Each package is 50% upfront, with the balance on completion."
            />
            <FinancePricing packages={packages} addOns={addOns} />
          </Section>
        </>
      ) : null}

      {/* OTHER ISLANDS */}
      <Section alt={!isTrinidad}>
        <SectionHead eyebrow="Other islands" title="Opening an account somewhere else" />
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/finance/${o.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand"
            >
              {o.name}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
