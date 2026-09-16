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
// What it does not have is browser speech. No mainstream browser ships
// recognition or a voice for ht-HT, so it is marked speech: false and the
// microphone and speaker are hidden for it rather than silently falling back
// to an English voice reading Creole aloud.

export type Language = {
  code: string; // ISO 639-1, used as the MyMemory langpair segment
  name: string;
  where: string;
  rec: string; // BCP-47 tag for SpeechRecognition
  tts: string; // BCP-47 tag for speechSynthesis
  /** False where no browser ships recognition or a voice: text only. */
  speech: boolean;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", where: "Every member state except Haiti and Suriname", rec: "en-US", tts: "en-US", speech: true },
  { code: "fr", name: "Français (French)", where: "Haiti", rec: "fr-FR", tts: "fr-FR", speech: true },
  { code: "ht", name: "Kreyòl Ayisyen (Haitian Creole)", where: "Haiti, and Haitian communities across the region", rec: "", tts: "", speech: false },
  { code: "nl", name: "Nederlands (Dutch)", where: "Suriname", rec: "nl-NL", tts: "nl-NL", speech: true },
  { code: "es", name: "Español (Spanish)", where: "Belize, and across the wider region", rec: "es-MX", tts: "es-MX", speech: true },
  { code: "hi", name: "हिन्दी (Hindi)", where: "Indo-Caribbean communities", rec: "hi-IN", tts: "hi-IN", speech: true },
  { code: "zh", name: "中文 (Mandarin)", where: "Chinese communities in Suriname, Guyana, Trinidad, Jamaica", rec: "zh-CN", tts: "zh-CN", speech: true },
  { code: "pt", name: "Português (Portuguese)", where: "Brazilian communities in Guyana and Suriname", rec: "pt-BR", tts: "pt-BR", speech: true },
];

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES.find((l) => l.code === code);
}
