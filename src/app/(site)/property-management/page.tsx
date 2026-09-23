import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList, btnPrimary, btnGhost } from "@/components/ui";
import Image from "next/image";
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
 * The connective tissue is real, though, and the page says so out loud: the
 * diaspora owner with a place in Jamaica is the same person as the diaspora
 * couple marrying back home, and the Superhost record is what makes the
 * accommodation side of the business credible in the first place.
 *
 * Written while the service is a demand test rather than a going concern. It
 * claims a Superhost rating on Jo's own hosting and nothing more: no portfolio,
 * no occupancy figures, no client count. Those go in when they are true.
 */

const MANAGEMENT_EMAIL = "info@expeditionswithjo.com";

export const metadata: Metadata = {
  title: "Airbnb Property Management in Jamaica",
  description:
    "Superhost-run Airbnb management for owners in Jamaica. Listing, pricing, guest messages, turnover and maintenance handled, for a percentage of what the property earns.",
  keywords: [
    "Airbnb property management Jamaica",
    "Airbnb management company Jamaica",
    "short term rental management Jamaica",
    "Airbnb co-host Jamaica",
    "manage my Airbnb in Jamaica",
    "overseas owner Airbnb Jamaica",
  ],
  alternates: { canonical: "/property-management" },
};

const WE_DO = [
  "Set the listing up, or rebuild one that is not earning what it should",
  "Photograph the property and write the listing so it reads like somewhere people want to stay",
  "Price it week by week against what is actually happening in the area, rather than leaving one rate up all year",
  "Answer every guest message, including the ones at two in the morning",
  "Screen enquiries and handle the awkward ones before they become a booking you regret",
  "Coordinate cleaning and turnover between stays",
  "Arrange repairs and call out a plumber, an electrician or a handyman when something goes",
  "Restock what runs out, from linens to light bulbs",
  "Chase reviews, answer them, and keep the rating where it needs to be",
  "Send you a statement showing what came in, what went out and what is yours",
];

const WE_DO_NOT = [
  "Own or buy the property. It stays yours, and so does the income after our share",
  "Guarantee occupancy or a monthly figure. Anyone who guarantees you a number on a short-term rental is guessing",
  "Control what Airbnb does. Rankings, fees and policy are theirs, and they change them",
  "Handle your tax filing. We give you the statements; your accountant does the rest",
];

const SUITS = [
  {
    icon: "globe",
    title: "You live abroad",
    text: "New York, London, Toronto, and a property in Jamaica you cannot get to. Someone has to be on the ground, and it cannot be a cousin doing you a favour indefinitely.",
  },
  {
    icon: "home",
    title: "Family property sitting idle",
    text: "A house nobody lives in full-time, costing money in rates and upkeep and earning nothing. It can pay for itself, and often for more than itself.",
  },
  {
    icon: "banknote",
    title: "A listing that is underperforming",
    text: "You are already on Airbnb, the reviews are fine, and the calendar still has gaps. Usually that is pricing and response time rather than the property.",
  },
];

