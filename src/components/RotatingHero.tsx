"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { currentIndependence } from "@/lib/independenceData";
import { HOME_HERO_PHOTOS, TT_HERO_PHOTOS, type HomeHeroPhoto } from "@/lib/sitePhotos";

// During a country's independence celebration the hero shows only that
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

// Renders the first photo on the server (so there's no hydration mismatch),
// then swaps to a random one right after mount so repeat visits see variety.
export default function RotatingHero() {
  const photos = activePhotos();
  const [photo, setPhoto] = useState(photos[0]);

  useEffect(() => {
    const set = activePhotos();
    setPhoto(set[Math.floor(Math.random() * set.length)]);
  }, []);

  return (
    <>
      <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
      {/* The photographer is credited on /credits, linked from the footer.
          The place name stays: it is what the photo is telling you. */}
      <p className="absolute bottom-2 right-3 z-10 text-[11px] text-white/70">{photo.place}</p>
    </>
  );
}
