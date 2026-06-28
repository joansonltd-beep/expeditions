import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Cruises",
  description:
    "Plan and book the perfect Caribbean or worldwide cruise with Expeditions With Jo. Honest advice on cruise lines and itineraries, first-time cruiser guidance, and full support before, during and after your trip.",
};

export default async function CruisesPage() {
  const service = await getService("cruises");
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      ctaTitle="Let us plan your cruise"
      ctaText="Tell us your dream destination and budget, and we will find the right sailing for you."
    />
  );
}
