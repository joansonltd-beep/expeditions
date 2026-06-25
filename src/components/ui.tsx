import Link from "next/link";

// Shared button class strings, so links and buttons look identical everywhere.
export const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
export const btnPrimary = `${btn} bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:ring-brand`;
export const btnGhost = `${btn} border border-slate-200 bg-white text-slate-900 hover:border-brand hover:text-brand focus-visible:ring-brand`;
export const btnAccent = `${btn} bg-accent text-white hover:brightness-95 focus-visible:ring-accent`;
export const btnWhatsapp = `${btn} bg-whatsapp text-white hover:brightness-95 focus-visible:ring-whatsapp`;

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
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
    <section id={id} className={`${alt ? "bg-slate-50" : ""} py-16 sm:py-20 ${className}`}>
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
      {intro ? <p className="mt-3 text-lg text-slate-500">{intro}</p> : null}
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
  crumb,
}: {
  icon?: string;
  title: string;
  intro?: string;
  crumb: string;
}) {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-brand-soft/60 to-transparent">
      <Container className="py-14 sm:py-16">
        <p className="mb-4 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>{" "}
          / {crumb}
        </p>
        {icon ? <div className="mb-3 text-4xl">{icon}</div> : null}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-lg text-slate-600">{intro}</p> : null}
      </Container>
    </div>
  );
}
