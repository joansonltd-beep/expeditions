import { defineType, defineField } from "sanity";

// A pricing package, shown on the Finance page (business registration tiers).
export const packageType = defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price", type: "string", description: 'e.g. "TT$700".' }),
    defineField({ name: "terms", title: "Payment terms", type: "string" }),
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
    select: { title: "name", subtitle: "price" },
  },
});
