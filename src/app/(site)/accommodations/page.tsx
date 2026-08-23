import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Accommodations & Stays in the Caribbean",
  description:
    "Hotels, Airbnb and short-stay apartments across the Caribbean and worldwide at the best available prices.",
  keywords: [
    "Caribbean accommodation",
    "hotels in Trinidad and Tobago",
    "where to stay when relocating to another Caribbean island",
    "temporary housing while relocating CARICOM",
  ],
  alternates: { canonical: "/accommodations" },
};

export default async function AccommodationsPage() {
  const service = await getService("accommodations");
  if (!service) notFound();

  return (
    <ServicePage
      service={service}
      ctaTitle="Bundle & save"
      ctaText="Book your stay together with your flight and transfers for a discounted, stress-free trip. All you have to do is pack."
    />
  );
}
