import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, PageHeader, SectionHead, CheckList, btnPrimary, btnGhost } from "@/components/ui";
import { Icon } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import { SITE_URL } from "@/lib/siteUrl";

/**
 * Airbnb property management, Jamaica only for now.
 *
 * This page sells to a different person from the rest of the site. Everywhere
 * else the reader is moving somewhere; here they own a house and are not in
 * it. That is why it stays out of the top navigation: the four pathways are
 * one audience and this is another, and mixing them makes both weaker.
 *
 * Written in Jo's first person, from his own post, rather than the "we" the
 * first draft used. That matters commercially as well as tonally: what is
 * being sold here is one named Superhost's record, and "we" hides the only
 * asset the page has.
 *
 * The rate is stated. Jo put "no more than 20%" in public before this page
 * was written, so leaving it off would only have made the site the vaguer of
 * the two places an owner could look.
 */

const MANAGEMENT_EMAIL = "info@expeditionswithjo.com";

export const metadata: Metadata = {
  title: "Airbnb Property Management in Jamaica",
  description:
    "A Superhost in Jamaica fixes the photos, the pricing, the listing and the reply times, then runs the property for a fee capped at 20% of bookings. No booking, no fee.",
  keywords: [
    "Airbnb property management Jamaica",
    "Airbnb management company Jamaica",
    "short term rental management Jamaica",
    "Airbnb co-host Jamaica",
    "manage my Airbnb in Jamaica",
    "my Airbnb is not getting bookings",
    "overseas owner Airbnb Jamaica",
  ],
  alternates: { canonical: "/property-management" },
};

/** The four reasons a decent property sits empty, in the order they cost money. */
const PROBLEMS = [
  {
    icon: "sparkles",
    title: "The pictures",
    text: "A picture usually speaks 1000 words, but the pictures are speaking like kindergarten pickney. Nice unit, good location, and photos that give a guest no reason to stop scrolling.",
  },
  {
    icon: "banknote",
    title: "The pricing",
    text: "It doesn't match what similar units nearby are charging. I get that you want to earn as much as you can as fast as you can, but being a tourist doesn't mean unlimited $$$.",
  },
  {
    icon: "tag",
    title: "The title and description",
    text: "They don't tell guests why they should pick you over the other forty places in the same search. A list of features is not a reason.",
  },
  {
    icon: "message",
    title: "The reply time",
    text: "They finally do pick you, and then it's slow to no replies, so they book somewhere else. This one costs you bookings you had already won.",
  },
];

const I_HANDLE = [
  "Reshoot the property and rewrite the listing so it reads like somewhere people want to stay",
  "Price it week by week against what similar units nearby are actually charging, instead of leaving one rate up all year",
  "Answer every guest message, including the ones at two in the morning",
  "Screen enquiries and handle the awkward ones before they become a booking you regret",
  "Chase reviews, reply to them, and keep the rating where it needs to be",
  "Send you a statement showing what came in, what went out, and what is yours",
];

const I_DO_NOT = [
  "Own or buy your property. It stays yours, and so does the income after my share",
  "Guarantee occupancy or a monthly figure. Anyone who guarantees you a number on a short-term rental is guessing",
  "Control what Airbnb does. Rankings, fees and policy are theirs, and they change them",
  "Handle your tax filing. You get the statements; your accountant does the rest",
];

const SUITS = [
  {
    icon: "calculator",
    title: "Your listing has gone quiet",
    text: "It used to book and now it doesn't, or it never really did. Literally $0.00 some months, while the bills carry on as normal.",
  },
  {
    icon: "home",
    title: "You are new and stuck",
    text: "Months in and still waiting on a first booking. The first one is the hardest, because you have no reviews to show and no ranking to stand on.",
  },
  {
    icon: "globe",
    title: "You are not in Jamaica",
    text: "New York, London, Toronto, and a property you cannot get to. Someone has to be on the ground, and it cannot be a cousin doing you a favour indefinitely.",
  },
];

