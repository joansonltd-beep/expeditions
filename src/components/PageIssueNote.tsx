/**
 * "Something wrong here? Tell us." at the foot of a section's pages.
 *
 * Each section of the site has its own mailbox, so a correction about the
 * Study page lands in the Study inbox rather than the general one. There is
 * deliberately no address for About Us: it has no mailbox.
 */

export const SECTION_EMAILS = {
  visit: "visit@expeditionswithjo.com",
  work: "work@expeditionswithjo.com",
  study: "study@expeditionswithjo.com",
  marry: "marry@expeditionswithjo.com",
  destinations: "destinations@expeditionswithjo.com",
  tools: "tools@expeditionswithjo.com",
} as const;

export type Section = keyof typeof SECTION_EMAILS;

export default function PageIssueNote({ section }: { section: Section }) {
  const email = SECTION_EMAILS[section];
  return (
    <p className="mx-auto max-w-3xl px-5 pb-16 pt-12 text-center text-sm text-navy/70">
      Something on this page wrong, out of date, or missing? Email{" "}
      <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-navy">
        {email}
      </a>{" "}
      and it gets fixed.
    </p>
  );
}
