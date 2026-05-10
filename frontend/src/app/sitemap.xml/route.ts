const BASE_URL = "https://stellaroid-earn-demo.vercel.app";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/app", changeFrequency: "weekly", priority: 0.9 },
  { path: "/proof", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/issuer", changeFrequency: "monthly", priority: 0.7 },
  { path: "/issuer/register", changeFrequency: "monthly", priority: 0.5 },
  { path: "/metrics", changeFrequency: "daily", priority: 0.6 },
  { path: "/status", changeFrequency: "daily", priority: 0.6 },
  { path: "/slides", changeFrequency: "monthly", priority: 0.4 },
] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function GET() {
  const lastModified = new Date().toISOString();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(
      ({ path, changeFrequency, priority }) => `  <url>
    <loc>${escapeXml(`${BASE_URL}${path}`)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    ),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
