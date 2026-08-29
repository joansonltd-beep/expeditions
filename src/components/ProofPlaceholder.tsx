import { Section, SectionHead } from "@/components/ui";

/**
 * Where real proof goes once it exists: client quotes, photographs of Jo
 * working, and short case studies.
 *
 * Renders NOTHING on the live site. It is a marker in the code, visible to
 * whoever is editing, so the gap is obvious without a fake testimonial or a
 * stock photo standing in for one. Nothing invented ever ships.
 *
 * To turn each on:
 *
 * 1. Testimonials — add them in Studio under "Testimonial". The home page
 *    already renders a real testimonial section as soon as one exists, and
 *    getTestimonials() filters out placeholder names, so a half-finished entry
 *    cannot go live by accident.
 *
 * 2. Photographs — drop files in public/photos/ and reference them. Jo's
 *    portrait is already live on the About page. Still wanted: Jo working with
 *    a client, and anything from an actual arrival or handover.
 *
 * 3. Case studies — needs Joanson to supply real situations with the client's
 *    permission, anonymised where they prefer. A case study should say what the
 *    person wanted, what was in the way, what we did, and what happened, with
 *    no claim that the outcome is typical or guaranteed.
 */
export default function ProofPlaceholder() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <Section alt>
      <SectionHead
        eyebrow="Editor note, not visible in production"
        title="Real proof goes here"
        intro="Testimonials, photographs and case studies. See the comment in src/components/ProofPlaceholder.tsx for how to add each. Nothing is invented in the meantime."
      />
    </Section>
  );
}
