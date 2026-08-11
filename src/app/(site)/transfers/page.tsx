import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";

// NOTE: this page is currently unreachable. next.config.ts redirects /transfers
// to the Welcome Pickups booking site, so nothing below is ever rendered and
// /transfers is deliberately kept out of the sitemap. Kept in place so the page
// can be restored by removing that redirect.
export const metadata: Metadata = { title: "Airport Transfers" };

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
