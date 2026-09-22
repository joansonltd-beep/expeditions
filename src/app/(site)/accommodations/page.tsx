import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getService } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";
import { Section } from "@/components/ui";

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
    >
      {/* Passed as children rather than written into Sanity, so a content edit
          cannot quietly drop a factual claim about a platform status. */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
            Booked by a Superhost
          </h2>
          <p className="mt-3 text-navy/75">
            Joanson hosts on Airbnb in Jamaica and holds Superhost status, which the platform grants on guest rating,
            response rate, cancellations and completed stays. Knowing what separates a place that photographs well
            from a place that is actually good to stay in is the job, and it is easier having done it from the
            host&rsquo;s side.
          </p>
          <p className="mt-4 text-navy/75">
            Own a property in Jamaica yourself?{" "}
            <Link href="/property-management" className="font-semibold text-brand hover:underline">
              We manage Airbnb rentals for owners
            </Link>
            .
          </p>
        </div>
      </Section>
    </ServicePage>
  );
}
