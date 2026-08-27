import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Floats from "@/components/Floats";
import SocialLinks from "@/components/SocialLinks";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { HeaderThemeProvider } from "@/components/HeaderTheme";
import { getSiteSettings } from "@/lib/siteData";
import { SITE_URL } from "@/lib/siteUrl";

type FooterLink = { href: string; label: string; title?: string };

// The three journeys the site is built around, plus the reference pages that
// support them. The header is a fixed sentence and never changes, so the footer
// is where everything else stays reachable.
const journeyLinks: FooterLink[] = [
  { href: "/getting-there", label: "Go Visit", title: "Visiting another CARICOM country" },
  { href: "/getting-started", label: "Go Work", title: "Working in another CARICOM country" },
  { href: "/study", label: "Go Study", title: "Studying in another CARICOM country" },
  { href: "/caricom-skills-certificate", label: "CARICOM Skills Certificate" },
  { href: "/destinations", label: "Country Guides" },
  { href: "/guides", label: "General Guides" },
  { href: "/survey", label: "Reports", title: "Salaries, Rent and Utilities" },
];
const companyLinks: FooterLink[] = [
  { href: "/flights", label: "Flights" },
  { href: "/accommodations", label: "Accommodation" },
  { href: "/transfers", label: "Transfers" },
  { href: "/travel-visas", label: "Travel Visas" },
  { href: "/finance", label: "Banking" },
  { href: "/business-setup", label: "Business Setup" },
  { href: "/insurance", label: "Insurance" },
  { href: "/about", label: "About Us" },
  { href: "/policies", label: "Policies" },
];

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "TravelAgency"],
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
      { "@type": "Place", name: "CARICOM" },
      { "@type": "Place", name: "Caribbean" },
      ...[
        "Trinidad and Tobago",
        "Grenada",
        "Jamaica",
        "Barbados",
        "Guyana",
        "Saint Lucia",
        "St. Vincent and the Grenadines",
        "Antigua and Barbuda",
        "St. Kitts and Nevis",
        "Dominica",
        "Belize",
        "Suriname",
      ].map((name) => ({ "@type": "Country", name })),
      "Worldwide",
    ],
    knowsAbout: [
      "Visiting another CARICOM country",
      "Working in another CARICOM country",
      "Studying in another CARICOM country",
      "CARICOM Skills Certificate applications",
      "CARICOM free movement of skilled nationals",
      "Working in another Caribbean country without a work permit",
      "Student visa and permit requirements across CARICOM",
      "Jobs and employment across CARICOM",
      "CARICOM Right of Establishment",
      "Business registration in Trinidad and Tobago",
      "Bank account opening across CARICOM",
      "Flight, accommodation and airport transfer booking",
      "Canadian visa applications from Trinidad",
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
      <HeaderThemeProvider>
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
          <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
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
              <h4 className="mb-3.5 text-sm font-semibold text-white">Visit, Work &amp; Study</h4>
              <ul className="grid gap-2.5 text-sm">
                {journeyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} title={l.title} className="text-slate-300 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3.5 text-sm font-semibold text-white">Services &amp; Company</h4>
              <ul className="grid gap-2.5 text-sm">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} title={l.title} className="text-slate-300 hover:text-white">
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
            <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-2 px-5 py-6 text-xs text-slate-500">
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
      </HeaderThemeProvider>
    </SiteSettingsProvider>
  );
}
