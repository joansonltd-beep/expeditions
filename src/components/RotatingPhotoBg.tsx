"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type HeroPhoto = { src: string; alt: string; credit?: string; creditUrl?: string };

// Full-bleed background for PageHeader's photo mode. Cycles through the
// given photos every intervalMs when there's more than one; a single photo
// just renders statically. Always declares itself as a photo hero so the
// header can go transparent over it.
export default function RotatingPhotoBg({ photos, intervalMs = 6000 }: { photos: HeroPhoto[]; intervalMs?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % photos.length), intervalMs);
    return () => clearInterval(id);
  }, [photos.length, intervalMs]);

  const photo = photos[i];
  if (!photo) return null;

  return (
    <>
      <Image key={photo.src} src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
      {photo.credit ? (
        <p className="absolute bottom-2 right-3 z-10 text-[11px] text-white/50">
          {photo.creditUrl ? (
            <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {photo.credit}
            </a>
          ) : (
            photo.credit
          )}
        </p>
      ) : null}
    </>
  );
}
