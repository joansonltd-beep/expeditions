import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings, getServices, getHomeContent, getTestimonials, getArticles } from "@/lib/siteData";
import { Section, SectionHead, Eyebrow, Container, btnPrimary } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
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
import ServiceDisclaimer from "@/components/ServiceDisclaimer";
import { SERVICE_TIERS, JOURNEY_STAGES } from "@/lib/serviceTiers";
import { WHO_THIS_IS_FOR } from "@/lib/homeCopy";
import { Icon, serviceIcon } from "@/components/icons";

// Title and description come from the root layout; this page only needs to
// claim its own canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [settings, services, home, testimonials, articles] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getHomeContent(),
    getTestimonials(),
    getArticles(),
  ]);
  const travel = services.filter((s) => s.category === "travel" || s.category === "visa");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: home.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {home.faqs.length ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <HeroSection headline={settings.heroHeadline} subcopy={settings.heroSubcopy} trustNote={home.heroTrustNote} />

      {/* Seasonal, renders only around a CARICOM independence day */}
      <IndependenceBanner />

      {/* 1. The person, before the service */}
      <JoIntroduction />

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
      />

      {/* 4. Who turns up, in their own words. Pull quotes, not cards. */}
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sound familiar?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Who this is for</h2>
            <ul className="mt-9 space-y-7">
              {WHO_THIS_IS_FOR.map((item) => (
                <li key={item} className="border-l-2 border-navy/15 pl-6">
                  <p className="font-display text-xl leading-relaxed text-navy/85">&ldquo;{item}&rdquo;</p>
                </li>
              ))}
            </ul>
            <p className="mt-9 text-navy/70">
              Any of those,{" "}
              <Link href="/plan-my-move" className="font-semibold text-brand hover:underline">
                tell Jo about your plans
              </Link>{" "}
              and we will pick it up from wherever you are.
            </p>
          </div>
        </Container>
      </section>

      {/* 5. A real situation, or a marker for where one goes */}
      <CaseExample />

      {/* 6. Where people go */}
      <DestinationPreview />

      {/* 7. The guides, laid out like an article page */}
      <EditorialGuideFeature articles={articles} />

      {/* 8. What you can buy, as a numbered list rather than three cards */}
      <Section>
        <SectionHead eyebrow={home.ladderEyebrow} title={home.ladderTitle} intro={home.ladderIntro} center={false} />
        <ul className="mx-auto max-w-4xl border-t border-navy/12">
          {SERVICE_TIERS.map((tier, i) => (
            <li key={tier.id} className="border-b border-navy/12">
              <Link
                href={`/services#${tier.id}`}
                className="group grid gap-3 py-7 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
              >
                <span className="font-display text-2xl font-bold text-navy/25">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold text-navy">{tier.title}</h3>
                  <p className="mt-1.5 max-w-xl text-navy/70">{tier.cardText}</p>
                </div>
                <span className="inline-flex items-center gap-2 self-center whitespace-nowrap font-semibold text-brand group-hover:underline">
                  {tier.cardCta}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-4xl">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy/50">Where are you up to?</h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {JOURNEY_STAGES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="group font-medium text-navy/80 hover:text-brand">
                  &ldquo;{s.label}&rdquo;{" "}
                  <span aria-hidden="true" className="text-brand">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ServiceDisclaimer className="mt-8" />
        </div>
      </Section>

      {/* 9. Where our part stops. Stated once on this page, not repeated. */}
      <TrustBoundaries />

      {/* 10. Supporting services, kept deliberately quiet as a link list */}
      <Section alt>
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{home.supportEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{home.supportTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-navy/70">{home.supportIntro}</p>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-4">
            {home.pillars.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="font-medium text-navy/80 underline-offset-4 hover:text-brand hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
            {travel.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="inline-flex items-center gap-2 font-medium text-navy/80 underline-offset-4 hover:text-brand hover:underline"
                >
                  <Icon name={serviceIcon(s.slug)} className="h-4 w-4 text-brand/70" />
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/insurance"
                className="font-medium text-navy/80 underline-offset-4 hover:text-brand hover:underline"
              >
                Insurance (now at joansonbjames.com)
              </Link>
            </li>
          </ul>
        </div>
      </Section>

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
                  {t.context ? <span className="block text-navy/60">{t.context}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {/* FAQ as a definition list, not accordions */}
      {home.faqs.length ? (
        <Section alt>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{home.faqEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{home.faqTitle}</h2>
            <dl className="mt-9">
              {home.faqs.map((f, i) => (
                <div key={i} className="border-t border-navy/12 py-6 last:border-b">
                  <dt className="font-semibold text-navy">{f.q}</dt>
                  <dd className="mt-2 text-navy/70">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      ) : null}

      {/* Enquiry form */}
      <Section id="contact">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <Eyebrow>{home.contactEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{home.contactTitle}</h2>
            <p className="mt-4 text-navy/70">{home.contactIntro}</p>
            <p className="mt-6 text-sm text-navy/60">
              Prefer to talk? WhatsApp is quickest, and the button follows you down the page.
            </p>
            <Link href="/plan-my-move" className={`${btnPrimary} mt-6`}>
              Tell Jo about my plans
            </Link>
          </div>
          <ContactForm />
        </div>
      </Section>

      <WhatsAppCTA />
    </>
  );
}
