import type { Metadata } from "next";
import { getSiteSettings, getHomeContent, getTestimonials, getArticles } from "@/lib/siteData";
import { Section, SectionHead } from "@/components/ui";
import HeroSection from "@/components/HeroSection";
import IndependenceBanner from "@/components/IndependenceBanner";
import JoIntroduction from "@/components/JoIntroduction";
import PathwaySelector from "@/components/PathwaySelector";
import ProcessTimeline from "@/components/ProcessTimeline";
import CaseExample from "@/components/CaseExample";
import DestinationPreview from "@/components/DestinationPreview";
import EditorialGuideFeature from "@/components/EditorialGuideFeature";
import TrustBoundaries from "@/components/TrustBoundaries";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ProofPlaceholder from "@/components/ProofPlaceholder";
import ServiceSpectrum from "@/components/ServiceSpectrum";

// Title and description come from the root layout; this page only needs to
// claim its own canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [settings, home, testimonials, articles] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
    getTestimonials(),
    getArticles(),
  ]);

  return (
    <>
      <HeroSection headline={settings.heroHeadline} subcopy={settings.heroSubcopy} trustNote={home.heroTrustNote} />

      {/* Seasonal, renders only around a CARICOM independence day */}
      <IndependenceBanner />

      {/* 1. The person, before the service */}
      <JoIntroduction />

      {/* 2. Trust before the visitor is asked to sort themselves. Moved above
             segmentation: someone decides whether to trust you before they
             decide which box they are in. */}
      <TrustBoundaries />

      {/* 3. Somewhere to look while still exploring, before any commitment */}
      <DestinationPreview />

      {/* 2. The three routes, as an editorial list rather than three cards */}
      <PathwaySelector
        eyebrow={home.journeysEyebrow}
        title={home.journeysTitle}
        intro={home.journeysIntro}
        note={home.journeysNote}
        journeys={home.journeys}
      />

      {/* 3. Three steps on a line */}
      <ProcessTimeline
        eyebrow={home.howEyebrow}
        title={home.howTitle}
        intro={home.howIntro}
        steps={home.steps.slice(0, 3)}
        note={home.howNote}
        footer={
          // The three tiers used to be a list of links here. They are the
          // answer to a question the visitor is already asking, so they are
          // now asked it. Same tiers, same anchors.
          <div className="max-w-3xl">
            <ServiceSpectrum />
          </div>
        }
      />

      {/* 5. A real situation, or a marker for where one goes */}
      <CaseExample />

      {/* 7. The guides, laid out like an article page */}
      <EditorialGuideFeature articles={articles} />

      {/* Marker for where real proof goes. Renders nothing in production. */}
      <ProofPlaceholder />

      {testimonials.length ? (
        <Section>
          <SectionHead eyebrow="In their words" title="What clients say" center={false} />
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure key={i} className="border-l-2 border-brand pl-6">
                <blockquote className="font-display text-lg leading-relaxed text-navy">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm">
                  <span className="font-semibold text-navy">{t.person}</span>
                  {t.context ? <span className="block text-navy/70">{t.context}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      <WhatsAppCTA />
    </>
  );
}
