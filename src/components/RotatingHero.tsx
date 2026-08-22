"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type HeroPhoto = { src: string; place: string; alt: string; credit: string; creditUrl: string };

// A handful of CC-licensed shots from across the CARICOM countries we cover,
// reusing the same verified photos/credits as their destination pages.
export const HERO_PHOTOS: HeroPhoto[] = [
  {
    src: "/photos/hero.jpg",
    place: "Pigeon Point, Tobago",
    alt: "Pigeon Point, Tobago: a thatched-roof jetty over turquoise Caribbean water",
    credit: "Kp93, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pigeon_Point_beach.jpg",
  },
  {
    src: "/destinations/barbados.jpg",
    place: "Crane Beach, Barbados",
    alt: "Crane Beach, Barbados",
    credit: "Johnmartindavies, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Crane_Beach.JPG",
  },
  {
    src: "/destinations/grenada.jpg",
    place: "Grand Anse Beach, Grenada",
    alt: "Grand Anse Beach, Grenada",
    credit: "Varun Kapoor, CC BY 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Grand_Anse_Beach_Grenada.jpg",
  },
  {
    src: "/destinations/saint-lucia.jpg",
    place: "The Pitons, Saint Lucia",
    alt: "Gros Piton and Petit Piton, near Soufrière, Saint Lucia",
    credit: "Aneil Lutchman, CC BY-SA 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG",
  },
  {
    src: "/destinations/st-vincent-and-the-grenadines.jpg",
    place: "Tobago Cays, St. Vincent and the Grenadines",
    alt: "Aerial view of the Tobago Cays, St. Vincent and the Grenadines",
    credit: "Iain Grant, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TobagoCaysAerial.jpg",
  },
];

// Renders the first photo on the server (so there's no hydration mismatch),
// then swaps to a random one right after mount so repeat visits see variety.
export default function RotatingHero() {
  const [photo, setPhoto] = useState(HERO_PHOTOS[0]);

  useEffect(() => {
    setPhoto(HERO_PHOTOS[Math.floor(Math.random() * HERO_PHOTOS.length)]);
  }, []);

  return (
    <>
      <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
      <p className="absolute bottom-2 right-3 z-10 text-[11px] text-white/50">
        {photo.place} ·{" "}
        <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {photo.credit}
        </a>
      </p>
    </>
  );
}
