// CARICOM salary survey endpoint. Validates a submission server-side, then
// forwards it to the Google Sheet webhook configured in SURVEY_WEBHOOK_URL
// (a Google Apps Script Web App bound to the destination Sheet). Fully
// anonymous: no name, email or IP is included in the forwarded payload.

import { CSME_COUNTRIES } from "@/lib/csmeData";
import {
  SURVEY_INDUSTRIES,
  EXPERIENCE_OPTIONS,
  EDUCATION_OPTIONS,
  COMMISSION_OPTIONS,
  EMPLOYER_TYPE_OPTIONS,
  PAY_FREQUENCY_OPTIONS,
} from "@/lib/surveyData";

const COUNTRIES = CSME_COUNTRIES.map((c) => c.name);

type SurveyPayload = {
  country: string;
  jobTitle: string;
  industry: string;
  experience: string;
  education: string;
  commission: string;
  monthlySalaryUsd: string;
  employerType: string;
  payFrequency: string;
  additionalIncome: string;
  comment: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validate(body: unknown): { ok: true; data: SurveyPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid submission." };
  const b = body as Record<string, unknown>;

  if (!isNonEmptyString(b.country) || !COUNTRIES.includes(b.country)) return { ok: false, error: "Select a valid country." };
  if (!isNonEmptyString(b.jobTitle)) return { ok: false, error: "Job title is required." };
  if (!isNonEmptyString(b.industry) || !(SURVEY_INDUSTRIES as readonly string[]).includes(b.industry)) {
    return { ok: false, error: "Select a valid industry." };
  }
  if (!isNonEmptyString(b.experience) || !(EXPERIENCE_OPTIONS as readonly string[]).includes(b.experience)) {
    return { ok: false, error: "Select your years of experience." };
  }
  if (!isNonEmptyString(b.education) || !(EDUCATION_OPTIONS as readonly string[]).includes(b.education)) {
    return { ok: false, error: "Select your education level." };
  }
  if (!isNonEmptyString(b.commission) || !(COMMISSION_OPTIONS as readonly string[]).includes(b.commission)) {
    return { ok: false, error: "Select a commission option." };
  }
  if (!isNonEmptyString(b.monthlySalaryUsd) || Number.isNaN(Number(b.monthlySalaryUsd)) || Number(b.monthlySalaryUsd) <= 0) {
    return { ok: false, error: "Enter a valid monthly salary." };
  }
  if (!isNonEmptyString(b.employerType) || !(EMPLOYER_TYPE_OPTIONS as readonly string[]).includes(b.employerType)) {
    return { ok: false, error: "Select an employer type." };
  }
  if (!isNonEmptyString(b.payFrequency) || !(PAY_FREQUENCY_OPTIONS as readonly string[]).includes(b.payFrequency)) {
    return { ok: false, error: "Select a pay frequency." };
  }
  if (b.additionalIncome !== "Yes" && b.additionalIncome !== "No") return { ok: false, error: "Select yes or no." };

  return {
    ok: true,
    data: {
      country: b.country,
      jobTitle: b.jobTitle.trim(),
      industry: b.industry,
      experience: b.experience,
      education: b.education,
      commission: b.commission,
      monthlySalaryUsd: String(Number(b.monthlySalaryUsd)),
      employerType: b.employerType,
      payFrequency: b.payFrequency,
      additionalIncome: b.additionalIncome,
      comment: isNonEmptyString(b.comment) ? b.comment.trim().slice(0, 1000) : "",
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

  const webhook = process.env.SURVEY_WEBHOOK_URL;
  if (!webhook) {
    console.info("[survey] (no SURVEY_WEBHOOK_URL set) received:", result.data);
    return Response.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result.data, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return Response.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[survey] failed to forward to webhook:", err);
    return Response.json({ ok: false, error: "Could not save your response right now. Please try again." }, { status: 502 });
  }
}
