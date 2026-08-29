import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList, btnPrimary, btnGhost } from "@/components/ui";
import { Icon } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import ServiceDisclaimer from "@/components/ServiceDisclaimer";
import { SERVICE_TIERS, JOURNEY_STAGES } from "@/lib/serviceTiers";

export const metadata: Metadata = {
  title: "Our Services: Consultation, Skills Certificate Assistance and Full Support",
  description:
    "Three levels of support for CARICOM nationals visiting, working or studying in another CARICOM country: a Move Planning Consultation, CSME Skills Certificate assistance, or coordinated Complete Relocation Support.",
  keywords: [
    "CARICOM move planning consultation",
    "CSME Skills Certificate assistance",
    "CARICOM relocation package",
    "help moving to another CARICOM country",
    "CARICOM relocation service",
  ],
  alternates: { canonical: "/services" },
};

// Icons per tier, in order: a conversation, the certificate, the whole journey.
const TIER_ICONS = ["message", "passport", "compass"] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="briefcase" className="h-7 w-7 text-brand" />}
        title="Choose the support that fits your journey"
        crumb="Services"
        intro="Whether you need a clear plan, help preparing for work in another CARICOM country, or support coordinating the wider move, we can help you choose the right next step."
        footnote="Not sure which one applies to you? Start with a consultation and we will tell you honestly."
      />

      {/* THE THREE TIERS */}
      {SERVICE_TIERS.map((tier, i) => (
        <Section key={tier.id} id={tier.id} alt={i % 2 === 1}>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={TIER_ICONS[i] ?? "compass"} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {i === 0 ? "Start here" : i === 1 ? "For working abroad" : "Everything together"}
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{tier.title}</h2>
              </div>
            </div>

            <p className="mt-5 text-lg text-slate-600">{tier.intro}</p>

            {tier.whoFor?.length ? (
              <>
                <h3 className="mt-8 text-lg font-semibold text-slate-900">Who it is for</h3>
                <CheckList items={tier.whoFor} className="mt-3" />
              </>
            ) : null}

            {tier.reviews?.length ? (
              <>
                <h3 className="mt-8 text-lg font-semibold text-slate-900">What we review</h3>
                <CheckList items={tier.reviews} className="mt-3" />
              </>
            ) : null}

            {tier.youReceive?.length ? (
              <>
                <h3 className="mt-8 text-lg font-semibold text-slate-900">What you receive</h3>
                <CheckList items={tier.youReceive} className="mt-3" />
              </>
            ) : null}

            {/* Length and price render only once they are real. Until then this
                says so plainly rather than showing an invented figure. */}
            {tier.duration !== undefined || tier.price !== undefined ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">How long it takes</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {tier.duration ?? "To be confirmed. Ask us and we will tell you."}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Price</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {tier.price ?? "Request a quote. We confirm any fee in writing before you commit."}
                  </p>
                </div>
              </div>
            ) : null}

            <h3 className="mt-8 text-lg font-semibold text-slate-900">What it includes</h3>
            <CheckList items={tier.includes} className="mt-3" />

            <h3 className="mt-8 text-lg font-semibold text-slate-900">What it does not include</h3>
            <ul className="mt-3 grid gap-2.5">
              {tier.notIncluded.map((item) => (
                <li key={item} className="relative pl-6 text-slate-600">
                  <span aria-hidden="true" className="absolute left-0 top-0 text-accent">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {tier.id === "skills-certificate" ? (
              <p className="mt-6 rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
                Want to read up first? Our{" "}
                <Link href="/caricom-skills-certificate" className="font-semibold text-brand hover:underline">
                  free Skills Certificate guide
                </Link>{" "}
                covers the categories, the documents and the office to apply to in every CARICOM country. This service
                is for when you would rather have it prepared and checked with you.
              </p>
            ) : null}

            <div className="mt-7">
              <CtaButtons message={tier.waMessage} />
            </div>

            <ServiceDisclaimer className="mt-8" />
          </div>
        </Section>
      ))}

      {/* WHERE ARE YOU IN YOUR JOURNEY */}
      <Section>
        <SectionHead
          eyebrow="Still deciding?"
          title="Where are you in your journey?"
          intro="Pick whichever sounds most like you and we will point you at the right starting place."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {JOURNEY_STAGES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <h3 className="text-lg font-semibold text-slate-900">&ldquo;{s.label}&rdquo;</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{s.text}</p>
              <span className="mt-5 text-sm font-semibold text-brand group-hover:underline">{s.cta} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section alt>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Not sure which one you need?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            That is exactly what the consultation is for. Tell us where you are and where you want to go, and we will
            tell you which of these actually applies, or whether the free guides are enough for now.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/#contact" className={btnPrimary}>
              Book a Move Planning Consultation
            </Link>
            <Link href="/guides" className={btnGhost}>
              Read the Free Guides
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
