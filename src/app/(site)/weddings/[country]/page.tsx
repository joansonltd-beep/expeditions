import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader, SectionHead, CheckList, btnPrimary, btnGhost, type HeroPhoto } from "@/components/ui";
import { Icon } from "@/components/icons";
import WeHandleIt from "@/components/WeHandleIt";
import ConsultationCtaBlock from "@/components/ConsultationCtaBlock";
import { MARRY_COUNTRIES, marryCountry, TIMING_LABEL } from "@/lib/marryData";
import { getCountryGuide } from "@/lib/countryGuideData";

export function generateStaticParams() {
  return MARRY_COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const c = marryCountry(country);
  if (!c) return { title: "Getting Married In CARICOM" };

  return {
    // "Getting married in X" is what people actually type, so it leads.
    title: `Getting Married in ${c.name}`,
    description: `Planning a wedding in ${c.name} when you live somewhere else? I handle the marriage licence, the documents and the travel for you and for every guest flying in.`,
    keywords: [
      `getting married in ${c.name}`,
      `wedding in ${c.name}`,
      `destination wedding ${c.name}`,
      `marriage licence ${c.name}`,
      `how to get married in ${c.name}`,
      `${c.name} wedding requirements`,
      `${c.name} wedding planner from abroad`,
    ],
    alternates: { canonical: `/weddings/${c.slug}` },
  };
}

