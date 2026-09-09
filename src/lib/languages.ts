// Languages spoken across the CARICOM region, for the Translator tool.
// Shared between the client component (Translator.tsx) and the server route
// (api/translate) so the prompt is always built from our own trusted data,
// never from language metadata a client request could supply.
//
// tier: "voice" = browser can listen to and speak it natively
//       "typed" = no recogniser, or the recogniser only approximates it; output is spoken by a near voice
//       "text"  = written translation only, no browser voice exists
// rough: translation quality is limited, shown to the user as a caveat
// approx: speech recognition only approximates this language via a different one
// via: plain-language note on which voice reads the output aloud

export type Language = {
  code: string;
  name: string;
  where: string;
  rec: string | null; // BCP-47 tag for SpeechRecognition, or null
  tts: string | null; // BCP-47 tag for speechSynthesis, or null
  tier: "voice" | "typed" | "text";
  approx?: boolean;
  via?: string;
  rough?: boolean;
};

export type LanguageGroup = { group: string; sub?: string; items: Language[] };

export const LANGUAGE_GROUPS: LanguageGroup[] = [
  {
    group: "Official languages",
    items: [
      { code: "en", name: "English", where: "Every member state except Haiti and Suriname", rec: "en-US", tts: "en-US", tier: "voice" },
      { code: "fr", name: "Français (French)", where: "Haiti", rec: "fr-FR", tts: "fr-FR", tier: "voice" },
      { code: "nl", name: "Nederlands (Dutch)", where: "Suriname", rec: "nl-NL", tts: "nl-NL", tier: "voice" },
      { code: "es", name: "Español (Spanish)", where: "Belize, and across the wider region", rec: "es-MX", tts: "es-MX", tier: "voice" },
      { code: "ht", name: "Kreyòl Ayisyen", where: "Haiti", rec: null, tts: "fr-FR", tier: "typed", via: "a French voice" },
    ],
  },
  {
    group: "Creoles and everyday speech",
    sub: "Spoken far more widely than the official languages in most member states.",
    items: [
      { code: "jam", name: "Jamaican Patwa", where: "Jamaica", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "trf", name: "Trini Creole", where: "Trinidad and Tobago", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "gyn", name: "Creolese", where: "Guyana", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "bjs", name: "Bajan", where: "Barbados", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "bzj", name: "Belize Kriol", where: "Belize", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "vic", name: "Vincentian Creole", where: "St Vincent and the Grenadines", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "aig", name: "Leeward Island Creole", where: "Antigua and Barbuda, St Kitts and Nevis, Montserrat, Anguilla", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "bah", name: "Bahamian Dialect", where: "The Bahamas, Turks and Caicos", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "gcr", name: "Grenadian Creole", where: "Grenada", rec: "en-US", tts: "en-GB", tier: "typed", approx: true, via: "an English voice" },
      { code: "acf", name: "Kwéyòl (Antillean Creole)", where: "Saint Lucia, Dominica, and pockets of Grenada and Trinidad", rec: null, tts: "fr-FR", tier: "typed", via: "a French voice" },
      { code: "srn", name: "Sranan Tongo", where: "Suriname", rec: null, tts: "nl-NL", tier: "typed", via: "a Dutch voice", rough: true },
    ],
  },
  {
    group: "Heritage languages",
    sub: "Carried by communities across the region.",
    items: [
      { code: "hns", name: "Sarnami Hindustani", where: "Suriname, Guyana, Trinidad and Tobago", rec: "hi-IN", tts: "hi-IN", tier: "typed", approx: true, via: "a Hindi voice", rough: true },
      { code: "hi", name: "हिन्दी (Hindi)", where: "Indo-Caribbean communities", rec: "hi-IN", tts: "hi-IN", tier: "voice" },
      { code: "zh", name: "中文 (Mandarin)", where: "Chinese communities in Suriname, Guyana, Trinidad, Jamaica", rec: "zh-CN", tts: "zh-CN", tier: "voice" },
      { code: "jv", name: "Basa Jawa (Javanese)", where: "Suriname", rec: null, tts: null, tier: "text", rough: true },
      { code: "pt", name: "Português (Portuguese)", where: "Brazilian communities in Guyana and Suriname", rec: "pt-BR", tts: "pt-BR", tier: "voice" },
    ],
  },
  {
    group: "Maroon languages",
    sub: "Suriname's interior. Written translation is a rough guide, not a reliable rendering.",
    items: [
      { code: "djk", name: "Ndyuka (Aukan)", where: "Suriname", rec: null, tts: null, tier: "text", rough: true },
      { code: "srm", name: "Saramaccan", where: "Suriname", rec: null, tts: null, tier: "text", rough: true },
      { code: "paa", name: "Paamaka", where: "Suriname", rec: null, tts: null, tier: "text", rough: true },
    ],
  },
  {
    group: "Indigenous languages",
    sub: "Limited written material exists for these, so treat any output as an approximation and check it with a speaker before relying on it.",
    items: [
      { code: "cab", name: "Garifuna", where: "Belize", rec: null, tts: null, tier: "text", rough: true },
      { code: "kek", name: "Q'eqchi' Maya", where: "Belize", rec: null, tts: null, tier: "text", rough: true },
      { code: "mop", name: "Mopan Maya", where: "Belize", rec: null, tts: null, tier: "text", rough: true },
      { code: "yua", name: "Yucatec Maya", where: "Belize", rec: null, tts: null, tier: "text", rough: true },
      { code: "arw", name: "Lokono (Arawak)", where: "Guyana, Suriname", rec: null, tts: null, tier: "text", rough: true },
      { code: "car", name: "Kalinha (Carib)", where: "Guyana, Suriname", rec: null, tts: null, tier: "text", rough: true },
      { code: "wap", name: "Wapishana", where: "Guyana", rec: null, tts: null, tier: "text", rough: true },
      { code: "ake", name: "Akawaio", where: "Guyana", rec: null, tts: null, tier: "text", rough: true },
      { code: "mbc", name: "Macushi", where: "Guyana", rec: null, tts: null, tier: "text", rough: true },
      { code: "pbb", name: "Patamona", where: "Guyana", rec: null, tts: null, tier: "text", rough: true },
      { code: "wba", name: "Warao", where: "Guyana", rec: null, tts: null, tier: "text", rough: true },
      { code: "trn", name: "Trio (Tiriyó)", where: "Suriname", rec: null, tts: null, tier: "text", rough: true },
    ],
  },
];

export const LANGUAGES: Record<string, Language> = Object.fromEntries(
  LANGUAGE_GROUPS.flatMap((g) => g.items).map((l) => [l.code, l])
);

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES[code];
}
