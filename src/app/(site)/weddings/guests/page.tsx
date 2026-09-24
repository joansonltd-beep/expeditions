import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList, btnGhost } from "@/components/ui";
import { Icon } from "@/components/icons";
import ConsultationCtaBlock from "@/components/ConsultationCtaBlock";
import BookingPriceDisclaimer from "@/components/BookingPriceDisclaimer";
import { GUEST_HERO_PHOTOS as HERO_PHOTOS } from "@/lib/sitePhotos";
import PageIssueNote from "@/components/PageIssueNote";

export const metadata: Metadata = {
  title: "Wedding Guest Travel",
  description:
    "Invited to a wedding in another CARICOM country? Flights from your nearest airport, the room block and its deadline, and what to have ready at immigration, without forty people planning it forty different ways.",
  keywords: [
    "wedding guest travel Caribbean",
    "group flights for a wedding",
    "wedding room block Caribbean",
    "travelling to a wedding in CARICOM",
    "group travel Trinidad Jamaica Barbados Guyana",
  ],
  alternates: { canonical: "/weddings/guests" },
};


// The airports guests most often leave from. Codes are included because they
// are what people see on a booking screen, and because "Kingston" and
// "Montego Bay" being two different answers surprises guests every time.
const DEPARTURES: { city: string; code: string; note: string }[] = [
  { city: "Port of Spain, Trinidad", code: "POS", note: "Piarco. The busiest departure point in the southern Caribbean." },
  { city: "Kingston, Jamaica", code: "KIN", note: "Norman Manley. Check which one your ticket says before you drive." },
  { city: "Montego Bay, Jamaica", code: "MBJ", note: "Sangster. Often the cheaper of the two, and four hours from Kingston." },
  { city: "Bridgetown, Barbados", code: "BGI", note: "Grantley Adams. The best-connected hub in the Eastern Caribbean." },
  { city: "Georgetown, Guyana", code: "GEO", note: "Cheddi Jagan. Allow for the drive out to Timehri." },
  { city: "St. George’s, Grenada", code: "GND", note: "Maurice Bishop." },
  { city: "Castries, Saint Lucia", code: "SLU / UVF", note: "Two airports. UVF is the long-haul one and is well south of the capital." },
  { city: "St. John’s, Antigua", code: "ANU", note: "V.C. Bird. A common connecting point for the smaller islands." },
];

const GUEST_HELP = [
  "Flights from your nearest airport, not just the one the couple flew from",
  "The room block, the rate and the date it is released",
  "Connections that actually work, including the ones that need an overnight",
  "Airport transfers, so nobody lands at 11pm and starts negotiating with a taxi",
  "What to have ready at immigration, and what a CARICOM passport does and does not get you",
  "Travelling with children, a wheelchair, or anything that needs arranging in advance",
];

const COUPLE_HELP = [
  "One room block, negotiated as a group rather than forty separate bookings",
  "A single travel page you send to everyone, so you stop answering the same question",
  "Guests grouped by departure city, so people travelling together actually travel together",
  "A booking deadline everyone knows about before the rate goes",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does it cost me anything to book through Jo?",
    a: "No more than booking it yourself.* You pay the fare and the room rate. Where a group booking gets a better rate than the public one, that is the rate you get.",
  },
  {
    q: "The couple sent me a link. What do I do with it?",
    a: "That is the room block: a set of rooms held at an agreed rate until a set date. Book inside that date and you get the rate and you are in the same place as everyone else. Leave it late and the rooms go back to the hotel, usually at a higher price.",
  },
  {
    q: "Do I need a visa for the wedding country?",
    a: "It depends on your passport and where you are going. A CARICOM passport gets you into other CARICOM countries easily, but easily is not the same as automatically, and it is different again if you hold a passport from outside the region. Tell me where you are starting and where you are headed and I will tell you what applies to you.",
  },
  {
    q: "Can I add a few days on either side?",
    a: "Yes, and it is often cheaper to. Flying in a day early or out a day late can move you off the expensive flights everyone else is on. Say so when you book and I will price both.",
  },
  {
    q: "I am travelling with children. Does anything change?",
    a: "Usually yes. Some countries want a birth certificate for a child even inside CARICOM, and a child travelling with only one parent can need a letter from the other. Flag it early rather than at the counter.",
  },
  {
    q: "What if I book and then cannot go?",
    a: "That depends on the fare and the hotel’s own terms, which differ from one booking to the next. I will tell you what yours are before you pay, so the answer is not a surprise later.",
  },
];

export default function WeddingGuestsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<Icon name="users" className="h-7 w-7 text-brand" />}
        title="Travelling to a wedding"
        crumb="Marry"
        intro="Invited to a wedding somewhere else in the region? Tell me where you are starting and I will sort the flight, the room and the arrival, so you turn up on the right day in the right place."
        photos={HERO_PHOTOS}
      />

      {/* WHY THIS PAGE EXISTS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Forty people, forty different plans</h2>
          <p className="mt-4 text-slate-600">
            A wedding abroad is not one trip, it is as many trips as there are guests, leaving from as many places.
            Left alone, half the group books late and pays double, a few land at an airport four hours from the
            hotel, and somebody arrives the morning after the wedding.
          </p>
          <p className="mt-4 text-slate-600">
            You do not have to work any of that out. Tell me where you are starting from and which wedding you are
            going to, and I will come back with what it costs and what you need.
          </p>
        </div>
      </Section>

      {/* WHAT I SORT OUT FOR A GUEST */}
      <Section alt>
        <SectionHead
          eyebrow="If you are a guest"
          title="What I sort out for you"
          intro="You are going to a wedding. You should not need to become an expert in connecting flights to get there."
        />
        <div className="mx-auto max-w-3xl">
          <CheckList items={GUEST_HELP} />
        </div>
      </Section>

      {/* DEPARTURE CITIES */}
      <Section>
        <SectionHead
          eyebrow="Where you are starting"
          title="Flying from where you actually live"
          intro="The couple’s flight is rarely your flight. These are the departure points most guests use, and the ones where the details catch people out."
        />
        <div className="mx-auto max-w-4xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {DEPARTURES.map((d) => (
              <li key={d.code} className="rounded-xl border border-slate-200 bg-white px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-slate-900">{d.city}</span>
                  <span className="shrink-0 font-mono text-xs font-bold tracking-wider text-brand">{d.code}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{d.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-slate-600">
            Starting somewhere that is not on this list, including outside the region? That is fine, and common. Tell
            me the city and I will work it out from there.
          </p>
        </div>
      </Section>

      {/* FOR THE COUPLE */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">If this is your wedding</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Send your guests here</h2>
            <p className="mt-3 text-slate-700">
              Chasing your own guest list is the part of a wedding abroad nobody warns you about. I take the travel
              side off you so you can get on with the rest of it.
            </p>
            <div className="mt-5">
              <CheckList items={COUPLE_HELP} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/weddings" className={btnGhost}>
                Planning a wedding abroad
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHead eyebrow="Questions" title="What guests ask" />
        <div className="mx-auto grid max-w-3xl gap-6">
          {FAQS.map((f) => (
            <div key={f.q} className="border-b border-navy/15 py-5">
              <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <BookingPriceDisclaimer />
        </div>
      </Section>

      <ConsultationCtaBlock lead="Booking your own travel to a wedding costs you nothing beyond the fare, so just get in touch. The $100 consultation is for couples planning the wedding itself, and it comes off the booking if you go ahead." />
      <PageIssueNote section="marry" />
    </>
  );
}
