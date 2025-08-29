import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const contentDir = path.join(process.cwd(), "src", "content");
  let slugs: string[] = [];
  try {
    slugs = fs
      .readdirSync(contentDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (err) {
    slugs = [];
  }

  const urls = ["/", "/blog", ...slugs.map((slug) => `/blog/${slug}`)];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexlayer.com";
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) =>
        `  <url><loc>${baseUrl}${url}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`
    )
    .join("\n")}\n</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
