import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader, SectionHead } from "@/components/ui";
import { Icon } from "@/components/icons";
import { COUNTRY_GUIDES, getCountryGuide } from "@/lib/countryGuideData";
import { CSME_COUNTRIES } from "@/lib/csmeData";
import { SITE_URL } from "@/lib/siteUrl";

export function generateStaticParams() {
  return COUNTRY_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getCountryGuide(slug);
  if (!g) return { title: "Caribbean Country at a Glance" };
  return {
    title: `Moving to ${g.name}: Cost of Living & Relocation Facts`,
    description: `Thinking "I want to move to ${g.name}"? Here's what to expect: cost of living, places to see, things to do, where to eat, demographics and national symbols, plus how to apply for a CSME Skills Certificate.`,
    keywords: [
      `I want to move to ${g.name}`,
      `move to ${g.name}`,
      `moving to ${g.name}`,
      `moving to ${g.name} from Trinidad`,
      `relocate to ${g.name}`,
      `cost of living in ${g.name}`,
      `things to do in ${g.name}`,
      `${g.name} demographics`,
      `${g.name} national anthem`,
      `places to visit in ${g.name}`,
    ],
    alternates: { canonical: `/destinations/${g.slug}` },
  };
}

export default async function CountryGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getCountryGuide(slug);
  if (!g) notFound();

  const csmeCountry = CSME_COUNTRIES.find((c) => c.slug === g.slug);
  const hasCsmePage = Boolean(csmeCountry);
  const others = COUNTRY_GUIDES.filter((x) => x.slug !== g.slug);
  const fullFreeMovementNames = CSME_COUNTRIES.filter((c) => c.fullFreeMovement).map((c) => c.name);

  // Sections after "Moving here" alternate background, so when that section
  // is absent (country not yet covered), flip every later Section's alt so
  // the light/dark rhythm still lines up.
  const flip = Boolean(g.movingHere);

  const googleMapsUrl = g.coordinates
    ? `https://www.google.com/maps?q=${g.coordinates.lat},${g.coordinates.lng}`
    : undefined;

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Country",
    "@id": `${SITE_URL}/destinations/${g.slug}#country`,
    name: g.name,
    description: g.overview,
    ...(g.coordinates
      ? { geo: { "@type": "GeoCoordinates", latitude: g.coordinates.lat, longitude: g.coordinates.lng } }
      : {}),
  };

  const moveToFaqs = [
    ...(hasCsmePage
      ? [
          {
            q: `How do I move to ${g.name} as a CARICOM national?`,
            a: `The CARICOM Skills Certificate (CSME) is the main route to live and work in ${g.name} without a work permit. See the CSME steps for ${g.name} for the full application process.`,
          },
          {
            q: "Do all CARICOM nationals need the certificate, or is there full free movement?",
            a: csmeCountry?.fullFreeMovement
              ? `${g.name} is one of four CARICOM countries with full free movement between themselves: ${fullFreeMovementNames.join(", ")}. Nationals of those four can live and work in ${g.name} without a CSME Skills Certificate. Everyone else moving to ${g.name} still needs the certificate.`
              : `No. Four CARICOM countries have gone further than the standard CSME certificate and implemented full free movement between themselves: ${fullFreeMovementNames.join(", ")}. Nationals of those four can work in each other's countries without a certificate. Everyone else, including anyone moving to or from ${g.name}, still applies for the CSME Skills Certificate.`,
          },
        ]
      : []),
    ...(g.visitorFaq ?? []),
  ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: moveToFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<Icon name="compass" className="h-12 w-12 text-brand" />}
        title={`Moving to ${g.name}`}
        crumb={g.name}
        intro={g.tagline}
      />

      {/* OVERVIEW + DEMOGRAPHICS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm">
            <Link href="/destinations" className="font-semibold text-brand hover:underline">
              ← All countries at a glance
            </Link>
          </p>

          {g.photo ? (
            <figure className="mt-5">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={g.photo.src}
                  alt={g.photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-400">
                {g.photo.alt}
                {" · "}
                {g.photo.creditUrl ? (
                  <a href={g.photo.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {g.photo.credit}
                  </a>
                ) : (
                  g.photo.credit
                )}
              </figcaption>
            </figure>
          ) : null}

          <p className="mt-5 text-lg text-slate-600">{g.overview}</p>

          <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Capital</p>
              <p className="mt-1 text-slate-700">{g.demographics.capital}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Population</p>
              <p className="mt-1 text-slate-700">
                {g.demographics.population.value}
                {g.demographics.population.sourceUrl ? (
                  <a
                    href={g.demographics.population.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1.5 text-xs font-medium text-brand hover:underline"
                  >
                    ({g.demographics.population.sourceName})
                  </a>
                ) : (
                  <span className="ml-1.5 text-xs text-slate-400">({g.demographics.population.sourceName})</span>
                )}
              </p>
            </div>
            {g.demographics.areaKm2 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Area</p>
                <p className="mt-1 text-slate-700">{g.demographics.areaKm2}</p>
              </div>
            ) : null}
            {g.demographics.independence ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Independence</p>
                <p className="mt-1 text-slate-700">{g.demographics.independence}</p>
              </div>
            ) : null}
            {g.coordinates ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Coordinates</p>
                <p className="mt-1 text-slate-700">
                  {g.coordinates.display}
                  {googleMapsUrl ? (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1.5 text-xs font-medium text-brand hover:underline"
                    >
                      (view on Google Maps)
                    </a>
                  ) : null}
                </p>
              </div>
            ) : null}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Languages</p>
              <p className="mt-1 text-slate-700">{g.demographics.officialLanguages.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Currency</p>
              <p className="mt-1 text-slate-700">{g.demographics.currency}</p>
            </div>
            {g.demographics.medianAge ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Median age</p>
                <p className="mt-1 text-slate-700">{g.demographics.medianAge}</p>
              </div>
            ) : null}
            {g.demographics.outlyingPopulation ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Outlying islands</p>
                <p className="mt-1 text-slate-700">
                  {g.demographics.outlyingPopulation.value}
                  <span className="ml-1.5 text-xs text-slate-400">({g.demographics.outlyingPopulation.sourceName})</span>
                </p>
              </div>
            ) : null}
            {g.demographics.ageStructure ? (
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Age structure</p>
                <p className="mt-1 text-slate-700">{g.demographics.ageStructure}</p>
              </div>
            ) : null}
            {g.demographics.ethnicComposition ? (
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ethnic composition</p>
                <p className="mt-1 text-slate-700">
                  {g.demographics.ethnicComposition.value}
                  <span className="ml-1.5 text-xs text-slate-400">({g.demographics.ethnicComposition.sourceName})</span>
                </p>
              </div>
            ) : null}
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Government</p>
              <p className="mt-1 text-slate-700">{g.demographics.government}</p>
            </div>
            {g.demographics.urbanizationNote ? (
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Where people live</p>
                <p className="mt-1 text-slate-700">{g.demographics.urbanizationNote}</p>
              </div>
            ) : null}
          </div>

          {hasCsmePage ? (
            <div className="mt-6 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
              Want to move to {g.name}? CARICOM nationals can live and work there without a work permit.{" "}
              <Link href={`/caricom-skills-certificate/${g.slug}`} className="font-semibold text-brand hover:underline">
                See the CSME steps for {g.name} →
              </Link>
            </div>
          ) : null}
        </div>
      </Section>

      {/* COST OF LIVING */}
      <Section alt>
        <SectionHead eyebrow="Budgeting" title="Cost of living" />
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {g.costOfLiving.rentTypical1BR ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Rent, 1BR, ordinary local market</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.rentTypical1BR}</p>
              </div>
            ) : null}
            {g.costOfLiving.rentPremium1BR ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Rent, 1BR, marina / tourist areas</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.rentPremium1BR}</p>
              </div>
            ) : null}
            {g.costOfLiving.groceriesSingle ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Groceries, one person</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.groceriesSingle}</p>
              </div>
            ) : null}
            {g.costOfLiving.utilities ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Utilities, small apartment</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.utilities}</p>
              </div>
            ) : null}
            {g.costOfLiving.inexpensiveMeal ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Inexpensive restaurant meal</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.inexpensiveMeal}</p>
              </div>
            ) : null}
            {g.costOfLiving.midRangeMealForTwo ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Mid-range dinner for two</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.midRangeMealForTwo}</p>
              </div>
            ) : null}
            {g.costOfLiving.budgetModestSingle ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Modest monthly budget, single person</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.budgetModestSingle}</p>
              </div>
            ) : null}
            {g.costOfLiving.budgetComfortableSingle ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Comfortable monthly budget, single person</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{g.costOfLiving.budgetComfortableSingle}</p>
              </div>
            ) : null}
          </div>
          {g.costOfLiving.notes ? <p className="mt-5 text-sm text-slate-600">{g.costOfLiving.notes}</p> : null}
          <p className="mt-5 text-xs text-slate-400">
            Sources:{" "}
            {g.costOfLiving.sourceUrl ? (
              <a href={g.costOfLiving.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                {g.costOfLiving.sourceName}
              </a>
            ) : (
              g.costOfLiving.sourceName
            )}
            {g.costOfLiving.secondarySourceName ? (
              <>
                {" and "}
                {g.costOfLiving.secondarySourceUrl ? (
                  <a
                    href={g.costOfLiving.secondarySourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    {g.costOfLiving.secondarySourceName}
                  </a>
                ) : (
                  g.costOfLiving.secondarySourceName
                )}
              </>
            ) : null}
            , as of {g.costOfLiving.asOf}. Cost-of-living figures are estimates that shift with the season and the
            neighbourhood; treat them as a starting point, not a quote.
          </p>
        </div>
      </Section>

      {/* MOVING HERE */}
      {g.movingHere ? (
        <Section>
          <SectionHead eyebrow="Relocating" title={`Moving to ${g.name}`} intro="Visas, healthcare, taxes and where people settle, for anyone actually planning the move." />
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Visa and work permit</p>
              <p className="mt-2 text-slate-600">{g.movingHere.visaWorkPermit}</p>
            </div>
            {g.movingHere.residency ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Permanent residency</p>
                <p className="mt-2 text-slate-600">{g.movingHere.residency}</p>
              </div>
            ) : null}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Healthcare</p>
              <p className="mt-2 text-slate-600">{g.movingHere.healthcare}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Taxes</p>
              <p className="mt-2 text-slate-600">{g.movingHere.taxes}</p>
            </div>
            {g.movingHere.areas.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Where people settle</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {g.movingHere.areas.map((a) => (
                    <div key={a.name} className="rounded-xl border border-slate-200 bg-white p-5">
                      <p className="font-semibold text-slate-900">{a.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{a.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {g.movingHere.notes ? <p className="text-sm text-slate-600">{g.movingHere.notes}</p> : null}
            <p className="text-xs text-slate-400">
              Sources:{" "}
              {g.movingHere.sourceUrl ? (
                <a href={g.movingHere.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                  {g.movingHere.sourceName}
                </a>
              ) : (
                g.movingHere.sourceName
              )}
              {g.movingHere.secondarySourceName ? (
                <>
                  {" and "}
                  {g.movingHere.secondarySourceUrl ? (
                    <a
                      href={g.movingHere.secondarySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      {g.movingHere.secondarySourceName}
                    </a>
                  ) : (
                    g.movingHere.secondarySourceName
                  )}
                </>
              ) : null}
              , as of {g.movingHere.asOf}. Visa, residency and tax rules change: confirm current requirements with the
              relevant government agency before acting on them.
            </p>
          </div>
        </Section>
      ) : null}

      {/* PLACES TO SEE */}
      <Section alt={flip}>
        <SectionHead eyebrow="See" title="Places to see" />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {g.placesToSee.map((p, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCES */}
      <Section alt={!flip}>
        <SectionHead eyebrow="Do" title="Experiences to have" />
        <div className="mx-auto grid max-w-3xl gap-5">
          {g.experiences.map((e, i) => (
            <div key={i} className="flex gap-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{e.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* LOCAL DISHES */}
      {g.localDishes?.length ? (
        <Section alt={flip}>
          <SectionHead eyebrow="Eat" title="Local dishes to try" />
          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            {g.localDishes.map((d, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">{d.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{d.description}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* PLACES TO EAT */}
      <Section alt={!flip}>
        <SectionHead eyebrow="Eat" title="Best places to eat" />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {g.placesToEat.map((p, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">
                {p.name}
                {p.area ? <span className="ml-2 text-xs font-normal text-slate-400">{p.area}</span> : null}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* NATIONAL SYMBOLS */}
      <Section alt={flip}>
        <SectionHead eyebrow="National symbols" title="Anthem, motto and pledge" />
        <div className="mx-auto max-w-3xl space-y-5">
          {g.symbols.motto ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">National motto</h3>
              <p className="mt-2 text-slate-600">&ldquo;{g.symbols.motto}&rdquo;</p>
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">National anthem</h3>
            <p className="mt-2 text-slate-600">
              &ldquo;{g.symbols.anthem.title}&rdquo;
              {g.symbols.anthem.lyricist ? <>, words by {g.symbols.anthem.lyricist}</> : null}
              {g.symbols.anthem.composer ? <>, music by {g.symbols.anthem.composer}</> : null}
              {g.symbols.anthem.adopted ? <>. Adopted {g.symbols.anthem.adopted}.</> : null}
            </p>
            {g.symbols.anthem.officialUrl ? (
              <a
                href={g.symbols.anthem.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
              >
                Listen / read more →
              </a>
            ) : null}
          </div>

          {g.symbols.pledge ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">National pledge</h3>
              <p className="mt-2 whitespace-pre-line text-slate-600">{g.symbols.pledge.text}</p>
              <p className="mt-3 text-xs text-slate-400">Source: {g.symbols.pledge.sourceName}</p>
            </div>
          ) : null}
        </div>
      </Section>

      {/* FAQ */}
      {moveToFaqs.length ? (
        <Section alt={!flip}>
          <SectionHead eyebrow="FAQ" title={`${g.name}: frequently asked questions`} />
          <div className="mx-auto max-w-3xl">
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {moveToFaqs.map((f, i) => (
                <details key={i} className="group px-6 py-4 open:pb-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 marker:content-none">
                    {f.q}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
            {hasCsmePage ? (
              <p className="mt-5 text-sm text-slate-500">
                <Link href={`/caricom-skills-certificate/${g.slug}`} className="font-semibold text-brand hover:underline">
                  See the exact CSME steps for {g.name} →
                </Link>
              </p>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* OTHER COUNTRIES */}
      {others.length ? (
        <Section alt={flip}>
          <SectionHead eyebrow="More countries" title="Other countries at a glance" />
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/destinations/${o.slug}`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
