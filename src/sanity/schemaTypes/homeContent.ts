import { defineType, defineField } from "sanity";

const head = (prefix: string, label: string, hasIntro = true) => [
  defineField({ name: `${prefix}Eyebrow`, title: `${label} — small label`, type: "string", group: "sections" }),
  defineField({ name: `${prefix}Title`, title: `${label} — heading`, type: "string", group: "sections" }),
  ...(hasIntro
    ? [defineField({ name: `${prefix}Intro`, title: `${label} — intro`, type: "text", rows: 2, group: "sections" })]
    : []),
];

// A photo band with a short pitch and nothing else: used for the Skills
// Certificate and Study features on the home page.
const band = (prefix: string, label: string) => [
  defineField({ name: `${prefix}Eyebrow`, title: `${label} — small label`, type: "string", group: "sections" }),
  defineField({ name: `${prefix}Title`, title: `${label} — heading`, type: "string", group: "sections" }),
  defineField({ name: `${prefix}Text`, title: `${label} — text`, type: "text", rows: 3, group: "sections" }),
];

// Singleton: all the editable text on the home page.
export const homeContent = defineType({
  name: "homeContent",
  title: "Home content",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Section headings" },
    { name: "lists", title: "Cards & lists" },
  ],
  fields: [
    defineField({
      name: "heroStats",
      title: "Hero stats (the three highlights)",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Big text", type: "string" },
            { name: "label", title: "Small text", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "heroTrustNote",
      title: "Hero trust note (under the buttons)",
      description:
        "Sets expectations about what we do and what governments, schools and employers decide. Keep this honest and do not promise an outcome.",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "gallery",
      title: "Rotating tiles",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "emoji", title: "Emoji", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "emoji" } },
        },
      ],
    }),

    ...head("journeys", "Visit / Work / Study section"),
    defineField({
      name: "journeys",
      title: "The three journeys — cards",
      description: "Visit, Work and Study. These are the primary paths through the site.",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Text", type: "text", rows: 3 },
            { name: "cta", title: "Button label", type: "string" },
            { name: "href", title: "Links to (page path, e.g. /study)", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),
    defineField({
      name: "journeysNote",
      title: "Visit / Work / Study — small print",
      description: "The note explaining that requirements vary and authorities make the decisions.",
      type: "text",
      rows: 3,
      group: "lists",
    }),

    ...head("ladder", "Service ladder section"),

    ...head("how", "How it works section"),
    defineField({
      name: "steps",
      title: "How it works — steps",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Text", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),
    defineField({
      name: "howNote",
      title: "How it works — what we do not decide",
      type: "text",
      rows: 3,
      group: "lists",
    }),

    ...band("csme", "Skills Certificate feature"),
    ...band("study", "Study feature"),

    ...head("support", "Supporting services section"),
    defineField({
      name: "pillars",
      title: "Supporting services — cards",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Emoji", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Text", type: "text", rows: 2 },
            { name: "href", title: "Links to (page path, e.g. /flights)", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),
    defineField({ name: "notSureTitle", title: "“Not sure where to start” — title", type: "string", group: "lists" }),
    defineField({ name: "notSureText", title: "“Not sure where to start” — text", type: "text", rows: 2, group: "lists" }),
    defineField({
      name: "localMoved",
      title: "Insurance “moved” card",
      type: "object",
      group: "lists",
      fields: [
        { name: "scope", title: "Small label", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "blurb", title: "Text", type: "text", rows: 3 },
        { name: "features", title: "Bullet points", type: "array", of: [{ type: "string" }] },
      ],
    }),

    ...head("why", "Why work with Jo", false),
    defineField({
      name: "why",
      title: "Why work with Jo — cards",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Emoji", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Text", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),

    ...head("testimonials", "Destinations section", false),

    ...head("faq", "FAQ section", false),
    defineField({
      name: "faqs",
      title: "FAQ — questions and answers",
      description:
        "These are published as structured data for search engines, so keep the answers accurate and never promise an approval or an outcome.",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text", rows: 3 },
          ],
          preview: { select: { title: "q", subtitle: "a" } },
        },
      ],
    }),

    ...head("contact", "Contact section"),
  ],
  preview: { prepare: () => ({ title: "Home content" }) },
});
