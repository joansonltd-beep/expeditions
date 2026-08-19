// Utility cost survey endpoint. Validates a submission server-side, then
// forwards it to the Google Sheet webhook configured in
// UTILITIES_SURVEY_WEBHOOK_URL (a separate Sheet from the salary survey's).
// Fully anonymous: no name, email or IP is included in the forwarded payload.

import { CSME_COUNTRIES } from "@/lib/csmeData";
import { UTILITY_TYPES } from "@/lib/surveyData";

const COUNTRIES = CSME_COUNTRIES.map((c) => c.name);
type UtilityType = (typeof UTILITY_TYPES)[number];

type UtilitiesPayload = {
  country: string;
  householdSize: string;
  utilities: UtilityType[];
  amounts: Record<UtilityType, string>;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validate(body: unknown): { ok: true; data: UtilitiesPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid submission." };
  const b = body as Record<string, unknown>;

  if (!isNonEmptyString(b.country) || !COUNTRIES.includes(b.country)) return { ok: false, error: "Select a valid country." };

  const householdSize = Number(b.householdSize);
  if (!Number.isFinite(householdSize) || householdSize <= 0 || !Number.isInteger(householdSize)) {
    return { ok: false, error: "Enter how many people live in your household." };
  }

  if (!Array.isArray(b.utilities) || b.utilities.length === 0) {
    return { ok: false, error: "Select at least one utility you personally pay for." };
  }
  const utilities = b.utilities.filter((u): u is UtilityType => (UTILITY_TYPES as readonly string[]).includes(u as string));
  if (utilities.length !== b.utilities.length) return { ok: false, error: "Invalid utility selection." };

  const rawAmounts = typeof b.amounts === "object" && b.amounts !== null ? (b.amounts as Record<string, unknown>) : {};
  const amounts = {} as Record<UtilityType, string>;
  for (const u of UTILITY_TYPES) amounts[u] = "";

  for (const u of utilities) {
    const v = Number(rawAmounts[u]);
    if (!Number.isFinite(v) || v < 0) return { ok: false, error: `Enter a valid amount for ${u}.` };
    amounts[u] = String(v);
  }

  return {
    ok: true,
    data: { country: b.country, householdSize: String(householdSize), utilities, amounts },
  };
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }

  const webhook = process.env.UTILITIES_SURVEY_WEBHOOK_URL;
  if (!webhook) {
    console.info("[survey/utilities] (no UTILITIES_SURVEY_WEBHOOK_URL set) received:", result.data);
    return Response.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...result.data,
        utilities: result.data.utilities.join(", "),
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return Response.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[survey/utilities] failed to forward to webhook:", err);
    return Response.json({ ok: false, error: "Could not save your response right now. Please try again." }, { status: 502 });
  }
}
