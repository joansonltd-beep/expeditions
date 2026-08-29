import Link from "next/link";
import { Container, CheckList, btnPrimary } from "@/components/ui";
import type { JourneyPricing } from "@/lib/journeyPricing";

/**
 * What a journey costs, on the journey's own page.
 *
 * Deliberately shows what the fee does NOT cover next to what it does. Someone
 * reading "groceries" in an inclusions list will otherwise assume the groceries
 * are paid for, and finding out later is worse than reading it here. The limit
 * line at the bottom keeps the price sitting next to the reminder that an
 * office, school or employer still makes the decision.
 */
export default function PricingBlock({ pricing }: { pricing: JourneyPricing }) {
  return (
    <section className="bg-sand py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What it costs</p>
          <p className="mt-3 font-display text-5xl font-bold leading-none text-navy sm:text-6xl">{pricing.headline}</p>
          <p className="mt-4 text-lg text-navy/75">{pricing.lead}</p>

          <dl className="mt-8 border-t border-navy/15">
            {pricing.lines.map((l) => (
              <div key={l.when} className="flex items-baseline justify-between gap-6 border-b border-navy/15 py-3.5">
                <dt className="text-navy/80">{l.when}</dt>
                <dd className="shrink-0 font-display text-lg font-bold text-navy">{l.amount}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-navy/55">All prices in US dollars.</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">{pricing.includesTitle}</h3>
              <CheckList items={pricing.includes} className="mt-4 text-sm" />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">What it does not cover</h3>
              <ul className="mt-4 grid gap-2.5">
                {pricing.excludes.map((item) => (
                  <li key={item} className="relative pl-6 text-sm text-navy/75">
                    <span aria-hidden="true" className="absolute left-0 top-0 text-accent">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sits on top of whichever line above applies, so it gets its own
              block rather than another row that could read as an alternative. */}
          {pricing.addOn ? (
            <div className="mt-10 border border-brand/30 bg-brand-soft p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-display text-xl font-bold text-navy">{pricing.addOn.title}</h3>
                <p className="font-display text-lg font-bold text-brand">{pricing.addOn.amount}</p>
              </div>
              <p className="mt-3 text-navy/75">{pricing.addOn.text}</p>
            </div>
          ) : null}

          {pricing.note ? (
            <p className="mt-8 border-l-2 border-accent pl-5 text-navy/70">{pricing.note}</p>
          ) : null}

          <div className="mt-8">
            <Link href="/plan-my-move" className={btnPrimary}>
              Tell Jo about your plans
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
