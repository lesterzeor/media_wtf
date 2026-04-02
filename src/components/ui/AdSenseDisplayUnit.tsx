"use client";

import { useEffect, useRef } from "react";
import { adSenseTestProps } from "@/lib/ads/ads-environment";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** Avoid duplicate `.push({})` on the same `<ins>` (e.g. React Strict Mode). */
const pushedIns = new WeakSet<Element>();

type AdSenseDisplayUnitProps = {
  /** Ad unit ID from AdSense (numeric string). */
  adSlot: string;
  className?: string;
};

function runPush(ins: HTMLElement) {
  if (pushedIns.has(ins)) {
    return;
  }
  pushedIns.add(ins);
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch {
    pushedIns.delete(ins);
  }
}

/**
 * Responsive display unit. On non–Vercel-prod/preview, sets `data-adtest="on"` (test creatives).
 * Requires `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `AdSenseScript` in the root layout.
 */
export function AdSenseDisplayUnit({ adSlot, className }: AdSenseDisplayUnitProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ins = insRef.current;
    if (!client || !adSlot || !ins) {
      return;
    }

    // Defer until after layout + `next/script` loader can register; helps fills on production.
    const t = window.setTimeout(() => {
      if (insRef.current !== ins) {
        return;
      }
      runPush(ins);
    }, 0);

    return () => window.clearTimeout(t);
  }, [client, adSlot]);

  if (!client) {
    return null;
  }

  return (
    <ins
      ref={insRef}
      className={["adsbygoogle", className].filter(Boolean).join(" ")}
      style={{ display: "block", minHeight: "250px", textAlign: "center" }}
      data-ad-client={client}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...adSenseTestProps()}
    />
  );
}
