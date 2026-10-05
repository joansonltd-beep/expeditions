import type { ContentSection } from "@/lib/defaults";
import { CheckList } from "@/components/ui";

// Renders an array of flexible content sections (used by service pages, About,
// and Policies). A section with only a heading becomes a major divider title.
export default function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((s, i) => {
        const isDivider = (x: ContentSection) => x.heading && !x.paragraphs?.length && !x.bullets?.length && !x.note;
        const headingOnly = isDivider(s);
        // A section heading is only a level 3 once a divider above it has
        // claimed level 2. Without this the page jumps straight from its h1 to
        // an h3, which is what a screen reader reads as a missing section.
        // `font-sans` keeps the look identical: as a class it beats the
        // element rule in globals.css that puts h2 on the display serif.
        const underDivider = sections.slice(0, i).some(isDivider);
        if (headingOnly) {
          return (
            <h2 key={i} className="border-b border-slate-200 pb-2 pt-4 text-2xl font-bold text-slate-900">
              {s.heading}
            </h2>
          );
        }
        return (
          <div key={i} className="space-y-4">
            {s.heading ? (
              underDivider ? (
                <h3 className="text-xl font-semibold text-slate-900">{s.heading}</h3>
              ) : (
                <h2 className="font-sans text-xl font-semibold tracking-normal text-slate-900">{s.heading}</h2>
              )
            ) : null}
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
