import Link from "next/link";
import { btnPrimary, btnGhost } from "@/components/ui";

/**
 * The bridge from a free guide to paid, personalised help.
 *
 * The guides stay genuinely useful on their own. This exists to say that
 * general information is not the same as knowing what YOUR situation needs.
 * Deliberately not fear-based: it never suggests a reader cannot manage
 * independently, only that guidance saves confusion and missed steps.
 */
export default function GuideCta({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7 ${className}`}>
      <h2 className="text-lg font-bold text-slate-900">Need a plan built around your move?</h2>
      <p className="mt-2 text-slate-700">
        Your passport, where you are going, why, and what you already hold all change the answer. Worth checking before
        you start spending money on it.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/plan-my-move" className={btnPrimary}>
          Tell Jo about my plans
        </Link>
        <Link href="/services#skills-certificate" className={btnGhost}>
          Ask about CSME Certificate Support
        </Link>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        You get a document list built around your situation, a realistic timeline, and what to do first.
      </p>
    </div>
  );
}
