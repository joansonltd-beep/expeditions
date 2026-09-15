import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader, SectionHead, CheckList, btnGhost, type HeroPhoto } from "@/components/ui";
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
    alternates: { canonical: `/marry/${c.slug}` },
  };
}

export default async function MarryCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const c = marryCountry(country);
  if (!c) notFound();

  const guide = getCountryGuide(c.slug);
  const residentOnly = c.timing === "resident-only";

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
          a: `${TIMING_LABEL[c.timing]}. The exact requirement depends on which licence applies to you and on your circumstances, and it is one of the first things I pin down, because it decides your flights and everybody's leave.`,
        },
        {
          q: `What do we need to bring to ${c.name}?`,
          a: "That depends on where you were born, where you live now and whether either of you has been married before. The form the documents take matters as much as having them, and getting it wrong is what sends couples back to a registry a second time. I work out the exact list for your situation and check everything before you fly.",
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
            : "Planning the day from somewhere else? I handle the licence, the documents and the travel, for you and for everyone flying in."
        }
        photos={photos}
      />

      {/* THE PITCH */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-slate-700">{c.pitch}</p>

          <div
            className={`mt-8 rounded-2xl border p-6 ${
              residentOnly ? "border-accent/40 bg-accent-soft" : "border-brand/30 bg-brand-soft"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {residentOnly ? "Read this first" : "Timing"}
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">{TIMING_LABEL[c.timing]}</p>
            {residentOnly ? (
              <p className="mt-3 text-slate-700">
                {c.name} will only marry a couple where at least one of you actually lives in the country. Resident
                means living there with legal permission to do so, on a residence permit or as a citizen who lives
                there. A {c.name} passport does not count on its own if you live somewhere else, and neither does
                visiting, however long you stay. If that is not your situation,{" "}
                <Link href="/marry" className="font-semibold text-brand hover:underline">
                  any of the other eleven
                </Link>{" "}
                will work instead.
              </p>
            ) : (
              <p className="mt-3 text-slate-700">
                Every country asks you to be on the ground for a set time before it will marry you, and {c.name} sits
                at this end of the range. What exactly applies to the two of you depends on your circumstances, and
                sorting that out is where we start.
              </p>
            )}
            <p className="mt-3 text-sm font-semibold text-slate-700">Best suited to: {c.suits}</p>
          </div>
        </div>
      </Section>

      {/* WHAT I DO FOR THIS WEDDING */}
      <Section alt>
        <SectionHead
          eyebrow={`Your wedding in ${c.name}`}
          title="What I take off you"
          intro="I handle the legal side and the travel. The florist, the photographer and the person running the day itself are local, and I will point you to them."
        />
        <div className="mx-auto max-w-3xl">
          <CheckList
            items={[
              `The marriage licence for ${c.name}, start to finish`,
              "The exact document list for your situation, checked before you fly",
              `Flights into ${c.name} for the two of you and for guests coming from different countries`,
              "Accommodation, including a block of rooms held together for your guests",
              "Airport transfers and moving everybody around on the day",
              "One travel page for your guests, so you stop answering the same question forty times",
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
            <div key={f.q} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-600">
          Looking at more than one country?{" "}
          <Link href="/marry" className="font-semibold text-brand hover:underline">
            Compare the twelve
          </Link>{" "}
          and I will help you pick.
        </p>
      </Section>

      <ConsultationCtaBlock
        lead={`A Move Planning Consultation covering your wedding in ${c.name}, the licence, the documents and everybody's travel, is $100. Tell me what you have in mind and I will tell you what it actually takes.`}
      />
    </>
  );
}
