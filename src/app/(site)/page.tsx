import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings, getServices, getHomeContent } from "@/lib/siteData";
import { Section, SectionHead, Eyebrow, CheckList, Container, btnPrimary, btnAccent } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import RotatingHero from "@/components/RotatingHero";
import PhotoHeroDeclare from "@/components/PhotoHeroDeclare";
import { Icon, serviceIcon, pillarIcon, WHY_ICONS, STEP_ICONS } from "@/components/icons";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

// Title and description come from the root layout; this page only needs to
// claim its own canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [settings, services, home] = await Promise.all([getSiteSettings(), getServices(), getHomeContent()]);
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
  const waHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <>
      {/* HERO — full-bleed photo with dark overlay. Pulled up by the header's
          height so the transparent header sits directly on the photo. */}
      <section className="relative isolate -mt-[70px] flex min-h-[68vh] items-center overflow-hidden pt-[70px] sm:min-h-[80vh]">
        <PhotoHeroDeclare />
        <RotatingHero />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/80" />
        <Container className="relative z-10 py-24 sm:py-28">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              {settings.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{settings.heroSubcopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contact" className={btnPrimary}>
                Plan My Move
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              {home.heroStats.map((st, i) => (
                <div key={i} className={i > 0 ? "sm:border-l sm:border-white/20 sm:pl-8" : ""}>
                  <div className="text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">{st.value}</div>
                  <div className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/65">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* RELOCATION PILLARS */}
      <Section>
        <SectionHead eyebrow={home.pillarsEyebrow} title={home.pillarsTitle} intro={home.pillarsIntro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {home.pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-transparent hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="mb-4 grid h-13 w-13 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={pillarIcon(p.href)} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{p.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
        {/* Plan-my-move CTA */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-dashed border-brand/40 bg-brand-soft p-7 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{home.notSureTitle}</h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">{home.notSureText}</p>
          </div>
          <Link href="#contact" className={`${btnPrimary} shrink-0`}>
            Plan My Move
          </Link>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section alt>
        <SectionHead eyebrow={home.howEyebrow} title={home.howTitle} intro={home.howIntro} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.steps.map((s, i) => (
            <div key={i}>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
                <Icon name={STEP_ICONS[i] ?? "check"} className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* RELOCATION PLAN — same rotating hero photos as the top hero, no color overlay */}
      <section className="relative isolate overflow-hidden">
        <RotatingHero />
        <Container className="relative z-10 py-20 sm:py-28">
          <div className="max-w-2xl text-white">
            <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset ring-white/25 backdrop-blur">
              {home.bundleEyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{home.bundleTitle}</h2>
            <p className="mt-3 max-w-xl text-white/85">{home.bundleText}</p>
            <Link href="#contact" className={`${btnAccent} mt-7`}>
              Plan My Move
            </Link>
          </div>
        </Container>
      </section>

      {/* SETTLING IN */}
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
      </Section>

      {/* TRAVEL — "Go Visit": the travel-agency side, alongside relocation */}
      <Section alt>
        <SectionHead eyebrow={home.travelEyebrow} title={home.travelTitle} intro={home.travelIntro} />
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
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
        <p className="mt-8 text-center">
          <Link href="/getting-there" className="text-sm font-semibold text-brand hover:underline">
            See the full Go Visit page →
          </Link>
        </p>
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
              <p className="mt-2 text-sm text-slate-500">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DESTINATIONS */}
      <Section alt>
        <SectionHead eyebrow={home.testimonialsEyebrow} title={home.testimonialsTitle} intro="Cost of living, CSME steps and what to expect, country by country." />
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {destinations.map((g) => (
            <Link
              key={g.slug}
              href={`/destinations/${g.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-md"
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

      {/* CONTACT */}
      <Section id="contact">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow>{home.contactEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{home.contactTitle}</h2>
            <p className="mt-4 text-slate-500">{home.contactIntro}</p>
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
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
