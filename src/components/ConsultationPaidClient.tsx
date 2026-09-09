"use client";

import { useEffect, useState } from "react";
import { useSiteClient } from "@/components/SiteSettingsProvider";
import { btnPrimary } from "@/components/ui";
import { captureLead } from "@/lib/leadCapture";
import { takePendingConsultation } from "@/lib/pendingConsultation";

// This is the page Fygaro should redirect to after a successful $10 payment
// (set as the payment button's return URL in the Fygaro dashboard). Landing
// here is treated as proof of payment — Fygaro doesn't hand back a
// verifiable token, so this trusts its own redirect the same way most small
// payment-button setups do. Worth a real test transaction before relying on
// it, and worth revisiting if Fygaro's return URL ever fires on a cancelled
// payment too, not just a completed one.
export default function ConsultationPaidClient() {
  const { generalEmail } = useSiteClient();
  const [state, setState] = useState<"sending" | "sent" | "missing">("sending");
  const [mailto, setMailto] = useState<string | null>(null);

  useEffect(() => {
    const pending = takePendingConsultation();
    if (!pending) {
      setState("missing");
      return;
    }
    captureLead({
      source: pending.source,
      message: pending.message,
      recommended: pending.recommended,
      figures: pending.figures,
    });
    setMailto(`mailto:${generalEmail}?subject=${pending.mailtoSubject}&body=${pending.mailtoBody}`);
    setState("sent");
  }, [generalEmail]);

  if (state === "missing") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">We couldn&rsquo;t find your request</h2>
        <p className="mt-2 text-sm text-slate-600">
          If you just paid, your browser may have lost your answers before we could match them up (a different
          browser or a very long delay can do this). Please email us directly so your payment isn&rsquo;t lost.
        </p>
        <a
          href={`mailto:${generalEmail}?subject=${encodeURIComponent("I paid for a consultation but the form was lost")}`}
          className={`${btnPrimary} mt-5 inline-flex`}
        >
          Email us
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-brand/30 bg-brand-soft p-7 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">Thanks — that&rsquo;s on its way</h2>
      <p className="mt-2 text-slate-700">
        {state === "sending" ? "Sending your request…" : "Your request has been sent. We will come back to you, usually within a business day."}
      </p>
      {mailto ? (
        <a href={mailto} className={`${btnPrimary} mt-5 inline-flex`}>
          Also send from your own email
        </a>
      ) : null}
    </div>
  );
}
