// Bridges a filled-in enquiry form to the $100 payment step. The enquiry is
// held here, client-side, from the moment someone submits a form until they
// land back on /consultation-paid after paying through Fygaro — only then
// does captureLead()/the mailto hand-off actually fire. See
// ConsultancyPaymentPanel and ConsultationPaidClient.
//
// localStorage rather than sessionStorage: Fygaro's checkout may open in a
// new tab, and this needs to survive that.

export type PendingConsultation = {
  source: string; // which form produced this
  message: string; // full plain-text body, same shape captureLead() expects
  recommended?: string;
  figures?: Record<string, string | number>;
  mailtoSubject: string; // already encodeURIComponent'd
  mailtoBody: string; // already encodeURIComponent'd
  savedAt: number;
};

const KEY = "pendingConsultation";
// Long enough to get through a slow checkout, short enough that an
// abandoned, unrelated visit from earlier the same day can't fire later.
const MAX_AGE_MS = 60 * 60 * 1000;

export function savePendingConsultation(payload: Omit<PendingConsultation, "savedAt">): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...payload, savedAt: Date.now() }));
  } catch {
    // Storage can be unavailable (private browsing, quota). The payment
    // panel still shows; the return page's "we couldn't find your request"
    // fallback covers this case.
  }
}

export function takePendingConsultation(): PendingConsultation | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    localStorage.removeItem(KEY);
    const parsed = JSON.parse(raw) as PendingConsultation;
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}
