import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Travel & Visa Guides",
  description:
    "Helpful guides on Canadian visas from Trinidad, booking flights, and travelling from the Caribbean, from Expeditions With Jo.",
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function GuidesPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHeader
        icon="📚"
        title="Guides"
        crumb="Guides"
        intro="Practical guides on Canadian visas, flights and travelling from the Caribbean."
      />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-5">
          {/* CSME certificate guide — the only entry point into the country picker flow */}
          <Link
            href="/caricom-skills-certificate"
            className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="mt-1 text-xl font-semibold text-slate-900">How to apply for a CSME Certificate</h2>
            <p className="mt-2 text-slate-600">
              What the CARICOM (CSME) Skills Certificate is, who qualifies, and how to apply. Choose your country to get
              the exact steps and the office to apply to.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand">Read more →</span>
          </Link>
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/guides/${a.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              {a.publishedAt ? <p className="text-xs font-medium text-slate-400">{formatDate(a.publishedAt)}</p> : null}
              <h2 className="mt-1 text-xl font-semibold text-slate-900">{a.title}</h2>
              <p className="mt-2 text-slate-600">{a.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">Read guide →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
