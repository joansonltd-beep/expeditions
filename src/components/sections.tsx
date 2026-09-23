/**
 * Section patterns that are not cards.
 *
 * The site had one layout idea repeated about eighty times: a white rounded
 * box with a faint border, arranged in a grid. It is a fine container and a
 * terrible rhythm. A page built entirely from them has no shape, nothing to
 * land on, and it is the single thing that makes a site read as generated
 * rather than designed.
 *
 * These are the alternatives, so a section can take the form that suits what
 * it is actually saying: prose gets a split, an order of operations gets a
 * route, facts get rows, and a caution gets an edge rather than a whole panel.
 *
 * Cards are not banned. They are now one option among five.
 */

/**
 * Heading on the left, body on the right, no box around either.
 *
 * The workhorse for a section that is mostly prose. It stacks on a phone, so
 * the heading still introduces the text it belongs to.
 */
export function EditorialSplit({
  title,
  eyebrow,
  children,
  aside,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 border-t border-navy/15 pt-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
      <div>
        {eyebrow ? (
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</span>
        ) : null}
        <h2 className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-navy sm:text-[2.1rem]">
          {title}
        </h2>
        {aside ? <div className="mt-5 hidden lg:block">{aside}</div> : null}
      </div>
      <div className="measure text-[1.02rem] leading-relaxed text-navy/80">{children}</div>
      {aside ? <div className="lg:hidden">{aside}</div> : null}
    </div>
  );
}

/**
 * A numbered route down a vertical line: steps, stages, an order of
 * operations. Replaces a row of numbered cards, which never managed to show
 * that one thing comes after another.
 */
export function RouteSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative ml-3 border-l border-navy/20">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.title} className={last ? "relative pl-8" : "relative pb-9 pl-8"}>
            <span
              aria-hidden="true"
              className="absolute -left-[13px] top-0 grid h-[26px] w-[26px] place-items-center rounded-full bg-brand text-[0.72rem] font-bold text-white"
            >
              {i + 1}
            </span>
            <h3 className="text-[1.05rem] font-semibold text-navy">{s.title}</h3>
            <p className="measure mt-1.5 text-navy/80">{s.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Label and value in rows separated by hairlines. For facts that belong in a
 * table but do not deserve a table's furniture.
 */
export function FactRows({ rows }: { rows: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="border-t border-navy/15">
      {rows.map((r) => (
        <div key={r.label} className="border-b border-navy/15 py-4 sm:flex sm:items-baseline sm:gap-8">
          <dt className="text-sm font-semibold uppercase tracking-[0.08em] text-navy/70 sm:w-52 sm:shrink-0">
            {r.label}
          </dt>
          <dd className="measure mt-1 text-navy/80 sm:mt-0">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A caution or an aside. A coloured left edge rather than a full box, so a
 * page can carry several without becoming a stack of panels.
 *
 * The tone is carried by a word as well as the colour, because colour alone
 * is not information.
 */
export function Callout({
  title,
  tone = "note",
  children,
}: {
  title?: string;
  tone?: "note" | "warn";
  children: React.ReactNode;
}) {
  const edge = tone === "warn" ? "border-accent bg-accent-soft" : "border-brand bg-brand-soft";
  return (
    <div className={`border-l-4 px-5 py-4 ${edge}`}>
      {title ? <p className="font-semibold text-navy">{title}</p> : null}
      <div className={title ? "measure mt-1.5 text-navy/80" : "measure text-navy/80"}>{children}</div>
    </div>
  );
}

/**
 * A full-bleed band that breaks a long page up without adding another card.
 * Dark ground, so it reads as a pause rather than another section of the same
 * colour.
 */
export function Band({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-y border-navy/20 bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5">{children}</div>
    </section>
  );
}
