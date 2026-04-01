/**
 * Real ad inventory (GAM fills, no AdSense `data-adtest`) only on Vercel **production** and **preview**.
 * Local `next dev`, `vercel dev`, and any host where `VERCEL_ENV` is not set → test behavior.
 *
 * `NEXT_PUBLIC_VERCEL_ENV` is set at build time in `next.config.ts` from `VERCEL_ENV`.
 */
export function shouldUseRealAds(): boolean {
  const v = process.env.NEXT_PUBLIC_VERCEL_ENV?.trim();
  return v === "production" || v === "preview";
}

/** For `<ins class="adsbygoogle">`: use test creatives when not on Vercel prod/preview. */
export function adSenseTestProps(): { "data-adtest": "on" } | Record<string, never> {
  return shouldUseRealAds() ? {} : { "data-adtest": "on" };
}
