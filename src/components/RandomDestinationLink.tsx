"use client";

import { useRouter } from "next/navigation";

export default function RandomDestinationLink({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  const goRandom = () => {
    const pick = slugs[Math.floor(Math.random() * slugs.length)];
    if (pick) router.push(`/destinations/${pick}`);
  };

  return (
    <button
      type="button"
      onClick={goRandom}
      className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-brand/50 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/10"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
      </svg>
      Surprise me
    </button>
  );
}
