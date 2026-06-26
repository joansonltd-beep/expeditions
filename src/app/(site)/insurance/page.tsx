import type { Metadata } from "next";
import Image from "next/image";
import { Section, PageHeader, btnPrimary, btnGhost } from "@/components/ui";
import { getInsurancePage } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "Our insurance services have moved to joansonbjames.com, in partnership with Guardian Life of the Caribbean.",
};

const SITE = "https://www.joansonbjames.com";
const BOOK = "https://www.joansonbjames.com/book";

export default async function InsurancePage() {
  const p = await getInsurancePage();
  return (
    <>
      <PageHeader icon="🛡️" title={p.title} crumb="Insurance" intro={p.intro} />

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-slate-600">{p.body}</p>

          <p className="mt-3 text-slate-500">{p.bookNote}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={BOOK} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              {p.bookLabel}
            </a>
            <a href={SITE} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              {p.visitLabel} →
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
