import { defineType, defineField } from "sanity";

// Singleton: global site settings (brand, contacts, hero, footer).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "contact", title: "Contact" },
    { name: "hero", title: "Hero" },
    { name: "social", title: "Social" },
  ],
  fields: [
    defineField({ name: "businessName", title: "Business name", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "brand" }),
    defineField({
      name: "logo",
      title: "Logo (optional)",
      description: "Shown in the header. If empty, a plane mark + name is used.",
      type: "image",
      group: "brand",
    }),
    defineField({ name: "footerBlurb", title: "Footer blurb", type: "text", rows: 3, group: "brand" }),
    defineField({ name: "paymentNote", title: "Payment note", type: "text", rows: 2, group: "brand" }),

    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      description: "Full international form, digits only, e.g. 8687236644. Powers every WhatsApp link.",
      type: "string",
      group: "contact",
      validation: (r) => r.required(),
    }),
    defineField({ name: "chatbotUrl", title: "Chat bot URL", type: "url", group: "contact" }),
    defineField({ name: "generalEmail", title: "General email", type: "string", group: "contact" }),
    defineField({ name: "staysEmail", title: "Accommodation email", type: "string", group: "contact" }),
    defineField({ name: "flightsEmail", title: "Flights email", type: "string", group: "contact" }),
    defineField({ name: "supportEmail", title: "Support email", type: "string", group: "contact" }),
    defineField({ name: "queriesEmail", title: "Data / queries email", type: "string", group: "contact" }),

    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string", group: "hero" }),
    defineField({ name: "heroSubcopy", title: "Hero subcopy", type: "text", rows: 3, group: "hero" }),

    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url", group: "social" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url", group: "social" }),
    defineField({ name: "tiktokUrl", title: "TikTok URL", type: "url", group: "social" }),
    defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url", group: "social" }),
    defineField({ name: "xUrl", title: "X (Twitter) URL", type: "url", group: "social" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
