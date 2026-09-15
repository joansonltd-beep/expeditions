import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList, type HeroPhoto } from "@/components/ui";
import { Icon } from "@/components/icons";
import WeHandleIt from "@/components/WeHandleIt";
import ConsultationCtaBlock from "@/components/ConsultationCtaBlock";

export const metadata: Metadata = {
  title: "Getting Married In Another CARICOM Country",
  description:
    "Marrying in a CARICOM country you do not live in: how many days you have to be on the island first, what each registry asks for, and what it costs. For couples coming home from abroad and for couples already in the region.",
  keywords: [
    "getting married in another CARICOM country",
    "destination wedding Caribbean legal requirements",
    "marriage licence Jamaica non-resident",
    "marriage licence Barbados non-resident",
    "marry back home Caribbean diaspora",
    "CARICOM destination wedding",
  ],
  alternates: { canonical: "/marry" },
};

// When the requirements below were last checked. Month precision; `iso` is the
// first of the month purely so it can go in a <time> element.
//
// IMPORTANT: every figure on this page came from a tourist board, a ministry
// page or an industry source, not from a phone call to the registry itself.
// Jo is confirming them country by country. Until a row has been confirmed at
// source, it stays marked as needing checking, and nothing here gets quoted to
// a client as final. Fees and waiting periods change without announcement.
const LAST_UPDATED = { display: "September 2026", iso: "2026-09-01" };

const HERO_PHOTOS: HeroPhoto[] = [
  {
    src: "/places/jamaica/negril.jpg",
    alt: "Negril Beach, Jamaica",
    credit: "Gustavo.kunst, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Negril.jpg",
  },
  {
    src: "/places/barbados/carlisle-bay.jpg",
    alt: "Carlisle Bay, Barbados",
    credit: "P. Hughes, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Carlisle_Bay_-_Barbados.jpg",
  },
  {
    src: "/places/saint-lucia/pitons.jpg",
    alt: "Gros Piton and Petit Piton behind Soufrière, Saint Lucia",
    credit: "Aneil Lutchman, CC BY-SA 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG",
  },
  {
    src: "/places/st-vincent-and-the-grenadines/tobago-cays.jpg",
    alt: "Aerial view of Tobago Cays Marine Park, St. Vincent and the Grenadines",
    credit: "Iain Grant, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TobagoCaysAerial.jpg",
  },
];

type Requirement = {
  country: string;
  wait: string;
  cost: string;
  note: string;
  /** false once Jo has confirmed the row with the registry itself. */
  unconfirmed?: boolean;
};

type Band = { label: string; rows: Requirement[] };