const FAQS = [
  {
    q: "What does it cost?",
    a: "Capped at 20% of bookings, and the exact figure depends on the property. I don't get paid if you don't get stays. There is no monthly retainer and no fee for a quiet month, because I would rather earn my share by filling your calendar than charge you whether it works or not.",
  },
  {
    q: "20% is too much.",
    a: "I hear that one a lot. Two things. It's based on the property, so it is not 20% across the board. And it's 20% of bookings you aren't getting right now. An empty unit still costs you light bill, internet and mortgage every month, and 100% of nothing is nothing.",
  },
  {
    q: "What does Superhost actually mean?",
    a: "It is Airbnb's own status, not a title anyone can award themselves. It takes a high guest rating, a fast response rate, almost no cancellations and a minimum number of completed stays, and Airbnb reassesses it every three months. It is a record of how guests were actually treated, kept by the platform rather than by me.",
  },
  {
    q: "Why Jamaica only?",
    a: "Running a property well is a local job. It means knowing which cleaner turns up, which handyman answers the phone on a Sunday, and what a comparable place two streets over is charging this week. I would rather do that properly in one country than badly in twelve. Other CARICOM countries follow once Jamaica is working.",
  },
  {
    q: "Do I have to use Airbnb?",
    a: "Airbnb is where my experience is, so it is where I start. If the property suits other short-stay platforms too, I can list there as well, but I will say so rather than quietly spreading it thin.",
  },
  {
    q: "What if I want to use the property myself?",
    a: "You block the dates and it comes off the calendar. It is your house. The only thing worth knowing is that blocking a lot of peak weeks at short notice affects what the rest of the year earns.",
  },
  {
    q: "How do I know what is coming in?",
    a: "A statement showing bookings, payouts, cleaning, maintenance and my share. Airbnb also shows you everything on your own account, which stays in your name. Nothing about the money is something you have to take my word for.",
  },
];

