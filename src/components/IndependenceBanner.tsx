import Link from "next/link";
import { Container } from "@/components/ui";
import { currentIndependence, formatDayMonth, FLAG_THEMES, type IndependenceDay } from "@/lib/independenceData";

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

// "in 4 days" / "today" / "yesterday", from the signed day offset that
// currentIndependence() returns (negative means it has just passed).
function whenLabel(daysAway: number): string {
  if (daysAway === 0) return "today";
  if (daysAway === 1) return "tomorrow";
  if (daysAway === -1) return "yesterday";
  if (daysAway < 0) return `${Math.abs(daysAway)} days ago`;
  return `in ${daysAway} days`;
}

function headline(day: IndependenceDay, daysAway: number, years: number): string {
  if (daysAway === 0) return `${day.name} is ${years} today`;
  if (daysAway < 0) return `${day.name} marked ${years} years of independence`;
  return `${day.name} turns ${years} on ${formatDayMonth(day)}`;
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

  const { day, daysAway, years } = current;
  const href = `/destinations/${day.slug}`;
  // Only claim the site has changed colour when it actually has.
  const skinned = Boolean(FLAG_THEMES[day.slug]);

  if (compact) {
    return (
      <Link
        href={href}
        className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-white/15 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <FlagMark slug={day.slug} className="h-5 w-[33px] shrink-0 rounded-[3px]" />
        <span>
          {day.name} Independence Day, {whenLabel(daysAway)}
        </span>
      </Link>
    );
  }

  return (
    <section aria-labelledby="independence-heading" className="border-y border-slate-200 bg-white">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-9">
          <FlagMark
            slug={day.slug}
            className="h-16 w-[107px] shrink-0 rounded-md shadow-md ring-1 ring-slate-900/10 sm:h-20 sm:w-[133px]"
          />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Independence Day, {formatDayMonth(day)} {day.year}
            </p>
            <h2 id="independence-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {headline(day, daysAway, years)}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Independence from {day.from} on {formatDayMonth(day)} {day.year}.
              {skinned ? " We are based in Trinidad and Tobago, and the site is wearing the national colours while the celebrations run." : null}
              {day.note ? ` ${day.note}` : null}
            </p>
            <Link href={href} className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
              Read the {day.name} country guide →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
