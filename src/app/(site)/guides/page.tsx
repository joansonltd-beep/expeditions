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
          <Link
            href="/csme-skills-certificate"
            className="block rounded-2xl border border-brand bg-brand-soft p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Featured · Interactive</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">CSME Skills Certificate: How to Apply by Country</h2>
            <p className="mt-2 text-slate-600">
              The CARICOM Skills Certificate explained, with the steps and the exact office to apply to in every CARICOM
              country. Pick your country and see what to do.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand">Open the guide →</span>
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
