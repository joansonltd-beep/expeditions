import { defineType, defineField } from "sanity";

// Singleton: the featured owned stay (A Likkle Rest by Jo) on the
// Accommodations page.
export const stay = defineType({
  name: "stay",
  title: "Featured stay",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline / eyebrow", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "tags",
      title: "Quick tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Featured stay" }) },
});
