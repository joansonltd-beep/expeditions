"use client";

import Link from "next/link";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnGhost, btnWhatsapp } from "@/components/ui";
import type { LinkRef } from "@/lib/defaults";

// A consistent CTA row. Every option a visitor had before is still here; what
// changed is that exactly one of them is now the primary.
//
// The row used to be three or four buttons of equal weight, so a page ended by
// offering a choice of ways to get in touch rather than one thing to do next.
// The enquiry form is the primary now: it works outside WhatsApp hours and Jo
// reads the situation before replying. WhatsApp keeps its own colour as the
// obvious fallback, and Chat stays a quiet third.
//
// A page that passes its own `primaryLink` (a flight request, a booking URL)
// keeps that in the primary slot, and the enquiry link drops back to a ghost
// button rather than disappearing.
const ENQUIRY_HREF = "/plan-my-move";
const ENQUIRY_LABEL = "Tell Jo about your plans";

export default function CtaButtons({
  message = "Hi Jo, I have an enquiry from your website.",
  primaryLink = null,
  showContact = true,
  enquiryLabel = ENQUIRY_LABEL,
}: {
  message?: string;
  primaryLink?: LinkRef | null;
  showContact?: boolean;
  enquiryLabel?: string;
}) {
  const { chatbotUrl } = useSiteClient();
  const waLink = useWhatsAppLink();

  // The enquiry link only takes the primary slot when the page has not claimed
  // it with something more specific.
  const enquiryIsPrimary = showContact && !primaryLink;

  return (
    <div className="flex flex-wrap gap-3">
      {primaryLink ? (
        <a
          href={primaryLink.href}
          target={primaryLink.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={btnPrimary}
        >
          {primaryLink.label}
        </a>
      ) : null}
      {enquiryIsPrimary ? (
        <Link href={ENQUIRY_HREF} className={btnPrimary}>
          {enquiryLabel}
        </Link>
      ) : null}
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={btnWhatsapp}>
        Message on WhatsApp
      </a>
      {chatbotUrl ? (
        <a href={chatbotUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}>
          Chat with us
        </a>
      ) : null}
      {showContact && !enquiryIsPrimary ? (
        <Link href={ENQUIRY_HREF} className={btnGhost}>
          {enquiryLabel}
        </Link>
      ) : null}
    </div>
  );
}
