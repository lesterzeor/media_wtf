"use client";

import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { AdSenseDisplayUnit } from "@/components/ui/AdSenseDisplayUnit";
import { AdSlot } from "@/components/ui/AdSlot";
import { shouldUseBoilerplateAds } from "@/lib/ads/ads-environment";
import { getBoilerplateSizeForRegion, type AdSlotRegion } from "@/lib/ads/gpt-config";

const ADSENSE_SLOT_ENV: Record<AdSlotRegion, string | undefined> = {
  top: process.env?.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  "in-content": process.env?.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
  sidebar: process.env?.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
};

const ADSENSE_SLOT_FALLBACK = process.env?.NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT?.trim();

/**
 * Prefer **AdSense** when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set and either:
 * - `NEXT_PUBLIC_ADSENSE_SLOT_{REGION}` (per placement), or
 * - `NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT` (same `data-ad-slot` for every region, e.g. one “Display” unit).
 * Otherwise **GAM** `AdSlot` (or placeholders). The root layout already loads `adsbygoogle.js` — no extra script.
 *
 * **Non-production** (localhost, Vercel Preview): dimension boilerplate only — no live AdSense/GPT.
 */
export function AdRegion({ region, className }: { region: AdSlotRegion; className?: string }) {
  if (shouldUseBoilerplateAds()) {
    const { width, height } = getBoilerplateSizeForRegion(region);
    return <AdPlaceholder width={width} height={height} className={className} />;
  }

  const slot = ADSENSE_SLOT_ENV[region]?.trim() || ADSENSE_SLOT_FALLBACK;
  const client = process.env?.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

  if (client && slot) {
    return <AdSenseDisplayUnit adSlot={slot} className={className} />;
  }

  return <AdSlot slot={region} className={className} />;
}
