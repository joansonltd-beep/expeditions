import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = { title: "Cruises" };

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
