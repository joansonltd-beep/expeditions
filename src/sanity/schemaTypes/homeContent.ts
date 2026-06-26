import { defineType, defineField } from "sanity";

const head = (prefix: string, label: string, hasIntro = true) => [
  defineField({ name: `${prefix}Eyebrow`, title: `${label} — small label`, type: "string", group: "sections" }),
  defineField({ name: `${prefix}Title`, title: `${label} — heading`, type: "string", group: "sections" }),
  ...(hasIntro
    ? [defineField({ name: `${prefix}Intro`, title: `${label} — intro`, type: "text", rows: 2, group: "sections" })]
    : []),
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

    ...head("pillars", "What we do"),
    defineField({
      name: "pillars",
      title: "What we do — cards",
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

    ...head("travel", "Travel section"),
    defineField({ name: "notSureTitle", title: "“Not sure where to start” — title", type: "string", group: "lists" }),
    defineField({ name: "notSureText", title: "“Not sure where to start” — text", type: "text", rows: 2, group: "lists" }),

    ...head("bundle", "Bundle banner"),

    ...head("local", "Local services section"),
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

    ...head("why", "Why book with us", false),
    defineField({
      name: "why",
      title: "Why book with us — cards",
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

    ...head("testimonials", "Testimonials section", false),
    ...head("contact", "Contact section"),
  ],
  preview: { prepare: () => ({ title: "Home content" }) },
});
