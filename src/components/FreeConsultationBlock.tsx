import Link from "next/link";
import { Container, btnPrimary } from "@/components/ui";

// Sits where a priced service block would go. For now Jo is leading with a
// free consultation instead of published fees, so this just says that plainly
// and points at the same enquiry flow the priced version used to.
export default function FreeConsultationBlock({ text }: { text: string }) {
  return (
    <section className="bg-sand py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What it costs</p>
          <p className="mt-3 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
            Free consultation
          </p>
          <p className="mt-4 text-lg text-navy/75">{text}</p>
          <div className="mt-8 flex justify-center">
            <Link href="/plan-my-move" className={btnPrimary}>
              Book a free consultation
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
