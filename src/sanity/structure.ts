import type { StructureResolver } from "sanity/structure";

// Studio sidebar. Site settings, About, Policies and the Featured stay are
// singletons (one doc each); the rest are normal lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Home content")
        .id("homeContent")
        .child(S.document().schemaType("homeContent").documentId("homeContent")),
      S.listItem()
        .title("About content")
        .id("aboutContent")
        .child(S.document().schemaType("aboutContent").documentId("aboutContent")),
      S.listItem()
        .title("Policies content")
        .id("policiesContent")
        .child(S.document().schemaType("policiesContent").documentId("policiesContent")),
      S.listItem()
        .title("Insurance page")
        .id("insurancePage")
        .child(S.document().schemaType("insurancePage").documentId("insurancePage")),
      S.listItem()
        .title("Featured stay")
        .id("stay")
        .child(S.document().schemaType("stay").documentId("stay")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("package").title("Packages"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("post").title("Guides"),
    ]);
