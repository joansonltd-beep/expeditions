import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = { title: "Travel Visas" };

export default async function TravelVisasPage() {
  const service = await getService("travel-visas");
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      ctaTitle="Need to travel for your appointment?"
      ctaText="We can also sort your flights, a place to stay, and airport transfers while you are in Trinidad."
    />
  );
}
