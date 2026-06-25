import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = { title: "Transfers" };

export default async function TransfersPage() {
  const service = await getService("transfers");
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      ctaTitle="Travel with confidence, wherever you go"
      ctaText="Add a transfer to your flight and stay for a complete, discounted travel package."
    />
  );
}
