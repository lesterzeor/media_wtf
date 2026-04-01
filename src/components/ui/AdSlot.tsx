"use client";

import { useEffect, useId } from "react";
import { getAdUnitPath, getSizesForRegion, isGptConfigured } from "@/lib/ads/gpt-config";
import { registerGptSlot, unregisterGptSlot } from "@/lib/ads/gpt-registry";
import { cn } from "@/lib/utils";

type AdSlotProps = {
  slot: "top" | "in-content" | "sidebar";
  className?: string;
};

export function AdSlot({ slot, className }: AdSlotProps) {
  const reactId = useId().replace(/:/g, "");
  const elementId = `gpt-${slot}-${reactId}`;

  useEffect(() => {
    if (!isGptConfigured()) {
      return;
    }
    const path = getAdUnitPath(slot);
    if (!path) {
      return;
    }
    registerGptSlot({
      elementId,
      adUnitPath: path,
      sizes: getSizesForRegion(slot),
    });
    return () => unregisterGptSlot(elementId);
  }, [elementId, slot]);

  if (!isGptConfigured()) {
    return (
      <div
        className={cn(
          "flex min-h-24 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-xs uppercase tracking-wide text-slate-500",
          className,
        )}
        data-ad-slot={slot}
      >
        Ad Slot: {slot} (set NEXT_PUBLIC_GAM_NETWORK_CODE and NEXT_PUBLIC_GAM_AD_UNIT_PREFIX)
      </div>
    );
  }

  return (
    <div
      id={elementId}
      className={cn("flex min-h-[90px] justify-center overflow-hidden bg-slate-100/80", className)}
      data-ad-slot={slot}
    />
  );
}
