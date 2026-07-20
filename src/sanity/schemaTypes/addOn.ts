import { defineType, defineField } from "sanity";

// A la carte add-on shown below the Finance packages. Either give it a
// usdPrice (converted + rounded up to the local currency) or an amountText
// (an existing figure that is shown as-is, just tagged with TTD/XCD).
export const addOn = defineType({
  name: "addOn",
  title: "Finance add-on",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "usdPrice",
      title: "Price to convert (USD)",
      type: "number",
      description: "Use this for a clean USD figure that should be converted to TTD/XCD and rounded up to the nearest 100.",
    }),
    defineField({
      name: "amountText",
      title: "Amount text (shown as-is)",
      type: "string",
      description: 'Use this for a figure that should NOT be converted, e.g. "$200" or "1-10 $200, 11-100 $300, 101+ $300". The site appends TTD or XCD automatically.',
    }),
    defineField({
      name: "trinidadOnly",
      title: "Trinidad & Tobago only",
      type: "boolean",
      initialValue: false,
      description: "Hide this add-on when the visitor selects Grenada.",
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", usdPrice: "usdPrice", amountText: "amountText" },
    prepare: ({ title, usdPrice, amountText }) => ({
      title,
      subtitle: usdPrice ? `US$${usdPrice}` : amountText,
    }),
  },
});
