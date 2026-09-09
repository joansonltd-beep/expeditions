import Link from "next/link";
import { Container, btnPrimary } from "@/components/ui";

// Replaces PricingBlock on the Visit/Work/Study pages: no fees, no tiers,
// just an invitation to talk. Keeps the same section weight (bg-sand, the
// same display headline treatment) so it still reads as a real, considered
// part of the page rather than an afterthought.
export default function FreeConsultationBlock({ lead }: { lead: string }) {
  return (
    <section className="bg-sand py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What it costs</p>
          <p className="mt-3 font-display text-5xl font-bold leading-none text-navy sm:text-6xl">Free</p>
          <p className="mt-4 text-lg text-navy/75">{lead}</p>
          <div className="mt-8 flex justify-center">
            <Link href="/plan-my-move" className={btnPrimary}>
              Tell Jo about your plans
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
