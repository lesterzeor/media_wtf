import Script from "next/script";
import { shouldUseRealAds } from "@/lib/ads/ads-environment";

const GPT_SRC = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

/** Loads Google Publisher Tag once. Only when GAM env is set and deployment is Vercel production/preview (real inventory). */
export function GooglePublisherTag() {
  const network = process.env.NEXT_PUBLIC_GAM_NETWORK_CODE?.trim();
  const prefix = process.env.NEXT_PUBLIC_GAM_AD_UNIT_PREFIX?.trim();

  if (!network || !prefix || !shouldUseRealAds()) {
    return null;
  }

  return (
    <Script
      id="gpt-script"
      src={GPT_SRC}
      strategy="afterInteractive"
    />
  );
}
