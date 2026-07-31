import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { getArticles } from "@/lib/siteData";
import { CSME_COUNTRIES } from "@/lib/csmeData";
import { BANKING_ISLANDS } from "@/lib/bankingData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/flights",
    "/accommodations",
    "/cruises",
    "/travel-visas",
    "/insurance",
    "/finance",
    "/guides",
    "/caricom-skills-certificate",
    "/about",
    "/policies",
  ];
  const articles = await getArticles();
  const guideRoutes = articles.map((a) => `/guides/${a.slug}`);
  const csmeRoutes = CSME_COUNTRIES.map((c) => `/caricom-skills-certificate/${c.slug}`);
  const bankingRoutes = BANKING_ISLANDS.map((i) => `/finance/${i.slug}`);
  const now = new Date();
  return [...routes, ...guideRoutes, ...csmeRoutes, ...bankingRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
