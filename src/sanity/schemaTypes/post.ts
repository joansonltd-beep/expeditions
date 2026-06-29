import { defineType, defineField } from "sanity";

// A guide / article. Shown under /guides.
export const post = defineType({
  name: "post",
  title: "Guide",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (page URL)",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (summary for the list and search results)",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "publishedAt", title: "Published date", type: "date" }),
    defineField({
      name: "body",
      title: "Article content",
      type: "array",
      of: [{ type: "contentSection" }],
    }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt" } },
});
