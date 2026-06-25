import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, getStay } from "@/lib/siteData";
import ServicePage from "@/components/ServicePage";
import { Section, Eyebrow, CheckList } from "@/components/ui";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = { title: "Accommodations" };

export default async function AccommodationsPage() {
  const [service, stay] = await Promise.all([getService("accommodations"), getStay()]);
  if (!service) notFound();

  return (
    <ServicePage
      service={service}
      ctaTitle="Bundle & save"
      ctaText="Book your stay together with your flight and transfers for a discounted, stress-free trip. All you have to do is pack."
    >
      <Section alt>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>{stay.tagline}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{stay.name}</h2>
            <p className="mt-3 text-slate-600">{stay.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {stay.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand">
                  {t}
                </span>
              ))}
            </div>
            <CheckList items={stay.features} className="mt-5" />
            <div className="mt-6">
              <CtaButtons message="Hi Jo, I'd like to book A Likkle Rest by Jo." />
            </div>
          </div>
          <div className="grid min-h-[320px] place-items-center rounded-3xl bg-gradient-to-br from-cyan-700 to-brand text-[4rem] text-white shadow-xl">
            🏡
          </div>
        </div>
      </Section>
    </ServicePage>
  );
}
