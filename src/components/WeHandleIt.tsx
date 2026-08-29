import Link from "next/link";

/**
 * The "you don't have to do this yourself" callout.
 *
 * The guides on this site are deliberately detailed, which can leave a reader
 * assuming the whole thing is a DIY exercise. This sits alongside them to say
 * plainly that we will run the process instead.
 *
 * It promises effort, not outcomes: handling paperwork and chasing offices is
 * ours to do, while approval stays with the government office, school or
 * employer. Keep it that way in any edit.
 */
export default function WeHandleIt({
  what = "this process",
  className = "",
}: {
  what?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7 ${className}`}
    >
      <h3 className="text-lg font-bold text-slate-900">You don&rsquo;t have to do this yourself</h3>
      <p className="mt-2 text-slate-700">
        I can handle {what} for you. I work out what your country and your destination actually ask for, get the
        paperwork in order, and keep it moving, so you are not the one chasing offices and re-reading forms to figure
        out what happens next.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/plan-my-move" className="text-sm font-semibold text-brand hover:underline">
          Tell Jo about my plans →
        </Link>
        <a href="tel:+18687236644" className="text-sm font-semibold text-slate-700 hover:text-brand">
          Or call 868-723-6644
        </a>
      </div>
    </div>
  );
}
