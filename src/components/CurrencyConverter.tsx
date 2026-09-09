"use client";

import { useEffect, useMemo, useState } from "react";

type CurrencyCode = "TTD" | "JMD" | "BBD" | "XCD" | "BZD" | "GYD" | "SRD" | "USD" | "CAD" | "GBP";

const CURRENCIES: { code: CurrencyCode; flag: string; name: string; where: string }[] = [
  { code: "TTD", flag: "🇹🇹", name: "Trinidad and Tobago Dollar", where: "Trinidad and Tobago" },
  { code: "JMD", flag: "🇯🇲", name: "Jamaican Dollar", where: "Jamaica" },
  { code: "BBD", flag: "🇧🇧", name: "Barbados Dollar", where: "Barbados" },
  { code: "XCD", flag: "🌴", name: "East Caribbean Dollar", where: "Antigua and Barbuda, Dominica, Grenada, Saint Lucia, St. Kitts and Nevis, St. Vincent and the Grenadines" },
  { code: "BZD", flag: "🇧🇿", name: "Belize Dollar", where: "Belize" },
  { code: "GYD", flag: "🇬🇾", name: "Guyanese Dollar", where: "Guyana" },
  { code: "SRD", flag: "🇸🇷", name: "Surinamese Dollar", where: "Suriname" },
  { code: "USD", flag: "🇺🇸", name: "US Dollar", where: "United States" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar", where: "Canada" },
  { code: "GBP", flag: "🇬🇧", name: "Pound Sterling", where: "United Kingdom" },
];

// Per 1 USD. Used only when no live rate can be reached.
const FALLBACK: Record<CurrencyCode, number> = {
  USD: 1, TTD: 6.79, JMD: 156.5, BBD: 2, XCD: 2.7, BZD: 2, GYD: 209, SRD: 38, CAD: 1.37, GBP: 0.78,
};

function meta(code: string) {
  return CURRENCIES.find((c) => c.code === code) ?? { code, flag: "", name: code, where: "" };
}

function money(n: number, dp = 2) {
  if (!isFinite(n)) return "–";
  return n.toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

function rateFormat(n: number) {
  if (!isFinite(n)) return "–";
  const dp = n >= 100 ? 3 : n >= 1 ? 4 : 6;
  return n.toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

const STEPS = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

export default function CurrencyConverter() {
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK);
  const [status, setStatus] = useState<{ text: string; stale: boolean }>({ text: "Loading rates", stale: false });
  const [from, setFrom] = useState<CurrencyCode>("TTD");
  const [to, setTo] = useState<CurrencyCode>("JMD");
  const [amountStr, setAmountStr] = useState("1.00");

  function load() {
    setStatus({ text: "Loading rates", stale: false });
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!d?.rates) return Promise.reject();
        const when = d.time_last_update_utc
          ? new Date(d.time_last_update_utc).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
          : "just now";
        applyRates(d.rates, when, true);
      })
      .catch(() =>
        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json")
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((d) => {
            if (!d?.usd) return Promise.reject();
            applyRates(d.usd, d.date || "today", true);
          })
      )
      .catch(() => applyRates(FALLBACK, "stored rates", false));
  }

  function applyRates(map: Record<string, number>, when: string, isLive: boolean) {
    const clean: Record<string, number> = {};
    for (const c of CURRENCIES) {
      const v = map[c.code] !== undefined ? map[c.code] : map[c.code.toLowerCase()];
      clean[c.code] = typeof v === "number" && isFinite(v) && v > 0 ? v : FALLBACK[c.code];
    }
    setRates(clean);
    setStatus({
      text: isLive ? `Mid-market rate, updated ${when}` : `Live rates unavailable. Showing ${when}.`,
      stale: !isLive,
    });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const amount = useMemo(() => {
    const raw = amountStr.replace(/[^0-9.]/g, "");
    const v = parseFloat(raw);
    return isFinite(v) ? v : 0;
  }, [amountStr]);

  function rateBetween(a: string, b: string) {
    if (!rates[a] || !rates[b]) return NaN;
    return rates[b] / rates[a];
  }

  const r = rateBetween(from, to);
  const fMeta = meta(from);
  const tMeta = meta(to);

  return (
    <div>
      <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
        <div>
          <label htmlFor="amount" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/55">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            onBlur={() => setAmountStr(amount ? money(amount) : "")}
            className="w-full rounded-xl border border-navy/20 px-3 py-3 text-2xl font-semibold tabular-nums text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="from-cur" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/55">
              From
            </label>
            <select
              id="from-cur"
              value={from}
              onChange={(e) => setFrom(e.target.value as CurrencyCode)}
              className="w-full rounded-xl border border-navy/20 bg-white px-3 py-3 text-base font-semibold text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} – {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              const f = from;
              setFrom(to);
              setTo(f);
            }}
            className="mb-0.5 rounded-full border border-navy/20 px-4 py-3 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
          >
            Swap
          </button>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="to-cur" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/55">
              To
            </label>
            <select
              id="to-cur"
              value={to}
              onChange={(e) => setTo(e.target.value as CurrencyCode)}
              className="w-full rounded-xl border border-navy/20 bg-white px-3 py-3 text-base font-semibold text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} – {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 border-t border-navy/10 pt-5">
          <p className="text-sm text-navy/60">
            {money(amount)} {fMeta.code} – {fMeta.name}
          </p>
          <p className="mt-0.5 text-4xl font-bold tracking-tight tabular-nums text-navy sm:text-5xl">
            {money(amount * r)} {tMeta.code}
          </p>
          <p className="mt-2 text-sm tabular-nums text-navy/60">
            1 {from} = {rateFormat(r)} {to}
            <br />1 {to} = {rateFormat(1 / r)} {from}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-navy/55">
          <span>
            <span
              className={`mr-1.5 inline-block h-2 w-2 rounded-full align-middle ${status.stale ? "bg-amber-500" : "bg-emerald-600"}`}
            />
            {status.text}
          </span>
          <button type="button" onClick={load} className="font-semibold text-brand underline-offset-2 hover:underline">
            Refresh rates
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-navy">
            Convert {from} to {to}
          </h3>
          <table className="w-full text-sm tabular-nums">
            <thead>
              <tr className="border-b border-navy/10 text-left text-xs font-semibold text-navy/55">
                <th className="pb-1.5">{from}</th>
                <th className="pb-1.5 text-right">{to}</th>
              </tr>
            </thead>
            <tbody>
              {STEPS.map((s) => (
                <tr key={s} className="border-b border-navy/5 last:border-0">
                  <td className="py-1.5">{money(s, 0)} {from}</td>
                  <td className="py-1.5 text-right">{money(s * r)} {to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-navy">
            Convert {to} to {from}
          </h3>
          <table className="w-full text-sm tabular-nums">
            <thead>
              <tr className="border-b border-navy/10 text-left text-xs font-semibold text-navy/55">
                <th className="pb-1.5">{to}</th>
                <th className="pb-1.5 text-right">{from}</th>
              </tr>
            </thead>
            <tbody>
              {STEPS.map((s) => (
                <tr key={s} className="border-b border-navy/5 last:border-0">
                  <td className="py-1.5">{money(s, 0)} {to}</td>
                  <td className="py-1.5 text-right">{money(s / r)} {from}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
        <h3 className="mb-3 text-base font-semibold text-navy">What 1 {from} is worth across the region</h3>
        <table className="w-full text-sm tabular-nums">
          <thead>
            <tr className="border-b border-navy/10 text-left text-xs font-semibold text-navy/55">
              <th className="pb-1.5">Currency</th>
              <th className="pb-1.5 text-right">Per 1 {from}</th>
            </tr>
          </thead>
          <tbody>
            {CURRENCIES.filter((c) => c.code !== from).map((c) => (
              <tr key={c.code} className="border-b border-navy/5 last:border-0">
                <td className="py-1.5">
                  {c.flag} <strong>{c.code}</strong>
                  <span className="ml-1.5 text-xs text-navy/50">{c.name}</span>
                </td>
                <td className="py-1.5 text-right">{rateFormat(rateBetween(from, c.code))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 space-y-2 text-sm text-navy/55">
        <p>
          These are mid-market rates, the midpoint between what buyers and sellers are paying on the wholesale
          market. A bank, cambio or transfer service will add its own margin, so the rate you are actually offered
          will be lower.
        </p>
        <p>
          The East Caribbean dollar covers Antigua and Barbuda, Dominica, Grenada, Saint Lucia, St. Kitts and Nevis,
          and St. Vincent and the Grenadines. It is pegged to the US dollar, as are the Barbados and Belize dollars,
          so those rates barely move.
        </p>
      </div>
    </div>
  );
}