const FAQS = [
  {
    q: "What does it cost?",
    a: "A percentage of what the property earns, so we only do well when it does. The exact percentage depends on the property, how much work it needs at the start, and whether we are running turnover as well as guest communication, so it is quoted once we have seen the place rather than guessed at from a website.",
  },
  {
    q: "What does Superhost actually mean?",
    a: "It is Airbnb's own status, not a title anyone can award themselves. It requires a high overall rating, a strong response rate, a low cancellation rate and a minimum number of completed stays, and Airbnb reassesses it every three months. It is a record of how guests were actually treated, kept by the platform rather than by us.",
  },
  {
    q: "Why Jamaica only?",
    a: "Because running a property well is a local job. It means knowing which cleaner turns up, which handyman answers the phone on a Sunday, and what a comparable place two streets over is charging this week. We would rather do that properly in one country than badly in twelve. Other CARICOM countries follow once the first ones are working.",
  },
  {
    q: "Do I have to use Airbnb?",
    a: "Airbnb is where the experience is, so it is where we start. If the property suits other short-stay platforms as well, we can list there too, but we will say so rather than quietly spreading it thin.",
  },
  {
    q: "What if I want to use the property myself?",
    a: "You block the dates and it comes off the calendar. It is your house. The only thing worth knowing is that blocking a lot of peak weeks at short notice affects what the rest of the year earns.",
  },
  {
    q: "How do I know what is coming in?",
    a: "A statement showing bookings, payouts, cleaning, maintenance and our share. Airbnb also shows you everything on your own account, which stays in your name. Nothing about the money is a thing you have to take our word for.",
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
        title="Airbnb property management in Jamaica"
        crumb="Property Management"
        intro="You own a place in Jamaica and you are not in Jamaica. We run it as a short-stay rental, from the listing and the pricing to the guest at two in the morning and the plumber on Sunday, for a percentage of what it earns."
        footnote="Jamaica for now. We would rather do one country properly than twelve badly."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brand/25 bg-brand-soft p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">The short version</p>
            <p className="mt-3 text-xl font-semibold leading-snug text-navy">
              Joanson Baptiste James is an Airbnb Superhost, and Expeditions With Jo manages property on that record.
            </p>
            <p className="mt-4 text-navy/75">
              Superhost is Airbnb&rsquo;s own status rather than a badge anyone can hand themselves. It takes a high
              guest rating, a fast response rate, almost no cancellations and a minimum number of completed stays, and
              Airbnb checks it again every three months. It is not a marketing claim. It is a record of how guests were
              actually treated, kept by the platform.
            </p>
            <p className="mt-4 text-navy/75">
              That is the whole pitch. Your property is run by someone the platform already rates, in the country it
              sits in.
            </p>
          </div>

          {/*
            Airbnb's own profile card, which it generates for hosts to share.
            The figures on it are a snapshot and will move, so the caption
            dates them rather than letting the page imply they are current
            forever. The alt text carries the same numbers, because a card
            that only exists as a picture proves nothing to a screen reader
            or to a search engine.
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
            <figcaption className="mt-3 text-center text-sm text-navy/60">
              Airbnb host profile, September 2026: Superhost, 4.88 across 25 reviews, hosting for a year. Airbnb
              reassesses the status quarterly, so treat the figures as of that date.
            </figcaption>
          </figure>

          <div className="mt-10">
            <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
              Why a relocation consultancy is doing this
            </h2>
            <p className="mt-3 text-navy/75">
              It is closer to the day job than it looks. This business already books people into places to stay across
              the region, which means knowing what makes a property worth staying in and what makes a guest complain.
              The Superhost rating came from the other side of that same counter.
            </p>
            <p className="mt-4 text-navy/75">
              And the owner we are talking to is usually someone we already know. The person with a house in Jamaica
              and a life in Toronto is the same person planning a wedding back home, or working out whether they could
              move back. Property management is the thing they need first, because the house is costing them money
              right now.
            </p>
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionHead
          lead
          title="What we handle"
          intro="All of it, unless you want to keep a piece of it yourself. Plenty of owners keep the cleaning arrangement they already trust, and that is fine."
        />
        <div className="mx-auto max-w-3xl">
          <CheckList items={WE_DO} />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
            What we do not do
          </h2>
          <p className="mt-3 text-navy/75">Being straight with you is cheaper for both of us than a surprise later.</p>
          <ul className="mt-6 grid gap-3">
            {WE_DO_NOT.map((item, i) => (
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

      <Section alt>
        <SectionHead
          title="Who this suits"
          intro="Three situations, and they overlap more often than not."
        />
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

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy sm:text-[1.9rem]">
            How the money works
          </h2>
          <p className="mt-3 text-navy/75">
            We take a percentage of what the property earns. Not a monthly retainer, not a fee whether it books or not.
            If the calendar is empty we have earned nothing, which is the arrangement that keeps us honest about
            pricing.
          </p>
          <p className="mt-4 text-navy/75">
            The percentage depends on the property: how much work it needs before it can be listed, whether we are
            running turnover as well as guest communication, and how many bedrooms there are to keep filled. It gets
            quoted after we have seen the place, because a number invented from a website is a number that changes
            later, and nobody enjoys that conversation.
          </p>
          <p className="mt-4 text-navy/75">
            Cleaning, laundry, repairs and supplies are the property&rsquo;s costs and come out of what it earns. They
            show on the statement with receipts, at what they cost, with nothing added on top.
          </p>
          <div className="mt-6 rounded-2xl border border-dashed border-navy/20 bg-sand/60 p-6">
            <p className="text-sm text-navy/75">
              The Airbnb account stays in your name. The payouts go to your bank, not ours. We are running the
              property, not standing between you and your money.
            </p>
          </div>
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
            We are taking on a small number of properties to start
          </h2>
          <p className="mt-4 text-navy/75">
            This is new, and we would rather run a few properties properly than sign up thirty and let the ratings
            slide. If you have a place in Jamaica sitting empty, tell us where it is and what condition it is in, and
            we will tell you honestly whether it is worth listing and roughly what it could do.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${MANAGEMENT_EMAIL}?subject=${encodeURIComponent(
                "Airbnb property management enquiry"
              )}&body=${encodeURIComponent(
                "Where the property is:\nHow many bedrooms:\nIs it already on Airbnb:\nWhat condition it is in:\nAnything else I should know:\n"
              )}`}
              className={btnPrimary}
            >
              Email about your property
            </a>
            <Link href="/tools/list-my-property" className={btnGhost}>
              Answer a few questions first
            </Link>
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
