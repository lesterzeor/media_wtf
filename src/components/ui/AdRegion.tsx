"use client";

import { AdSenseDisplayUnit } from "@/components/ui/AdSenseDisplayUnit";
import { AdSlot } from "@/components/ui/AdSlot";
import type { AdSlotRegion } from "@/lib/ads/gpt-config";

const ADSENSE_SLOT_ENV: Record<AdSlotRegion, string | undefined> = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  "in-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
};

/**
 * Prefer **AdSense** display units when both `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and the matching
 * `NEXT_PUBLIC_ADSENSE_SLOT_*` are set; otherwise **GAM** `AdSlot` (or its placeholders).
 */
export function AdRegion({ region, className }: { region: AdSlotRegion; className?: string }) {
  const slot = ADSENSE_SLOT_ENV[region]?.trim();
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

  if (client && slot) {
    return <AdSenseDisplayUnit adSlot={slot} className={className} />;
  }

  return <AdSlot slot={region} className={className} />;
}
