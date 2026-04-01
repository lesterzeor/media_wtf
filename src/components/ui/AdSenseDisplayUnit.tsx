"use client";

import { useEffect, useRef } from "react";
import { adSenseTestProps } from "@/lib/ads/ads-environment";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSenseDisplayUnitProps = {
  /** Ad unit ID from AdSense (numeric string). */
  adSlot: string;
  className?: string;
};

/**
 * Responsive display unit. On non–Vercel-prod/preview, sets `data-adtest="on"` (test creatives).
 * Requires `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `AdSenseScript` in the root layout.
 */
export function AdSenseDisplayUnit({ adSlot, className }: AdSenseDisplayUnitProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!client || !adSlot || !insRef.current) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [client, adSlot]);

  if (!client) {
    return null;
  }

  return (
    <ins
      ref={insRef}
      className={["adsbygoogle", className].filter(Boolean).join(" ")}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...adSenseTestProps()}
    />
  );
}
