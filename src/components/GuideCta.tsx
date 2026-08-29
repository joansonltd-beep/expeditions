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
        Your destination, nationality, work or study plans, documents and timeline can all affect what comes next. Get
        personalised guidance before you begin.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/plan-my-move" className={btnPrimary}>
          Plan My Move
        </Link>
        <Link href="/services#skills-certificate" className={btnGhost}>
          Ask about CSME Certificate Support
        </Link>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Get a personalised document plan, estimated timeline and practical next steps for your destination.
      </p>
    </div>
  );
}
