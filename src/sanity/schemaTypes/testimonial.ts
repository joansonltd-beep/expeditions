import { defineType, defineField } from "sanity";

// A client testimonial (spec.md §11).
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "person",
      title: "Person",
      description: 'e.g. "Kerry-Ann · Port of Spain".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "context",
      title: "Context",
      description: 'e.g. "Family holiday" or "Caribbean cruise".',
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "person", subtitle: "context" },
  },
});
