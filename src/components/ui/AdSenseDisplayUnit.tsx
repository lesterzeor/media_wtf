"use client";

import { useEffect, useRef, useState } from "react";
import { adSenseTestProps } from "@/lib/ads/ads-environment";
import { cn } from "@/lib/utils";

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

type LoadStatus = "pending" | "filled" | "unfilled";

/**
 * Responsive display unit. Hides entirely when no ad renders (e.g. account pending approval)
 * so layout does not reserve blank space. Uses `data-ad-status`, iframe presence, and size checks.
 */
export function AdSenseDisplayUnit({ adSlot, className }: AdSenseDisplayUnitProps) {
  const client = process.env?.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  const insRef = useRef<HTMLModElement>(null);
  const [status, setStatus] = useState<LoadStatus>("pending");

  useEffect(() => {
    const ins = insRef.current;
    if (!client || !adSlot || !ins) {
      return;
    }

    const t = window.setTimeout(() => {
      if (insRef.current !== ins) {
        return;
      }
      runPush(ins);
    }, 0);

    return () => window.clearTimeout(t);
  }, [client, adSlot]);

  useEffect(() => {
    const ins = insRef.current;
    if (!client || !adSlot || !ins) {
      return;
    }

    let cancelled = false;

    const finish = (next: "filled" | "unfilled") => {
      if (cancelled) {
        return;
      }
      setStatus(next);
    };

    const evaluate = (): boolean => {
      const s = ins.getAttribute("data-ad-status");
      if (s === "filled") {
        finish("filled");
        return true;
      }
      if (s === "unfilled") {
        finish("unfilled");
        return true;
      }
      const iframe = ins.querySelector("iframe");
      if (iframe && iframe.offsetHeight > 24) {
        finish("filled");
        return true;
      }
      if (ins.offsetHeight > 32) {
        finish("filled");
        return true;
      }
      return false;
    };

    const mo = new MutationObserver(() => {
      evaluate();
    });
    mo.observe(ins, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
      subtree: true,
      childList: true,
    });

    const ro = new ResizeObserver(() => {
      evaluate();
    });
    ro.observe(ins);

    const poll = window.setInterval(() => {
      if (evaluate()) {
        window.clearInterval(poll);
      }
    }, 350);

    const timeout = window.setTimeout(() => {
      window.clearInterval(poll);
      if (evaluate()) {
        return;
      }
      const iframe = ins.querySelector("iframe");
      if (ins.offsetHeight < 12 && !iframe) {
        finish("unfilled");
        return;
      }
      if (ins.offsetHeight > 32 || (iframe && iframe.offsetHeight > 24)) {
        finish("filled");
        return;
      }
      finish("unfilled");
    }, 14000);

    return () => {
      cancelled = true;
      mo.disconnect();
      ro.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(timeout);
    };
  }, [client, adSlot]);

  if (!client) {
    return null;
  }

  if (status === "unfilled") {
    return null;
  }

  return (
    <ins
      ref={insRef}
      className={cn("adsbygoogle block min-h-0", className)}
      style={{ display: "block", minHeight: 0, textAlign: "center" }}
      data-ad-client={client}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...adSenseTestProps()}
    />
  );
}
