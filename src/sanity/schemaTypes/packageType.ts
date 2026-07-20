import { defineType, defineField } from "sanity";

// A pricing package, shown on the Banking page (business registration tiers).
export const packageType = defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "priceUsd",
      title: "Price (USD)",
      type: "number",
      description: "Base price in US dollars. Converted and displayed in TTD or XCD depending on the country the visitor selects.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "features",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Highlight as most popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "priceUsd" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `US$${subtitle}` : undefined }),
  },
});
