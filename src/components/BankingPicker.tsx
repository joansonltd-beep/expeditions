"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BankingIsland } from "@/lib/bankingData";

// Island picker for the banking hub. The visitor chooses where they are
// opening an account, then is taken to that island's requirements page.
export default function BankingPicker({ islands }: { islands: BankingIsland[] }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const go = () => {
    if (slug) router.push(`/finance/${slug}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <label htmlFor="banking-island" className="block text-sm font-semibold uppercase tracking-wide text-brand">
        Choose your island
      </label>
      <p className="mt-1 text-sm text-slate-500">
        Pick where you are opening the account to see which bank to go to and exactly what to bring.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <select
          id="banking-island"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-3 text-[0.97rem] text-slate-900 transition focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <option value="" disabled>
            Select an island…
          </option>
          {islands.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={go}
          disabled={!slug}
          className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          View requirements →
        </button>
      </div>
    </div>
  );
}
