import Link from "next/link";
import type { Service } from "@/lib/defaults";
import { Section, PageHeader, CheckList } from "@/components/ui";
import { Icon, serviceIcon } from "@/components/icons";
import ContentSections from "@/components/ContentSections";
import CtaButtons from "@/components/CtaButtons";

// One labelled block of bullets inside the service detail panel.
function DetailBlock({
  heading,
  items,
  tone = "plain",
}: {
  heading: string;
  items?: string[];
  tone?: "plain" | "warn";
}) {
  if (!items?.length) return null;
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{heading}</h3>
      {tone === "warn" ? (
        <ul className="mt-3 grid gap-2.5">
          {items.map((item, i) => (
            <li key={i} className="relative pl-7 text-slate-600">
              <span aria-hidden="true" className="absolute left-0 top-0 text-accent">
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <CheckList items={items} className="mt-3" />
      )}
    </div>
  );
}

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
  const d = service.detail;
  const hasDetail = Boolean(
    d && (d.whoFor?.length || d.included?.length || d.youProvide?.length || d.notControlled?.length || d.process?.length)
  );

  const faqJsonLd = d?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: d.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

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

      {hasDetail ? (
        <Section alt>
          <div className="mx-auto grid max-w-3xl gap-10">
            <DetailBlock heading="Who this is for" items={d?.whoFor} />
            <DetailBlock heading="What is included" items={d?.included} />
            <DetailBlock heading="What you provide" items={d?.youProvide} />
            <DetailBlock heading="What we do not control" items={d?.notControlled} tone="warn" />

            {d?.process?.length ? (
              <div>
                <h3 className="text-lg font-semibold text-slate-900">From enquiry to done</h3>
                <ol className="mt-4 grid gap-4">
                  {d.process.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-slate-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {d?.feesNote ? (
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Fees</h3>
                <p className="mt-2 text-slate-600">{d.feesNote}</p>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {children}

      {d?.faqs?.length ? (
        <Section>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">Common questions</h2>
            <div className="mt-6 grid gap-4">
              {d.faqs.map((f, i) => (
                <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-6">
                  <summary className="cursor-pointer list-none font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                    <span className="flex items-start justify-between gap-4">
                      {f.q}
                      <span aria-hidden="true" className="mt-1 shrink-0 text-brand transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {d?.disclaimer || d?.related?.length ? (
        <Section alt={!d?.faqs?.length}>
          <div className="mx-auto max-w-3xl">
            {d?.disclaimer ? (
              <p className="rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
                {d.disclaimer}
              </p>
            ) : null}
            {d?.related?.length ? (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600">Related</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {d.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      <Section alt>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">{ctaText}</p>
          <div className="mt-7 flex justify-center">
            <CtaButtons message={`Hi Jo, I'm interested in ${subject}.`} primaryLink={service.primaryLink} />
          </div>
        </div>
      </Section>
    </>
  );
}
