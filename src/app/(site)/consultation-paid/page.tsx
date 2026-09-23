import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import ConsultationPaidClient from "@/components/ConsultationPaidClient";

// Set this exact URL as the Fygaro payment button’s return/success URL in
// the Fygaro dashboard: https://www.expeditionswithjo.com/consultation-paid
export const metadata: Metadata = {
  title: "Payment Received",
  robots: { index: false, follow: false },
  alternates: { canonical: "/consultation-paid" },
};

export default function ConsultationPaidPage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="check" className="h-7 w-7 text-brand" />}
        title="Payment received"
        crumb="Payment Received"
        intro="Thanks — your $100 consultation fee has gone through."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <ConsultationPaidClient />
        </div>
      </Section>
    </>
  );
}