// Grouped by waiting period rather than alphabetically, because the waiting
// period is the fact that decides whether a country is realistic: it sets how
// much leave the couple and every guest has to book.
const BANDS: Band[] = [
  {
    label: "Under two days on the island",
    rows: [
      {
        country: "Barbados",
        wait: "No waiting period",
        cost: "BDS$200 plus a BDS$25 stamp",
        note: "Both of you apply in person at the Ministry of Home Affairs. The licence lasts three months. Bring return tickets. Anything not in English needs a translation certified by a Notary Public, and a Justice of the Peace is not accepted.",
        unconfirmed: true,
      },
      {
        country: "Jamaica",
        wait: "24 hours",
        cost: "Around US$40",
        note: "A Minister's Marriage Licence from the Ministry of Justice, valid 90 days. Your birth certificate has to show your father's name, which catches people out. No blood test and no apostille. Apply a couple of weeks ahead rather than on arrival.",
        unconfirmed: true,
      },
      {
        country: "Antigua and Barbuda",
        wait: "No waiting period on a special licence",
        cost: "Around US$150",
        note: "The special licence is the one to use. The ordinary licence needs 15 days on the island first. Budget roughly US$100 more for the marriage officer if you are marrying away from the court house.",
        unconfirmed: true,
      },
      {
        country: "St. Vincent and the Grenadines",
        wait: "1 full day",
        cost: "Around US$185",
        note: "Special licence, paid to the Treasury.",
        unconfirmed: true,
      },
    ],
  },
  {
    label: "A few days, so build it into the trip",
    rows: [
      {
        country: "St. Kitts and Nevis",
        wait: "2 working days",
        cost: "Around US$80",
        note: "Ordinary licence. Passport plus a certified copy of your birth certificate.",
        unconfirmed: true,
      },
      {
        country: "Saint Lucia",
        wait: "Same day, or 2 days on the cheaper route",
        cost: "EC$540 same day, EC$335 standard",
        note: "The standard licence is cheaper but adds three working days of processing on top of the two days on island, so the same-day licence is usually the one that fits a short trip.",
        unconfirmed: true,
      },
      {
        country: "Belize",
        wait: "3 days",
        cost: "US$100 plus a US$5 admin fee",
        note: "Apply at the Registrar General's Office in Belize City or the Solicitor General's Office in Belmopan. The licence itself comes through in about two days. Two witnesses have to be at the ceremony. No blood test.",
        unconfirmed: true,
      },
      {
        country: "Grenada",
        wait: "3 days",
        cost: "Around US$10",
        note: "By far the cheapest licence in the region. You have to show proof of your marital status.",
        unconfirmed: true,
      },
    ],
  },
  {
    label: "A week or more, which changes the whole trip",
    rows: [
      {
        country: "Trinidad and Tobago",
        wait: "7 days",
        cost: "TT$300 special licence",
        note: "Non-resident here means you have not lived in the country for at least three years, so most people coming home from abroad are non-residents. If one of you is resident, a different route applies and the fee drops to around TT$10. Apply at the Civil Registry in Port of Spain or a District Warden's Office.",
      },
      {
        country: "Dominica",
        wait: "15 days",
        cost: "Needs checking",
        note: "At least one of you has to have been in Dominica for 15 days before you can even apply. Realistic only if you were already planning a long stay.",
        unconfirmed: true,
      },
      {
        country: "Guyana",
        wait: "15 days for one of you",
        cost: "Needs checking",
        note: "The application goes in at the General Register Office two business days before the licence is issued, and the licence is then valid 90 days. Non-residents use a passport only.",
        unconfirmed: true,
      },
    ],
  },
  {
    label: "Not possible as a destination wedding",
    rows: [
      {
        country: "Suriname",
        wait: "Not available",
        cost: "Not applicable",
        note: "At least one of you has to actually live in Suriname. A couple who both live elsewhere cannot marry here, however long they stay. Worth knowing before anyone books flights.",
        unconfirmed: true,
      },
    ],
  },
];

const I_HELP = [
  "Working out which licence applies to you and what the registry will actually accept",
  "Getting your documents in order before you travel, so nothing is rejected at the counter",
  "Timing the trip around the waiting period, so you are on the island long enough to be married",
  "Flights for the two of you and for guests coming in from different countries",
  "Accommodation, including a block of rooms held for your guests",
  "Airport transfers and moving everybody around on the day",
  "A single travel page for your guests, so you stop answering the same question forty times",
];

const I_DO_NOT = [
  "Register the marriage. The registry decides whether a licence is issued and whether a marriage is recorded.",
  "Plan the wedding itself. Flowers, decor, catering, photography and running the day are not mine.",
  "Set the fees or the waiting periods. Those are the country's, and they change.",
  "Give legal advice on whether your marriage will be recognised where you live. Ask a lawyer there.",
  "Promise a date. Until the licence is issued, no date is certain.",
];

const I_WILL_ASK = [
  "Which country are you thinking of, and do you have a tie to it?",
  "Where is each of you travelling from, and on which passport?",
  "Roughly how many guests, and which countries are they coming from?",
  "Has either of you been married before?",
  "How much time can you both take off, including the waiting period?",
  "Do you want a religious ceremony, a civil one, or a civil registration plus a blessing?",
];

