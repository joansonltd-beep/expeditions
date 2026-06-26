import { defineType, defineField } from "sanity";

// Singleton: the Insurance "we have moved" page.
export const insurancePage = defineType({
  name: "insurancePage",
  title: "Insurance page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro line", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Body text", type: "text", rows: 4 }),
    defineField({ name: "bookNote", title: "Note above the buttons", type: "string" }),
    defineField({ name: "bookLabel", title: "Book button label", type: "string" }),
    defineField({ name: "visitLabel", title: "Visit button label", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Insurance page" }) },
});
