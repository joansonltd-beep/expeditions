/**
 * THE WEDDINGS SECTION
 *
 * Pages
 *   /weddings                  this file, the hub
 *   /weddings/[country]        one per CARICOM country, titled "Getting married in X"
 *   /weddings/guests           for people attending somebody else's wedding
 *
 * Editing the copy
 *   Per-country wording, the timing band and who each country suits all live in
 *   src/lib/marryData.ts. Everything else is in the page files themselves.
 *   Nav label is "Marry" in src/components/Header.tsx; the URL is /weddings.
 *
 * What deliberately is NOT published
 *   Waiting periods in days, licence fees and document lists. They differ per
 *   country, they change without notice, and working them out for a particular
 *   couple is what the consultation is for. The one exception is Suriname,
 *   which will only marry a couple where one partner lives there, so it is
 *   said plainly before anyone books flights.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList, type HeroPhoto } from "@/components/ui";
import { Icon } from "@/components/icons";
import WeHandleIt from "@/components/WeHandleIt";
import ConsultationCtaBlock from "@/components/ConsultationCtaBlock";
import { OPEN_COUNTRIES, SOON_COUNTRIES, TIMING_LABEL } from "@/lib/marryData";

export const metadata: Metadata = {
  title: "Getting Married In Another CARICOM Country",
  description:
    "Marrying in a CARICOM country you do not live in. I handle the licence, the paperwork, everybody's travel and the planner for the day, whether you are coming home from abroad or already in the region.",
  keywords: [
    "getting married in another CARICOM country",
    "destination wedding Caribbean",
    "marry back home Caribbean diaspora",
    "CARICOM destination wedding",
    "Caribbean wedding travel planning",
  ],
  alternates: { canonical: "/weddings" },
};

// NOTE FOR EDITORS, NOT FOR THE PAGE: the specific waiting periods, fees and
// document lists are deliberately not published here. They change without
// notice, they differ per country, and working them out for a particular
// couple is what the consultation is for. Keep this page to what we do and
// where we do it. The one exception is Suriname, where the rule rules people
// out entirely, so they need to know before they book anything.
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

const I_HELP = [
  "Working out which country suits the time you and your guests can actually take off",
  "The marriage licence, start to finish, for the country you choose",
  "Getting your documents right before you travel, so nothing is turned away at the counter",
  "Bringing in a local planner for the day itself and running that relationship for you, so you are dealing with one person and not five",
  "Flights for the two of you and for guests coming in from different countries",
  "Accommodation, including a block of rooms held together for your guests",
  "Airport transfers and moving everybody around on the day",
  "One travel page for your guests, so you stop answering the same question forty times",
];

const I_DO_NOT = [
  "Register the marriage. The registry issues the licence and records the marriage, not me.",
  "Be your florist, photographer or venue. Those are specialists, and the planner and I engage them rather than pretending to be them.",
  "Set the fees or the waiting times. Every country sets its own and changes them when it likes.",
  "Advise on whether your marriage will be recognised where you live. That is a question for a lawyer there.",
];

const I_WILL_ASK = [
  "Which country are you thinking of, and do you have a tie to it?",
  "Where is each of you travelling from, and on which passport?",
  "Roughly how many guests, and which countries are they coming from?",
  "Has either of you been married before?",
  "How much time can you both take off?",
  "Do you want a religious ceremony, a civil one, or a civil registration with a blessing after?",
];

const MARRY_FAQS: { q: string; a: string }[] = [
  {
    q: "How long do we have to be there before we can marry?",
    a: "It depends entirely on the country. Some let you marry almost as soon as you land. Others want you there a full fortnight before you can even apply. That one number shapes your flights and everybody's leave, so working out which country fits the time you actually have is one of the first things we do together.",
  },
  {
    q: "We are CARICOM nationals. Does free movement mean we can just turn up and marry?",
    a: "No. Free movement decides how easily you enter and how long you can stay. The marriage licence is a separate matter, and you are treated the same as any other non-resident. What free movement does give you is an easy entry, which makes meeting a waiting period much simpler than it is for someone flying in from outside the region.",
  },
  {
    q: "I was born there but I live abroad now. Does that make it easier?",
    a: "Not usually, and this catches people out. Being a citizen is not the same as being a resident, and it is residency that most registries care about. Somewhere like Trinidad and Tobago you are treated as a non-resident if you have not lived in the country for a good number of years. Bring it up early and I will tell you where you stand.",
  },
  {
    q: "Does marrying there give us the right to live there?",
    a: "No. Marrying in a CARICOM country, or marrying a citizen of one, does not by itself give you a right to remain. That is a separate immigration question. If living there is the real goal, say so at the start and we plan for that alongside the wedding.",
  },
  {
    q: "Do you plan the wedding?",
    a: "I organise it. The day itself is run by a local planner, because someone has to be standing in the room and that someone should know the venue. What I do is bring that planner in, brief them, and keep them moving alongside the licence and everybody's travel, so you are answering to one person rather than coordinating a committee from another country.",
  },
  {
    q: "Can you guarantee we will be legally married?",
    a: "No, and be wary of anyone who says they can. The registry decides whether a licence is issued. What I do is make sure you meet what your country asks for, that your documents are right before you fly, and that you are there long enough to qualify. If something is going to be a problem, I would far rather find it months out than on the morning.",
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
        intro="Get married somewhere you have always loved, or go home and marry where your family came from. I handle the licence, the paperwork, the flights and the rooms, and I bring in a planner for the day itself, so all the two of you have to do is turn up and say I do."
        photos={HERO_PHOTOS}
      />

      {/* WHAT THE JOB ACTUALLY IS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">The wedding is the easy part</h2>
          <p className="mt-4 text-slate-600">
            Every CARICOM country asks you to be on the ground for a set time before it will let you marry, and it
            asks for your documents in a particular form. Both of those vary a great deal from one country to the
            next, and neither is written anywhere obvious. People find out at a counter, with family already in the
            country and a date they cannot move.
          </p>
          <p className="mt-4 text-slate-600">
            That is the part I take off you. I work out which country fits the time you and your guests can actually
            take off, tell you exactly what to bring and in what form, and get everybody there and housed. You choose
            the dress and the venue.
          </p>
        </div>
      </Section>

      {/* THE TWO PATHS */}
      <Section alt>
        <SectionHead
          eyebrow="Who this is for"
          title="Two different weddings"
          intro="Both end at the same registry counter, but they start in very different places."
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
              The venue is rarely the hard part. The hard part is that your documents were issued somewhere else,
              your guests are scattered across several countries, and being a citizen of the place does not make you
              a resident of it. I have made this move myself, twice, and it is the same paperwork.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">What I sort out</p>
            <ul className="mt-3 grid gap-2.5 text-slate-600">
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Whether your foreign paperwork will be accepted, before you get on a plane with it
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Where you stand on residency, which is almost never what people assume
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Guests coming in from four different countries on four different fares
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">
                Relatives already on the island who need collecting, housing or driving
              </li>
            </ul>
          </div>

          {/* PATH 2 — WITHIN CARICOM */}
          <div className="rounded-2xl border border-accent/30 bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Already in the region</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">A wedding somewhere else in CARICOM</h3>
            <p className="mt-3 text-slate-600">
              You live in Trinidad and you want to marry in Saint Lucia. Or you are in Barbados and you have always
              wanted the Grenadines. You are not emigrating. You just want the wedding somewhere other than home.
            </p>
            <p className="mt-3 text-slate-600">
              This is the cheaper of the two, and easier than most people expect. The flights are short, your guests
              do not need visas for each other&rsquo;s countries, and getting in is straightforward for a CARICOM
              national.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">Worth knowing</p>
            <ul className="mt-3 grid gap-2.5 text-slate-600">
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                Free movement gets you in. It does not get you married, and the country&rsquo;s own waiting time still
                applies to you.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                Marrying there gives you no right to stay there, which surprises people
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                Pick the country to suit the leave you have and the whole thing gets simpler
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                Guests can often make it a long weekend rather than a week off work
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <SectionHead
          eyebrow="What you can ask for"
          title="Three ways people use me"
          intro="Most couples want the first. Plenty end up wanting all three."
        />
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-900">The couple&rsquo;s wedding plan</h3>
            <p className="mt-2 text-sm text-slate-600">
              Everything between deciding to do it and being legally married.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600">
              <li>A shortlist of countries that fit the time you can take off</li>
              <li>The marriage licence, start to finish</li>
              <li>Your document list, checked before you fly</li>
              <li>Flights and accommodation for the two of you</li>
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-900">Guest travel and room blocks</h3>
            <p className="mt-2 text-sm text-slate-600">
              The part that quietly eats your evenings if nobody takes it off you.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600">
              <li>Group flights by departure city, not just yours</li>
              <li>A room block with a rate and a deadline</li>
              <li>One travel page you send to everyone</li>
              <li>Transfers, so nobody is haggling at arrivals at midnight</li>
            </ul>
            <Link href="/weddings/guests" className="mt-4 text-sm font-semibold text-brand hover:underline">
              What your guests see &rarr;
            </Link>
          </div>

          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-900">Staying on afterwards</h3>
            <p className="mt-2 text-sm text-slate-600">
              You are already in the region. Going home on the Monday is a waste of a flight.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600">
              <li>Extending the trip either side of the day</li>
              <li>Moving to a quieter island once the guests go home</li>
              <li>Upgrades and honeymoon stays</li>
              <li>Open-jaw tickets, so you fly home from somewhere else</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* WHERE */}
      <Section>
        <SectionHead
          eyebrow="Where"
          title="Where I can do this today"
          intro="A country goes on the open list once I have confirmed its marriage procedure with the registry itself, not before. The rest are being worked through."
        />
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Open now</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OPEN_COUNTRIES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/weddings/${p.slug}`}
                  className="flex h-full flex-col justify-center rounded-xl border border-brand/40 bg-white px-4 py-3 transition hover:border-brand"
                >
                  <span className="font-semibold text-slate-900">{p.name}</span>
                  <span className="mt-0.5 text-xs text-slate-500">{TIMING_LABEL[p.timing]}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Being confirmed
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            I am going through these registry by registry. Tell me which one you have in mind and your date, and I
            will confirm it for you and come back either way.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOON_COUNTRIES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/weddings/${p.slug}`}
                  className="flex h-full flex-col justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 transition hover:border-slate-400"
                >
                  <span className="font-semibold text-slate-700">
                    {p.name}
                    {p.timing === "resident-only" ? <span className="text-accent">*</span> : null}
                  </span>
                  <span className="mt-0.5 text-xs text-slate-500">Confirming the procedure</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            <span className="font-semibold text-accent">*</span>{" "}
            <strong className="text-slate-900">Suriname is the one country I cannot arrange a wedding in</strong>{" "}
            unless one of you is a resident there. Suriname will only marry a couple where at least one partner
            actually lives in the country. Resident means living there with legal permission to do so, on a residence
            permit or as a citizen who lives there. Holding a Suriname passport while living somewhere else does not
            count, and neither does visiting, however long you stay. If that is not you, pick another country and I
            will make it work.
          </p>
        </div>
      </Section>

      {/* SCOPE */}
      <Section alt>
        <SectionHead
          eyebrow="Being straight with you"
          title="What I do, and what I don't"
          intro="I am not the person arranging your flowers. I am the person making sure the licence, the travel and the planner all land on the same day."
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
            Have these to hand and the first conversation gets somewhere instead of being a warm-up.
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

      <ConsultationCtaBlock lead="A Move Planning Consultation covering your wedding, the licence, the documents and everybody's travel, is $100, and it comes off the booking if you go ahead. Tell me which country you are thinking of and I will tell you what it actually takes." />
    </>
  );
}
