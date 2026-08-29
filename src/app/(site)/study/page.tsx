import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader, SectionHead, CheckList, btnPrimary, btnGhost, type HeroPhoto } from "@/components/ui";
import { Icon } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import WeHandleIt from "@/components/WeHandleIt";
import SchoolSearch from "@/components/SchoolSearch";
import { getSiteSettings } from "@/lib/siteData";
import PricingBlock from "@/components/PricingBlock";
import { STUDY_PRICING } from "@/lib/journeyPricing";
import { NATIONAL_INSTITUTIONS } from "@/lib/schoolData";

export const metadata: Metadata = {
  title: "Go Study: Studying Within CARICOM",
  description:
    "Thinking about studying in another CARICOM country, including a University of the West Indies campus outside your own? Here's what actually applies, since CSME and free movement don't cover students.",
  keywords: [
    "studying in another CARICOM country",
    "University of the West Indies international students",
    "UWI regional scholarships",
    "CARICOM student visa",
    "student permit Caribbean",
  ],
  alternates: { canonical: "/study" },
};

// When the guidance on this page was last checked. Month precision; `iso` is
// the first of the month purely so it can go in a <time> element.
const LAST_UPDATED = { display: "August 2026", iso: "2026-08-01" };

// What we actually do for a student, set against what the school and the
// destination country decide. Keeping them apart is the point.
const WE_HELP = [
  "Researching institutions and what each one asks applicants for",
  "Working through the school's application and admission timeline with you",
  "Organising and checking the documents you need to gather",
  "Explaining the student visa or permit process for your destination country",
  "Cost of living, banking and what to expect once you land, country by country",
  "Flights, housing for your first weeks or first semester, and airport transfers",
  "Opening a bank account once you arrive, so you are not living on a foreign card",
];

const WE_DO_NOT = [
  "Admission. The institution decides who it accepts, on its own criteria.",
  "Scholarships and funding. Awards are made by the institution or the funding body.",
  "Student visas and permits. The destination country's immigration authority decides.",
  "Accreditation and licensing outcomes, particularly at private and offshore medical schools.",
  "Tuition fees, deadlines and entry requirements, which the institution sets and can change.",
];

// The information we need before we can say anything useful. Published so a
// student can gather it in advance rather than going back and forth.
const WE_WILL_ASK = [
  "What country and institution are you considering?",
  "Have you received an acceptance letter?",
  "What travel date are you targeting?",
  "Do you need accommodation or airport transfer help?",
  "What documents do you still need to organise?",
  "Are you travelling alone or with family?",
];

const STUDY_FAQS: { q: string; a: string }[] = [
  {
    q: "Does the CARICOM Skills Certificate cover studying?",
    a: "No. The Skills Certificate and CSME free movement are about the right to work. A student normally has to apply to the destination country's own immigration authority for a student visa or permit, separately from anything CSME covers.",
  },
  {
    q: "Can you get me admitted to a university?",
    a: "No. Admission is decided by the institution alone. What we do is help you research options, understand what each one asks for, organise your documents, and handle the travel and arrival side once you have an offer.",
  },
  {
    q: "Do you arrange scholarships?",
    a: "No. Scholarships are awarded by institutions and funding bodies on their own criteria. UWI publishes CARICOM-wide regional scholarships open to nationals of any member state, and it is worth applying directly, but we have no part in those decisions.",
  },
  {
    q: "Do I need an acceptance letter before contacting you?",
    a: "No. Plenty of people come to us while still deciding where to apply. An acceptance letter changes what we can do next, since most student visa applications require one, so tell us either way.",
  },
  {
    q: "Can you help my family come with me?",
    a: "We can help plan the travel and accommodation for everyone coming. Whether dependants are permitted to accompany a student, and on what terms, is set by the destination country's immigration rules, so that has to be checked country by country.",
  },
  {
    q: "Is studying at a UWI campus in another country simpler because UWI is regional?",
    a: "Academically it is one university across CARICOM, which helps. It does not remove the immigration step: a CARICOM national studying at a UWI campus outside their own country still needs that country's student visa or permit, the same as at any other school.",
  },
];

const UWI_CAMPUSES = [
  { name: "Mona", country: "Jamaica", url: "https://www.mona.uwi.edu" },
  { name: "St. Augustine", country: "Trinidad and Tobago", url: "https://sta.uwi.edu" },
  { name: "Cave Hill", country: "Barbados", url: "https://www.cavehill.uwi.edu" },
  { name: "Five Islands", country: "Antigua and Barbuda", url: "https://fiveislands.uwi.edu" },
  { name: "Open Campus", country: "Online, region-wide", url: "https://www.open.uwi.edu" },
];

