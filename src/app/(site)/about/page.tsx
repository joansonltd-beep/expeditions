import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAbout, getSiteSettings } from "@/lib/siteData";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import ContentSections from "@/components/ContentSections";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Expeditions With Jo helps CARICOM citizens visit, work or study in another CARICOM country. Run by Joanson Baptiste James from Trinidad and Tobago, covering requirements, documents, travel and practical arrangements.",
  keywords: [
    "CARICOM mobility support",
    "CARICOM Skills Certificate help",
    "Treaty of Chaguaramas",
    "visit work or study in CARICOM",
    "Joanson Baptiste James",
    "Expeditions With Jo",
  ],
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSiteSettings()]);
  return (
    <>
      {/* St. George's behind, Jo in front. The page opens by saying he is
          Grenadian, so the header shows where that is. The Carenage rather
          than a beach: it is a working harbour and recognisably Grenada. */}
      <PageHeader
        title="About Us"
        intro={about.intro}
        crumb="About Us"
        photos={[
          {
            src: "/places/grenada/carenage.jpg",
            alt: "The Carenage, the horseshoe harbour at St. George's, Grenada",
            credit: "Ramakrishna Reddy Yekulla, CC BY-SA 3.0, via Wikimedia Commons",
            creditUrl: "https://commons.wikimedia.org/wiki/File:The_Carenage,_St_George's,_Grenada.jpg",
          },
        ]}
        image={
          <figure className="max-w-[210px] overflow-hidden rounded-lg bg-cream ring-1 ring-white/25 lg:ml-auto">
            <Image
              src="/photos/jo.jpg"
              alt="Joanson Baptiste James, who runs Expeditions With Jo"
              width={1200}
              height={1597}
              sizes="(min-width: 1024px) 280px, 60vw"
              className="h-auto w-full object-cover"
              priority
            />
            <figcaption className="px-4 py-3">
              <span className="block text-sm font-semibold text-navy">Joanson Baptiste James</span>
              <span className="block text-xs text-navy/65">Founder, Expeditions With Jo</span>
            </figcaption>
          </figure>
        }
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <ContentSections sections={about.sections} />

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-7">
            <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
            <ul className="mt-4 grid gap-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Icon name="message" className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-900 hover:text-brand"
                >
                  WhatsApp 868-723-6644
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-brand" />
                <a href="tel:+18687236644" className="font-medium text-slate-900 hover:text-brand">
                  Call 868-723-6644
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${settings.generalEmail}`} className="font-medium text-slate-900 hover:text-brand">
                  {settings.generalEmail}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              We aim to reply within one business day. Full payment, cancellation and refund terms, along with our
              privacy policy, are on the{" "}
              <Link href="/policies" className="font-semibold text-brand hover:underline">
                Policies page
              </Link>
              .
            </p>
          </div>

          <div className="mt-8">
            <CtaButtons message="Hi Jo, I'd like some help." />
          </div>
        </div>
      </Section>
    </>
  );
}
