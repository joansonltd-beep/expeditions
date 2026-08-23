"use client";

import { useDeclarePhotoHero } from "@/components/HeaderTheme";

// Renders nothing; just tells Header a full-bleed dark photo sits behind it
// for as long as this is mounted, so the header can go transparent over it.
export default function PhotoHeroDeclare() {
  useDeclarePhotoHero();
  return null;
}
