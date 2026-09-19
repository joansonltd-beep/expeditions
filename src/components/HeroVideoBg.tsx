"use client";

import { useEffect, useRef } from "react";

/**
 * A silent looping clip behind a page header.
 *
 * The `autoplay` attribute on its own is not enough. A tab that loads in the
 * background, or a phone in low power mode, leaves the video paused and never
 * comes back to it, so the header sits on a still frame forever. This asks
 * again once the clip is ready and again whenever the tab becomes visible.
 *
 * Every failure is silent by design: the poster is painted underneath by the
 * caller, so a browser that refuses to play just shows a photograph.
 */
export default function HeroVideoBg({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const tryPlay = () => {
      if (document.visibilityState !== "visible") return;
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      el.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
