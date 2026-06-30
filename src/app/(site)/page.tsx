import Link from "next/link";
import { getSiteSettings, getServices, getTestimonials, getHomeContent } from "@/lib/siteData";
import { Section, SectionHead, Eyebrow, CheckList, btnPrimary, btnGhost, btnAccent } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import HeroGallery from "@/components/HeroGallery";
import CsmePicker from "@/components/CsmePicker";
import { CSME_COUNTRIES } from "@/lib/csmeData";

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
      {/* HERO */}
      <Section className="!py-0">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Eyebrow>{settings.heroEyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {settings.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">{settings.heroSubcopy}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#contact" className={btnPrimary}>
                Start planning
              </Link>
              {settings.chatbotUrl ? (
                <a href={settings.chatbotUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  Chat with us
                </a>
              ) : null}
            </div>
            <div className="mt-9 flex flex-wrap gap-7 text-sm text-slate-500">
              {home.heroStats.map((st, i) => (
                <div key={i}>
                  <strong className="block text-xl font-bold text-slate-900">{st.value}</strong>
                  {st.label}
                </div>
              ))}
            </div>
          </div>
          <HeroGallery tiles={home.gallery} />
        </div>
      </Section>

      {/* PILLARS */}
      <Section>
        <SectionHead eyebrow={home.pillarsEyebrow} title={home.pillarsTitle} intro={home.pillarsIntro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {home.pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
            >
              <div className="mb-4 grid h-13 w-13 place-items-center rounded-2xl bg-brand-soft p-3 text-2xl">{p.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{p.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* TRAVEL SERVICES */}
      <Section alt>
        <SectionHead eyebrow={home.travelEyebrow} title={home.travelTitle} intro={home.travelIntro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {travel.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-3.5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-xl">{s.icon}</div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">{s.scope}</span>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-slate-600">{s.shortBlurb}</p>
              <CheckList items={s.cardFeatures} className="mt-auto text-sm" />
            </Link>
          ))}
          <div className="flex flex-col justify-center gap-3.5 rounded-2xl border border-transparent bg-brand-soft p-7">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-xl">🧳</div>
            <h3 className="text-lg font-semibold text-slate-900">{home.notSureTitle}</h3>
            <p className="text-sm text-slate-600">{home.notSureText}</p>
            <Link href="#contact" className={`${btnPrimary} self-start`}>
              Plan my trip
            </Link>
          </div>
        </div>
      </Section>

      {/* BUNDLE */}
      <Section>
        <div className="grid items-center gap-7 rounded-3xl bg-gradient-to-br from-brand to-cyan-700 p-10 text-white shadow-xl sm:grid-cols-[1.4fr_auto] sm:p-12">
          <div>
            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {home.bundleEyebrow}
            </span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{home.bundleTitle}</h2>
            <p className="mt-2 max-w-xl text-white/90">{home.bundleText}</p>
          </div>
          <Link href="#contact" className={`${btnAccent} justify-self-start sm:justify-self-end`}>
            Get a bundle quote
          </Link>
        </div>
      </Section>

      {/* LOCAL SERVICES */}
      <Section alt>
        <SectionHead eyebrow={home.localEyebrow} title={home.localTitle} intro={home.localIntro} />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {localCards.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-3.5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-xl">{s.icon}</div>
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
      <Section>
        <SectionHead
          eyebrow="CARICOM"
          title="CARICOM Skills Certificate: apply in your country"
          intro="Want to live and work in another CARICOM country? Pick where you live and see exactly where to apply for your CARICOM (CSME) Skills Certificate."
        />
        <div className="mx-auto max-w-3xl">
          <CsmePicker countries={CSME_COUNTRIES} />
          <div className="mt-6">
            <Link href="/caricom-skills-certificate" className={btnGhost}>
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
              <div className="mb-3 tracking-widest text-accent">★★★★★</div>
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
