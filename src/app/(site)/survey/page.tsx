import type { Metadata } from "next";
import { Section, PageHeader } from "@/components/ui";
import CombinedSurveyForm from "@/components/CombinedSurveyForm";
import { CSME_COUNTRIES } from "@/lib/csmeData";

export const metadata: Metadata = {
  title: "Cost of Living Survey: Salaries, Rent and Utilities",
  description:
    "One anonymous survey on what people actually earn and pay across CARICOM: salaries, rent and utility costs, country by country. Answer whichever parts you want. No name or email collected.",
  keywords: [
    "CARICOM salary survey",
    "Caribbean utility costs",
    "Caribbean rent survey",
    "Caribbean cost of living data",
    "SRU survey",
  ],
  alternates: { canonical: "/survey" },
};

const COUNTRIES = CSME_COUNTRIES.map((c) => c.name);

// Viewer-only Google Sheet links (confirmed, not edit access). Still three
// sheets, because each section of the survey feeds its own.
const RESULTS_LINKS: { label: string; href: string }[] = [
  { label: "Salary results", href: "https://docs.google.com/spreadsheets/d/1cqnWhi-waJdrMxG2tsrtbW8EhxUaAHfz09d7xACtGt8/edit?usp=sharing" },
  { label: "Utility cost results", href: "https://docs.google.com/spreadsheets/d/1JAi0v5_Fw-3bNjUDic0ucu7VccxWCKB_D_yM5nHp9r0/edit?usp=sharing" },
  { label: "Rent results", href: "https://docs.google.com/spreadsheets/d/1Q_0Cv3_jrVuZLZZRlMBjn5_x5Xfn82oxPPObcodYRwg/edit?usp=sharing" },
];

export default function SurveyPage() {
  return (
    <>
      <PageHeader
        title="Cost of Living"
        crumb="Reports"
        intro="Real numbers on salaries, rent and utilities from people actually living and working across CARICOM. Crowdsourced, fully anonymous, and used only in aggregate."
        footnote="One survey, three parts. Answer whichever you can, skip the rest."
        photos={[
          {
            src: "/places/saint-lucia/castries-market.jpg",
            alt: "Castries Market, Saint Lucia",
            credit: "Gene93k, CC BY-SA 3.0, via Wikimedia Commons",
            creditUrl: "https://commons.wikimedia.org/wiki/File:Castries_Market_from_Jeremie_Street.JPG",
          },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <CombinedSurveyForm countries={COUNTRIES} />
        </div>

        {RESULTS_LINKS.length ? (
          <div className="mx-auto mt-10 max-w-2xl border-t border-navy/12 pt-7">
            <p className="text-sm font-semibold text-navy">See what has been shared so far</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
              {RESULTS_LINKS.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand hover:underline"
                  >
                    {r.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
    </>
  );
}
