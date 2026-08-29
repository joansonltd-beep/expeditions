import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList } from "@/components/ui";
import { Icon } from "@/components/icons";
import PricingBlock from "@/components/PricingBlock";
import { VISIT_PRICING } from "@/lib/journeyPricing";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "Go Visit: Visiting Another CARICOM Country",
  description:
    "Planning a visit to another CARICOM country? We help you understand the travel requirements, arrange flights, accommodation and transfers, and prepare for arrival.",
  keywords: [
    "visit another CARICOM country",
    "travel within CARICOM",
    "flights to the Caribbean",
    "airport transfers Trinidad",
    "Caribbean accommodations",
    "trip to Trinidad",
  ],
  alternates: { canonical: "/getting-there" },
};

const ITEMS = [
  {
    href: "/flights",
    icon: "plane" as const,
    title: "Flights",
    text: "One-way or round-trip options for a holiday, a family visit or a business trip.",
  },
  {
    href: "/accommodations",
    icon: "home" as const,
    title: "Accommodation",
    text: "Comfortable, safe places to stay for however long your trip runs.",
  },
  {
    href: "/transfers",
    icon: "car" as const,
    title: "Transfers",
    text: "Reliable rides from the airport and for getting around while you're visiting.",
  },
];

const WHO_FOR = [
  "CARICOM nationals taking a holiday somewhere else in the region",
  "Anyone visiting family or attending a wedding, funeral or reunion",
  "Business travellers heading to another member state for a short trip",
  "People making a scouting trip before committing to work or study abroad",
  "Travellers who want the arrangements handled rather than pieced together themselves",
];

const INCLUDED = [
  "Explaining what your destination asks of visitors from your country",
  "Flights matched to your dates and budget, booked and confirmed",
  "Accommodation chosen for the area and the length of your stay",
  "Airport transfers so there is a driver waiting rather than a taxi queue",
  "An itinerary with your confirmations in one place",
  "WhatsApp support before and during the trip",
];

const YOU_PROVIDE = [
  "A valid passport or accepted travel document, with enough validity left for your trip",
  "Names exactly as they appear on the documents being travelled on",
  "Your dates, destination and budget",
  "Any visa or entry permission your nationality requires for that country",
];

const NOT_CONTROLLED = [
  "Whether you are admitted at the border, and for how long. That is the immigration officer's decision on the day.",
  "Entry requirements, which are set by each country and can change without notice.",
  "Airline fares, schedules, delays and cancellations.",
  "Property standards and the cancellation terms of hotels and booking platforms.",
];

const FAQS = [
  {
    q: "Do CARICOM nationals need a visa to visit another CARICOM country?",
    a: "In many cases no, and CARICOM nationals often receive an automatic stay of up to six months on arrival in member states. It still depends on your nationality, your destination and your purpose, and it is not the same thing as permission to work or study. Tell us your passport and destination and we will point you to what applies.",
  },
  {
    q: "How is visiting different from working or studying there?",
    a: "Visiting is a short stay for tourism, family or business. Working in another member state generally involves the CARICOM Skills Certificate, and studying requires that country's own student visa or permit. They are separate processes with separate requirements, which is why we treat them as separate journeys.",
  },
  {
    q: "Can I look for work while visiting?",
    a: "Entering as a visitor does not give you the right to take up employment. If work is the goal, start with the Go Work pathway and the Skills Certificate rather than travelling first and sorting it out later.",
  },
  {
    q: "Do you book trips outside CARICOM?",
    a: "Flights, accommodation and transfers can be arranged worldwide. The requirements guidance is focused on CARICOM, which is where we know the detail.",
  },
  {
    q: "How far ahead should I get in touch?",
    a: "The earlier the better for fares and availability, particularly around Carnival, Christmas and the summer. That said, we handle short-notice trips too, so ask either way.",
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

export default function GettingTherePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<Icon name="plane" className="h-7 w-7 text-brand" />}
        title="Go Visit"
        crumb="Go Visit"
        intro="Planning a trip to another CARICOM country? We help you understand what your destination asks of visitors, arrange the flights, stay and transfers, and get you ready for arrival."
        footnote="Visiting, working and studying are three different processes with three different sets of requirements. This page covers visiting."
        photos={[
          {
            src: "/photos/hero.jpg",
            alt: "Pigeon Point, Tobago: a thatched-roof jetty over turquoise Caribbean water",
            credit: "Kp93, CC BY-SA 3.0, via Wikimedia Commons",
            creditUrl: "https://commons.wikimedia.org/wiki/File:Pigeon_Point_beach.jpg",
          },
        ]}
      />

      <Section>
        <SectionHead
          eyebrow="What we arrange"
          title="The practical parts of your visit"
          intro="Use as many or as few as you need."
        />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">See what is involved →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="mx-auto grid max-w-3xl gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Who this is for</h2>
            <CheckList items={WHO_FOR} className="mt-4" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">What is included</h2>
            <CheckList items={INCLUDED} className="mt-4" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">What you provide</h2>
            <CheckList items={YOU_PROVIDE} className="mt-4" />
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
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">From enquiry to arrival</h2>
          <ol className="mt-6 grid gap-4">
            {[
              "Tell us your destination, your dates and who is travelling.",
              "We confirm what your destination requires of visitors on your passport.",
              "We come back with flight, stay and transfer options, with prices.",
              "You choose, we book, and you get your confirmations.",
              "We stay reachable on WhatsApp while you travel.",
            ].map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-1 text-slate-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <PricingBlock pricing={VISIT_PRICING} />

      <Section alt>
        <SectionHead eyebrow="FAQ" title="Common questions about visiting" />
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

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Plan my visit</h2>
          <p className="mt-3 text-slate-600">
            Tell us where you want to go and when, and we will come back with what it involves and what it costs.
          </p>
          <div className="mt-6">
            <CtaButtons message="Hi Jo, I'd like help visiting another CARICOM country." />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Entry to any country is decided by its immigration authority at the border. A booking is not permission to
            enter. Thinking about working or studying instead?{" "}
            <Link href="/getting-started" className="font-semibold text-brand hover:underline">
              Go Work
            </Link>{" "}
            and{" "}
            <Link href="/study" className="font-semibold text-brand hover:underline">
              Go Study
            </Link>{" "}
            cover those.
          </p>
        </div>
      </Section>
    </>
  );
}
