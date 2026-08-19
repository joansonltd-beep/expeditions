import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import RentSurveyForm from "@/components/RentSurveyForm";
import { CSME_COUNTRIES } from "@/lib/csmeData";

export const metadata: Metadata = {
  title: "Caribbean Rent Survey",
  description:
    "An anonymous survey of what people actually pay in rent across the 12 CARICOM countries with CSME free movement: property type, monthly rent in USD, what's included, and how it compares. No name or email collected.",
  keywords: [
    "Caribbean rent survey",
    "average rent Trinidad and Tobago",
    "average rent Jamaica",
    "cost of renting an apartment Caribbean",
    "CARICOM rent prices",
  ],
  alternates: { canonical: "/survey/rent" },
};

export default function RentSurveyPage() {
  const countries = CSME_COUNTRIES.map((c) => c.name);

  return (
    <>
      <PageHeader
        icon={<Icon name="home" className="h-12 w-12 text-brand" />}
        title="Caribbean Rent Survey"
        crumb="Rent Survey"
        intro="Help build a clearer picture of what rent actually costs across CARICOM. This survey is completely anonymous: no name or email is collected, and responses are used only in aggregate."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-sm">
            <Link href="/survey" className="font-semibold text-brand hover:underline">
              ← On The Ground
            </Link>
          </p>
          <RentSurveyForm countries={countries} />
        </div>
      </Section>
    </>
  );
}
