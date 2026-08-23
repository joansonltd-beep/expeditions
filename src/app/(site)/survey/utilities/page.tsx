import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import UtilitiesSurveyForm from "@/components/UtilitiesSurveyForm";
import { CSME_COUNTRIES } from "@/lib/csmeData";

export const metadata: Metadata = {
  title: "CARICOM Utility Cost Survey",
  description:
    "An anonymous survey of what people actually pay for electricity, water, internet, mobile, cable and other utilities across the 12 CARICOM countries with CSME free movement. No name or email collected.",
  keywords: [
    "Caribbean utility costs",
    "electricity cost Trinidad and Tobago",
    "cost of utilities Jamaica",
    "average electricity bill Caribbean",
    "CARICOM cost of living survey",
  ],
  alternates: { canonical: "/survey/utilities" },
};

export default function UtilitiesSurveyPage() {
  const countries = CSME_COUNTRIES.map((c) => c.name);

  return (
    <>
      <PageHeader
        icon={<Icon name="banknote" className="h-7 w-7 text-brand" />}
        title="CARICOM Utility Cost Survey"
        crumb="Utility Cost Survey"
        intro="Help build a clearer picture of what utilities actually cost across CARICOM. This survey is completely anonymous: no name or email is collected, and responses are used only in aggregate."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-sm">
            <Link href="/survey" className="font-semibold text-brand hover:underline">
              ← SRU
            </Link>
          </p>
          <UtilitiesSurveyForm countries={countries} />
        </div>
      </Section>
    </>
  );
}
