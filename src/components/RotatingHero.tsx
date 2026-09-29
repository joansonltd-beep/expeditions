"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { currentIndependence } from "@/lib/independenceData";
import { HOME_HERO_PHOTOS, TT_HERO_PHOTOS, type HomeHeroPhoto } from "@/lib/sitePhotos";

// During a country’s independence celebration the hero shows only that
// country. Add a country here alongside its FLAG_THEMES entry to give it the
// same treatment. The photos themselves live in sitePhotos.ts, so /credits is
// built from the same list the hero shows.
const NATIONAL_HERO_PHOTOS: Record<string, HomeHeroPhoto[]> = {
  "trinidad-and-tobago": TT_HERO_PHOTOS,
};

// The set to rotate through right now. Date-driven, so it reverts to the
// region-wide photos on its own once the celebration window closes.
function activePhotos(): HomeHeroPhoto[] {
  const slug = currentIndependence()?.day.slug;
  return (slug && NATIONAL_HERO_PHOTOS[slug]) || HOME_HERO_PHOTOS;
}

// How long each photograph holds before the next one. Matches the interval
// PageHeader’s photo mode uses, so the homepage and the inner pages move at
// the same pace.
const ROTATE_MS = 4000;

// Renders the first photo on the server (so there’s no hydration mismatch),
// then after mount jumps to a random one and cycles from there, so a repeat
// visit does not always open on the same photograph.
//
// The cut is hard rather than a crossfade. That is what PageHeader already
// does, and two different transition styles for the same idea reads as a bug.
export default function RotatingHero() {
  const photos = activePhotos();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    setI(Math.floor(Math.random() * photos.length));
    // Someone who has asked their system to stop moving things gets the one
    // photograph and no cycling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % photos.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  const photo = photos[i] ?? photos[0];

  return (
    <>
      <Image
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        fill
        priority={i === 0}
        sizes="100vw"
        className="object-cover"
      />
      {/* The photographer is credited on /credits, linked from the footer.
          The place name stays: it is what the photo is telling you. */}
      <p className="absolute bottom-2 right-3 z-10 text-[11px] text-white/70">{photo.place}</p>
    </>
  );
}
