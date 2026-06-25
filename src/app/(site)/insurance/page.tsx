import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = { title: "Insurance" };

export default async function InsurancePage() {
  const service = await getService("insurance");
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      ctaTitle="Book your free consultation"
      ctaText="Send us a message and we will set up a time that works for you. No pressure, no obligation."
    />
  );
}
