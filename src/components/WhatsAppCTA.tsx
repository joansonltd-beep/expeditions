"use client";

import Link from "next/link";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnWhatsapp } from "@/components/ui";
import { Container } from "@/components/ui";
import { track } from "@/lib/analytics";

/**
 * The closing action: WhatsApp first, because that is how most people actually
 * get in touch, with the consultation beside it.
 *
 * Sits on navy so it reads as the end of the page rather than another pale
 * section, and carries the phone and email as plain links underneath for
 * anyone who would rather not use WhatsApp at all.
 */
export default function WhatsAppCTA({
  title = "Tell Jo where you are starting",
  text = "Send a message with where you are, where you want to go and roughly when. I will come back to you, usually within a business day.",
  message = "Hi Jo, I'm thinking about another CARICOM country. Can you help?",
  location = "footer-cta",
}: {
  title?: string;
  text?: string;
  message?: string;
  location?: string;
}) {
  const { generalEmail } = useSiteClient();
  const waLink = useWhatsAppLink();

  return (
    <section className="bg-navy py-16 text-cream sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/75">{text}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location })}
              className={btnWhatsapp}
            >
              WhatsApp Jo
            </a>
            <Link
              href="/services#consultation"
              onClick={() => track("consultation_click", { location })}
              className={`${btnPrimary} bg-cream text-navy hover:bg-white`}
            >
              Book a Move Planning Consultation
            </Link>
          </div>

          <p className="mt-8 text-sm text-cream/65">
            Or call{" "}
            <a
              href="tel:+18687236644"
              onClick={() => track("phone_click", { location })}
              className="font-semibold text-cream underline-offset-4 hover:underline"
            >
              868-723-6644
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${generalEmail}`}
              onClick={() => track("email_click", { location })}
              className="font-semibold text-cream underline-offset-4 hover:underline"
            >
              {generalEmail}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
