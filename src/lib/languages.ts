// Languages the Translator tool supports. Kept to the official languages of
// CARICOM member states, which is the set a free machine-translation API
// actually covers.
//
// Most creoles (Jamaican Patwa, Trini Creole, Sranan Tongo) are still out:
// no free translation service handles them, and a low-quality LLM-only path
// would be worse than saying no. Haitian Creole is the exception. It is an
// official language of Haiti, it has an ISO code, and MyMemory translates it
// in both directions at the same quality as French.
//
// What it does not have is its own browser speech. Nothing recognises spoken
// Haitian Creole, so its microphone stays off. It is read aloud with a French
// voice, which is a genuine approximation rather than a fudge: Creole spelling
// is French-derived, so French pronounces it far closer than English would.

export type Language = {
  code: string; // ISO 639-1, used as the MyMemory langpair segment
  name: string; // as shown in the dropdown, endonym first
  short: string; // the plain name, for use inside a sentence
  where: string;
  rec: string; // BCP-47 tag for SpeechRecognition
  tts: string; // BCP-47 tag for speechSynthesis
  /**
   * Some languages can be read aloud but not listened to. Empty rec means no
   * browser recognises it, so the microphone is hidden. Empty tts would mean
   * no voice at all; an approximate voice is better than none, but say so.
   */
  ttsNote?: string;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", short: "English", where: "Every member state except Haiti and Suriname", rec: "en-US", tts: "en-US" },
  { code: "fr", name: "Français (French)", short: "French", where: "Haiti", rec: "fr-FR", tts: "fr-FR" },
  {
    code: "ht",
    name: "Kreyòl Ayisyen (Haitian Creole)",
    short: "Haitian Creole",
    where: "Haiti, and Haitian communities across the region",
    // No browser recognises spoken Haitian Creole, so the microphone stays off:
    // French recognition would return French words and we would then translate
    // the wrong sentence. Reading it aloud is a different matter. Creole
    // orthography is French-derived, so a French voice pronounces it far closer
    // than an English one, which mangles ou, è and the nasal vowels.
    rec: "",
    tts: "fr-FR",
    ttsNote: "Read aloud with a French voice, which is the closest match available. Pronunciation is approximate.",
  },
  { code: "nl", name: "Nederlands (Dutch)", short: "Dutch", where: "Suriname", rec: "nl-NL", tts: "nl-NL" },
  { code: "es", name: "Español (Spanish)", short: "Spanish", where: "Belize, and across the wider region", rec: "es-MX", tts: "es-MX" },
  { code: "hi", name: "हिन्दी (Hindi)", short: "Hindi", where: "Indo-Caribbean communities", rec: "hi-IN", tts: "hi-IN" },
  { code: "zh", name: "中文 (Mandarin)", short: "Mandarin", where: "Chinese communities in Suriname, Guyana, Trinidad, Jamaica", rec: "zh-CN", tts: "zh-CN" },
  { code: "pt", name: "Português (Portuguese)", short: "Portuguese", where: "Brazilian communities in Guyana and Suriname", rec: "pt-BR", tts: "pt-BR" },
];

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES.find((l) => l.code === code);
}