// Campus photos for schools on this page where a verified, freely licensed
// photo could actually be found. Several institutions (SGU, University of
// Guyana, UWI Five Islands, and most of the offshore medical schools) don't
// have a usable free campus photo on Wikimedia Commons, so they're left out
// rather than guessed. UWI Cave Hill is also left out: the only Commons
// photos of it are a single low-res (640x480) 2010 phone-camera batch, none
// of which hold up full-bleed.
const SCHOOL_PHOTOS: HeroPhoto[] = [
  {
    src: "/photos/heroes/uwi-st-augustine.jpg",
    alt: "University of the West Indies campus, St. Augustine, Trinidad and Tobago",
    credit: "Baldur Brückner, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:TnT_St._Augustine_UWI_CampusFXD.jpg",
  },
  {
    src: "/photos/heroes/schools/uwi-mona.jpg",
    alt: "The chapel at UWI Mona campus, Jamaica",
    credit: "Sti2, CC BY-SA 3.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Chapel_Mona_Campus_UWI.jpg",
  },
  {
    src: "/photos/heroes/schools/university-of-belize.jpg",
    alt: "University of Belize, Central Campus",
    credit: "Josh Gross, CC BY 2.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:University_of_Belize,_Central_Campus.jpg",
  },
  {
    src: "/photos/heroes/schools/utt-san-fernando.jpg",
    alt: "University of Trinidad and Tobago, San Fernando campus",
    credit: "Baldur Brückner, CC BY-SA 4.0, via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:T%26T_San_Fernando_UTT_Campus_1.jpg",
  },
];

