import { NextResponse } from "next/server";

export async function GET() {
  const robots = `User-agent: *\nAllow: /\nSitemap: ${
    process.env.NEXT_PUBLIC_SITE_URL || "https://nexlayer.com"
  }/sitemap.xml`;
  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
