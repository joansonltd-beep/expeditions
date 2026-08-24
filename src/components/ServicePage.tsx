import type { Service } from "@/lib/defaults";
import { Container, Section, PageHeader } from "@/components/ui";
import { Icon, serviceIcon } from "@/components/icons";
import ContentSections from "@/components/ContentSections";
import CtaButtons from "@/components/CtaButtons";

// Shared layout for a single service page. Extra children (finance packages,
// the featured stay) are slotted in after the main body.
export default function ServicePage({
  service,
  children,
  ctaTitle = "Ready when you are",
  ctaText = "Reach out and we will get back to you with options.",
  title,
  intro,
  footnote,
  ctaSubject,
}: {
  service: Service;
  children?: React.ReactNode;
  ctaTitle?: string;
  ctaText?: string;
  // Overrides for pages that want a punchier on-page headline/intro than the
  // service's canonical name, without changing the WhatsApp/chat message
  // text (which stays grammatically tied to the plain service name).
  title?: string;
  intro?: string;
  footnote?: string;
  ctaSubject?: string;
}) {
  const subject = ctaSubject ?? service.title;
  return (
    <>
      <PageHeader
        icon={<Icon name={serviceIcon(service.slug)} className="h-7 w-7 text-brand" />}
        title={title ?? service.title}
        intro={intro ?? service.intro}
        footnote={footnote}
        crumb={title ?? service.title}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <ContentSections sections={service.body} />
          <div className="mt-8">
            <CtaButtons message={`Hi Jo, I'm interested in ${subject}.`} primaryLink={service.primaryLink} />
          </div>
        </div>
      </Section>

      {children}

      <Section alt>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">{ctaText}</p>
          <div className="mt-7 flex justify-center">
            <CtaButtons message={`Hi Jo, I'm interested in ${subject}.`} primaryLink={service.primaryLink} />
          </div>
        </div>
      </Section>
    </>
  );
}
