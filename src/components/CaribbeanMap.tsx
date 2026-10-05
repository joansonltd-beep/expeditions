"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * The twelve CARICOM countries on a map, with the route between two of them.
 *
 * Positions are real. Every dot is the country's own latitude and longitude
 * from countryGuideData, put through a plain equirectangular projection, so
 * the Lesser Antilles arc curves the way it actually curves and Belize sits
 * where Belize actually sits. Nothing here is drawn by eye.
 *
 * No coastlines. Drawing them would mean shipping geographic data this repo
 * does not have, and an invented coastline is worse than none. The sea, the
 * graticule and the dots carry it.
 *
 * The dots are decoration as far as assistive technology is concerned, and
 * the chip row underneath is the real control. Two sets of buttons for one
 * job reads badly in a screen reader, and the chips are also what makes this
 * usable with a thumb: twelve 44px targets would overlap in the Eastern
 * Caribbean, where St Kitts and Antigua are a quarter of a degree apart.
 */

export type MapCountry = {
  slug: string;
  name: string;
  tagline: string;
  freeMovement: boolean;
  costLabel: string | null;
  lat: number;
  lng: number;
};

// The drawn area. Wider than tall, because the region is.
const VIEW_W = 1000;
const VIEW_H = 420;
const PAD = 0.07; // keeps dots and their halos off the edge

// Bounds of the twelve, rounded outward a little so nothing sits on the line.
const LAT_MIN = 5.2;
const LAT_MAX = 18.8;
const LNG_MIN = -89.6;
const LNG_MAX = -54.2;

function project(lat: number, lng: number) {
  const fx = (lng - LNG_MIN) / (LNG_MAX - LNG_MIN);
  const fy = 1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN);
  return {
    x: (PAD + fx * (1 - 2 * PAD)) * VIEW_W,
    y: (PAD + fy * (1 - 2 * PAD)) * VIEW_H,
  };
}

export default function CaribbeanMap({ countries }: { countries: MapCountry[] }) {
  const [originSlug, setOriginSlug] = useState("");
  const [activeSlug, setActiveSlug] = useState("");

  const points = useMemo(
    () => countries.map((c) => ({ ...c, ...project(c.lat, c.lng) })),
    [countries]
  );

  const origin = points.find((p) => p.slug === originSlug) ?? null;
  const active = points.find((p) => p.slug === activeSlug) ?? null;

  // The route only exists when it is a real journey between two places.
  const route = origin && active && origin.slug !== active.slug ? { from: origin, to: active } : null;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Where are you going?</h2>
          <p className="measure mt-2 text-navy/70">
            Pick a country to see what it asks for. Set where you are starting and the map draws the route.
          </p>
        </div>
        <div>
          <label htmlFor="map-origin" className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy/55">
            Starting from
          </label>
          <select
            id="map-origin"
            value={originSlug}
            onChange={(e) => setOriginSlug(e.target.value)}
            className="mt-2 rounded-xl border-[1.5px] border-navy/15 bg-white px-3.5 py-2.5 text-sm font-medium text-navy focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <option value="">Not set</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-navy">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Map of the twelve CARICOM countries, from Belize in the west to Suriname in the south east."
        >
          <defs>
            <radialGradient id="sea" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#14506a" />
              <stop offset="100%" stopColor="#0e2a3a" />
            </radialGradient>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} fill="url(#sea)" />

          {/* Graticule, every five degrees, so the projection is legible as a
              projection rather than as scattered dots. */}
          <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
            {[10, 15].map((lat) => {
              const { y } = project(lat, LNG_MIN);
              return <line key={`lat${lat}`} x1={0} y1={y} x2={VIEW_W} y2={y} />;
            })}
            {[-85, -80, -75, -70, -65, -60, -55].map((lng) => {
              const { x } = project(LAT_MIN, lng);
              return <line key={`lng${lng}`} x1={x} y1={0} x2={x} y2={VIEW_H} />;
            })}
          </g>

          {/* The route, drawn as an arc rather than a straight line, because a
              straight line between two islands reads as a border. */}
          {route ? (
            <g>
              <path
                d={arc(route.from, route.to)}
                fill="none"
                stroke="#5ec6c0"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 7"
                className="motion-safe:animate-[routeDash_1.2s_linear_infinite]"
              />
              <circle cx={route.from.x} cy={route.from.y} r="7" fill="none" stroke="#5ec6c0" strokeWidth="2" />
            </g>
          ) : null}

          {points.map((p) => {
            const isActive = p.slug === activeSlug;
            const isOrigin = p.slug === originSlug;
            return (
              <g key={p.slug} aria-hidden="true">
                {isActive ? <circle cx={p.x} cy={p.y} r="13" fill="#5ec6c0" fillOpacity="0.25" /> : null}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive || isOrigin ? 6 : 4.5}
                  fill={isActive ? "#ffffff" : isOrigin ? "#5ec6c0" : "#cfe3e8"}
                  stroke="#0e2a3a"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Only the active label is drawn, so nothing collides in the arc. */}
          {active ? (
            <text
              x={active.x + (active.x > VIEW_W * 0.72 ? -14 : 14)}
              y={active.y + 5}
              textAnchor={active.x > VIEW_W * 0.72 ? "end" : "start"}
              fill="#ffffff"
              fontSize="19"
              fontWeight="600"
            >
              {active.name}
            </text>
          ) : null}
        </svg>
      </div>

      {/* The real control. Horizontally scrollable on a phone, wrapping above. */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
        {countries.map((c) => {
          const isActive = c.slug === activeSlug;
          return (
            <button
              key={c.slug}
              type="button"
              aria-pressed={isActive}
              // Selects rather than toggles. Hovering already sets the active
              // country, so a toggle here would mean a mouse user hovers the
              // chip, clicks it, and watches their own selection switch off.
              onClick={() => setActiveSlug(c.slug)}
              onMouseEnter={() => setActiveSlug(c.slug)}
              onFocus={() => setActiveSlug(c.slug)}
              className={`shrink-0 rounded-full border-[1.5px] px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                isActive
                  ? "border-brand bg-brand text-white"
                  : "border-navy/15 bg-white text-navy hover:border-brand hover:text-brand"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Reserved height so selecting a country does not shunt the page. */}
      <div className="mt-5 min-h-[7.5rem]">
        {active ? (
          <div className="border-l-4 border-brand bg-brand-soft px-5 py-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-xl font-bold text-navy">{active.name}</h3>
              {active.freeMovement ? (
                <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">
                  Full free movement
                </span>
              ) : null}
            </div>
            <p className="measure mt-1.5 text-navy/80">{active.tagline}</p>
            <p className="mt-1.5 text-sm text-navy/70">
              {active.costLabel ? `From ${active.costLabel}.` : "Budget figures are on the country page."}
              {route ? ` Route shown from ${route.from.name}.` : ""}
            </p>
            <Link
              href={`/destinations/${active.slug}`}
              className="mt-3 inline-block text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand-dark"
            >
              Open the {active.name} guide
            </Link>
          </div>
        ) : (
          <p className="text-sm text-navy/60">Pick a country above to see what it asks for.</p>
        )}
      </div>
    </div>
  );
}

/** A shallow arc between two points, bowed away from the equator. */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular offset, capped so long routes do not balloon off the map.
  const lift = Math.min(len * 0.18, 70);
  const cx = mx + (-dy / len) * lift;
  const cy = my + (dx / len) * lift;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}
