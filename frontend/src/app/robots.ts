import type { MetadataRoute } from "next";
import { seoCanonicalUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Block non-public and non-user-facing routes, and keep embed pages out
      // of search indexing.
      // The proof detail pages are intentionally left crawlable for portfolio
      // sharing and direct lookup, while `/proof/<hash>/embed` is kept noindex
      // at the page level.
      disallow: ["/proof/*/embed", "/talent/*", "/opportunity/*", "/metrics", "/status", "/api/"],
    },
    sitemap: `${seoCanonicalUrl("")}/sitemap.xml`,
  };
}