export default function PropertyManagementPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Airbnb Property Management",
    serviceType: "Short-term rental property management",
    provider: { "@type": "Organization", name: "Expeditions With Jo", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Jamaica" },
    url: `${SITE_URL}/property-management`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageHeader
        icon={<Icon name="home" className="h-7 w-7 text-brand" />}
        title="Owners with slow Airbnb bookings, this one's for you"
        crumb="Property Management"
        intro="I'm a Superhost who recently moved to Jamaica, and I've been looking at a lot of listings lately that should be booking but aren't. I fix what is stopping them, then run the listing for a percentage of bookings."
        footnote="Jamaica for now. Capped at 20%, and I don't get paid if you don't get stays."
      />

      <Section>
        <SectionHead
          lead
          title="Why your listing isn't booking"
          intro="Nice units, good locations, and four things going wrong. Usually all four at once."
        />
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-navy/10 bg-white p-7">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={p.icon as "sparkles"} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy">{p.title}</h3>
              <p className="mt-2 text-navy/70">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-navy/75">
          I help owners fix all of that, then manage the listing for a percentage of bookings.
        </p>
      </Section>

      <Section alt>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brand/25 bg-brand-soft p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Why me</p>
            <p className="mt-3 text-xl font-semibold leading-snug text-navy">
              Guests see the property is run by a Superhost, and that title lends the listing an extra bit of
              credibility, which makes them more willing to book.
            </p>
            <p className="mt-4 text-navy/75">
              I have an over 4.8 rating with over 20 positive reviews on my existing portfolio, and I&rsquo;m willing
              to extend all that good will to you.
            </p>
            <p className="mt-4 text-navy/75">
              Superhost is Airbnb&rsquo;s own status, not a badge anyone can hand themselves. It takes a high guest
              rating, a fast response rate, almost no cancellations and a minimum number of completed stays, and Airbnb
              checks it again every three months. It is a record of how guests were actually treated, kept by the
              platform.
            </p>
          </div>

          {/*
            Airbnb's own profile card, which it generates for hosts to share.
            The caption is only a date: that the figures are a snapshot is
            obvious from it being a screenshot, and the panel above already
            says Airbnb reassesses the status quarterly.

            The alt text still carries the numbers, because a claim that only
            exists inside a picture proves nothing to a screen reader or to a
            search engine.
          */}
          <figure className="mt-8">
            <Image
              src="/photos/superhost-card.jpg"
              alt="Airbnb profile card for Joanson: Superhost, 25 reviews, 4.88 star rating, 1 year hosting."
              width={1080}
              height={752}
              sizes="(max-width: 768px) 100vw, 640px"
              className="mx-auto w-full max-w-[520px] rounded-2xl border border-navy/10"
            />
            <figcaption className="mt-3 text-center text-sm text-navy/70">
              Airbnb host profile, September 2026
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section>
        <SectionHead lead title="What I do with your listing" />
        <div className="mx-auto max-w-3xl">
          <CheckList items={I_HANDLE} />
          <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-7">
            <h3 className="text-lg font-semibold text-navy">Want to sit back and do nothing at all?</h3>
            <p className="mt-2 text-navy/75">
              For owners who just want the property to earn for them, full management is offered as well: cleaning,
              repairs, restocking, the lot. That one is case by case, because it depends on where the property is and
              what it needs.
            </p>
          </div>
        </div>
      </Section>

      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
            What I don&rsquo;t do
          </h2>
          <p className="mt-3 text-navy/75">Being straight with you is cheaper for both of us than a surprise later.</p>
          <ul className="mt-6 grid gap-3">
            {I_DO_NOT.map((item, i) => (
              <li key={i} className="relative pl-7 text-navy/75">
                <span aria-hidden="true" className="absolute left-0 top-0 font-semibold text-accent">
                  &times;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHead title="Who this is for" />
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {SUITS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-navy/10 bg-white p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={s.icon as "globe"} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-navy/70">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
            What it costs
          </h2>
          <p className="mt-3 text-navy/75">
            <strong className="font-semibold text-navy">Capped at 20% of your earnings</strong>, and the exact
            figure depends on the property. No monthly retainer, no fee for a quiet month.{" "}
            <strong className="font-semibold text-navy">I don&rsquo;t get paid if you don&rsquo;t get stays.</strong>
          </p>

          <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-7">
            <h3 className="text-lg font-semibold text-navy">&ldquo;20% is too much&rdquo;</h3>
            <p className="mt-2 text-navy/75">
              Whenever I mention the percentage, someone says that. I get it. But it&rsquo;s based on the property, so
              it is not 20% across the board, and it&rsquo;s 20% (max) of bookings you aren&rsquo;t getting right now.
            </p>
            <p className="mt-4 text-navy/75">
              An empty unit still costs you light bill, internet and mortgage every month. I&rsquo;d rather earn my
              share by filling your calendar than charge you a flat fee whether it works or not.
            </p>
          </div>

          <p className="mt-6 text-navy/75">
            Cleaning, laundry, repairs and supplies are the property&rsquo;s costs and come out of what it earns. They
            show on the statement with receipts, at what they cost, with nothing added on top.
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-navy/20 bg-sand/60 p-6">
            <p className="text-sm text-navy/75">
              The Airbnb account stays in your name. The payouts go to your bank, not mine. I&rsquo;m running the
              property, not standing between you and your money.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
            Why a relocation consultancy is doing this
          </h2>
          <p className="mt-3 text-navy/75">
            It is closer to the day job than it looks. I already book people into places to stay across the region,
            which means I know what makes a property worth staying in and what makes a guest complain. The Superhost
            rating came from the other side of that same counter.
          </p>
          <p className="mt-4 text-navy/75">
            And the owner is usually someone I already know. The person with a house in Jamaica and a life in Toronto
            is the same person planning a wedding back home, or working out whether they could move back. This is the
            thing they need first, because the house is costing them money right now.
          </p>
        </div>
      </Section>

      <Section alt>
        <SectionHead title="Questions owners ask" />
        <div className="mx-auto max-w-3xl">
          <dl className="grid gap-5">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-navy/10 bg-white p-6">
                <dt className="font-semibold text-navy">{f.q}</dt>
                <dd className="mt-2 text-navy/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
            If your listing has been quiet, tell me about it
          </h2>
          <p className="mt-4 text-navy/75">
            Whether it&rsquo;s literally $0.00 income, or you&rsquo;re new and you&rsquo;ve been struggling for months
            to get that first booking. Tell me where the property is and what condition it&rsquo;s in, and I&rsquo;ll
            tell you honestly whether it is worth listing and roughly what it could do.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/tools/list-my-property" className={btnPrimary}>
              Answer a few questions about your property
            </Link>
            <a
              href={`mailto:${MANAGEMENT_EMAIL}?subject=${encodeURIComponent(
                "Airbnb property management enquiry"
              )}&body=${encodeURIComponent(
                "Where the property is:\nHow many bedrooms:\nIs it already on Airbnb:\nWhat condition it is in:\nAnything else I should know:\n"
              )}`}
              className={btnGhost}
            >
              Or just email me
            </a>
          </div>
          <div className="mt-8">
            <CtaButtons
              showContact={false}
              message="Hi Jo, I have a property in Jamaica and I'd like to talk about managing it."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
