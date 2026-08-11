import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Book Flights | Caribbean Travel Agent",
  description:
    "Book affordable, reliable flights across the Caribbean and worldwide with your Trinidad and Tobago travel agent. Inter-island CARICOM routes, one-way or round-trip, baggage help, itinerary planning and support before and during your trip.",
  keywords: [
    "book flights Trinidad",
    "Caribbean flights",
    "Caribbean travel agent",
    "inter-island flights Caribbean",
    "CARICOM flights",
    "cheap flights from Trinidad and Tobago",
    "travel agent Trinidad and Tobago",
  ],
  alternates: { canonical: "/flights" },
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
