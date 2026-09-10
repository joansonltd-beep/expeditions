import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

// allow: "/" on userAgent "*" already covers every AI crawler by name — GPTBot,
// ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended,
// Amazonbot, Bytespider, CCBot, meta-externalagent included. Adding per-bot
// rules here would just repeat what the wildcard already grants.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
