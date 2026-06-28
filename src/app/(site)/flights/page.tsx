import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Book Flights",
  description:
    "Book affordable, reliable flights worldwide with your Trinidad and Tobago travel agent. One-way or round-trip, baggage help, itinerary planning and support before and during your trip.",
};

export default async function FlightsPage() {
  const service = await getService("flights");
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      ctaTitle="Bundle & save"
      ctaText="Book your flight together with accommodation and ground transportation and enjoy a smooth, discounted travel experience."
    />
  );
}
