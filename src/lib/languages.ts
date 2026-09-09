// Languages the Translator tool supports. Kept to the official languages of
// CARICOM member states: this is the set any browser can both listen to and
// speak natively, and the set a free machine-translation API actually covers.
// Creoles (Jamaican Patwa, Trini Creole, Sranan Tongo, etc.) and indigenous
// languages are not supported by any free translation service, so they are
// deliberately left out rather than given a low-quality LLM-only path.

export type Language = {
  code: string; // ISO 639-1, used as the MyMemory langpair segment
  name: string;
  where: string;
  rec: string; // BCP-47 tag for SpeechRecognition
  tts: string; // BCP-47 tag for speechSynthesis
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", where: "Every member state except Haiti and Suriname", rec: "en-US", tts: "en-US" },
  { code: "fr", name: "Français (French)", where: "Haiti", rec: "fr-FR", tts: "fr-FR" },
  { code: "nl", name: "Nederlands (Dutch)", where: "Suriname", rec: "nl-NL", tts: "nl-NL" },
  { code: "es", name: "Español (Spanish)", where: "Belize, and across the wider region", rec: "es-MX", tts: "es-MX" },
  { code: "hi", name: "हिन्दी (Hindi)", where: "Indo-Caribbean communities", rec: "hi-IN", tts: "hi-IN" },
  { code: "zh", name: "中文 (Mandarin)", where: "Chinese communities in Suriname, Guyana, Trinidad, Jamaica", rec: "zh-CN", tts: "zh-CN" },
  { code: "pt", name: "Português (Portuguese)", where: "Brazilian communities in Guyana and Suriname", rec: "pt-BR", tts: "pt-BR" },
];

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES.find((l) => l.code === code);
}
