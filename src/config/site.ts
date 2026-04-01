/** Primary nav — update labels/hrefs to match your sections and future category routes. */
export const SITE_NAME = "MediaWTF";

/** Logo split (reference-style two-tone wordmark) — used when `SITE_LOGO_IMAGE` is not set. */
export const SITE_LOGO = {
  accent: "Media",
  rest: "WTF",
} as const;

/**
 * Optional raster/SVG logo: place the file under `public/` and set this to its URL path.
 * @example Put `public/logo.svg` → set `SITE_LOGO_IMAGE = "/logo.svg"`
 */
export const SITE_LOGO_IMAGE: string | null = "/logo.png";

export const NAV_ITEMS = [
  { label: "Clinical skills", href: "/articles" },
  { label: "Practice life", href: "/articles" },
  { label: "Education", href: "/articles" },
  { label: "News", href: "/articles" },
] as const;
