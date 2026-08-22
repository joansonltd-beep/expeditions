import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, getSiteSettings } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "General Guides",
  description:
    "Practical guides for CARICOM nationals: how to apply for a CSME Skills Certificate so you can work on another island, plus travel guides like Canadian visas from Trinidad and booking flights.",
  keywords: [
    "CARICOM guides",
    "how to work in another Caribbean country",
    "jobs in the Caribbean",
    "CSME Skills Certificate guide",
    "Caribbean travel guides",
    "Canadian visa from Trinidad",
  ],
  alternates: { canonical: "/guides" },
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function GuidesPage() {
  const [articles, settings] = await Promise.all([getArticles(), getSiteSettings()]);
  return (
    <>
      <PageHeader
        icon="📚"
        title="General Guides"
        crumb="Guides"
        intro="Step-by-step guides for moving and working within CARICOM, plus practical guides for Canadian visa applicants travelling through Trinidad."
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
        <div className="mx-auto mt-10 max-w-3xl border-t border-slate-200 pt-8">
          <h2 className="text-lg font-bold text-slate-900">Don&apos;t see what you need?</h2>
          <p className="mt-2 text-slate-600">
            Reach out on WhatsApp, chat, or email{" "}
            <a href={`mailto:${settings.generalEmail}`} className="font-semibold text-brand hover:underline">
              {settings.generalEmail}
            </a>{" "}
            and we&apos;ll walk you through your specific move.
          </p>
          <div className="mt-4">
            <CtaButtons message="Hi Jo, I have a question that's not covered in your guides." />
          </div>
        </div>
      </Section>
    </>
  );
}
