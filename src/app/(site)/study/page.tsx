import type { Metadata } from "next";
import { Section, PageHeader, SectionHead, type HeroPhoto } from "@/components/ui";
import { Icon } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import SchoolSearch from "@/components/SchoolSearch";
import { getSiteSettings } from "@/lib/siteData";
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
  return (
    <>
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
          <h2 className="text-2xl font-bold text-slate-900">CSME doesn't cover studying</h2>
          <p className="mt-3 text-slate-600">
            The CSME Skills Certificate and full free movement are both about the right to work, not study. The CARICOM
            Special Visa that some CARICOM nationals travel on explicitly does not permit study either. In practice,
            that means a student moving to another CARICOM country has to apply directly to that country's own
            immigration authority for a student visa or student permit, separately from anything CSME covers.
          </p>
          <p className="mt-3 text-slate-600">
            Exactly what's required, and which office handles it, varies by country and isn't standardised the way the
            CSME certificate is. Confirm the current process with the immigration authority in the country you're
            headed to, and with the school itself, since some of the paperwork usually starts there.
          </p>
        </div>
      </Section>

      {/* UWI */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">One university, five campuses</h2>
          <p className="mt-3 text-slate-600">
            A lot of "studying in another CARICOM country" is really studying at a University of the West Indies (UWI)
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
            campus-specific ones. Being a regional university doesn't remove the immigration step, though: a CARICOM
            national studying at a UWI campus outside their own country still needs that country's own student visa
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
            usually offer bachelor's degrees in nursing and other health sciences alongside the MD.
          </p>
          <div className="mt-6">
            <SchoolSearch institutions={NATIONAL_INSTITUTIONS} />
          </div>
          <p className="mt-6 text-sm text-slate-500">
            This list covers degree-granting institutions (bachelor's level and up) in the countries we cover.
            Accreditation, tuition and admission requirements vary widely, especially at the private and offshore
            medical schools, so confirm current accreditation status and licensing pathways directly with the
            institution before applying.
          </p>
        </div>
      </Section>

      {/* WHAT A STUDENT VISA USUALLY ASKS FOR */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">What's usually asked for</h2>
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
          <p className="mt-4 text-sm text-slate-500">
            Treat this as a starting point, not a checklist to rely on: confirm the exact requirements with the
            destination country's immigration authority and the school before you apply.
          </p>
        </div>
      </Section>

      {/* WE HANDLE APPLICATION THROUGH FIRST SEMESTER */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Every step, one contact"
            title="From application to your first semester, we can help"
            intro="Whichever school on this page you choose, you don't have to coordinate it all yourself. We help get you prepared and ready to go, from the application itself through to being settled in for your first semester."
            center={false}
          />
          <ul className="mt-2 space-y-2">
            {[
              "Working through the school's application, required documents and admission timeline",
              "The student visa or permit process with the destination country's immigration authority",
              "Cost of living, banking and what to expect once you land, country by country",
              "Opening a bank account once you arrive, so you're not relying on cash or a foreign card",
              "Flights, housing for your first few weeks (or your first semester), and airport transfers",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-slate-600">
                <span aria-hidden="true" className="mt-0.5 text-brand">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-slate-600">
            And when you graduate and start looking for work, that's exactly when the CSME Skills Certificate comes
            in: reach out then too, and we'll walk you through that step.
          </p>
          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-slate-600">
              Have a question about studying in another CARICOM country, or ready to get started on an application?
              Reach out on WhatsApp, chat, or email{" "}
              <a href={`mailto:${settings.generalEmail}`} className="font-semibold text-brand hover:underline">
                {settings.generalEmail}
              </a>
              .
            </p>
            <div className="mt-4">
              <CtaButtons message="Hi Jo, I'd like help preparing to study in another CARICOM country." />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
