import type { MetadataRoute } from "next";

/** Lets crawlers (e.g. AdSense, Googlebot) fetch pages and /ads.txt without guessing. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
