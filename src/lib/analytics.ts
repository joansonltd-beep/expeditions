// Conversion event tracking.
//
// No analytics provider is installed on this site today. Rather than pick one
// and add third-party tracking without the owner's decision (it carries a
// consent obligation under the privacy policy this site publishes), this is a
// provider-agnostic layer: it pushes named events to whichever tag is present
// and does nothing at all when none is.
//
// The moment GA4, Google Tag Manager, Plausible or Fathom is added, every event
// below starts reporting with no further code changes.
//
// Event names are documented in docs/analytics-events.md. Keep the two in step.

export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "form_start"
  | "form_submit"
  | "consultation_click"
  | "guide_cta_click"
  | "pathway_complete";

type Props = Record<string, string | number | boolean | undefined>;

type Gtag = (command: "event", name: string, params?: Props) => void;
type Plausible = (name: string, options?: { props?: Props }) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    plausible?: Plausible;
    fathom?: { trackEvent: (name: string) => void };
  }
}

/**
 * Report a conversion event. Safe to call anywhere, including during SSR and
 * when no analytics provider is loaded: it never throws and never blocks.
 */
export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;

  try {
    // Google Tag Manager, and GA4 when loaded through it.
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    }
    // GA4 loaded directly via gtag.js.
    if (typeof window.gtag === "function") {
      window.gtag("event", event, props);
    }
    // Plausible custom events.
    if (typeof window.plausible === "function") {
      window.plausible(event, { props });
    }
    // Fathom takes no properties.
    if (window.fathom && typeof window.fathom.trackEvent === "function") {
      window.fathom.trackEvent(event);
    }
  } catch {
    // Analytics must never break a page or interrupt a conversion.
  }
}

/**
 * Click handler for a contact link, picking the event from the href so a
 * WhatsApp, phone or email link reports itself correctly without each caller
 * having to remember which is which.
 */
export function trackContactClick(href: string, location: string): void {
  const h = href.toLowerCase();
  if (h.includes("wa.me") || h.includes("whatsapp")) track("whatsapp_click", { location });
  else if (h.startsWith("tel:")) track("phone_click", { location });
  else if (h.startsWith("mailto:")) track("email_click", { location });
}