export default async function MarryCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const c = marryCountry(country);
  if (!c) notFound();

  const guide = getCountryGuide(c.slug);
  const residentOnly = c.timing === "resident-only";
  const open = c.status === "open";
  const marryGuide = c.guide;

  const photos: HeroPhoto[] = guide?.photo
    ? [
        {
          src: guide.photo.src,
          alt: guide.photo.alt,
          credit: guide.photo.credit,
          creditUrl: guide.photo.creditUrl,
        },
      ]
    : [];

  // A handful of real places from the country guide, so the page says something
  // specific about this country rather than reading like a template.
  const places = (guide?.placesToSee ?? []).slice(0, 4);

  const faqs = residentOnly
    ? [
        {
          q: `Can we get married in ${c.name} if we live abroad?`,
          a: `Not in most cases. ${c.name} will only marry a couple where at least one of you actually lives in the country. Resident means living there with legal permission to do so, on a residence permit or as a citizen who lives there. Holding a ${c.name} passport while living somewhere else does not count, and neither does visiting, however long you stay. If one of you does live there, get in touch and I will take it from there.`,
        },
        {
          q: "What should we do instead?",
          a: "Pick another CARICOM country. Every other one on my list will marry a couple who live elsewhere, and several will do it within a day or two of you landing. Tell me what matters to you about the day and I will tell you which ones fit.",
        },
      ]
    : [
        {
          q: `How long do we have to be in ${c.name} before we can marry?`,
          a: open
            ? `${TIMING_LABEL[c.timing]}. The exact requirement depends on which licence applies to you and on your circumstances, and it is one of the first things I pin down, because it decides your flights and everybody’s leave.`
            : `Every country sets its own waiting time, and I have not yet confirmed ${c.name}'s with the registry itself, so I am not going to quote you one. Tell me your date and I will confirm it and come back to you either way.`,
        },
        {
          q: `What do we need to bring to ${c.name}?`,
          a: open
            ? "That depends on where you were born, where you live now and whether either of you has been married before. The form the documents take matters as much as having them, and getting it wrong is what sends couples back to a registry a second time. I work out the exact list for your situation and check everything before you fly."
            : `That is part of what I am confirming for ${c.name}. What I can tell you now is that the form your documents take usually matters as much as having them, which is why it is worth asking early rather than close to the date.`,
        },
        {
          q: `We are CARICOM nationals. Is it easier for us in ${c.name}?`,
          a: `Getting in is easier, and staying long enough is simpler. The marriage licence itself is the same process as for anyone else who does not live in ${c.name}, so do not assume free movement covers it.`,
        },
        {
          q: `Does marrying in ${c.name} let us live there?`,
          a: `No. Marrying in ${c.name}, or marrying a citizen, does not by itself give you the right to remain. That is a separate immigration question. If moving there is the real plan, tell me at the start and we sort both together.`,
        },
      ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
        title={`Getting married in ${c.name}`}
        crumb="Marry"
        intro={
          residentOnly
            ? `${c.name} only marries couples where one of you lives there, so this is the one country I usually cannot arrange a wedding in. Here is what that means, and where to go instead.`
            : open
              ? "Planning the day from somewhere else? I handle the licence, the documents and the travel, for you and for everyone flying in."
              : `I am confirming ${c.name}'s marriage procedure with the registry now. The travel side I can arrange today. Tell me your date and I will come back to you on the rest.`
        }
        photos={photos}
      />

      {/* THE PITCH */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-slate-700">{c.pitch}</p>

          <div
            className={`mt-8 rounded-2xl border p-6 ${
              residentOnly || !open ? "border-accent/40 bg-accent-soft" : "border-brand/30 bg-brand-soft"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {residentOnly ? "Read this first" : open ? "Timing" : "Not open yet"}
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {residentOnly || open ? TIMING_LABEL[c.timing] : "I am confirming the procedure here"}
            </p>
            {residentOnly ? (
              <p className="mt-3 text-slate-700">
                {c.name} will only marry a couple where at least one of you actually lives in the country. Resident
                means living there with legal permission to do so, on a residence permit or as a citizen who lives
                there. A {c.name} passport does not count on its own if you live somewhere else, and neither does
                visiting, however long you stay. If that is not your situation,{" "}
                <Link href="/weddings" className="font-semibold text-brand hover:underline">
                  any of the other eleven
                </Link>{" "}
                will work instead.
              </p>
            ) : (
              <p className="mt-3 text-slate-700">
                {open
                  ? `Every country asks you to be on the ground for a set time before it will marry you, and ${c.name} sits at this end of the range. What exactly applies to the two of you depends on your circumstances, and sorting that out is where we start.`
                  : `I have not yet confirmed ${c.name}'s marriage procedure with the registry itself, so I am not quoting timings or costs for it. Tell me your date and I will confirm it and come back to you either way. Everything on the travel side, the flights, the rooms and the transfers, I can arrange today.`}
              </p>
            )}
            <p className="mt-3 text-sm font-semibold text-slate-700">Best suited to: {c.suits}</p>
          </div>
        </div>
      </Section>

      {/* THE GUIDE, where we publish one */}
      {marryGuide ? (
        <>
          <Section alt>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900">What {c.name} actually requires</h2>
              <p className="mt-3 text-slate-600">{marryGuide.summary}</p>
              <p className="mt-4 text-sm text-slate-500">
                Checked with the current published requirements in {marryGuide.checked}. Countries change their fees and
                their rules without announcing it, so treat this as a solid starting point rather than the last word.
              </p>

              <h3 className="mt-10 text-lg font-bold text-slate-900">The licence</h3>
              <div className="mt-4 grid gap-3">
                {marryGuide.licences.map((l) => (
                  <div
                    key={l.name}
                    className={`rounded-2xl border p-5 ${
                      l.forYou ? "border-brand/40 bg-white" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="font-bold text-slate-900">{l.name}</h4>
                      {l.forYou ? (
                        <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                          Most visiting couples
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{l.detail}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-10 text-lg font-bold text-slate-900">How long you have to be there</h3>
              <p className="mt-3 text-slate-600">{marryGuide.waiting}</p>

              <h3 className="mt-10 text-lg font-bold text-slate-900">Where it is handled</h3>
              <p className="mt-3 text-slate-600">{marryGuide.office}</p>

              <h3 className="mt-10 text-lg font-bold text-slate-900">What to bring</h3>
              <div className="mt-4">
                <CheckList items={marryGuide.documents} />
              </div>

              <h3 className="mt-10 text-lg font-bold text-slate-900">What it costs the country</h3>
              <p className="mt-3 text-slate-600">{marryGuide.officialCost}</p>
            </div>
          </Section>

          {/* The failure modes. The most useful thing on the page, and the
              reason most readers decide not to do this alone. */}
          <Section>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900">What catches people out</h2>
              <p className="mt-3 text-slate-600">
                None of these are hidden. They are just the things nobody thinks to check until they are standing at
                a counter with the wrong piece of paper.
              </p>
              <ul className="mt-6 grid gap-4">
                {marryGuide.catches.map((item) => (
                  <li key={item} className="rounded-2xl border border-accent/25 bg-accent-soft p-5">
                    <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7">
                <h3 className="text-lg font-bold text-slate-900">You can absolutely do this yourself</h3>
                <p className="mt-2 text-slate-700">
                  Everything above is on this page precisely so you can. Plenty of couples do, and if you are marrying
                  in {c.name} with two passports, two clean birth certificates and no previous marriages, it is not a
                  hard process.
                </p>
                <p className="mt-3 text-slate-700">
                  What I am for is the version that is not that. A certificate that does not say what it needs to say.
                  A divorce in another country. Office hours that do not fit your flights. Thirty guests trying to reach
                  the same island in the same week from four different airports. And a planner who needs briefing,
                  chasing and paying while you are in another time zone.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/plan-my-move" className={btnPrimary}>
                    Tell me about your wedding
                  </Link>
                  <Link href="/weddings/guests" className={btnGhost}>
                    See the guest side
                  </Link>
                </div>
              </div>
            </div>
          </Section>

          <Section alt>
            <SectionHead lead eyebrow="Step by step" title={`Getting married in ${c.name}, in order`} />
            <div className="mx-auto max-w-3xl">
              <ol className="grid gap-0">
                {marryGuide.steps.map((s, i) => (
                  <li
                    key={s.title}
                    className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-dashed border-slate-300 py-5 first:border-t-0 first:pt-0"
                  >
                    <span className="font-display text-2xl font-bold leading-none text-brand tabular-nums">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        </>
      ) : null}

      {/* WHAT I DO FOR THIS WEDDING */}
      <Section alt>
        <SectionHead
          eyebrow={`Your wedding in ${c.name}`}
          title={open ? "What I take off you" : "What I can do today"}
          intro={
            open
              ? "I handle the legal side and the travel, and I bring in a local planner for the day itself so you are not managing that separately either."
              : "The travel side is ready to go, and I can bring in a planner. The licence I will confirm for your date before either of us commits to anything."
          }
        />
        <div className="mx-auto max-w-3xl">
          <CheckList
            items={[
              open
                ? `The marriage licence for ${c.name}, start to finish`
                : `Confirming what ${c.name} asks of you, with the registry, for your date`,
              open
                ? "The exact document list for your situation, checked before you fly"
                : "Telling you straight away if the timing will not work for you",
              `Flights into ${c.name} for the two of you and for guests coming from different countries`,
              "Accommodation, including a block of rooms held together for your guests",
              "A local planner for the day itself, brought in and managed by me",
              "Airport transfers and moving everybody around on the day",
              "One travel page for your guests, so you stop answering the same question forty times",
              `The marriage certificate afterwards, legalised if you need it recognised outside ${c.name}`,
            ]}
          />
          <div className="mt-8">
            <WeHandleIt what={`the licence, the documents and the travel for a wedding in ${c.name}`} />
          </div>
        </div>
      </Section>

      {/* WHERE PEOPLE MARRY */}
      {places.length ? (
        <Section>
          <SectionHead
            eyebrow="The setting"
            title={`A few corners of ${c.name}`}
            intro="Somewhere to start if you have not settled on a spot yet."
          />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {places.map((p) => (
              <div key={p.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={`/destinations/${c.slug}`} className={btnGhost}>
              More about {c.name}
            </Link>
          </div>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section alt>
        <SectionHead eyebrow="Questions" title={`Marrying in ${c.name}`} />
        <div className="mx-auto grid max-w-3xl gap-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-navy/15 py-5">
              <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-600">
          Looking at more than one country?{" "}
          <Link href="/weddings" className="font-semibold text-brand hover:underline">
            Compare the twelve
          </Link>{" "}
          and I will help you pick.
        </p>
      </Section>

      <ConsultationCtaBlock
        lead={
          open
            ? `A Move Planning Consultation covering your wedding in ${c.name}, the licence, the documents and everybody’s travel, is $100, and it comes off the booking if you go ahead. Tell me what you have in mind and I will tell you what it actually takes.`
            : `Tell me your date for ${c.name} and I will confirm the procedure with the registry and come back to you either way. There is no charge for asking. A full Move Planning Consultation is $100 and comes off the booking if you go ahead.`
        }
      />
    </>
  );
}
