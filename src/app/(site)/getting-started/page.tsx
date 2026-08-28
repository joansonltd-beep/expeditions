import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList, btnPrimary, type HeroPhoto } from "@/components/ui";
import { Icon } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import WeHandleIt from "@/components/WeHandleIt";
import JobOfferEnquiry from "@/components/JobOfferEnquiry";
import JobSeekerEnquiry from "@/components/JobSeekerEnquiry";

const BUSINESS_CENTER_PHOTOS: HeroPhoto[] = [
  {
    src: "/photos/heroes/port-of-spain.jpg",
    alt: "West Port of Spain and downtown, Trinidad and Tobago",
    credit: "Christianwelsh, public domain, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Port_of_Spain_Trinidad.jpg",
  },
  {
    src: "/photos/heroes/business/kingston.jpg",
    alt: "International Seabed Authority headquarters, New Kingston, Jamaica",
    credit: "James A.R. McFarlane, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:ISA_Headquaters.jpg",
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
  title: "Go Work: Working in Another CARICOM Country",
  description:
    "What it takes to work in another CARICOM country: the CARICOM Skills Certificate pathway, the documents each country asks for, business setup for the self-employed, banking, and the travel around it.",
  keywords: [
    "work in another CARICOM country",
    "CARICOM Skills Certificate",
    "CSME Skills Certificate",
    "jobs in the Caribbean",
    "CARICOM business setup",
    "CARICOM banking",
    "work in CARICOM without a work permit",
  ],
  alternates: { canonical: "/getting-started" },
};

const WHO_FOR = [
  "CARICOM nationals with a job offer in another member state",
  "People looking for work in the region before they have an offer",
  "Skilled workers checking whether they fall into one of the approved categories",
  "Self-employed people and business owners setting up in another member state",
  "Anyone who has been told to 'get a Skills Certificate' and is not sure what that means",
];

const WE_HELP = [
  "Working out which approved category fits your qualification",
  "Explaining what your country's office asks for, and in what order",
  "Checking your documents against the published requirements before you submit",
  "Registering a business and preparing what a business bank account needs",
  "Opening a personal or business bank account once you arrive",
  "Flights, accommodation and transfers for the application trip and the move itself",
];

const NOT_CONTROLLED = [
  "Whether a Skills Certificate is issued. That is the designated government office's decision.",
  "Whether an employer hires you, and on what terms.",
  "Whether immigration admits you and grants an indefinite stay.",
  "Whether a bank opens an account or approves a loan.",
  "Processing times, fees and requirements, all set by the authorities and subject to change.",
];

const FAQS = [
  {
    q: "Do I need a CARICOM Skills Certificate to work in another member state?",
    a: "Usually yes, if you are moving as an employee. It is what lets an eligible skilled CARICOM national work in another participating member state without a work permit. Nationals of Barbados, Belize, Dominica and St. Vincent and the Grenadines can live and work among those four countries without one, following the full free movement that began on 1 October 2025.",
  },
  {
    q: "Can you guarantee I will get a certificate or a job?",
    a: "No. The certificate is issued or refused by a government office, and hiring is the employer's decision. We help you understand the process, prepare properly and handle the practical arrangements. Nobody outside those bodies can promise you an outcome.",
  },
  {
    q: "Do I need a job offer before applying for a Skills Certificate?",
    a: "Generally no. The certificate recognises your qualification rather than a particular job, and you can apply in your home country or your destination country. Confirm the position with the office you are applying to, since practice differs.",
  },
  {
    q: "What if I am self-employed rather than taking a job?",
    a: "A different route applies. CARICOM's Right of Establishment covers setting up a business in another member state, and the paperwork is business registration rather than a Skills Certificate. Our business setup pages cover it.",
  },
  {
    q: "Can my family come with me?",
    a: "A Skills Certificate holder's spouse and dependants generally gain the same rights to live and work in the receiving country. The receiving country still applies its own rules, so confirm before you make plans around it.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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
    title: "CARICOM Move Basics",
    text: "Free, plain-language guides to certificates, documents and the practical steps involved.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<Icon name="compass" className="h-7 w-7 text-brand" />}
        title="Go Work"
        crumb="Go Work"
        intro="Working in another CARICOM country starts with the CARICOM Skills Certificate, or with business registration if you are setting up for yourself. Here is what each route involves and where we can help."
        footnote="Free movement of skills covers work. Visiting and studying are separate processes with their own requirements."
        photos={BUSINESS_CENTER_PHOTOS}
      />

      {/* THE CERTIFICATE FIRST — the thing most people are actually here for */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border border-brand/30 bg-brand-soft p-8">
          <h2 className="text-2xl font-bold text-slate-900">Start with the Skills Certificate</h2>
          <p className="mt-3 text-slate-700">
            For most people taking a job in another member state, this is the document that makes it possible. Our guide
            sets out who can apply, the documents each country asks for, the exact office to apply to, the fees where
            they are published, and what happens after you submit.
          </p>
          <Link href="/caricom-skills-certificate" className={`${btnPrimary} mt-6`}>
            Read the Skills Certificate guide
          </Link>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <WeHandleIt what="the Skills Certificate and the paperwork around your move" />
        </div>
      </Section>

      <Section alt>
        <div className="mx-auto grid max-w-3xl gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Who this is for</h2>
            <CheckList items={WHO_FOR} className="mt-4" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">What we help with</h2>
            <CheckList items={WE_HELP} className="mt-4" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">What we do not control</h2>
            <ul className="mt-4 grid gap-2.5">
              {NOT_CONTROLLED.map((item) => (
                <li key={item} className="relative pl-6 text-slate-600">
                  <span aria-hidden="true" className="absolute left-0 top-0 text-accent">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Taking a job"
          title="Regular employment"
          intro="Got a job lined up on another island, or hunting for one? Fill this in to find out what you need to turn the offer into an actual move."
          center={false}
        />
        <div className="mx-auto mb-14 max-w-2xl">
          <JobOfferEnquiry />
        </div>
        <div className="mx-auto grid max-w-4xl gap-6">
          {EMPLOYMENT_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block border-b border-slate-200 pb-6 last:border-0 last:pb-0"
            >
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-brand">{item.title}</h2>
              <p className="mt-2 max-w-2xl text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">See what is involved →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="Job seekers"
          title="Looking for work in another CARICOM country?"
          intro="Tell us what you're looking for and we'll be in touch about openings that match, no need to have an offer lined up first."
          center={false}
        />
        <div className="mx-auto max-w-2xl">
          <JobSeekerEnquiry />
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Working for yourself"
          title="Self-employed & business owners"
          intro="Setting up your own business instead of taking a job? A different right, and a different set of paperwork, applies."
          center={false}
        />
        <div className="mx-auto grid max-w-4xl gap-6">
          {SELF_EMPLOYED_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block border-b border-slate-200 pb-6 last:border-0 last:pb-0"
            >
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-brand">{item.title}</h2>
              <p className="mt-2 max-w-2xl text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">See what is involved →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHead eyebrow="Also useful" title="More resources" center={false} />
        <div className="mx-auto grid max-w-4xl gap-6">
          {OTHER_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block border-b border-slate-200 pb-6 last:border-0 last:pb-0"
            >
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-brand">{item.title}</h2>
              <p className="mt-2 max-w-2xl text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">See what is involved →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="FAQ" title="Common questions about working in CARICOM" />
        <div className="mx-auto grid max-w-3xl gap-4">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-6">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                <span className="flex items-start justify-between gap-4">
                  {f.q}
                  <span aria-hidden="true" className="mt-1 shrink-0 text-brand transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Explore the work pathway</h2>
          <p className="mt-3 text-slate-600">
            Tell us your qualification, where you are now and where you want to work. We will go through what that
            country asks for and what your next step is.
          </p>
          <div className="mt-6">
            <CtaButtons message="Hi Jo, I'd like help working in another CARICOM country." />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Skills Certificates are issued by government offices, and hiring decisions belong to employers. We help you
            prepare for both and arrange the travel around them.
          </p>
        </div>
      </Section>
    </>
  );
}
