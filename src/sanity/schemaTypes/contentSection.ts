import { defineType, defineField } from "sanity";

// Reusable flexible content block: an optional heading, paragraphs, a bullet
// list, and an optional highlighted note. Used by service pages, the About page
// and the Policies page so editors get one simple, predictable shape.
export const contentSection = defineType({
  name: "contentSection",
  title: "Content section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "bullets",
      title: "Bullet list",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "note",
      title: "Highlighted note",
      description: "Shown in a coloured callout box.",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { heading: "heading", paragraphs: "paragraphs", bullets: "bullets" },
    prepare: ({ heading, paragraphs, bullets }) => ({
      title: heading || paragraphs?.[0] || bullets?.[0] || "Section",
      subtitle: "Content section",
    }),
  },
});
