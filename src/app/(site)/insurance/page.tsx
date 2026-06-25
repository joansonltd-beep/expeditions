import type { Metadata } from "next";
import Image from "next/image";
import { Section, PageHeader, btnPrimary } from "@/components/ui";

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "Our insurance services have moved to joansonbjames.com, in partnership with Guardian Life of the Caribbean.",
};

const SITE = "https://www.joansonbjames.com";

export default function InsurancePage() {
  return (
    <>
      <PageHeader
        icon="🛡️"
        title="We have moved"
        crumb="Insurance"
        intro="Our insurance services now have their own dedicated home."
      />

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-slate-600">
            For life, health, critical illness, income protection and retirement planning, visit
            Joanson Baptiste James&rsquo;s dedicated insurance site, in partnership with Guardian Life
            of the Caribbean.
          </p>

          <div className="mt-7 flex justify-center">
            <a href={SITE} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Visit joansonbjames.com →
            </a>
          </div>

          <a href={SITE} target="_blank" rel="noopener noreferrer" className="mt-10 block" aria-label="Open joansonbjames.com">
            <Image
              src="/joansonbjames-snapshot.png"
              alt="Preview of joansonbjames.com"
              width={1200}
              height={1000}
              className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            />
          </a>
          <p className="mt-4 text-sm text-slate-400">Click the preview to open joansonbjames.com</p>
        </div>
      </Section>
    </>
  );
}
