import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Floats from "@/components/Floats";
import SocialLinks from "@/components/SocialLinks";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { getSiteSettings } from "@/lib/siteData";
import { SITE_URL } from "@/lib/siteUrl";

const travelLinks = [
  { href: "/flights", label: "Flights" },
  { href: "/accommodations", label: "Accommodations" },
  { href: "/transfers", label: "Transfers" },
  { href: "/cruises", label: "Cruises" },
  { href: "/travel-visas", label: "Travel Visas" },
];
const companyLinks = [
  { href: "/insurance", label: "Insurance" },
  { href: "/finance", label: "Banking" },
  { href: "/about", label: "About Us" },
  { href: "/policies", label: "Policies" },
];

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#business`,
    name: settings.businessName,
    description: settings.footerBlurb,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    logo: `${SITE_URL}/icon.png`,
    telephone: `+${settings.whatsappNumber.replace(/\D/g, "")}`,
    email: settings.generalEmail,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressCountry: "TT", addressRegion: "Trinidad and Tobago" },
    areaServed: [
      { "@type": "Country", name: "Trinidad and Tobago" },
      { "@type": "Country", name: "Grenada" },
      { "@type": "Country", name: "Jamaica" },
      { "@type": "Place", name: "CARICOM" },
      "Worldwide",
    ],
    knowsAbout: [
      "Flight booking",
      "Hotel and accommodation booking",
      "Airport transfers",
      "Cruise planning",
      "Canadian visa applications from Trinidad",
      "Biometrics appointments in Port of Spain",
      "Business registration in Trinidad and Tobago",
    ],
    sameAs: [settings.facebookUrl, settings.instagramUrl].filter(Boolean),
  };

  return (
    <SiteSettingsProvider
      value={{
        whatsappNumber: settings.whatsappNumber,
        chatbotUrl: settings.chatbotUrl,
        generalEmail: settings.generalEmail,
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <div className="flex min-h-full flex-col">
        <Header businessName={settings.businessName} logoUrl={settings.logoUrl} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-300">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5 text-lg font-extrabold text-white">
                <Image src="/mark.png" alt="" width={36} height={36} className="h-9 w-9 object-contain brightness-0 invert" />
                {settings.businessName}
              </div>
              <p className="mt-4 max-w-xs text-sm text-slate-400">{settings.footerBlurb}</p>
              <SocialLinks settings={settings} className="mt-4" />
              <p className="mt-4 text-xs text-slate-500">{settings.paymentNote}</p>
            </div>

            <div>
              <h4 className="mb-3.5 text-sm font-semibold text-white">Travel</h4>
              <ul className="grid gap-2.5 text-sm">
                {travelLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-400 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3.5 text-sm font-semibold text-white">Company</h4>
              <ul className="grid gap-2.5 text-sm">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-400 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3.5 text-sm font-semibold text-white">Contact</h4>
              <ul className="grid gap-2.5 text-sm text-slate-400">
                <li>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    WhatsApp 868-723-6644
                  </a>
                </li>
                <li>
                  <a href="tel:+18687236644" className="hover:text-white">
                    Call 868-723-6644
                  </a>
                </li>
                <li>
                  <a href={`mailto:${settings.generalEmail}`} className="hover:text-white">
                    {settings.generalEmail}
                  </a>
                </li>
                {settings.chatbotUrl ? (
                  <li>
                    <a href={settings.chatbotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      Chat with us
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-6 text-xs text-slate-500">
              <span>
                © {year} {settings.businessName}. All rights reserved.
              </span>
              <Link href="/policies" className="hover:text-slate-300">
                Policies &amp; Privacy
              </Link>
            </div>
          </div>
        </footer>

        <Floats />
      </div>
    </SiteSettingsProvider>
  );
}
