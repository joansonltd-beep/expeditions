import { Container } from "@/components/ui";

export type ProcessStep = { title: string; text: string };

/**
 * Three numbered steps on a connecting line: horizontal on desktop, vertical
 * on mobile, rather than a row of feature cards.
 *
 * The line is drawn with a border on the list itself rather than per item, so
 * it never runs past the first or last marker.
 */
export default function ProcessTimeline({
  eyebrow,
  title,
  intro,
  steps,
  note,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  steps: ProcessStep[];
  note?: string;
}) {
  return (
    <section className="bg-sand py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
          {intro ? <p className="mt-3 text-lg text-navy/70">{intro}</p> : null}
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              {/* Connector. Horizontal between columns on desktop, vertical
                  down the left on mobile. Never drawn after the last step. */}
              {i < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[1.375rem] top-12 h-[calc(100%+1.5rem)] w-px bg-navy/15 sm:left-auto sm:top-[1.375rem] sm:ml-14 sm:h-px sm:w-[calc(100%-3.5rem)]"
                />
              ) : null}
              <div className="relative flex gap-5 sm:block">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand/30 bg-cream font-display text-lg font-bold text-brand">
                  {i + 1}
                </span>
                <div className="sm:mt-5">
                  <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-navy/70">{s.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {note ? <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-navy/70">{note}</p> : null}
      </Container>
    </section>
  );
}
