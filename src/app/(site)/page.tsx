import Link from "next/link";
import { getSiteSettings, getServices, getTestimonials } from "@/lib/siteData";
import { Container, Section, SectionHead, Eyebrow, CheckList, btnPrimary, btnGhost, btnAccent } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

const PILLARS = [
  { icon: "✈️", title: "Travel Booking", text: "Flights, stays, transfers and cruises, coordinated worldwide.", href: "/flights" },
  { icon: "🛡️", title: "Insurance", text: "We have moved. Our insurance services are now at joansonbjames.com.", href: "/insurance" },
  { icon: "💰", title: "Finance", text: "Help with loans, credit cards and registering your business.", href: "/finance" },
  { icon: "🛂", title: "Travel Visas", text: "Step-by-step support with the Canadian visa process from Trinidad.", href: "/travel-visas" },
];

const STEPS = [
  { n: 1, title: "Reach out", text: "Send us your dates, destination, budget or the help you need." },
  { n: 2, title: "Get options", text: "We put together options that fit your needs and your budget." },
  { n: 3, title: "Confirm", text: "Pick what works and we handle the booking and paperwork." },
  { n: 4, title: "Travel easy", text: "You get updates and support before and during your trip." },
];

const WHY = [
  { icon: "🤝", title: "One team, one booking", text: "Flights, stays and transfers handled together, so nothing falls through the gaps." },
  { icon: "💬", title: "Real support", text: "Clear updates and someone to talk to before and during your trip." },
  { icon: "💵", title: "Best available prices", text: "We look for options that fit your budget, then bundle to save you more." },
  { icon: "🧓", title: "Senior and group friendly", text: "Mobility support, accessibility needs and group travel are all welcome." },
  { icon: "📍", title: "Local roots", text: "Based in Trinidad and Tobago, serving travelers everywhere." },
  { icon: "✅", title: "Done right the first time", text: "We guide you through bookings, visas and paperwork step by step." },
];

export default async function HomePage() {
  const [settings, services, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTestimonials(),
  ]);
  const travel = services.filter((s) => s.category === "travel" || s.category === "visa");
  const finance = services.find((s) => s.slug === "finance");
  const localCards = [
    {
      slug: "insurance",
      icon: "🛡️",
      scope: "Now at joansonbjames.com",
      title: "Insurance",
      shortBlurb:
        "We have moved. Our insurance services are now handled at joansonbjames.com, in partnership with Guardian Life of the Caribbean.",
      cardFeatures: [
        "Life, health and critical illness",
        "Retirement and income protection",
        "Visit the site or book a consultation",
      ],
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
              <div>
                <strong className="block text-xl font-bold text-slate-900">Worldwide</strong>flights &amp; stays
              </div>
              <div>
                <strong className="block text-xl font-bold text-slate-900">Free</strong>finance guidance
              </div>
              <div>
                <strong className="block text-xl font-bold text-slate-900">One booking</strong>for the whole trip
              </div>
            </div>
          </div>
          <div className="relative grid min-h-[360px] place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-cyan-700 to-cyan-900 text-white shadow-xl">
            <div className="text-[5rem] opacity-90">🌍</div>
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg">
              ✈️ Flights booked
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg">
              🏡 Stays sorted
            </div>
            <div className="absolute bottom-24 left-7 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg">
              🚗 Transfers ready
            </div>
          </div>
        </div>
      </Section>

      {/* PILLARS */}
      <Section>
        <SectionHead
          eyebrow="What we do"
          title="Everything for your journey in one place"
          intro="From the first booking to the ride home, we handle the details so you can focus on the trip."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
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
        <SectionHead
          eyebrow="Travel, worldwide"
          title="Book the whole trip with one team"
          intro="Comfortable, reliable options at the best available prices, wherever you are headed."
        />
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
            <h3 className="text-lg font-semibold text-slate-900">Not sure where to start?</h3>
            <p className="text-sm text-slate-600">Tell us where you want to go and your budget. We will put together options that work for you.</p>
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
              Bundle &amp; save
            </span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Flight + stay + transfers, one simple booking</h2>
            <p className="mt-2 max-w-xl text-white/90">
              Book your trip together for a smoother, discounted experience. From planning to boarding, we make it easy. A credit card is required to confirm travel bookings.
            </p>
          </div>
          <Link href="#contact" className={`${btnAccent} justify-self-start sm:justify-self-end`}>
            Get a bundle quote
          </Link>
        </div>
      </Section>

      {/* LOCAL SERVICES */}
      <Section alt>
        <SectionHead
          eyebrow="Trinidad and Tobago"
          title="Insurance and finance, sorted locally"
          intro="Based in Trinidad and Tobago and ready to help you get things in order."
        />
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

      {/* HOW IT WORKS */}
      <Section>
        <SectionHead eyebrow="How it works" title="Simple from start to finish" intro="A clear process with support at every step." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand text-lg font-bold text-white">{s.n}</div>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section alt>
        <SectionHead eyebrow="Why book with us" title="One contact for the whole journey" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="mb-3 text-2xl">{w.icon}</div>
              <h3 className="font-semibold text-slate-900">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHead eyebrow="What travelers say" title="Trusted by travelers and families" />
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
            <Eyebrow>Get started</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tell us about your trip or what you need
            </h2>
            <p className="mt-4 text-slate-500">
              Fill in the form and we will get back to you with options. Prefer to talk now? Message us on WhatsApp or use the chat.
            </p>
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
