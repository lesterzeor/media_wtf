import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Contentful Live Preview loads your site in an iframe from `app.contentful.com`.
 * - `frame-ancestors` must allow those origins (CSP).
 * - `X-Frame-Options: SAMEORIGIN` (often added by hosts/CDNs) blocks cross-origin embedding — we remove it.
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
