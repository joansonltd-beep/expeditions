import Link from "next/link";
import { Container, btnPrimary } from "@/components/ui";
import RotatingHero from "@/components/RotatingHero";
import PhotoHeroDeclare from "@/components/PhotoHeroDeclare";
import IndependenceBanner from "@/components/IndependenceBanner";

/**
 * Image-led hero with the words held in a controlled column on the left.
 *
 * Changes from the old one: the headline is capped at roughly 15 words wide
 * instead of running the full container, the overlay is a directional scrim
 * that keeps the right-hand side of the photograph visible rather than a flat
 * wash over everything, and there are two actions instead of three competing
 * ones. WhatsApp moves to the closing CTA and the floating button.
 *
 * `bg-navy` under the photo is the fallback if the image never loads, so the
 * white type stays readable either way.
 */
export default function HeroSection({
  headline,
  subcopy,
  trustNote,
}: {
  headline: string;
  subcopy: string;
  trustNote?: string;
}) {
  return (
    <section className="relative isolate -mt-[70px] flex min-h-[34rem] items-end overflow-hidden bg-navy pt-[70px] sm:min-h-[42rem]">
      <PhotoHeroDeclare />
      <RotatingHero />

      {/* Directional scrim: heavy at the left where the words sit, clearing
          toward the right so the photograph is still a photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/70 to-navy/25"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/70 to-transparent" />

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="max-w-xl">
          <IndependenceBanner compact />
          <h1 className="font-display text-[2.1rem] font-bold leading-[1.1] text-white sm:text-5xl">{headline}</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">{subcopy}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/find-my-pathway" className={btnPrimary}>
              Work out what I need to do first
            </Link>
            <Link
              href="/services#consultation"
              className="inline-flex items-center justify-center rounded-full border border-white/45 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Book a Move Planning Consultation
            </Link>
          </div>

          {trustNote ? <p className="mt-7 max-w-lg text-sm leading-relaxed text-white/70">{trustNote}</p> : null}
        </div>
      </Container>
    </section>
  );
}
