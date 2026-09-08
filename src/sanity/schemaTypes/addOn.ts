import { defineType, defineField } from "sanity";

// A la carte add-on listed below the Finance packages. Only the title is
// published; the price fields are kept but not shown.
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
      description: "NOT SHOWN ON THE SITE. The site publishes no prices and offers a free consultation instead. Kept so the figure is not lost if pricing is reinstated.",
    }),
    defineField({
      name: "amountText",
      title: "Amount text (shown as-is)",
      type: "string",
      description: 'NOT SHOWN ON THE SITE, same as the field above. A figure written out as-is, e.g. "$200" or "1-10 $200, 11-100 $300, 101+ $300".',
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
