import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles, getSiteSettings } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import ContentSections from "@/components/ContentSections";
import CtaButtons from "@/components/CtaButtons";
import GuideCta from "@/components/GuideCta";
import { SITE_URL } from "@/lib/siteUrl";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: "Guide" };
  return {
    title: a.title,
    description: a.excerpt,
    keywords: a.keywords,
    alternates: { canonical: `/guides/${a.slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: "article" },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [a, settings] = await Promise.all([getArticle(slug), getSiteSettings()]);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    keywords: a.keywords?.join(", "),
    datePublished: a.publishedAt || undefined,
    url: `${SITE_URL}/guides/${a.slug}`,
    image: `${SITE_URL}/og.png`,
    author: { "@type": "Organization", name: "Expeditions With Jo" },
    publisher: { "@type": "Organization", name: "Expeditions With Jo", logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        icon={<Icon name="compass" className="h-7 w-7 text-brand" />}
        title={a.title}
        crumb="Guides"
        intro={a.excerpt}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <ContentSections sections={a.body} />

          <p className="mt-10 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            This guide provides general information. Your exact requirements may depend on your nationality,
            destination, purpose of travel, occupation, documents and timeline.
          </p>

          <GuideCta className="mt-6" />

          <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-lg font-bold text-slate-900">Need help with any of this?</h2>
            <p className="mt-2 text-slate-600">
              We walk CARICOM nationals through this process every day. Reach out on WhatsApp, chat, or email{" "}
              <a href={`mailto:${settings.generalEmail}`} className="font-semibold text-brand hover:underline">
                {settings.generalEmail}
              </a>{" "}
              and we&apos;ll help you through it.
            </p>
            <div className="mt-4">
              <CtaButtons message={`Hi Jo, I read your guide "${a.title}" and have a question.`} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
