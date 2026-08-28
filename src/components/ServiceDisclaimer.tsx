import { SERVICE_DISCLAIMER } from "@/lib/serviceTiers";

/**
 * The standard service disclaimer. Readable and professional, not shouty: it
 * sits at the foot of a service section rather than interrupting it.
 */
export default function ServiceDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`border-t border-slate-200 pt-4 text-sm text-slate-600 ${className}`}>{SERVICE_DISCLAIMER}</p>
  );
}
