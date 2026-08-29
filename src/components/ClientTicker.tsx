"use client";

import { useEffect, useRef, useState } from "react";
import { CLIENT_STATS, CLIENT_STATS_AS_OF } from "@/lib/clientStats";

/**
 * The client counts, counting up once when they first scroll into view.
 *
 * State starts at the real figure rather than zero, which matters three ways:
 * the true numbers are in the server HTML for search engines and for anyone
 * with JavaScript off; a browser without IntersectionObserver simply shows
 * them without animating; and prefers-reduced-motion needs no special case,
 * because doing nothing already leaves the correct value on screen.
 *
 * The count-up only ever writes from inside requestAnimationFrame, never
 * synchronously in an effect, so it cannot cause a cascading render.
 */
function useCountUp(target: number, start: boolean, durationMs = 900): number {
  const [value, setValue] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current || target <= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    started.current = true;
    const from = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - from) / durationMs);
      // Ease out, so it settles rather than stopping dead.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [start, target, durationMs]);

  return value;
}

function Stat({ value, label, start }: { value: number; label: string; start: boolean }) {
  const shown = useCountUp(value, start);
  return (
    <div>
      <div className="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">{shown}</div>
      <div className="mt-2 text-sm text-navy/65">{label}</div>
    </div>
  );
}

export default function ClientTicker({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`border-t border-navy/12 pt-6 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">People I have helped so far</p>
      <div className="mt-5 flex flex-wrap gap-x-12 gap-y-6">
        {CLIENT_STATS.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} start={inView} />
        ))}
      </div>
      <p className="mt-5 text-xs text-navy/50">
        As of {CLIENT_STATS_AS_OF}. Every arrangement still depends on the decisions of the offices, schools and
        employers involved.
      </p>
    </div>
  );
}
