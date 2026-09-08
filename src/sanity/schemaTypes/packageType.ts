import { defineType, defineField } from "sanity";

// A business registration tier, shown on the Banking page. The name and the
// "what's included" list are published; the price is not.
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
      description: "NOT SHOWN ON THE SITE. The site publishes no prices and offers a free consultation instead. Kept so the figure is not lost if pricing is reinstated.",
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
