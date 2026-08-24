import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, type HeroPhoto } from "@/components/ui";
import { Icon, pillarIcon } from "@/components/icons";

const BUSINESS_CENTER_PHOTOS: HeroPhoto[] = [
  {
    src: "/photos/heroes/port-of-spain.jpg",
    alt: "West Port of Spain and downtown, Trinidad and Tobago",
    credit: "Christianwelsh, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Port_of_Spain_Trinidad.jpg",
  },
  {
    src: "/photos/heroes/business/kingston.jpg",
    alt: "New Kingston, Jamaica's business district",
    credit: "Wolmadrian, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:New_Kingston,_Jamaica_II.JPG",
  },
  {
    src: "/photos/heroes/business/bridgetown.jpg",
    alt: "Bridgetown, Barbados, with the Central Bank of Barbados",
    credit: "Acp~commonswiki, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Bridgetown2.jpg",
  },
  {
    src: "/photos/heroes/business/georgetown.jpg",
    alt: "Georgetown City Hall, Georgetown, Guyana",
    credit: "Dan Sloan, CC BY-SA 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:City_Hall_-_Georgetown,_Guyana_(22872153024).jpg",
  },
  {
    src: "/photos/heroes/business/castries.jpg",
    alt: "Castries, the capital and business hub of Saint Lucia",
    credit: "Luboš Holič, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Castries_City,_Saint_Lucia_-_panoramio.jpg",
  },
  {
    src: "/photos/heroes/business/st-georges.jpg",
    alt: "The Carenage, St. George's, Grenada",
    credit: "Ramakrishna Reddy Yekulla, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:The_Carenage,_St_George's,_Grenada.jpg",
  },
  {
    src: "/photos/heroes/business/st-johns.jpg",
    alt: "Port of St. John's, Antigua and Barbuda",
    credit: "Matt H. Wade, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Port_of_St._Johns_Antigua.jpg",
  },
  {
    src: "/photos/heroes/business/basseterre.jpg",
    alt: "The Berkeley Memorial at The Circus, Basseterre, St. Kitts",
    credit: "P. Hughes, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Basseterre_-_Memorial_Clocktower.jpg",
  },
  {
    src: "/photos/heroes/business/roseau.jpg",
    alt: "The Bayfront, Roseau, Dominica",
    credit: "giggel, CC BY 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Dominica,_Karibik_-_Universal_Elegance-The_Muslim_Store_-_Bayfront_-_panoramio.jpg",
  },
  {
    src: "/photos/heroes/business/kingstown.jpg",
    alt: "Kingstown, the capital and commercial centre of St. Vincent and the Grenadines",
    credit: "ctsnow, CC BY 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Kingstown_Saint_Vincent.jpg",
  },
  {
    src: "/photos/heroes/business/belize-city.jpg",
    alt: "Belize City Hall, Belize City, Belize",
    credit: "Padraic Ryan, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Belize_City_Hall.jpg",
  },
  {
    src: "/places/suriname/paramaribo-waterkant.jpg",
    alt: "Waterkant, Paramaribo, Suriname",
    credit: "Rafaeljantz, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Waterkant_Paramaribo_with_the_Unesco_Heritage_Buildings.jpg",
  },
];

export const metadata: Metadata = {
  title: "Go Work: Relocating Within CARICOM",
  description:
    "Everything you need to set up your move within CARICOM: the CSME Skills Certificate, registering a business, opening a bank account, insurance, and step-by-step guides.",
  keywords: [
    "how to move to CARICOM",
    "CSME Skills Certificate",
    "CARICOM business setup",
    "CARICOM banking",
    "moving to another CARICOM country checklist",
  ],
  alternates: { canonical: "/getting-started" },
};

const EMPLOYMENT_ITEMS = [
  {
    href: "/caricom-skills-certificate",
    title: "CSME Skills Certificate",
    text: "Country-by-country guidance to the certificate that lets CARICOM nationals live and work on another member state.",
  },
  {
    href: "/finance",
    title: "Personal Banking",
    text: "Open a personal bank account on your new island, plus prepare loan and credit card applications.",
  },
];

const SELF_EMPLOYED_ITEMS = [
  {
    href: "/business-setup",
    title: "Business Setup",
    text: "Register your business under CARICOM's Right of Establishment, from name search to a ready-to-use business bank account.",
  },
  {
    href: "/finance#business",
    title: "Business Banking",
    text: "What banks in Trinidad and Tobago, Jamaica and Grenada actually ask for to open a business account, verified from their own pages.",
  },
];

const OTHER_ITEMS = [
  {
    href: "/guides",
    title: "General Guides",
    text: "Plain-language guides to certificates, documents, and getting settled.",
  },
  {
    href: "/insurance",
    title: "Insurance",
    text: "Life, health and retirement planning, now handled through our partner site, joansonbjames.com.",
  },
];

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="compass" className="h-7 w-7 text-brand" />}
        title="Go Work"
        crumb="Go Work"
        intro="Ready to relocate? Everything you need to set up your move within CARICOM, in one place."
        photos={BUSINESS_CENTER_PHOTOS}
      />
      <Section>
        <SectionHead
          eyebrow="Taking a job"
          title="Regular employment"
          intro="Got a job lined up on another island, or hunting for one? This is what turns the offer into an actual move."
          center={false}
        />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {EMPLOYMENT_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={pillarIcon(item.href)} className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="Working for yourself"
          title="Self-employed & business owners"
          intro="Setting up your own business instead of taking a job? A different right, and a different set of paperwork, applies."
          center={false}
        />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {SELF_EMPLOYED_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={pillarIcon(item.href)} className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Also useful" title="More resources" center={false} />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {OTHER_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={pillarIcon(item.href)} className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
