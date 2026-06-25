import type { ContentSection } from "@/lib/defaults";
import { CheckList } from "@/components/ui";

// Renders an array of flexible content sections (used by service pages, About,
// and Policies). A section with only a heading becomes a major divider title.
export default function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((s, i) => {
        const headingOnly = s.heading && !s.paragraphs?.length && !s.bullets?.length && !s.note;
        if (headingOnly) {
          return (
            <h2 key={i} className="border-b border-slate-200 pb-2 pt-4 text-2xl font-bold text-slate-900">
              {s.heading}
            </h2>
          );
        }
        return (
          <div key={i} className="space-y-4">
            {s.heading ? <h3 className="text-xl font-semibold text-slate-900">{s.heading}</h3> : null}
            {s.paragraphs?.map((p, j) => (
              <p key={j} className="leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
            {s.bullets?.length ? <CheckList items={s.bullets} /> : null}
            {s.note ? (
              <div className="rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
                {s.note}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
