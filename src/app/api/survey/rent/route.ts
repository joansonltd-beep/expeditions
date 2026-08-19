// Rent survey endpoint. Validates a submission server-side, then forwards it
// to the Google Sheet webhook configured in RENT_SURVEY_WEBHOOK_URL (a
// separate Sheet from the salary and utilities surveys' own webhooks).
// Fully anonymous: no name, email or IP is included in the forwarded payload.

import { CSME_COUNTRIES } from "@/lib/csmeData";
import {
  RENT_PROPERTY_TYPES,
  RENT_INCLUDED_OPTIONS,
  FURNISHED_OPTIONS,
  AREA_TYPE_OPTIONS,
  RENT_DURATION_OPTIONS,
  RENT_INCREASE_OPTIONS,
  RENT_REASONABLE_OPTIONS,
} from "@/lib/surveyData";

const COUNTRIES = CSME_COUNTRIES.map((c) => c.name);

type RentPayload = {
  country: string;
  propertyType: string;
  monthlyRentUsd: string;
  included: string[];
  occupants: string;
  furnished: string;
  areaType: string;
  parking: string;
  duration: string;
  lastIncrease: string;
  reasonable: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validate(body: unknown): { ok: true; data: RentPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid submission." };
  const b = body as Record<string, unknown>;

  if (!isNonEmptyString(b.country) || !COUNTRIES.includes(b.country)) return { ok: false, error: "Select a valid country." };
  if (!isNonEmptyString(b.propertyType) || !(RENT_PROPERTY_TYPES as readonly string[]).includes(b.propertyType)) {
    return { ok: false, error: "Select a valid property type." };
  }
  const rent = Number(b.monthlyRentUsd);
  if (!Number.isFinite(rent) || rent <= 0) return { ok: false, error: "Enter a valid monthly rent." };

  if (!Array.isArray(b.included) || b.included.length === 0) {
    return { ok: false, error: "Select at least one option for what's included in your rent (or None)." };
  }
  const included = b.included.filter((u): u is string => (RENT_INCLUDED_OPTIONS as readonly string[]).includes(u as string));
  if (included.length !== b.included.length) return { ok: false, error: "Invalid selection for what's included in rent." };

  const occupants = Number(b.occupants);
  if (!Number.isFinite(occupants) || occupants <= 0 || !Number.isInteger(occupants)) {
    return { ok: false, error: "Enter how many people live in the property." };
  }

  if (!isNonEmptyString(b.furnished) || !(FURNISHED_OPTIONS as readonly string[]).includes(b.furnished)) {
    return { ok: false, error: "Select whether the property is furnished." };
  }
  if (!isNonEmptyString(b.areaType) || !(AREA_TYPE_OPTIONS as readonly string[]).includes(b.areaType)) {
    return { ok: false, error: "Select the type of area you live in." };
  }
  if (b.parking !== "Yes" && b.parking !== "No") return { ok: false, error: "Select yes or no for parking." };
  if (!isNonEmptyString(b.duration) || !(RENT_DURATION_OPTIONS as readonly string[]).includes(b.duration)) {
    return { ok: false, error: "Select how long you've been paying your current rent." };
  }
  if (!isNonEmptyString(b.lastIncrease) || !(RENT_INCREASE_OPTIONS as readonly string[]).includes(b.lastIncrease)) {
    return { ok: false, error: "Select when your rent last increased." };
  }
  if (!isNonEmptyString(b.reasonable) || !(RENT_REASONABLE_OPTIONS as readonly string[]).includes(b.reasonable)) {
    return { ok: false, error: "Select whether your rent feels reasonable." };
  }

  return {
    ok: true,
    data: {
      country: b.country,
      propertyType: b.propertyType,
      monthlyRentUsd: String(rent),
      included,
      occupants: String(occupants),
      furnished: b.furnished,
      areaType: b.areaType,
      parking: b.parking,
      duration: b.duration,
      lastIncrease: b.lastIncrease,
      reasonable: b.reasonable,
    },
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

  const webhook = process.env.RENT_SURVEY_WEBHOOK_URL;
  if (!webhook) {
    console.info("[survey/rent] (no RENT_SURVEY_WEBHOOK_URL set) received:", result.data);
    return Response.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result.data, included: result.data.included.join(", "), submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return Response.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[survey/rent] failed to forward to webhook:", err);
    return Response.json({ ok: false, error: "Could not save your response right now. Please try again." }, { status: 502 });
  }
}
