import { defineType, defineField } from "sanity";

// Singleton: the About page.
export const aboutContent = defineType({
  name: "aboutContent",
  title: "About content",
  type: "document",
  fields: [
    defineField({ name: "intro", title: "Intro line", type: "text", rows: 2 }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "contentSection" }],
    }),
  ],
  preview: { prepare: () => ({ title: "About content" }) },
});
