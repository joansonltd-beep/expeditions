import type { Metadata } from "next";
import { Section, PageHeader } from "@/components/ui";
import { CREDIT_GROUPS, OWN_CREDITS, LICENSED_CREDITS, type Attribution } from "@/lib/photoCredits";

/**
 * Photography credits for the whole site.
 *
 * The Creative Commons licences behind most of these photographs require the
 * photographer, the licence and the original to be identified. They do not
 * require that to sit under each photo: attribution may be given in any manner
 * reasonable for the medium, and on a website that is a credits page linked
 * from every page. Collecting them here keeps the obligation met and takes the
 * grey text off the photographs.
 *
 * Nothing on this page is written by hand. It is built from the same photo
 * data the pages render, so a new photo cannot be published uncredited.
 */

export const metadata: Metadata = {
  title: "Photography Credits",
  description:
    "Every photograph on Expeditions With Jo, with the photographer, the licence it is shared under, and a link to the original.",
  alternates: { canonical: "/credits" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function CreditRow({ c }: { c: Attribution }) {
  return (
    <li className="border-t border-navy/10 py-3 text-sm sm:flex sm:items-baseline sm:justify-between sm:gap-8">
      <span className="text-navy">
        {c.sourceUrl ? (
          <a
            href={c.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            {c.subject}
          </a>
        ) : (
          c.subject
        )}
      </span>
      <span className="mt-1 block shrink-0 text-navy/60 sm:mt-0 sm:text-right">
        {c.author}
        {c.licence ? (
          <>
            {" · "}
            {c.licenceUrl ? (
              <a
                href={c.licenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
              >
                {c.licence}
              </a>
            ) : (
              c.licence
            )}
          </>
        ) : null}
      </span>
    </li>
  );
}

export default function CreditsPage() {
  return (
    <>
      <PageHeader
        title="Photography credits"
        crumb="Photography credits"
        intro={`Most of the photographs on this site were taken by other people and shared under Creative Commons licences. Those licences let anyone reuse the work, commercial use included, as long as the photographer is named, the licence is named, and the original is linked.`}
        footnote="That is what this page is. Every photograph is listed below, and each one links to the original file."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          {OWN_CREDITS.length ? (
            <div className="mb-12">
              <h2 className="text-[1.6rem] font-bold tracking-tight text-navy">Photographs I took myself</h2>
              <p className="mt-2 text-navy/65">No licence needed for these ones. I was standing there.</p>
              <ul className="mt-5 border-b border-navy/10">
                {OWN_CREDITS.map((c) => (
                  <CreditRow key={c.src} c={c} />
                ))}
              </ul>
            </div>
          ) : null}

          <h2 className="text-[1.6rem] font-bold tracking-tight text-navy">Licensed photographs</h2>
          <p className="mt-2 text-navy/65">
            {LICENSED_CREDITS.length} photographs, listed by where they appear on the site. The licence name links to
            its full terms.
          </p>

          {CREDIT_GROUPS.map((g) => (
            <section key={g.title} id={slug(g.title)} className="mt-10 scroll-mt-24">
              <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-brand">{g.title}</h3>
              <ul className="mt-3 border-b border-navy/10">
                {g.items.map((c) => (
                  <CreditRow key={c.src} c={c} />
                ))}
              </ul>
            </section>
          ))}

          <p className="mt-12 text-sm text-navy/55">
            If you are one of the photographers here and something is credited wrongly, or you would rather it came
            down, email{" "}
            <a href="mailto:hello@expeditionswithjo.com" className="underline underline-offset-4 hover:text-navy">
              hello@expeditionswithjo.com
            </a>{" "}
            and it will be corrected or removed.
          </p>
        </div>
      </Section>
    </>
  );
}
