import Link from "next/link";
import { btnPrimary, btnGhost } from "@/components/ui";

/**
 * The bridge from a free guide to paid, personalised help.
 *
 * The guides stay genuinely useful on their own; this exists to say that
 * general information is not the same as knowing what YOUR situation needs.
 * It never suggests the guide is incomplete or that an outcome is for sale.
 */
export default function GuideCta({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7 ${className}`}>
      <h2 className="text-lg font-bold text-slate-900">Need advice based on your situation?</h2>
      <p className="mt-2 text-slate-700">
        These guides cover the general picture. A consultation covers yours: we look at your nationality, destination,
        purpose, documents and timeline, then tell you which pathway applies and what to line up first.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/#contact" className={btnPrimary}>
          Book a Move Planning Consultation
        </Link>
        <Link href="/services" className={btnGhost}>
          See all services
        </Link>
      </div>
    </div>
  );
}
