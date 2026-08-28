"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { currentIndependence } from "@/lib/independenceData";

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

// During a country's independence celebration the hero shows only that
// country. Same verified photos and credits as its destination page. Add a
// country here alongside its FLAG_THEMES entry to give it the same treatment.
const TT_HERO_PHOTOS: HeroPhoto[] = [
  {
    src: "/photos/hero.jpg",
    place: "Pigeon Point, Tobago",
    alt: "Pigeon Point, Tobago: a thatched-roof jetty over turquoise Caribbean water",
    credit: "Kp93, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pigeon_Point_beach.jpg",
  },
  {
    src: "/photos/heroes/port-of-spain.jpg",
    place: "Port of Spain, Trinidad",
    alt: "West Port of Spain and downtown, Trinidad and Tobago",
    credit: "Christianwelsh, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Port_of_Spain_Trinidad.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/caroni-scarlet-ibis.jpg",
    place: "Caroni Swamp, Trinidad",
    alt: "Scarlet ibis roosting at Caroni Swamp, Trinidad",
    credit: "Charles J. Sharp, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Scarlet_ibis_(Eudocimus_ruber)_roosting.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/queens-park-savannah.jpg",
    place: "Queen's Park Savannah, Port of Spain",
    alt: "Queen's Royal College, one of the Magnificent Seven mansions by Queen's Park Savannah, Port of Spain",
    credit: "Baldur Brückner, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TnT_PoS_M7-1_Queen's_Royal_College.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/buccoo-reef.jpg",
    place: "Buccoo Reef, Tobago",
    alt: "Shallow waters of the Buccoo Reef Complex, Tobago",
    credit: "WhatsupDarren, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Shallow_waters.jpg",
  },
  {
    src: "/places/trinidad-and-tobago/fort-george.jpg",
    place: "Fort George, Port of Spain",
    alt: "Fort George overlooking Port of Spain, Trinidad",
    credit: "John Cray, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Fort_George,_Port_of_Spain_view,_Trinidad_and_Tobago.jpg",
  },
];

const NATIONAL_HERO_PHOTOS: Record<string, HeroPhoto[]> = {
  "trinidad-and-tobago": TT_HERO_PHOTOS,
};

// The set to rotate through right now. Date-driven, so it reverts to the
// region-wide photos on its own once the celebration window closes.
function activePhotos(): HeroPhoto[] {
  const slug = currentIndependence()?.day.slug;
  return (slug && NATIONAL_HERO_PHOTOS[slug]) || HERO_PHOTOS;
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
      <p className="absolute bottom-2 right-3 z-10 text-[11px] text-white/50">
        {photo.place} ·{" "}
        <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {photo.credit}
        </a>
      </p>
    </>
  );
}
