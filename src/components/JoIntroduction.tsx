import Image from "next/image";
import Link from "next/link";
import { Container, btnPrimary } from "@/components/ui";
import JoNote from "@/components/JoNote";

/**
 * Jo, near the top of the page, so the business reads as a person before it
 * reads as a service.
 *
 * Asymmetric on purpose: portrait in a narrower column, text in a wider one,
 * with the note breaking the grid underneath. The photograph is real and
 * already on the About page; nothing here is stock.
 */
export default function JoIntroduction() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <figure className="max-w-sm">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-navy/10">
              <Image
                src="/photos/jo.jpg"
                alt="Joanson Baptiste James, who runs Expeditions With Jo"
                fill
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-navy/60">
              <span className="font-semibold text-navy">Joanson Baptiste James</span>
              <span className="mt-0.5 block">Founder, Expeditions With Jo</span>
            </figcaption>
          </figure>

          <div className="lg:pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The person you deal with</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              I have made this move myself
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-navy/75">
              <p>
                So as you can tell from my photo, I am Grenadian. I moved to Trinidad first and went through their
                painstaking process, then more recently I moved to Jamaica.
              </p>
              <p>
                You would be dealing with someone who knows beyond theory what the process involves, and who knows how
                to avoid the pitfalls and the delays, especially the unnecessary administrative ones.
                <a href="#admin-delays" className="ml-0.5 align-super text-sm text-brand hover:underline">
                  *
                </a>
              </p>
              <p>
                Travelling is the easy part. As a former travel agency owner I can handle that side for you without any
                fuss: airfare, ground transfers and accommodation. My services tend to be cheaper than other travel
                agencies.
              </p>
            </div>

            {/* The asterisk. Says plainly what "avoiding delays" does and does
                not mean, so it cannot be read as a promise to jump a queue. */}
            <p id="admin-delays" className="mt-5 border-l-2 border-navy/15 pl-5 text-base text-navy/65">
              <span aria-hidden="true" className="text-brand">*</span> To be clear about that: I cannot speed up or
              override anybody&rsquo;s process. What I can do is make sure the only waiting you do is the waiting that
              is built in, rather than extra weeks caused by something missing or wrong in your application.
            </p>

            <JoNote className="mt-8">
              Tell me where you are starting and where you want to go. I will help you work out what to check first.
            </JoNote>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/plan-my-move" className={btnPrimary}>
                Tell Jo about your plans
              </Link>
              <Link href="/about" className="font-semibold text-brand hover:underline">
                More about Jo →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
