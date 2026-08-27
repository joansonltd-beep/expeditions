import Link from "next/link";
import { Container, btnPrimary } from "@/components/ui";
import { currentIndependence, formatDayMonth, FLAG_THEMES } from "@/lib/independenceData";

// Simple, accurate flag marks for the countries we currently skin the site for.
// Drawn inline rather than using an emoji flag, because emoji flags do not
// render at all on Windows. Add a country here alongside its FLAG_THEMES entry.
function FlagMark({ slug, className = "" }: { slug: string; className?: string }) {
  if (slug === "trinidad-and-tobago") {
    return (
      <svg
        viewBox="0 0 30 18"
        className={className}
        role="img"
        aria-label="Flag of Trinidad and Tobago"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="30" height="18" fill="#ce1126" />
        <polygon points="0,0 8,0 30,18 22,18" fill="#ffffff" />
        <polygon points="1.2,0 6.8,0 28.8,18 23.2,18" fill="#000000" />
      </svg>
    );
  }
  return null;
}

/**
 * Marks whichever CARICOM independence day is closest, during the run-up window
 * set in independenceData.ts. Renders nothing the rest of the year.
 *
 * `compact` is the badge that sits above the hero headline; the default is the
 * full band that sits below the hero.
 */
export default function IndependenceBanner({ compact = false }: { compact?: boolean }) {
  const current = currentIndependence();
  if (!current) return null;

  const { day } = current;
  const href = `/destinations/${day.slug}`;
  // Only claim the site has changed colour when it actually has.
  const flag = FLAG_THEMES[day.slug];

  if (compact) {
    return (
      <Link
        href={href}
        className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-white/15 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <FlagMark slug={day.slug} className="h-5 w-[33px] shrink-0 rounded-[3px]" />
        <span>Happy Independence {day.name}</span>
      </Link>
    );
  }

  return (
    <section aria-labelledby="independence-heading" className="border-y border-slate-200 bg-white">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:gap-10">
          <FlagMark
            slug={day.slug}
            className="h-16 w-[107px] shrink-0 rounded-md shadow-md ring-1 ring-slate-900/10 sm:h-20 sm:w-[133px]"
          />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Independence Day · {formatDayMonth(day)}
            </p>
            <h2 id="independence-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Celebrating {day.name}&rsquo;s Independence
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              {day.name} gained independence from {day.from} on {formatDayMonth(day)} {day.year}.
            </p>
            {flag ? (
              <p className="mt-3 max-w-2xl text-slate-600">
                As we celebrate the nation&rsquo;s independence, our website is proudly dressed in the national colours
                of {flag.colours}.
              </p>
            ) : null}
            <p className="mt-3 max-w-2xl text-slate-600">
              From {day.name} to opportunities across CARICOM, Expeditions With Jo helps CARICOM citizens make their
              next move, with support to visit, work, or study with a clear plan.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/#contact" className={btnPrimary}>
                Start your CARICOM journey
              </Link>
              <Link href={href} className="text-sm font-semibold text-brand hover:underline">
                Read the {day.name} country guide →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
