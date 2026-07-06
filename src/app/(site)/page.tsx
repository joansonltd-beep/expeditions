import Link from "next/link";
import Image from "next/image";
import { getSiteSettings, getServices, getTestimonials, getHomeContent } from "@/lib/siteData";
import { Section, SectionHead, Eyebrow, CheckList, Container, btn, btnPrimary, btnAccent } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import CsmePicker from "@/components/CsmePicker";
import { CSME_COUNTRIES } from "@/lib/csmeData";

// Presentation-only photo map (decorative), keyed by service slug. Falls back
// to the hero photo. Content still comes from Sanity.
const PHOTO: Record<string, string> = {
  flights: "/photos/flights.jpg",
  accommodations: "/photos/accommodations.jpg",
  transfers: "/photos/transfers.jpg",
  cruises: "/photos/cruises.jpg",
  "travel-visas": "/photos/travel-visas.jpg",
};

export default async function HomePage() {
  const [settings, services, testimonials, home] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTestimonials(),
    getHomeContent(),
  ]);
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
  const waHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <>
      {/* HERO — full-bleed photo with dark overlay */}
      <section className="relative isolate flex min-h-[68vh] items-center overflow-hidden sm:min-h-[80vh]">
        <Image
          src="/photos/hero.jpg"
          alt="A traveller looking out over a misty mountain landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/80" />
        <Container className="relative z-10 py-24 sm:py-28">
          <div className="max-w-2xl text-white">
            <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-inset ring-white/25 backdrop-blur">
              {settings.heroEyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              {settings.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{settings.heroSubcopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contact" className={btnPrimary}>
                Start planning
              </Link>
              {settings.chatbotUrl ? (
                <a
                  href={settings.chatbotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn} border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-white`}
                >
                  Chat with us
                </a>
              ) : null}
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              {home.heroStats.map((st, i) => (
                <div key={i} className="text-sm text-white/80">
                  <strong className="block text-2xl font-bold text-white">{st.value}</strong>
                  {st.label}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PILLARS */}
      <Section>
        <SectionHead eyebrow={home.pillarsEyebrow} title={home.pillarsTitle} intro={home.pillarsIntro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {home.pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-transparent hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="mb-4 grid h-13 w-13 place-items-center rounded-2xl bg-brand-soft p-3 text-2xl">{p.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{p.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* TRAVEL SERVICES — category row + photo cards */}
      <Section alt>
        <SectionHead eyebrow={home.travelEyebrow} title={home.travelTitle} intro={home.travelIntro} />

        {/* Circular category-filter row */}
        <div className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-6">
          {travel.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex w-20 flex-col items-center gap-2 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-2xl shadow-sm ring-1 ring-slate-200 transition group-hover:bg-brand group-hover:text-white group-hover:ring-brand group-hover:shadow-md">
                {s.icon}
              </span>
              <span className="text-center text-xs font-semibold text-slate-700 group-hover:text-brand">{s.title}</span>
            </Link>
          ))}
        </div>

        {/* Photo cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {travel.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={PHOTO[s.slug] ?? "/photos/hero.jpg"}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                  {s.scope}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.shortBlurb}</p>
                <CheckList items={s.cardFeatures.slice(0, 2)} className="mt-4 text-sm" />
                <span className="mt-5 inline-flex items-center gap-1 self-start rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand transition group-hover:bg-brand group-hover:text-white">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
          {/* Plan-a-trip CTA card */}
          <div className="flex flex-col justify-center gap-3.5 rounded-3xl border border-dashed border-brand/40 bg-brand-soft p-7">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl shadow-sm">🧳</div>
            <h3 className="text-lg font-bold text-slate-900">{home.notSureTitle}</h3>
            <p className="text-sm text-slate-600">{home.notSureText}</p>
            <Link href="#contact" className={`${btnPrimary} self-start`}>
              Plan my trip
            </Link>
          </div>
        </div>
      </Section>

      {/* BUNDLE — dark deep-green full-photo band (red accent CTA used sparingly) */}
      <section className="relative isolate overflow-hidden">
        <Image src="/photos/band.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/75 to-green-950/85" />
        <Container className="relative z-10 py-20 sm:py-28">
          <div className="max-w-2xl text-white">
            <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset ring-white/25 backdrop-blur">
              {home.bundleEyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{home.bundleTitle}</h2>
            <p className="mt-3 max-w-xl text-white/85">{home.bundleText}</p>
            <Link href="#contact" className={`${btnAccent} mt-7`}>
              Get a bundle quote
            </Link>
          </div>
        </Container>
      </section>

      {/* LOCAL SERVICES */}
      <Section>
        <SectionHead eyebrow={home.localEyebrow} title={home.localTitle} intro={home.localIntro} />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {localCards.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="mb-3.5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-xl">{s.icon}</div>
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
      </Section>

      {/* CARICOM SKILLS CERTIFICATE */}
      <Section alt>
        <SectionHead
          eyebrow="CARICOM"
          title="CARICOM Skills Certificate: apply in your country"
          intro="Want to live and work in another CARICOM country? Pick where you live and see exactly where to apply for your CARICOM (CSME) Skills Certificate."
        />
        <div className="mx-auto max-w-3xl">
          <CsmePicker countries={CSME_COUNTRIES} />
          <div className="mt-6">
            <Link href="/caricom-skills-certificate" className={`${btn} bg-brand-soft text-brand hover:bg-brand hover:text-white focus-visible:ring-brand`}>
              Read the full CARICOM Skills Certificate guide →
            </Link>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <SectionHead eyebrow={home.howEyebrow} title={home.howTitle} intro={home.howIntro} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.steps.map((s, i) => (
            <div key={i}>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand text-lg font-bold text-white">{i + 1}</div>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section alt>
        <SectionHead eyebrow={home.whyEyebrow} title={home.whyTitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {home.why.map((w, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="mb-3 text-2xl">{w.icon}</div>
              <h3 className="font-semibold text-slate-900">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHead eyebrow={home.testimonialsEyebrow} title={home.testimonialsTitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="mb-3 tracking-widest text-amber-400">★★★★★</div>
              <p className="italic text-slate-600">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {t.person}
                <span className="block font-normal text-slate-500">{t.context}</span>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section alt id="contact">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow>{home.contactEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{home.contactTitle}</h2>
            <p className="mt-4 text-slate-500">{home.contactIntro}</p>
            <ul className="mt-6 grid gap-3 text-sm font-medium text-slate-900">
              <li>
                💬{" "}
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                  WhatsApp 868-723-6644
                </a>
              </li>
              <li>
                📞 <a href="tel:+18687236644" className="hover:text-brand">Call 868-723-6644</a>
              </li>
              <li>
                ✉️ <a href={`mailto:${settings.generalEmail}`} className="hover:text-brand">{settings.generalEmail}</a>
              </li>
              {settings.chatbotUrl ? (
                <li>
                  🤖{" "}
                  <a href={settings.chatbotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                    Chat with us online
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
