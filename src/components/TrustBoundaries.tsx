import { Container } from "@/components/ui";
import { WE_DO, THEY_DECIDE } from "@/lib/homeCopy";

/**
 * The one place on the home page that spells out where our part stops and
 * somebody else's decision starts.
 *
 * Two lists side by side, separated by a rule rather than boxed in cards, so
 * the comparison reads at a glance. This is the only full statement of it on
 * the page; other sections link here rather than repeating it.
 */
export default function TrustBoundaries() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="max-w-2xl">
            <h2 className="mt-3 text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.95rem]">
              What I can do, and what I cannot do
            </h2>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-14">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">What I can do</h3>
              <ul className="mt-4">
                {WE_DO.map((item) => (
                  <li key={item} className="border-t border-navy/12 py-3 text-navy/80 last:border-b">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">What I cannot do</h3>
              <ul className="mt-4">
                {THEY_DECIDE.map((item) => (
                  <li key={item} className="border-t border-navy/12 py-3 text-navy/80 last:border-b">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 font-display text-lg text-navy">
            If anyone in this line of work promises you a certificate, a visa or a job, walk away.
          </p>
        </div>
      </Container>
    </section>
  );
}
