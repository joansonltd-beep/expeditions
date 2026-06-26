"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Each slide is one site aspect. `emoji` + `anim` is the built-in animated
// tile; set `gif` to a path in /public to use a real GIF instead.
type Slide = { label: string; emoji: string; anim: string; gif?: string };

const SLIDES: Slide[] = [
  { label: "Flights", emoji: "✈️", anim: "anim-fly" },
  { label: "Stays", emoji: "🏡", anim: "anim-bob" },
  { label: "Transfers", emoji: "🚗", anim: "anim-drive" },
  { label: "Cruises", emoji: "🚢", anim: "anim-sail" },
  { label: "Visas", emoji: "🛂", anim: "anim-bob" },
  { label: "Finance", emoji: "💰", anim: "anim-coin" },
];

export default function HeroGallery() {
  const [i, setI] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true); // rotate out to the edge
      const t = setTimeout(() => {
        setI((p) => (p + 1) % SLIDES.length); // swap while edge-on (invisible)
        setFlipping(false); // rotate back in with the new tile
      }, 350);
      return () => clearTimeout(t);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const s = SLIDES[i];

  return (
    <div className="flip-scene flex min-h-[360px] items-center justify-center">
      <div
        className={`flip-card flex h-60 w-60 flex-col items-center justify-center gap-3 rounded-[28px] bg-white shadow-2xl ring-1 ring-slate-200 ${
          flipping ? "is-flipping" : ""
        }`}
      >
        {s.gif ? (
          <Image src={s.gif} alt={s.label} width={150} height={150} unoptimized className="h-32 w-32 object-contain" />
        ) : (
          <span className={`text-[5.5rem] leading-none ${s.anim}`}>{s.emoji}</span>
        )}
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">{s.label}</span>
      </div>
    </div>
  );
}
