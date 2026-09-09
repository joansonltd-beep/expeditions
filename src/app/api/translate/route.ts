// Translation endpoint for the CARICOM Translator tool. Calls Claude
// server-side (the API key must never reach the browser) and builds the
// prompt entirely from our own language data (src/lib/languages.ts) keyed by
// the codes the client sends, rather than trusting any language name or
// description supplied in the request body.
import { getLanguage } from "@/lib/languages";

const MAX_CHARS = 600;
const MODEL = "claude-haiku-4-5-20251001";

// Basic per-IP rate limit. In-memory, so it resets on cold start and is not
// shared across serverless instances — good enough to stop casual/scripted
// hammering of a paid API, not a substitute for real abuse protection at
// higher traffic.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude guard against unbounded memory growth
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request): Promise<Response> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many requests. Wait a moment and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  const text = typeof b.text === "string" ? b.text.trim() : "";
  const fromCode = typeof b.from === "string" ? b.from : "";
  const toCode = typeof b.to === "string" ? b.to : "";

  if (!text) return Response.json({ ok: false, error: "Nothing to translate." }, { status: 400 });
  if (text.length > MAX_CHARS) {
    return Response.json({ ok: false, error: `Keep it under ${MAX_CHARS} characters.` }, { status: 400 });
  }

  const from = getLanguage(fromCode);
  const to = getLanguage(toCode);
  if (!from || !to) return Response.json({ ok: false, error: "Unknown language." }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[api/translate] ANTHROPIC_API_KEY is not set.");
    return Response.json({ ok: false, error: "Translator is not configured yet." }, { status: 503 });
  }

  let prompt = `Translate this from ${from.name} (${from.where}) into ${to.name} (${to.where}). `;
  prompt += "It comes from live spoken conversation, so render it the natural way a person would actually say it, not word for word. ";
  if (from.approx) prompt += "It was captured by a speech recogniser tuned to a different language, so some words may be garbled. Use context to work out what was meant. ";
  prompt += `Use the spelling conventions ordinary writers of ${to.name} use. `;
  if (to.rough) prompt += "If you are unsure of the correct wording, give your closest reasonable attempt rather than refusing. ";
  prompt += "Reply with the translation only. No notes, no alternatives, no quotation marks.\n\n" + text;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error("[api/translate] Anthropic API error:", res.status, await res.text());
      return Response.json({ ok: false, error: "Translation failed. Try again." }, { status: 502 });
    }

    const data = await res.json();
    const out = ((data.content ?? []) as Array<{ type: string; text?: string }>)
      .filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("")
      .trim();

    if (!out) return Response.json({ ok: false, error: "Translation failed. Try again." }, { status: 502 });
    return Response.json({ ok: true, text: out });
  } catch (err) {
    console.error("[api/translate] request failed:", err);
    return Response.json({ ok: false, error: "Translation failed. Try again." }, { status: 502 });
  }
}
