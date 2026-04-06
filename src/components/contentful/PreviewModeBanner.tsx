import { draftMode } from "next/headers";
import { PreviewModeBannerUI } from "@/components/contentful/PreviewModeBannerUI";

export { PreviewModeBannerUI } from "@/components/contentful/PreviewModeBannerUI";

/** Floating bar when Draft Mode is active — exit link clears the draft cookie. */
export async function PreviewModeBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) {
    return null;
  }

  return <PreviewModeBannerUI />;
}
