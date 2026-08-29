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
                Grenada to Trinidad, then Trinidad to Jamaica. So when you ask me which office to go to, what papers
                they want, or whether this step has to happen before that one, you are asking someone who has already
                had to work it out for himself.
              </p>
              <p>
                Nobody hands you a list. You find out what was needed after you needed it, and you make the trip twice.
                It was frustrating enough going through it that I started doing it for other people.
              </p>
              <p className="text-base text-navy/65">
                I ran a travel agency too, so flights, hotels and transfers were never the difficult part. The difficult
                part was always everything around them.
              </p>
            </div>

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