const MARRY_FAQS: { q: string; a: string }[] = [
  {
    q: "Can you guarantee we will be legally married?",
    a: "No. The registry issues the licence and records the marriage, not me. What I do is work out exactly what your registry asks for, get your documents in order before you fly, and make sure you are on the island long enough to qualify. If something is missing, I would rather find it three months out than on the morning of the wedding.",
  },
  {
    q: "We are CARICOM nationals. Does free movement mean we can just turn up and marry?",
    a: "No. Free movement decides how easily you enter and how long you can stay. It has nothing to do with the marriage licence. For the licence you are a non-resident like anyone else, and the same waiting period applies. What free movement does give you is an easy six-month entry, which makes satisfying a waiting period straightforward.",
  },
  {
    q: "I was born there but I live abroad now. Am I a resident?",
    a: "Usually not, and the definition is stricter than people expect. Trinidad and Tobago, for example, treats you as a non-resident if you have not lived in the country for at least three years. Being a citizen is not the same as being a resident, and it is the residency test that sets your waiting period and your fee.",
  },
  {
    q: "Does marrying there give us the right to live there?",
    a: "No. Marrying in a CARICOM country, or marrying a citizen of one, does not by itself give you a right to remain or reside. That is a separate immigration matter, decided by that country's immigration authority. If living there is the actual goal, say so early and we plan for that instead.",
  },
  {
    q: "Do you plan the wedding?",
    a: "No. I handle the legal process and the travel: the licence, the documents, the flights, the rooms, the transfers. Flowers, decor, catering, photography and running the day itself are a local planner's job, and I will point you at one in the country you have chosen.",
  },
  {
    q: "Which country is quickest?",
    a: "Barbados has no waiting period at all, and Jamaica needs you on the island 24 hours. Grenada is three days but the licence costs about US$10. At the other end, Dominica and Guyana need 15 days, and Suriname is not available to a couple who both live abroad. The waiting period usually matters more than the fee, because it decides how much leave everybody has to book.",
  },
];

