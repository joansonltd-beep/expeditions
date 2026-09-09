"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LANGUAGE_GROUPS, getLanguage, type Language } from "@/lib/languages";

type Entry = {
  id: number;
  fromCode: string;
  toCode: string;
  source: string;
  output: string | null;
  status: "pending" | "done" | "failed";
};

const TIER_LABEL: Record<Language["tier"], string> = {
  voice: "speaks and listens",
  typed: "type it in, hear it spoken",
  text: "written only",
};

function LanguageSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (code: string) => void;
}) {
  return (
    <div className="flex-1 min-w-[220px]">
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/55">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-navy/20 bg-white px-3 py-3 text-base font-semibold text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {LANGUAGE_GROUPS.map((g) => (
          <optgroup key={g.group} label={g.group}>
            {g.items.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name} — {l.where} ({TIER_LABEL[l.tier]})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default function Translator() {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("ht");
  const [typeMode, setTypeMode] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [typed, setTyped] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const nextId = useRef(1);
  const recogRef = useRef<any>(null);
  const listeningRef = useRef(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const fromLang = getLanguage(from)!;
  const toLang = getLanguage(to)!;

  useEffect(() => {
    setSpeechSupported(typeof window !== "undefined" && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const load = () => (voicesRef.current = window.speechSynthesis.getVoices());
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
  }, []);

  const canSpeak = speechSupported && !!fromLang.rec && !typeMode;

  const notices = useMemo(() => {
    const m: string[] = [];
    if (!speechSupported) m.push("This browser can't listen to speech. Chrome on a laptop or Android phone can. Typing works everywhere.");
    else if (!fromLang.rec) m.push(`No browser recognises spoken ${fromLang.name} yet, so type it instead.`);
    else if (fromLang.approx) m.push(`Speech recognition hears ${fromLang.name} through an ${fromLang.rec.startsWith("hi") ? "Hindi" : "English"} recogniser, so it will mangle some words. The translation step usually fixes them from context.`);
    if (toLang.via) m.push(`There is no ${toLang.name} voice on any browser, so the translation is read aloud by ${toLang.via}. The written text is the accurate part.`);
    if (!toLang.tts) m.push(`${toLang.name} has no browser voice, so translations appear as text only.`);
    if (toLang.rough || fromLang.rough) m.push(`Translation into or out of ${toLang.rough ? toLang.name : fromLang.name} is a rough guide. Check anything important with a speaker.`);
    return m;
  }, [fromLang, toLang, speechSupported]);

  function stopListening() {
    listeningRef.current = false;
    setListening(false);
    setInterim("");
    if (recogRef.current) {
      try {
        recogRef.current.stop();
      } catch {}
      recogRef.current = null;
    }
  }

  function startListening() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR || !fromLang.rec) return;
    const recog = new SR();
    recog.lang = fromLang.rec;
    recog.continuous = true;
    recog.interimResults = true;
    recog.onresult = (e: any) => {
      let live = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) handleUtterance(r[0].transcript.trim());
        else live += r[0].transcript;
      }
      setInterim(live);
    };
    recog.onerror = (e: any) => {
      if (e.error === "not-allowed") stopListening();
    };
    recog.onend = () => {
      if (listeningRef.current) {
        try {
          recog.start();
        } catch {}
      }
    };
    recogRef.current = recog;
    listeningRef.current = true;
    setListening(true);
    try {
      recog.start();
    } catch {}
  }

  useEffect(() => {
    stopListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, typeMode]);

  useEffect(() => {
    return () => stopListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      if (e.code === "Space" && el?.tagName !== "INPUT" && el?.tagName !== "SELECT") {
        e.preventDefault();
        listeningRef.current ? stopListening() : startListening();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromLang]);

  function speak(text: string, code: string) {
    const lang = getLanguage(code);
    if (!lang?.tts || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang.tts;
    const base = lang.tts.split("-")[0];
    const v = voicesRef.current.find((x) => x.lang === lang.tts) || voicesRef.current.find((x) => x.lang.startsWith(base));
    if (v) u.voice = v;
    u.rate = 0.98;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  async function handleUtterance(text: string) {
    if (!text) return;
    const id = nextId.current++;
    const srcCode = from,
      tgtCode = to;
    setEntries((prev) => [...prev, { id, fromCode: srcCode, toCode: tgtCode, source: text, output: null, status: "pending" }]);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, from: srcCode, to: tgtCode }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, output: data.text, status: "done" } : e)));
      const targetLang = getLanguage(tgtCode);
      if (targetLang?.tts && autoSpeak) speak(data.text, tgtCode);
    } catch {
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, output: null, status: "failed" } : e)));
    }
  }

  function sendTyped() {
    const v = typed.trim();
    if (!v) return;
    setTyped("");
    handleUtterance(v);
  }

  return (
    <div>
      <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-end gap-3">
          <LanguageSelect id="from-lang" label="You speak" value={from} onChange={setFrom} />
          <button
            type="button"
            onClick={() => {
              const f = from;
              setFrom(to);
              setTo(f);
            }}
            className="mb-0.5 rounded-full border border-navy/20 px-4 py-3 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
          >
            Swap
          </button>
          <LanguageSelect id="to-lang" label="They hear" value={to} onChange={setTo} />
        </div>

        {notices.length ? (
          <div className="mt-4 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm text-slate-700">
            {notices.join(" ")}
          </div>
        ) : null}
      </div>

      <div className="mt-5 min-h-[80px] rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
        {entries.length === 0 ? (
          <p className="py-6 text-center text-navy/55">
            Choose two languages, then start talking or typing. Everything you say lands here beside its translation.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((e) => {
              const src = getLanguage(e.fromCode)!;
              const tgt = getLanguage(e.toCode)!;
              return (
                <article key={e.id} className="rounded-xl border border-navy/10 bg-sand/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    {src.name} into {tgt.name}
                  </p>
                  <p className="mt-1.5 text-navy/70">{e.source}</p>
                  {e.status === "pending" ? (
                    <p className="mt-1.5 text-navy/50">Translating…</p>
                  ) : e.status === "failed" ? (
                    <p className="mt-1.5 text-sm text-red-600">That one didn&rsquo;t translate. Check your connection and try again.</p>
                  ) : (
                    <>
                      <p className="mt-1.5 text-xl font-semibold text-navy">{e.output}</p>
                      {tgt.rough ? <p className="mt-1 text-xs text-red-600">Rough rendering. Verify with a speaker before you rely on it.</p> : null}
                      {tgt.tts ? (
                        <button
                          type="button"
                          onClick={() => speak(e.output!, e.toCode)}
                          className="mt-2 rounded-full border border-navy/20 px-3 py-1 text-xs font-semibold text-navy transition hover:border-brand hover:text-brand"
                        >
                          Play again
                        </button>
                      ) : null}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-5 rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
        {interim ? <p className="mb-2 min-h-[20px] text-navy/50">{interim}</p> : null}

        {!canSpeak ? (
          <div className="flex gap-2">
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendTyped()}
              placeholder="Type what you want to say"
              className="flex-1 rounded-xl border border-navy/20 px-3 py-3 text-base text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            />
            <button type="button" onClick={sendTyped} className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
              Translate
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => (listening ? stopListening() : startListening())}
            className={`flex w-full items-center justify-center gap-3 rounded-xl px-4 py-4 text-base font-semibold text-white transition ${
              listening ? "bg-accent" : "bg-navy hover:bg-navy/90"
            }`}
          >
            {listening ? "Listening. Tap to stop" : "Start listening"}
          </button>
        )}

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-navy/60">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={autoSpeak} onChange={(e) => setAutoSpeak(e.target.checked)} />
            Speak translations out loud
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={typeMode} onChange={(e) => setTypeMode(e.target.checked)} />
            Type instead of speaking
          </label>
        </div>
      </div>
    </div>
  );
}
