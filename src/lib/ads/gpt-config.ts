import type { GptMultiSize } from "@/types/gpt";

export type AdSlotRegion = "top" | "in-content" | "sidebar";

/** True when env is set enough to build GAM ad unit paths. */
export function isGptConfigured(): boolean {
  const network = process.env?.NEXT_PUBLIC_GAM_NETWORK_CODE?.trim();
  const prefix = process.env?.NEXT_PUBLIC_GAM_AD_UNIT_PREFIX?.trim();
  return Boolean(network && prefix);
}

function normalizePrefix(prefix: string): string {
  return prefix.replace(/^\/+|\/+$/g, "");
}

function segmentForRegion(region: AdSlotRegion): string {
  const env: Record<AdSlotRegion, string | undefined> = {
    top: process.env?.NEXT_PUBLIC_GAM_SLOT_SEGMENT_TOP,
    "in-content": process.env?.NEXT_PUBLIC_GAM_SLOT_SEGMENT_IN_CONTENT,
    sidebar: process.env?.NEXT_PUBLIC_GAM_SLOT_SEGMENT_SIDEBAR,
  };
  const fallback: Record<AdSlotRegion, string> = {
    top: "top",
    "in-content": "in-content",
    sidebar: "sidebar",
  };
  return env[region]?.trim() || fallback[region];
}

/**
 * Full GAM ad unit path: /{networkCode}/{sitePrefix}/{slotSegment}
 * Must match an ad unit in Google Ad Manager.
 */
export function getAdUnitPath(region: AdSlotRegion): string | null {
  const network = process.env?.NEXT_PUBLIC_GAM_NETWORK_CODE?.trim();
  const prefixRaw = process.env?.NEXT_PUBLIC_GAM_AD_UNIT_PREFIX?.trim();
  if (!network || !prefixRaw) {
    return null;
  }
  const prefix = normalizePrefix(prefixRaw);
  const segment = segmentForRegion(region);
  return `/${network}/${prefix}/${segment}`;
}

/** Primary width × height for layout / boilerplate labels (first size in the GAM set). */
export function getBoilerplateSizeForRegion(region: AdSlotRegion): { width: number; height: number } {
  const sizes = getSizesForRegion(region);
  const first = sizes[0];
  if (Array.isArray(first) && first.length >= 2) {
    return { width: first[0], height: first[1] };
  }
  return { width: 300, height: 250 };
}

/** Default IAB-style sizes per region (override via code later if needed). */
export function getSizesForRegion(region: AdSlotRegion): GptMultiSize {
  switch (region) {
    case "top":
      return [
        [728, 90],
        [320, 50],
      ];
    case "in-content":
      return [[300, 250]];
    case "sidebar":
      return [
        [300, 600],
        [300, 250],
      ];
    default:
      return [[300, 250]];
  }
}
