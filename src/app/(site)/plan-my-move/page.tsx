import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead } from "@/components/ui";
import { Icon, type IconName } from "@/components/icons";
import PlanMyMoveForm from "@/components/PlanMyMoveForm";
import ServiceDisclaimer from "@/components/ServiceDisclaimer";

export const metadata: Metadata = {
  title: "Plan My Move: CARICOM Relocation Enquiry",
  description:
    "Tell us where you are moving from and to, why you are going and when. We will come back with the right next step for visiting, working or studying in another CARICOM country.",
  keywords: [
    "plan my move CARICOM",
    "CARICOM relocation help",
    "moving to another CARICOM country",
    "relocating within CARICOM",
    "CARICOM move planning",
  ],
  alternates: { canonical: "/plan-my-move" },
};

// The whole arc, from first thought to first weeks on the ground. Worded as
// guidance and coordination throughout: several of these stages are things we
// help you through rather than things we complete for you.
const STAGES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "globe",
    title: "Decide where to go",
    text: "Weigh the countries against cost of living and what you actually want out of the move.",
  },
  {
    icon: "compass",
    title: "Understand your requirements",
    text: "Work out what your passport and your destination actually call for.",
  },
  {
    icon: "passport",
    title: "Prepare CSME or other documents",
    text: "The documents your route needs, in the right order, checked before anything goes in.",
  },
  {
    icon: "banknote",
    title: "Plan banking, business or housing needs",
    text: "Which bank to approach and what they will want to see. Business registration if that is your route.",
  },
  {
    icon: "plane",
    title: "Arrange travel and accommodation",
    text: "Flights, somewhere to stay and airport transfers, booked around the dates your paperwork actually allows.",
  },
  {
    icon: "home",
    title: "Arrive and begin settling in",
    text: "A checklist for the first weeks, and someone to call when something comes up.",
  },
];

export default function PlanMyMovePage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="compass" className="h-7 w-7 text-brand" />}
        title="Plan My Move"
        crumb="Plan My Move"
        intro="Tell me where you are starting and where you want to go, and I will tell you what your situation actually needs."
        footnote="This is an initial enquiry rather than a finished plan, and there is no charge for asking."
      />

      {/* THE JOURNEY */}
      <Section>
        <SectionHead
          eyebrow="The journey"
          title="From the first question to the day you land"
          intro="Most people arrive somewhere in the middle of this. Tell us where you are and we will pick it up from there."
        />
        <ol className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-3xl rounded-xl border-l-4 border-brand bg-brand-soft px-4 py-3 text-sm text-slate-700">
          We give guidance and practical support at every stage, and we coordinate the parts that are ours to arrange.
          Decisions on certificates, visas, admission, employment, accounts and tenancies belong to the relevant
          authority or provider.
        </p>
      </Section>

      {/* THE FORM */}
      <Section alt id="form">
        <div className="mx-auto max-w-2xl">
          <PlanMyMoveForm />
          <ServiceDisclaimer className="mt-8" />
        </div>
      </Section>

      {/* WHERE ELSE TO GO */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">Not ready for that yet?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Read up first. The free guides cover how CARICOM movement works, what the Skills Certificate involves and
            what to expect country by country.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/guides" className="text-sm font-semibold text-brand hover:underline">
              Read the Free Guides →
            </Link>
            <Link href="/services" className="text-sm font-semibold text-brand hover:underline">
              Explore Our Services →
            </Link>
            <Link href="/destinations" className="text-sm font-semibold text-brand hover:underline">
              Browse country guides →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
