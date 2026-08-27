import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Book Flights Across CARICOM",
  description:
    "Book affordable, reliable flights for visiting, working or studying in another CARICOM country, a scouting trip beforehand, or a visit home. Inter-island CARICOM routes, one-way or round-trip, baggage help, itinerary planning and support before and during your trip.",
  keywords: [
    "book flights Trinidad",
    "Caribbean flights",
    "flights for CARICOM relocation",
    "inter-island flights Caribbean",
    "CARICOM flights",
    "cheap flights from Trinidad and Tobago",
    "flights for moving to another CARICOM island",
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
