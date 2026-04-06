/**
 * `NEXT_PUBLIC_VERCEL_ENV` is set at build time in `next.config.ts` from `VERCEL_ENV`.
 * Unset / local → `development`.
 */

/** Dimension-labeled placeholders (no AdSense / GPT) everywhere except production. */
export function shouldUseBoilerplateAds(): boolean {
  return process.env?.NEXT_PUBLIC_VERCEL_ENV?.trim() !== "production";
}

/**
 * Real ad inventory (GAM fills, no AdSense `data-adtest`) only on Vercel **production** and **preview**.
 * Used by GPT registration — keep in sync with boilerplate: non-prod uses placeholders in `AdRegion` instead.
 */
export function shouldUseRealAds(): boolean {
  const v = process.env?.NEXT_PUBLIC_VERCEL_ENV?.trim();
  return v === "production" || v === "preview";
}

/** For `<ins class="adsbygoogle">`: use test creatives when not on Vercel prod/preview. */
export function adSenseTestProps(): { "data-adtest": "on" } | Record<string, never> {
  return shouldUseRealAds() ? {} : { "data-adtest": "on" };
}
