import Link from "next/link";
import RotatingPhotoBg, { type HeroPhoto } from "@/components/RotatingPhotoBg";
import { SITE_URL } from "@/lib/siteUrl";

export type { HeroPhoto };

/**
 * Home > current page. The `crumb` prop had been accepted by PageHeader and
 * quietly dropped, so nothing rendered and search engines saw no trail.
 *
 * Renders the visible trail and the matching BreadcrumbList structured data
 * together, from one source, so the two cannot drift apart.
 */
function Breadcrumbs({ crumb, onDark = false }: { crumb: string; onDark?: boolean }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: crumb },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className={`flex flex-wrap items-center gap-2 text-sm ${onDark ? "text-white/75" : "text-navy/60"}`}>
          <li>
            <Link href="/" className={onDark ? "hover:text-white hover:underline" : "hover:text-brand hover:underline"}>
              Home
            </Link>
          </li>
          <li aria-hidden="true" className={onDark ? "text-white/45" : "text-navy/35"}>
            /
          </li>
          <li>
            <span className={onDark ? "font-medium text-white" : "font-medium text-navy"} aria-current="page">
              {crumb}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}

// Shared button class strings, so links and buttons look identical everywhere.
export const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
export const btnPrimary = `${btn} bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand`;
export const btnGhost = `${btn} border border-navy/25 bg-transparent text-navy hover:border-brand hover:text-brand focus-visible:ring-brand`;
export const btnAccent = `${btn} bg-accent text-white hover:brightness-95 focus-visible:ring-accent`;
export const btnWhatsapp = `${btn} bg-whatsapp text-white hover:brightness-95 focus-visible:ring-whatsapp`;

// max-w-[1400px] instead of the tighter max-w-6xl (1152px): on a very wide or
// zoomed-out viewport, a narrower cap leaves the whole page looking like a
// small centered island with huge empty margins. Text blocks inside sections
// already nest their own tighter max-w-3xl/2xl wrapper, so this only widens
// grids/backgrounds, not paragraph line length.
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-5 ${className}`}>{children}</div>;
}

export function Section({
  children,
  alt = false,
  className = "",
  id,
}: {
  children: React.ReactNode;
  alt?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${alt ? "border-y border-navy/10 bg-sand" : "bg-cream"} py-16 sm:py-24 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">{children}</span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} mb-12 max-w-2xl`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-lg text-navy/70">{intro}</p> : null}
    </div>
  );
}

// A simple checkmark bullet list.
export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-2.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="relative pl-7 text-navy/75">
          <svg
            className="absolute left-0 top-1 h-4 w-4 text-brand"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 10.5 8.5 14 15 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PageHeader({
  icon,
  title,
  intro,
  footnote,
  crumb,
  image,
  photos,
}: {
  icon?: React.ReactNode;
  title: string;
  intro?: string;
  footnote?: string;
  crumb: string;
  image?: React.ReactNode;
  photos?: HeroPhoto[];
}) {
  if (photos?.length) {
    return (
      <div className="relative isolate flex min-h-[360px] flex-col overflow-hidden bg-navy sm:min-h-[420px]">
        <RotatingPhotoBg photos={photos} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/25" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/70 to-transparent" />
        <Container className="relative mt-auto py-10 sm:py-12">
          <div className={image ? "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between" : undefined}>
            <div>
              <Breadcrumbs crumb={crumb} onDark />
              <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
              {intro ? <p className="mt-3 max-w-2xl text-base text-white/85">{intro}</p> : null}
              {footnote ? <p className="mt-2 max-w-2xl text-sm text-white/65">{footnote}</p> : null}
            </div>
            {image ? <div className="shrink-0 lg:w-[340px]">{image}</div> : null}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-b border-navy/10 bg-sand">
      <Container className="relative py-14 sm:py-16">
        <div className={image ? "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between" : undefined}>
          <div>
            <Breadcrumbs crumb={crumb} />
            {icon ? (
              <div className="mb-4 grid h-13 w-13 place-items-center rounded-lg bg-cream text-brand ring-1 ring-navy/12">
                {icon}
              </div>
            ) : null}
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h1>
            {intro ? <p className="mt-4 max-w-2xl text-lg text-navy/75">{intro}</p> : null}
            {footnote ? <p className="mt-2 max-w-2xl text-sm text-navy/55">{footnote}</p> : null}
          </div>
          {image ? <div className="shrink-0 lg:w-[340px]">{image}</div> : null}
        </div>
      </Container>
    </div>
  );
}
