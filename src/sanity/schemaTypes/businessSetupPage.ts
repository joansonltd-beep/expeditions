import { defineType, defineField } from "sanity";

// Singleton: the Business Setup page. The Trinidad & Tobago / Grenada
// eligibility gate is enforced in code, not editable here.
export const businessSetupPage = defineType({
  name: "businessSetupPage",
  title: "Business setup page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string" }),
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({ name: "eligibilityTitle", title: "Eligibility prompt — heading", type: "string" }),
    defineField({ name: "eligibilityIntro", title: "Eligibility prompt — text", type: "text", rows: 2 }),
    defineField({
      name: "ineligibleMessage",
      title: "Message shown when not eligible",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Business setup page" }) },
});