export default function MarryPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MARRY_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<Icon name="heart" className="h-7 w-7 text-brand" />}
        title="Marry"
        crumb="Marry"
        intro="Getting married in a CARICOM country you do not live in. I handle the licence, the documents and the travel, for you and for everyone flying in."
        photos={HERO_PHOTOS}
      />

      {/* THE HONEST FRAMING */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-slate-600">
            Last checked:{" "}
            <time dateTime={LAST_UPDATED.iso} className="font-semibold text-slate-900">
              {LAST_UPDATED.display}
            </time>
            . Waiting periods and fees are set country by country and change without notice. Confirm the current
            position with the registry in your destination before you book anything.
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Two things decide everything</h2>
          <p className="mt-3 text-slate-600">
            The first is how many days you have to be on the island before you are allowed to marry. That single
            number decides your flights, your leave, and how much time your guests have to take off. It runs from no
            waiting period at all in Barbados to fifteen days in Dominica and Guyana.
          </p>
          <p className="mt-3 text-slate-600">
            The second is whether the registry will accept your documents. That is where these go wrong. A birth
            certificate that does not name your father is refused in Jamaica. A translation certified by a Justice of
            the Peace rather than a Notary Public is refused in Barbados. Those are the sort of details worth finding
            out about three months ahead rather than at a counter with your family already in the country.
          </p>
        </div>
      </Section>

      {/* THE TWO PATHS */}
      <Section alt>
        <SectionHead
          eyebrow="Who this is for"
          title="Two different weddings"
          intro="Both end at the same registry counter, but they start in very different places and the work is not the same."
        />
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* PATH 1 — DIASPORA */}
          <div className="rounded-2xl border border-brand/30 bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Coming home</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Marry back home</h3>
            <p className="mt-3 text-slate-600">
              You live in New York or London or Toronto, and you want to marry where your family is from. Not at a
              resort. At the church in Kingston, or the yard in Grenada, with the people who are still there.
            </p>
            <p className="mt-3 text-slate-600">
              The hard part is rarely the venue. It is that your documents were issued somewhere else, your guests are
              scattered across three countries, and being a citizen of the place does not make you a resident of it. I
              have made this move myself, twice, and the paperwork is the same muscle.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">What usually bites</p>
            <ul className="mt-3 grid gap-2.5 text-slate-600">
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Foreign birth certificates that do not carry what the registry wants on them
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Divorce papers or a late spouse&rsquo;s death certificate, which most registries ask for in original form
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Assuming your passport makes you a resident, when the test is usually years of actually living there
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Guests routed through four different airports on four different fares
              </li>
            </ul>
          </div>

          {/* PATH 2 — WITHIN CARICOM */}
          <div className="rounded-2xl border border-accent/30 bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Already in the region</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">A wedding somewhere else in CARICOM</h3>
            <p className="mt-3 text-slate-600">
              You live in Trinidad and you want to marry in Saint Lucia. Or you are in Barbados and you have always
              wanted the Grenadines. You are not emigrating, you just want the wedding somewhere other than home.
            </p>
            <p className="mt-3 text-slate-600">
              This is the easier of the two, and cheaper than most people assume. Regional fares are short, your
              guests do not need visas for each other&rsquo;s countries, and you can usually enter on a six-month
              visitor stay without arranging anything in advance.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">Worth knowing</p>
            <ul className="mt-3 grid gap-2.5 text-slate-600">
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                Free movement gets you in. It does not get you married, and you are still a non-resident for the
                licence.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                The waiting period still applies to you in full, so it shapes the trip
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                Marrying there gives you no right to stay, which surprises people
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                The easy win is picking a country whose waiting period matches the leave you already have
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* THE TABLE */}
      <Section>
        <SectionHead
          eyebrow="Country by country"
          title="How long you have to be there first"
          intro="Grouped by waiting period rather than alphabetically, because that is the number that decides whether a country works for you."
        />
        <div className="mx-auto max-w-5xl">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Country
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Days there first
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Licence cost
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    What to know
                  </th>
                </tr>
              </thead>
              <tbody>
                {BANDS.map((band) => (
                  <Fragment key={band.label}>
                    <tr className="bg-sand">
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand"
                      >
                        {band.label}
                      </th>
                    </tr>
                    {band.rows.map((r) => (
                      <tr key={r.country} className="border-b border-slate-100 align-top last:border-b-0">
                        <th scope="row" className="px-5 py-4 text-left font-semibold text-slate-900">
                          {r.country}
                          {r.unconfirmed ? (
                            <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-accent">
                              Needs confirming
                            </span>
                          ) : null}
                        </th>
                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold tabular-nums text-slate-900">
                          {r.wait}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm tabular-nums text-slate-600">{r.cost}</td>
                        <td className="px-5 py-4 text-sm text-slate-600">{r.note}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-2xl border border-accent/30 bg-accent-soft p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900">Read this before you rely on any figure above</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Everything here comes from tourist boards, ministry pages and wedding industry sources rather than from
              the registries themselves, and rows marked <em>needs confirming</em> have not yet been checked at
              source. I am working through them country by country. Fees and waiting periods change without
              announcement, and the cost of being wrong is somebody not being married after their family has already
              flown in. Treat this page as a starting point for a conversation, never as a quote.
            </p>
          </div>
        </div>
      </Section>

      {/* SCOPE */}
      <Section alt>
        <SectionHead
          eyebrow="Being straight with you"
          title="What I do, and what I don't"
          intro="The narrow version is the honest one. I am a travel and paperwork person, not a wedding planner."
        />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-900">What I handle</h3>
            <CheckList items={I_HELP} />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-900">What I can&rsquo;t do</h3>
            <ul className="grid gap-2.5">
              {I_DO_NOT.map((item) => (
                <li key={item} className="relative pl-7 text-navy/75">
                  <svg
                    className="absolute left-0 top-1 h-4 w-4 text-accent"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5.5 5.5 14.5 14.5M14.5 5.5 5.5 14.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <WeHandleIt what="the licence, the documents and the travel for a wedding abroad" />
        </div>
      </Section>

      {/* WHAT I'LL ASK */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What I&rsquo;ll ask you first</h2>
          <p className="mt-3 text-slate-600">
            Have these ready and the first conversation is a useful one rather than a warm-up.
          </p>
          <div className="mt-6">
            <CheckList items={I_WILL_ASK} />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <SectionHead eyebrow="Questions" title="The ones people actually ask" />
        <div className="mx-auto grid max-w-3xl gap-6">
          {MARRY_FAQS.map((f) => (
            <div key={f.q} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-600">
          Planning to move there rather than just marry there? That is{" "}
          <Link href="/getting-started" className="font-semibold text-brand hover:underline">
            a different process
          </Link>
          , and worth starting separately.
        </p>
      </Section>

      <ConsultationCtaBlock lead="A Move Planning Consultation covering your wedding, the licence, the documents and everybody's travel, is $100. Tell me which country you are thinking of and I will tell you what it actually takes." />
    </>
  );
}
