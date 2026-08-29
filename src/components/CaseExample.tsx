import { Container } from "@/components/ui";
import { CASE_EXAMPLES } from "@/lib/caseExamples";

/**
 * An anonymised customer situation, laid out as a question and what followed
 * rather than as a testimonial card.
 *
 * When no verified material exists it renders a labelled placeholder in
 * development only, so the gap is visible to whoever edits the site and
 * invisible to visitors. It never invents a story to fill the space.
 */
export default function CaseExample() {
  const example = CASE_EXAMPLES[0];

  if (!example) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl border-2 border-dashed border-accent/50 p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Editor note, not visible in production
            </p>
            <p className="mt-3 font-display text-xl text-navy">
              Add a verified customer story or anonymised example here.
            </p>
            <p className="mt-3 text-navy/70">
              Add an entry to <code className="rounded bg-navy/5 px-1.5 py-0.5">src/lib/caseExamples.ts</code> with the
              starting point, destination, the question they arrived with, what was done, and the step that followed.
              Needs the client&rsquo;s permission, even anonymised. No outcomes, no approvals.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">A situation we saw</p>
          <blockquote className="mt-5 border-l-2 border-brand pl-6">
            <p className="font-display text-2xl leading-relaxed text-navy sm:text-3xl">
              &ldquo;{example.question}&rdquo;
            </p>
          </blockquote>

          <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {[
              ["Starting point", example.from],
              ["Intended destination", example.to],
              ["What we did", example.support],
              ["What happened next", example.next],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-navy/15 pt-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/50">{label}</dt>
                <dd className="mt-1.5 text-navy/80">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm text-navy/55">
            Shared with permission and anonymised. Every situation is different, and nothing here suggests a particular
            result is typical or promised.
          </p>
        </div>
      </Container>
    </section>
  );
}
