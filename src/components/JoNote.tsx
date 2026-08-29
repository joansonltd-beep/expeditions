/**
 * A short aside in Jo's voice, reusable on any page.
 *
 * Deliberately not a card: a left rule, a small label and the words. It reads
 * as a margin note in an article rather than another boxed component.
 *
 * Keep the text genuinely first person and genuinely short. It should sound
 * like one sentence someone actually said, never a marketing line.
 */
export default function JoNote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <aside className={`border-l-2 border-accent pl-5 sm:pl-6 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Jo&rsquo;s note</p>
      <p className="mt-2 font-display text-lg leading-relaxed text-navy sm:text-xl">{children}</p>
    </aside>
  );
}
