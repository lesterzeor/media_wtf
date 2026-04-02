import { NextResponse } from "next/server";

/**
 * Serves https://yourdomain.com/ads.txt for Google AdSense crawlers.
 * Must list the same publisher ID as NEXT_PUBLIC_ADSENSE_CLIENT_ID (ca-pub-… → pub-… line).
 *
 * @see https://support.google.com/adsense/answer/7532444
 */
export function GET() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (!raw?.startsWith("ca-pub-")) {
    return new NextResponse("NEXT_PUBLIC_ADSENSE_CLIENT_ID is not set to a ca-pub-… value.\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const id = raw.replace(/^ca-pub-/, "");
  const body = `google.com, pub-${id}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
