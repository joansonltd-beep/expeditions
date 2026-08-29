import Link from "next/link";
import { Container } from "@/components/ui";
import type { Article } from "@/lib/siteData";

// Rough category from the guide's own slug and keywords, so a label can be
// shown without inventing taxonomy the CMS does not have.
function categoryFor(a: Article): string {
  const hay = `${a.slug} ${a.title} ${(a.keywords ?? []).join(" ")}`.toLowerCase();
  if (hay.includes("stud") || hay.includes("school") || hay.includes("universit")) return "Study";
  if (hay.includes("visa") || hay.includes("visit") || hay.includes("flight")) return "Visit";
  if (hay.includes("resid") || hay.includes("reloc")) return "Relocation";
  return "Work";
}

function formatDate(d?: string): string | null {
  if (!d) return null;
  try {
    return new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  } catch {
    return null;
  }
}

/**
 * One featured guide with room to breathe, then three as a plain list.
 *
 * The Skills Certificate guide is always the feature: it is the site's main
 * entry point and the thing most people arrive looking for. The rest come from
 * the CMS in whatever order it returns them.
 */
export default function EditorialGuideFeature({ articles }: { articles: Article[] }) {
  const rest = articles.slice(0, 3);

  return (
    <section className="bg-sand py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Read first</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">CARICOM Move Basics</h2>
            <p className="mt-3 text-lg text-navy/70">
              Free to read, no sign-up. The general picture, so you know what you are dealing with before you spend
              anything.
            </p>
          </div>
          <Link href="/guides" className="font-semibold text-brand underline-offset-4 hover:underline">
            All guides →
          </Link>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Featured */}
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Featured &middot; Work</p>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
              <Link href="/caricom-skills-certificate" className="hover:underline">
                How the CARICOM Skills Certificate works
              </Link>
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-navy/75">
              The document that lets an eligible skilled CARICOM national work in another member state without a work
              permit. Who can apply, which office handles it in each country, and what happens after you submit.
            </p>
            <Link
              href="/caricom-skills-certificate"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:underline"
            >
              Read the guide
              <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* More */}
          <div className="lg:pt-9">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/50">More from the guides</h3>
            <ul className="mt-4">
              {rest.map((a) => {
                const date = formatDate(a.publishedAt);
                return (
                  <li key={a.slug} className="border-t border-navy/15 last:border-b">
                    <Link
                      href={`/guides/${a.slug}`}
                      className="group block py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                        {categoryFor(a)}
                        {date ? <span className="ml-2 font-normal normal-case tracking-normal text-navy/45">{date}</span> : null}
                      </span>
                      <span className="mt-1.5 block font-semibold text-navy group-hover:underline">{a.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
