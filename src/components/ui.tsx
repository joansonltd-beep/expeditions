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
        <ol className={`flex flex-wrap items-center gap-2 text-sm ${onDark ? "text-white/75" : "text-slate-600"}`}>
          <li>
            <Link href="/" className={onDark ? "hover:text-white hover:underline" : "hover:text-brand hover:underline"}>
              Home
            </Link>
          </li>
          <li aria-hidden="true" className={onDark ? "text-white/45" : "text-slate-400"}>
            /
          </li>
          <li>
            <span className={onDark ? "font-medium text-white" : "font-medium text-slate-900"} aria-current="page">
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
export const btnPrimary = `${btn} bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:ring-brand`;
export const btnGhost = `${btn} border border-slate-200 bg-white text-slate-900 hover:border-brand hover:text-brand focus-visible:ring-brand`;
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
      className={`${alt ? "border-y border-slate-200/70 bg-slate-50/80" : ""} py-16 sm:py-20 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
      {children}
    </span>
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
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-lg text-slate-600">{intro}</p> : null}
    </div>
  );
}

// A simple checkmark bullet list.
export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-2.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="relative pl-7 text-slate-600">
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
      <div className="relative isolate -mt-[70px] flex min-h-[420px] flex-col overflow-hidden pt-[70px] sm:min-h-[520px]">
        <RotatingPhotoBg photos={photos} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/35 to-slate-950/80" />
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
    <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-soft/70 via-brand-soft/20 to-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-brand-light/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-accent-soft blur-3xl"
      />
      <Container className="relative py-14 sm:py-16">
        <div className={image ? "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between" : undefined}>
          <div>
            <Breadcrumbs crumb={crumb} />
            {icon ? (
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand shadow-md ring-1 ring-slate-200/80">
                {icon}
              </div>
            ) : null}
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            {intro ? <p className="mt-4 max-w-2xl text-lg text-slate-600">{intro}</p> : null}
            {footnote ? <p className="mt-2 max-w-2xl text-sm text-slate-600">{footnote}</p> : null}
          </div>
          {image ? <div className="shrink-0 lg:w-[340px]">{image}</div> : null}
        </div>
      </Container>
    </div>
  );
}
