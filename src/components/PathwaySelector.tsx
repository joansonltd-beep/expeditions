import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Icon, journeyIcon } from "@/components/icons";
import type { HomeJourney } from "@/lib/homeDefaults";

// A photo per pathway, all Trinidad and Tobago, all already credited elsewhere
// on the site. Deliberately not beaches: an airport, a working city, a campus.
const PATHWAY_IMAGE: Record<string, { src: string; alt: string; caption: string }> = {
  "/getting-there": {
    src: "/photos/hero.jpg",
    alt: "The jetty at Pigeon Point, Tobago, looking out over shallow water",
    caption: "Pigeon Point, Tobago",
  },
  "/getting-started": {
    src: "/photos/heroes/port-of-spain.jpg",
    alt: "Downtown Port of Spain, Trinidad, seen across the rooftops",
    caption: "Port of Spain, Trinidad",
  },
  "/study": {
    src: "/photos/heroes/uwi-st-augustine.jpg",
    alt: "The University of the West Indies campus at St. Augustine, Trinidad",
    caption: "UWI St. Augustine",
  },
};

/**
 * The three routes, as an editorial list rather than three matching cards.
 *
 * The first one is featured wide with its photograph; the other two sit
 * underneath as row links separated by rules. That gives the section a shape
 * and a reading order instead of the card-card-card rhythm that makes a page
 * look generated.
 */
export default function PathwaySelector({
  eyebrow,
  title,
  intro,
  note,
  journeys,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  note?: string;
  journeys: HomeJourney[];
}) {
  const [featured, ...rest] = journeys;
  if (!featured) return null;
  const featuredImage = PATHWAY_IMAGE[featured.href];

  return (
    <section className="border-y border-navy/10 bg-cream py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-3 text-lg text-navy/70">{intro}</p>
        </div>

        {/* Featured route: photograph left, words right. */}
        <Link
          href={featured.href}
          className="group mt-12 grid gap-7 sm:grid-cols-[1.05fr_1fr] sm:items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
        >
          {featuredImage ? (
            <figure className="overflow-hidden rounded-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-navy/10 sm:aspect-[3/2]">
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  sizes="(min-width: 640px) 48vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-navy/50">{featuredImage.caption}</figcaption>
            </figure>
          ) : null}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <Icon name={journeyIcon(featured.href)} className="h-4 w-4" />
              Most people start here
            </span>
            <h3 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">{featured.title}</h3>
            <p className="mt-3 text-navy/70">{featured.text}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand group-hover:underline">
              {featured.cta}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>

        {/* The other two: quiet rows, divided by rules. */}
        <ul className="mt-14 border-t border-navy/12">
          {rest.map((j) => {
            const img = PATHWAY_IMAGE[j.href];
            return (
              <li key={j.href} className="border-b border-navy/12">
                <Link
                  href={j.href}
                  className="group grid items-center gap-5 py-7 sm:grid-cols-[7rem_1fr_auto] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
                >
                  {img ? (
                    <div className="relative hidden aspect-[4/3] w-28 overflow-hidden rounded bg-navy/10 sm:block">
                      <Image src={img.src} alt={img.alt} fill sizes="7rem" className="object-cover" />
                    </div>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-navy">{j.title}</h3>
                    <p className="mt-1.5 max-w-xl text-navy/70">{j.text}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-brand group-hover:underline">
                    {j.cta}
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {note ? <p className="mt-8 max-w-3xl text-sm text-navy/60">{note}</p> : null}
      </Container>
    </section>
  );
}
