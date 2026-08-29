import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

// A handful on the home page rather than all twelve. Ordered by where people
// actually ask about most, not alphabetically.
const FEATURED = "trinidad-and-tobago";
const SUPPORTING = ["jamaica", "barbados", "grenada", "guyana"];

/**
 * One large destination with its photograph, four smaller ones as a list, and
 * a link to the rest. Visually distinct from the pathway section above it:
 * that one is rows, this one is a picture with a list beside it.
 */
export default function DestinationPreview() {
  const featured = COUNTRY_GUIDES.find((g) => g.slug === FEATURED);
  const supporting = SUPPORTING.map((s) => COUNTRY_GUIDES.find((g) => g.slug === s)).filter(
    (g): g is NonNullable<typeof g> => Boolean(g)
  );
  if (!featured) return null;

  return (
    <section className="bg-navy py-16 text-cream sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Where people go</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Country guides</h2>
            <p className="mt-3 text-lg text-cream/70">
              What it costs to live there, what to expect when you land, and how the paperwork works.
            </p>
          </div>
          <Link href="/destinations" className="font-semibold text-cream underline-offset-4 hover:underline">
            View all destinations →
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Link
            href={`/destinations/${featured.slug}`}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-cream/10">
              {featured.photo ? (
                <Image
                  src={featured.photo.src}
                  alt={featured.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : null}
            </div>
            <h3 className="mt-5 text-2xl font-bold group-hover:underline">{featured.name}</h3>
            <p className="mt-2 max-w-lg text-cream/70">{featured.tagline}</p>
          </Link>

          <ul className="lg:pt-2">
            {supporting.map((g) => (
              <li key={g.slug} className="border-t border-cream/20 last:border-b">
                <Link
                  href={`/destinations/${g.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  <span>
                    <span className="block text-lg font-semibold group-hover:underline">{g.name}</span>
                    <span className="mt-1 block max-w-sm text-sm text-cream/60">{g.tagline}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-accent transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
