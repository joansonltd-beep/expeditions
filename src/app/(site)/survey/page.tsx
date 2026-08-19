import type { Metadata } from "next";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import SurveyForm from "@/components/SurveyForm";
import { CSME_COUNTRIES } from "@/lib/csmeData";

export const metadata: Metadata = {
  title: "CARICOM Salary Survey",
  description:
    "An anonymous survey of salaries across the 12 CARICOM countries with CSME free movement: job title, industry, experience, education and gross monthly pay. No name or email collected.",
  keywords: [
    "CARICOM salary survey",
    "Caribbean salary survey",
    "average salary Trinidad and Tobago",
    "average salary Jamaica",
    "Caribbean pay by industry",
  ],
  alternates: { canonical: "/survey" },
};

export default function SurveyPage() {
  const countries = CSME_COUNTRIES.map((c) => c.name);

  return (
    <>
      <PageHeader
        icon={<Icon name="banknote" className="h-12 w-12 text-brand" />}
        title="CARICOM Salary Survey"
        crumb="Salary Survey"
        intro="Help build a clearer picture of what people actually earn across CARICOM. This survey is completely anonymous: no name or email is collected, and responses are used only in aggregate."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <SurveyForm countries={countries} />
        </div>
      </Section>
    </>
  );
}