export default async function StudyPage() {
  const settings = await getSiteSettings();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: STUDY_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        icon={<Icon name="graduationCap" className="h-7 w-7 text-brand" />}
        title="Go Study"
        crumb="Go Study"
        intro="Thinking about studying somewhere else in CARICOM? Here's what actually applies, and where we can still help."
        photos={SCHOOL_PHOTOS}
      />

      {/* CSME DOESN'T COVER THIS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-slate-600">
            Last updated:{" "}
            <time dateTime={LAST_UPDATED.iso} className="font-semibold text-slate-900">
              {LAST_UPDATED.display}
            </time>
            . Student visa rules are set country by country and change without notice. Confirm the current position with
            the destination country&rsquo;s immigration authority and the institution before you act on anything here.
          </p>
          <h2 className="text-2xl font-bold text-slate-900">CSME doesn&rsquo;t cover studying</h2>
          <p className="mt-3 text-slate-600">
            The CSME Skills Certificate and full free movement are both about the right to work, not study. The CARICOM
            Special Visa that some CARICOM nationals travel on explicitly does not permit study either. In practice,
            that means a student moving to another CARICOM country has to apply directly to that country&rsquo;s own
            immigration authority for a student visa or student permit, separately from anything CSME covers.
          </p>
          <p className="mt-3 text-slate-600">
            Exactly what&rsquo;s required, and which office handles it, varies by country and isn&rsquo;t standardised the way the
            CSME certificate is. Confirm the current process with the immigration authority in the country you&rsquo;re
            headed to, and with the school itself, since some of the paperwork usually starts there.
          </p>
        </div>
      </Section>

      {/* UWI */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">One university, five campuses</h2>
          <p className="mt-3 text-slate-600">
            A lot of &ldquo;studying in another CARICOM country&rdquo; is really studying at a University of the West Indies (UWI)
            campus outside your own country. UWI is a single regional university shared across CARICOM, with campuses
            in:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {UWI_CAMPUSES.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-brand"
              >
                <p className="font-semibold text-slate-900">{c.name} ↗</p>
                <p className="text-sm text-slate-600">{c.country}</p>
              </a>
            ))}
          </div>
          <p className="mt-4 text-slate-600">
            UWI offers CARICOM-wide regional scholarships open to nationals of any member state, on top of
            campus-specific ones. Being a regional university doesn&rsquo;t remove the immigration step, though: a CARICOM
            national studying at a UWI campus outside their own country still needs that country&rsquo;s own student visa
            or permit, the same as at any other school.
          </p>
        </div>
      </Section>

      {/* OTHER UNIVERSITIES BY COUNTRY */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Beyond UWI: other universities and colleges, country by country</h2>
          <p className="mt-3 text-slate-600">
            Every one of our destination countries also has at least one national college or university, and several
            host private universities of their own, some serving mainly international students. A number of the
            smaller islands are known for hosting offshore medical schools, degree-granting institutions that also
            usually offer bachelor&rsquo;s degrees in nursing and other health sciences alongside the MD.
          </p>
          <div className="mt-6">
            <SchoolSearch institutions={NATIONAL_INSTITUTIONS} />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            This list covers degree-granting institutions (bachelor&rsquo;s level and up) in the countries we cover.
            Accreditation, tuition and admission requirements vary widely, especially at the private and offshore
            medical schools, so confirm current accreditation status and licensing pathways directly with the
            institution before applying.
          </p>
        </div>
      </Section>

      {/* WHAT A STUDENT VISA USUALLY ASKS FOR */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What&rsquo;s usually asked for</h2>
          <p className="mt-3 text-slate-600">
            Requirements differ by country, but most student visa or permit applications across the region ask for
            some combination of:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "An acceptance or admission letter from the school you're enrolling at",
              "A valid passport",
              "Proof you can cover tuition and living costs for your stay",
              "A medical certificate or police certificate, in some countries",
              "Passport photographs and a completed application form",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-slate-600">
                <span aria-hidden="true" className="mt-0.5 text-brand">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Treat this as a starting point, not a checklist to rely on: confirm the exact requirements with the
            destination country&rsquo;s immigration authority and the school before you apply.
          </p>
        </div>
      </Section>

      {/* WHO THIS IS FOR */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Who this is for</h2>
          <CheckList
            className="mt-4"
            items={[
              "CARICOM nationals considering a course in another CARICOM country",
              "Students heading to a UWI campus outside their own country",
              "Anyone holding an offer and now facing the visa, travel and arrival side",
              "Parents organising a move for a son or daughter starting a course",
              "Graduates who will want the Skills Certificate later, once they start looking for work",
            ]}
          />
        </div>
      </Section>

      {/* WE HANDLE APPLICATION THROUGH FIRST SEMESTER */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Every step, one contact"
            title="From application to your first semester, we can help"
            intro="Whichever school on this page you choose, you don't have to coordinate it all yourself. We help get you prepared and ready to go, from the application itself through to being settled in for your first semester."
            center={false}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-slate-900">What we help with</h3>
              <CheckList items={WE_HELP} className="mt-4 text-sm" />
            </div>
            <div className="rounded-2xl border border-accent/40 bg-accent-soft/50 p-7">
              <h3 className="text-lg font-semibold text-slate-900">What we do not decide</h3>
              <ul className="mt-4 grid gap-2.5">
                {WE_DO_NOT.map((item) => (
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
          <p className="mt-6 text-slate-600">
            And when you graduate and start looking for work, that&rsquo;s exactly when the CARICOM Skills Certificate comes
            in.{" "}
            <Link href="/caricom-skills-certificate" className="font-semibold text-brand hover:underline">
              Read the Skills Certificate guide →
            </Link>
          </p>
        </div>
      </Section>

      {/* WHAT WE WILL ASK */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What we will ask you</h2>
          <p className="mt-3 text-slate-600">
            Have these to hand and the first conversation goes a lot further. None of it is a test, and &ldquo;I do not
            know yet&rdquo; is a perfectly good answer to most of it.
          </p>
          <ol className="mt-5 grid gap-3">
            {WE_WILL_ASK.map((q, i) => (
              <li key={q} className="flex gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-slate-700">{q}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            Please do not send passport numbers, bank details or other sensitive information by website form or public
            message. Once we are talking, we will explain how to share documents securely.
          </p>

          <WeHandleIt what="the preparation for your studies abroad" className="mt-8" />

          <div className="mt-6 rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7">
            <h3 className="text-lg font-bold text-slate-900">
              Planning to study in another CARICOM country?
            </h3>
            <p className="mt-2 text-slate-700">
              Get guidance for your move, travel and settling-in arrangements. We work through what your destination
              and your institution ask for, then handle the practical side around it.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/plan-my-move" className={btnPrimary}>
                Plan My Move
              </Link>
              <Link href="/services" className={btnGhost}>
                Explore Our Services
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Get a personalised document plan, estimated timeline and practical next steps for your destination.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <PricingBlock pricing={STUDY_PRICING} />

      <Section alt>
        <SectionHead eyebrow="FAQ" title="Common questions about studying in CARICOM" />
        <div className="mx-auto grid max-w-3xl gap-4">
          {STUDY_FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-6">
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

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Ready to start, or still deciding?</h2>
          <p className="mt-3 text-slate-600">
            Either is fine. Tell us where you are thinking of studying and how far you have got. You can reach us on
            WhatsApp, through the chat, or by email at{" "}
            <a href={`mailto:${settings.generalEmail}`} className="font-semibold text-brand hover:underline">
              {settings.generalEmail}
            </a>
            .
          </p>
          <div className="mt-6">
            <CtaButtons message="Hi Jo, I'd like help preparing to study in another CARICOM country." />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Admission decisions are made by the institution. Student visa and immigration decisions are made by the
            destination country&rsquo;s authorities. We help you prepare for both and handle the practical arrangements
            around them.
          </p>
        </div>
      </Section>
    </>
  );
}
