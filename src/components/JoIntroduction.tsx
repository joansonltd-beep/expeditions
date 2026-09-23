import Link from "next/link";
import { Container, btnPrimary } from "@/components/ui";
import JoNote from "@/components/JoNote";
import ClientTicker from "@/components/ClientTicker";

/**
 * Jo, near the top of the page, so the business reads as a person before it
 * reads as a service.
 *
 * Asymmetric on purpose: video in a narrower column, text in a wider one,
 * with the note breaking the grid underneath. The clip is real, shot on a
 * beach; nothing here is stock. Muted, autoplaying and looped so it reads as
 * a moving portrait rather than something the visitor has to operate.
 */
export default function JoIntroduction() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <figure className="max-w-sm">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-navy/10">
              <video
                src="/videos/jo-beach.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Joanson Baptiste James, who runs Expeditions With Jo"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-navy/70">
              <span className="font-semibold text-navy">Joanson Baptiste James</span>
              <span className="mt-0.5 block">Founder, Expeditions With Jo</span>
            </figcaption>
          </figure>

          <div className="lg:pt-4">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Meet{" "}
              <Link href="/about" className="underline decoration-2 underline-offset-4 hover:text-brand">
                Jo
              </Link>
              , your partner for your expeditions
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-navy/75">
              <p>
                So as you can tell from the video, I am Grenadian. I moved to Trinidad in 2020, in the middle of the
                pandemic, which made that process about as painstaking as it gets. Then I moved again to Jamaica in
                2025. Before deciding either time, I worked through what all twelve CSME countries require, so I was
                choosing rather than guessing.
              </p>
              <p>
                You’d be working with someone who has actually done this, not just read about it, and who knows where
                the pitfalls and the unnecessary administrative delays usually are.
                <a href="#admin-delays" className="ml-0.5 align-super text-sm text-brand hover:underline">
                  *
                </a>
              </p>
              <p>
                Travelling itself is the easy part. As a former travel agency owner, I handle that side for you with no
                fuss: flights, ground transfers, accommodation. My rates usually come in lower than what you’d pay
                elsewhere.
              </p>
            </div>

            {/* The asterisk. Says plainly what "avoiding delays" does and does
                not mean, so it cannot be read as a promise to jump a queue. */}
            <p id="admin-delays" className="mt-5 border-l-2 border-navy/15 pl-5 text-base text-navy/70">
              <span aria-hidden="true" className="text-brand">*</span> To be clear about that: I cannot speed up or
              override anybody&rsquo;s process. What I can do is make sure the only waiting you do is the waiting that
              is built in, rather than extra weeks caused by something missing or wrong in your application.
            </p>

            <ClientTicker className="mt-9" />

            <JoNote className="mt-9">
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
