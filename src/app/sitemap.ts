import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { getArticles } from "@/lib/siteData";
import { CSME_COUNTRIES } from "@/lib/csmeData";
import { BANKING_ISLANDS } from "@/lib/bankingData";
import { COUNTRY_GUIDES } from "@/lib/countryGuideData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/getting-started",
    "/caricom-skills-certificate",
    "/business-setup",
    "/finance",
    "/study",
    "/guides",
    "/destinations",
    "/getting-there",
    "/flights",
    "/accommodations",
    "/travel-visas",
    "/insurance",
    "/survey",
    "/survey/salary",
    "/survey/utilities",
    "/survey/rent",
    "/about",
    "/policies",
  ];
  const articles = await getArticles();
  const guideRoutes = articles.map((a) => `/guides/${a.slug}`);
  const csmeRoutes = CSME_COUNTRIES.map((c) => `/caricom-skills-certificate/${c.slug}`);
  const bankingRoutes = BANKING_ISLANDS.map((i) => `/finance/${i.slug}`);
  const destinationRoutes = COUNTRY_GUIDES.map((g) => `/destinations/${g.slug}`);

  // Tiered priorities: the CSME guide is the site's main search entry point,
  // so it and its country pages rank above the supporting travel pages.
  const priorityFor = (path: string) => {
    if (path === "") return 1;
    if (path === "/caricom-skills-certificate") return 0.9;
    if (path.startsWith("/caricom-skills-certificate/")) return 0.8;
    if (path === "/business-setup" || path === "/finance" || path === "/guides" || path === "/destinations") return 0.8;
    if (path.startsWith("/guides/") || path.startsWith("/finance/") || path.startsWith("/destinations/")) return 0.7;
    if (path === "/about" || path === "/policies" || path === "/insurance") return 0.4;
    return 0.6;
  };

  const now = new Date();
  return [...routes, ...guideRoutes, ...csmeRoutes, ...bankingRoutes, ...destinationRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: priorityFor(path),
  }));
}
