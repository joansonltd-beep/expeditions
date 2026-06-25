import { defineType, defineField } from "sanity";

// Singleton: the Policies page (refund, fraud, data protection).
export const policiesContent = defineType({
  name: "policiesContent",
  title: "Policies content",
  type: "document",
  fields: [
    defineField({ name: "intro", title: "Intro line", type: "text", rows: 2 }),
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Each section can be a standalone heading (a major policy title) or a heading with paragraphs and bullets.",
      type: "array",
      of: [{ type: "contentSection" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Policies content" }) },
});
