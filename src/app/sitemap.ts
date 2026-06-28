import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/flights",
    "/accommodations",
    "/cruises",
    "/travel-visas",
    "/insurance",
    "/finance",
    "/about",
    "/policies",
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
