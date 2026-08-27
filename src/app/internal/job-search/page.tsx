// Internal-only tool, not linked anywhere on the public site (same pattern
// as /studio: lives outside the (site) route group, so it renders with no
// public header/nav/footer). No password gate yet.
//
// Uses Google's Programmable Search Engine embed widget rather than the
// Custom Search JSON API: the JSON API is closed to new customers ahead of
// its Jan 2027 shutdown, so a from-scratch API key can never get real access
// no matter how it's configured. The embed widget is a separate, still fully
// available product that needs no API key, just the engine ID (cx), which is
// a public identifier, not a secret. See JobSearchWidget for why it's loaded
// via explicit render rather than Google's default auto-scanning embed.

import type { Metadata } from "next";
import JobSearchWidget from "@/components/internal/JobSearchWidget";

export const metadata: Metadata = {
  title: "Job Search",
  robots: { index: false, follow: false },
};

export default function InternalJobSearchPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">Internal tool</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">CARICOM Job Search</h1>
      <p className="mt-1 text-sm text-slate-500">
        Searches a curated list of job boards, government portals and newspaper classifieds across CARICOM. Nothing
        outside that list shows up.
      </p>

      <div className="mt-6">
        <JobSearchWidget />
      </div>
    </div>
  );
}
