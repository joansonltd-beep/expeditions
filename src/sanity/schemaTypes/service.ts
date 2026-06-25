import { defineType, defineField } from "sanity";

// A service: drives the nav, the home-page cards, and its own detail page.
export const service = defineType({
  name: "service",
  title: "Service",
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
      name: "icon",
      title: "Icon (emoji)",
      type: "string",
      description: "A single emoji shown on cards and the page header, e.g. ✈️.",
    }),
    defineField({
      name: "scope",
      title: "Scope label",
      type: "string",
      description: 'e.g. "Worldwide", "Trinidad only", "CARICOM only".',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Travel", value: "travel" },
          { title: "Local (Trinidad)", value: "local" },
          { title: "Visa", value: "visa" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({
      name: "shortBlurb",
      title: "Short blurb (home card)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "cardFeatures",
      title: "Card features (up to 3)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "intro",
      title: "Intro (page header subcopy)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Page content",
      type: "array",
      of: [{ type: "contentSection" }],
    }),
    defineField({
      name: "primaryLink",
      title: "Primary button (optional)",
      description: "A service-specific button, e.g. a booking link or request email.",
      type: "linkRef",
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", scope: "scope", icon: "icon" },
    prepare: ({ title, scope, icon }) => ({ title: `${icon ?? ""} ${title}`.trim(), subtitle: scope }),
  },
});
