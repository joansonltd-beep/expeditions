"use client";

import Link from "next/link";
import { useSiteClient, useWhatsAppLink } from "@/components/SiteSettingsProvider";
import { btnPrimary, btnGhost, btnWhatsapp } from "@/components/ui";
import type { LinkRef } from "@/lib/defaults";

// A consistent CTA row: an optional service-specific primary button, plus
// WhatsApp and Chat. The WhatsApp message defaults to a friendly opener.
export default function CtaButtons({
  message = "Hi Jo, I have an enquiry from your website.",
  primaryLink = null,
  showContact = true,
}: {
  message?: string;
  primaryLink?: LinkRef | null;
  showContact?: boolean;
}) {
  const { chatbotUrl } = useSiteClient();
  const waLink = useWhatsAppLink();

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
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={btnWhatsapp}>
        Message on WhatsApp
      </a>
      {chatbotUrl ? (
        <a href={chatbotUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}>
          Chat with us
        </a>
      ) : null}
      {showContact ? (
        <Link href="/#contact" className={btnGhost}>
          Send an enquiry
        </Link>
      ) : null}
    </div>
  );
}
