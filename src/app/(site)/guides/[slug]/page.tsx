import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import ContentSections from "@/components/ContentSections";
import CtaButtons from "@/components/CtaButtons";
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
    alternates: { canonical: `/guides/${a.slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: "article" },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.publishedAt || undefined,
    url: `${SITE_URL}/guides/${a.slug}`,
    image: `${SITE_URL}/og.png`,
    author: { "@type": "Organization", name: "Expeditions With Jo" },
    publisher: { "@type": "Organization", name: "Expeditions With Jo", logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader icon="📖" title={a.title} crumb="Guides" intro={a.excerpt} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <ContentSections sections={a.body} />
          <div className="mt-10 border-t border-slate-200 pt-8">
            <CtaButtons message={`Hi Jo, I read your guide "${a.title}" and have a question.`} />
          </div>
        </div>
      </Section>
    </>
  );
}
