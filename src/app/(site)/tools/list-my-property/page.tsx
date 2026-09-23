import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import PropertyIntakeForm from "@/components/PropertyIntakeForm";
import PageIssueNote from "@/components/PageIssueNote";
import { SITE_URL } from "@/lib/siteUrl";

/**
 * The way into property management: an owner answers the questions Airbnb
 * would ask, and walks out with a finished email to send us.
 *
 * It lives under Tools rather than as another enquiry form because that is
 * what it is. Nothing is posted to a server and nothing is stored: the form
 * composes an email the owner sends from their own account, which means the
 * enquiry arrives from a real address and there is no data of anyone else’s
 * sitting on this site waiting to leak.
 */

export const metadata: Metadata = {
  title: "List My Property: Airbnb Intake for Jamaican Owners",
  description:
    "Answer the questions Airbnb asks when a listing is created, plus the five that matter in Jamaica, and walk away with a ready-to-send email about managing your property.",
  keywords: [
    "list my property Jamaica",
    "Airbnb listing questions",
    "Airbnb property management Jamaica",
    "rent out my house Jamaica",
    "short term rental Jamaica owner",
  ],
  alternates: { canonical: "/tools/list-my-property" },
};

export default function ListMyPropertyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "List My Property",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    url: `${SITE_URL}/tools/list-my-property`,
    description:
      "An intake form for owners in Jamaica considering short-stay rental. Answers the questions Airbnb asks when a listing is created and produces an email to send.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        icon={<Icon name="home" className="h-7 w-7 text-brand" />}
        title="List my property"
        crumb="List my property"
        intro="Answer the same questions Airbnb asks when a listing goes up, and this builds you an email with all of it in one place. Useful even if you never send it: it tells you what you are missing."
        footnote="Jamaica for now. Nothing here is sent or stored, and the email goes from your own account."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brand/25 bg-brand-soft p-6">
            <p className="text-navy/80">
              Ten minutes of questions, and at the end you get an email you can read, change and send yourself. We
              reply with whether the property is worth listing and what it would realistically do.{" "}
              <Link href="/property-management" className="font-semibold text-brand hover:underline">
                What management involves
              </Link>
              .
            </p>
          </div>

          <div className="mt-8">
            <PropertyIntakeForm />
          </div>
        </div>
      </Section>

      <PageIssueNote section="tools" />
    </>
  );
}
