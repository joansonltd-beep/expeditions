import type { Metadata } from "next";
import { Section, PageHeader, SectionHead } from "@/components/ui";
import { Icon } from "@/components/icons";
import CtaButtons from "@/components/CtaButtons";
import { getSiteSettings } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Studying in Another CARICOM Country",
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
  { name: "Mona", country: "Jamaica" },
  { name: "St. Augustine", country: "Trinidad and Tobago" },
  { name: "Cave Hill", country: "Barbados" },
  { name: "Five Islands", country: "Antigua and Barbuda" },
  { name: "Open Campus", country: "Online, region-wide" },
];

export default async function StudyPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHeader
        icon={<Icon name="graduationCap" className="h-12 w-12 text-brand" />}
        title="Studying in Another CARICOM Country"
        crumb="Study"
        intro="Thinking about studying somewhere else in CARICOM? Here's what actually applies, and where we can still help."
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
              <div key={c.name} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="font-semibold text-slate-900">{c.name}</p>
                <p className="text-sm text-slate-600">{c.country}</p>
              </div>
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

      {/* WHAT A STUDENT VISA USUALLY ASKS FOR */}
      <Section>
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

      {/* HOW WE HELP */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Where we come in"
            title="We can still help around the edges"
            intro="The visa or permit itself has to go through the destination country directly, but the rest of the move is exactly what we do every day."
            center={false}
          />
          <ul className="mt-2 space-y-2">
            {[
              "Cost of living, banking and what to expect once you land, country by country",
              "Opening a bank account once you arrive, so you're not relying on cash or a foreign card",
              "Flights, a place to stay for your first few weeks, and airport transfers",
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
              Have a question about studying in another CARICOM country? Reach out on WhatsApp, chat, or email{" "}
              <a href={`mailto:${settings.generalEmail}`} className="font-semibold text-brand hover:underline">
                {settings.generalEmail}
              </a>
              .
            </p>
            <div className="mt-4">
              <CtaButtons message="Hi Jo, I have a question about studying in another CARICOM country." />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
