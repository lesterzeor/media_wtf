import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Contentful Live Preview loads your site in an iframe from `app.contentful.com`.
 * - `frame-ancestors` must allow those origins (CSP).
 * - We try to delete `X-Frame-Options` because `SAMEORIGIN` / `DENY` blocks cross-origin embedding.
 *
 * If `curl -sI https://yoursite/ | grep -i x-frame` still shows `DENY`, the header is being added
 * *after* this middleware (common: Vercel **Deployment Protection** / password gate, or Cloudflare).
 * Fix: turn off deployment protection for the preview hostname, or strip the header in that product’s rules.
 * CSP `frame-ancestors` alone is not enough when `X-Frame-Options: DENY` is present.
 *
 * @see https://www.contentful.com/developers/docs/tutorials/preview/live-preview/
 */
export function middleware(_: NextRequest) {
  const res = NextResponse.next();

  res.headers.set(
    "Content-Security-Policy",
    [
      "frame-ancestors",
      "'self'",
      "https://app.contentful.com",
      "https://app.eu.contentful.com",
      "https://*.contentful.com",
    ].join(" "),
  );

  res.headers.delete("x-frame-options");
  res.headers.delete("X-Frame-Options");

  return res;
}

export const config = {
  matcher: [
    /*
     * All routes except Next internals and common static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
