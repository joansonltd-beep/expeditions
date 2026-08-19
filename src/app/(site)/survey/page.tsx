import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "On The Ground",
  description:
    "Anonymous, crowdsourced surveys on what people actually earn and pay across CARICOM: salaries, utility costs and rent, country by country. No name or email collected.",
  keywords: [
    "CARICOM salary survey",
    "Caribbean utility costs",
    "Caribbean rent survey",
    "Caribbean cost of living data",
    "On The Ground survey",
  ],
  alternates: { canonical: "/survey" },
};

const SURVEYS = [
  {
    href: "/survey/salary",
    icon: "banknote" as const,
    title: "Salary Survey",
    text: "Job title, industry, experience, education and gross monthly pay, country by country.",
  },
  {
    href: "/survey/utilities",
    icon: "banknote" as const,
    title: "Utility Cost Survey",
    text: "What people actually pay for electricity, water, internet, mobile, cable and more, by household size and country.",
  },
  {
    href: "/survey/rent",
    icon: "home" as const,
    title: "Rent Survey",
    text: "What people actually pay in rent, by property type, area, and what's included, country by country.",
  },
];

// Viewer-only Google Sheet links (confirmed, not edit access).
const RESULTS_LINKS: { label: string; href: string }[] = [
  { label: "Salary results", href: "https://docs.google.com/spreadsheets/d/1cqnWhi-waJdrMxG2tsrtbW8EhxUaAHfz09d7xACtGt8/edit?usp=sharing" },
  { label: "Utility cost results", href: "https://docs.google.com/spreadsheets/d/1JAi0v5_Fw-3bNjUDic0ucu7VccxWCKB_D_yM5nHp9r0/edit?usp=sharing" },
  { label: "Rent results", href: "https://docs.google.com/spreadsheets/d/1Q_0Cv3_jrVuZLZZRlMBjn5_x5Xfn82oxPPObcodYRwg/edit?usp=sharing" },
];

export default function SurveyHubPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="banknote" className="h-12 w-12 text-brand" />}
        title="On The Ground"
        crumb="On The Ground"
        intro="Real numbers from people actually living and working across CARICOM, crowdsourced and fully anonymous. No name or email is ever collected, and every response is used only in aggregate."
      />
      <Section>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SURVEYS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-3.5 grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={s.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">Take the survey →</span>
            </Link>
          ))}
        </div>
        {RESULTS_LINKS.length ? (
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-900">See what's been shared so far</p>
            <div className="mt-3 flex flex-wrap justify-center gap-4">
              {RESULTS_LINKS.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  {r.label} →
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}
