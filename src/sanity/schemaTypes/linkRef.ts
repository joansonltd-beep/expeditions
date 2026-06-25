import { defineType, defineField } from "sanity";

// A labelled link used for service-specific CTAs (booking URL, request email).
export const linkRef = defineType({
  name: "linkRef",
  title: "Button link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Button label", type: "string" }),
    defineField({
      name: "href",
      title: "Link (URL or mailto:)",
      description: "A full https:// URL, or a mailto: link.",
      type: "string",
    }),
  ],
  preview: {
    select: { label: "label", href: "href" },
    prepare: ({ label, href }) => ({ title: label || "Button", subtitle: href }),
  },
});
