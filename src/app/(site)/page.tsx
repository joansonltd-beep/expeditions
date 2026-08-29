import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings, getServices, getHomeContent, getTestimonials } from "@/lib/siteData";
import { Section, SectionHead, Eyebrow, CheckList, Container, btnPrimary, btnGhost, btnAccent, btnWhatsapp } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import RotatingHero from "@/components/RotatingHero";
import PhotoHeroDeclare from "@/components/PhotoHeroDeclare";
import IndependenceBanner from "@/components/IndependenceBanner";
import ServiceDisclaimer from "@/components/ServiceDisclaimer";
import ProofPlaceholder from "@/components/ProofPlaceholder";
import { SERVICE_TIERS, JOURNEY_STAGES } from "@/lib/serviceTiers";
import { WHO_THIS_IS_FOR, WE_DO, THEY_DECIDE } from "@/lib/homeCopy";
import { Icon, serviceIcon, pillarIcon, journeyIcon, WHY_ICONS, STEP_ICONS } from "@/components/icons";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

// Title and description come from the root layout; this page only needs to
// claim its own canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [settings, services, home, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getHomeContent(),
    getTestimonials(),
  ]);
  const destinations = [...COUNTRY_GUIDES].sort((a, b) => a.name.localeCompare(b.name));
  const travel = services.filter((s) => s.category === "travel" || s.category === "visa");
  const finance = services.find((s) => s.slug === "finance");
  const localCards = [
    {
      slug: "insurance",
      icon: "🛡️",
      scope: home.localMoved.scope,
      title: home.localMoved.title,
      shortBlurb: home.localMoved.blurb,
      cardFeatures: home.localMoved.features,
    },
    ...(finance ? [finance] : []),
  ];
  const digits = settings.whatsappNumber.replace(/\D/g, "");
  const waHref = `https://wa.me/${digits}`;
  const waHero = `${waHref}?text=${encodeURIComponent(
    "Hi Jo, I'm thinking about another CARICOM country. Can you help?"
  )}`;

  // Published so search engines can surface these answers directly. Built from
  // the same content the page renders, so the two can never drift apart.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: home.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {home.faqs.length ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      {/* HERO — full-bleed photo with dark overlay. Pulled up by the header's
          height so the transparent header sits directly on the photo. */}
      <section className="relative isolate -mt-[70px] flex min-h-[68vh] items-center overflow-hidden pt-[70px] sm:min-h-[80vh]">
        <PhotoHeroDeclare />
        <RotatingHero />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/50 to-slate-950/85" />
        <Container className="relative z-10 py-24 sm:py-28">
          <div className="max-w-2xl text-white">
            <IndependenceBanner compact />
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              {settings.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90">{settings.heroSubcopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/find-my-pathway" className={btnPrimary}>
                Work out what I need to do first
              </Link>
              <Link
                href="/services#consultation"
                className={`${btnGhost} bg-white/10 text-white ring-1 ring-inset ring-white/40 backdrop-blur hover:bg-white/20 hover:text-white`}
              >
                Book a Move Planning Consultation
              </Link>
              <a href={waHero} target="_blank" rel="noopener noreferrer" className={btnWhatsapp}>
                Chat on WhatsApp
              </a>
            </div>
            {home.heroTrustNote ? (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75">{home.heroTrustNote}</p>
            ) : null}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              {home.heroStats.map((st, i) => (
                <div key={i} className={i > 0 ? "sm:border-l sm:border-white/20 sm:pl-8" : ""}>
                  <div className="text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">{st.value}</div>
                  <div className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/70">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* NATIONAL DAY — renders only in the run-up to a CARICOM independence day */}
      <IndependenceBanner />

      {/* THE THREE JOURNEYS — visit, work, study */}
      <Section>
        <SectionHead eyebrow={home.journeysEyebrow} title={home.journeysTitle} intro={home.journeysIntro} />
        <div className="grid gap-5 lg:grid-cols-3">
          {home.journeys.map((j) => (
            <Link
              key={j.href}
              href={j.href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="mb-4 grid h-13 w-13 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={journeyIcon(j.href)} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{j.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{j.text}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-brand group-hover:underline">
                {j.cta} →
              </span>
            </Link>
          ))}
        </div>
        {home.journeysNote ? (
          <p className="mx-auto mt-8 max-w-3xl rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
            {home.journeysNote}
          </p>
        ) : null}
      </Section>

      {/* WHO THIS IS FOR — the situations people actually arrive with, in
          their own words, rather than an abstract audience description. */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Who this is for</h2>
          <p className="mt-3 text-lg text-slate-600">
            Most people who get in touch are somewhere in one of these.
          </p>
          <ul className="mt-7 grid gap-4">
            {WHO_THIS_IS_FOR.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-slate-700">
                &ldquo;{item}&rdquo;
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600">
            Sound familiar?{" "}
            <Link href="/plan-my-move" className="font-semibold text-brand hover:underline">
              Tell Jo about your plans
            </Link>{" "}
            and we will pick it up from wherever you are.
          </p>
        </div>
      </Section>

      {/* SERVICE LADDER — the three paid levels of support, plus a compact
          "where are you up to" row so both questions (what do you want to do /
          how ready are you) get answered without two sections. */}
      <Section>
        <SectionHead eyebrow={home.ladderEyebrow} title={home.ladderTitle} intro={home.ladderIntro} />
        <div className="grid gap-5 lg:grid-cols-3">
          {SERVICE_TIERS.map((tier) => (
            <Link
              key={tier.id}
              href={`/services#${tier.id}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <h3 className="text-xl font-semibold text-slate-900">{tier.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{tier.cardText}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-brand group-hover:underline">
                {tier.cardCta} →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900">Where are you up to?</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {JOURNEY_STAGES.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group block rounded-xl border border-slate-200 px-5 py-4 transition hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span className="block font-semibold text-slate-900">&ldquo;{s.label}&rdquo;</span>
                  <span className="mt-2 block text-sm font-semibold text-brand group-hover:underline">{s.cta} →</span>
                </Link>
              </li>
            ))}
          </ul>
          <ServiceDisclaimer className="mt-7" />
        </div>
      </Section>

      {/* WHAT WE DECIDE AND WHAT WE DO NOT — the clearest way to set
          expectations, and the most important block on the page legally. */}
      <Section alt>
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <h2 className="text-xl font-bold text-slate-900">What I do</h2>
            <CheckList items={WE_DO} className="mt-4 text-sm" />
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/50 p-7">
            <h2 className="text-xl font-bold text-slate-900">What I do not decide</h2>
            <ul className="mt-4 grid gap-2.5">
              {THEY_DECIDE.map((item) => (
                <li key={item} className="relative pl-6 text-sm text-slate-700">
                  <span aria-hidden="true" className="absolute left-0 top-0 text-accent">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-4xl text-sm text-slate-600">
          If anyone in this line of work promises you a certificate, a visa or a job, walk away.
        </p>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <SectionHead eyebrow={home.howEyebrow} title={home.howTitle} intro={home.howIntro} />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.steps.map((s, i) => (
            <li key={i}>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
                <Icon name={STEP_ICONS[i] ?? "check"} className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">
                <span className="text-brand">{i + 1}.</span> {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
        {home.howNote ? (
          <p className="mx-auto mt-10 max-w-3xl rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            {home.howNote}
          </p>
        ) : null}
      </Section>

      {/* SKILLS CERTIFICATE FEATURE */}
      <section className="relative isolate overflow-hidden">
        <RotatingHero />
        <div className="absolute inset-0 bg-slate-950/45" />
        <Container className="relative z-10 py-20 sm:py-28">
          <div className="max-w-2xl text-white">
            <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset ring-white/25 backdrop-blur">
              {home.csmeEyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{home.csmeTitle}</h2>
            <p className="mt-3 max-w-xl text-white/90">{home.csmeText}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/caricom-skills-certificate" className={btnAccent}>
                Read the Skills Certificate guide
              </Link>
              <Link href="/getting-started" className={`${btnPrimary} bg-white/15 backdrop-blur hover:bg-white/25`}>
                See the whole work pathway
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* STUDY FEATURE */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Eyebrow>{home.studyEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{home.studyTitle}</h2>
            <p className="mt-4 text-slate-600">{home.studyText}</p>
            <Link href="/study" className={`${btnPrimary} mt-7`}>
              See what studying involves
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">What we help with</h3>
            <CheckList
              className="mt-4 text-sm"
              items={[
                "Researching institutions and what they ask for",
                "Organising the documents you need to gather",
                "The student visa or permit process, country by country",
                "Flights, first-semester housing and airport transfers",
                "Opening a bank account once you arrive",
              ]}
            />
            <p className="mt-5 text-sm text-slate-600">
              Admission and immigration decisions are made by the school and the destination country, not by us.
            </p>
          </div>
        </div>
      </Section>

      {/* SUPPORTING SERVICES */}
      <Section alt>
        <SectionHead eyebrow={home.supportEyebrow} title={home.supportTitle} intro={home.supportIntro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {home.pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="mb-4 grid h-13 w-13 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={pillarIcon(p.href)} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">{p.cta ?? "See how this helps"} →</span>
            </Link>
          ))}
        </div>

        {/* Travel arrangements: the practical layer under every journey */}
        <h3 className="mt-14 text-center text-sm font-semibold uppercase tracking-wider text-slate-600">
          Travel arrangements
        </h3>
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-6">
          {travel.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex w-20 flex-col items-center gap-2 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-slate-200 transition group-hover:bg-brand group-hover:text-white group-hover:ring-brand group-hover:shadow-md">
                <Icon name={serviceIcon(s.slug)} className="h-7 w-7" />
              </span>
              <span className="text-center text-xs font-semibold text-slate-700 group-hover:text-brand">{s.title}</span>
            </Link>
          ))}
        </div>

        {/* Settling in */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          {localCards.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="mb-3.5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={serviceIcon(s.slug)} className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">{s.scope}</span>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-slate-600">{s.shortBlurb}</p>
              <CheckList items={s.cardFeatures} className="mt-auto text-sm" />
            </Link>
          ))}
        </div>

        {/* Not sure where to start */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl border border-dashed border-brand/40 bg-brand-soft p-7 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{home.notSureTitle}</h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">{home.notSureText}</p>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-700">
              You get a document list built around your situation, a realistic timeline, and what to do first.
            </p>
          </div>
          <Link href="/plan-my-move" className={`${btnPrimary} shrink-0`}>
            Tell Jo about my plans
          </Link>
        </div>
      </Section>

      {/* WHY */}
      <Section>
        <SectionHead eyebrow={home.whyEyebrow} title={home.whyTitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {home.why.map((w, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={WHY_ICONS[i % WHY_ICONS.length]} className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{w.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-600">
          <Link href="/about" className="font-semibold text-brand hover:underline">
            More about Jo →
          </Link>
        </p>
      </Section>

      {/* Marker for where real proof goes. Renders nothing in production. */}
      <ProofPlaceholder />

      {/* TESTIMONIALS — renders only when real client quotes exist. Never
          populated with placeholder or invented text. */}
      {testimonials.length ? (
        <Section alt>
          <SectionHead eyebrow="In their words" title="What clients say" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
                <blockquote className="text-slate-700">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-slate-900">{t.person}</span>
                  {t.context ? <span className="block text-slate-600">{t.context}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {/* DESTINATIONS */}
      <Section alt={!testimonials.length}>
        <SectionHead
          eyebrow={home.testimonialsEyebrow}
          title={home.testimonialsTitle}
          intro="Cost of living, requirements and what to expect, country by country."
        />
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {destinations.map((g) => (
            <Link
              key={g.slug}
              href={`/destinations/${g.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {g.name}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center">
          <Link href="/destinations" className="text-sm font-semibold text-brand hover:underline">
            See all countries at a glance →
          </Link>
        </p>
      </Section>

      {/* FAQ */}
      {home.faqs.length ? (
        <Section>
          <SectionHead eyebrow={home.faqEyebrow} title={home.faqTitle} />
          <div className="mx-auto grid max-w-3xl gap-4">
            {home.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-6 open:shadow-sm"
              >
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
      ) : null}

      {/* CONTACT */}
      <Section id="contact" alt>
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow>{home.contactEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{home.contactTitle}</h2>
            <p className="mt-4 text-slate-600">{home.contactIntro}</p>
            <ul className="mt-6 grid gap-3 text-sm font-medium text-slate-900">
              <li className="flex items-center gap-2.5">
                <Icon name="message" className="h-4 w-4 shrink-0 text-brand" />
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-brand">WhatsApp 868-723-6644</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-brand" />
                <a href="tel:+18687236644" className="hover:text-brand">Call 868-723-6644</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${settings.generalEmail}`} className="hover:text-brand">{settings.generalEmail}</a>
              </li>
              {settings.chatbotUrl ? (
                <li className="flex items-center gap-2.5">
                  <Icon name="sparkles" className="h-4 w-4 shrink-0 text-brand" />
                  <a href={settings.chatbotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">Chat with us online</a>
                </li>
              ) : null}
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              We aim to reply within one business day. Messages sent over a weekend or public holiday are usually
              answered the next working day.
            </p>

            {/* Straight to WhatsApp, already knowing which journey you're on */}
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-600">
              Or start on WhatsApp
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "Visiting", msg: "Hi Jo, I'd like help visiting another CARICOM country." },
                { label: "Working", msg: "Hi Jo, I'd like help working in another CARICOM country." },
                { label: "Studying", msg: "Hi Jo, I'd like help studying in another CARICOM country." },
                { label: "Skills Certificate", msg: "Hi Jo, I'd like help with the CARICOM Skills Certificate." },
              ].map((o) => (
                <li key={o.label}>
                  <a
                    href={`${waHref}?text=${encodeURIComponent(o.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-whatsapp hover:text-whatsapp focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
                  >
                    {o.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
