"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** When true (Draft Mode), initializes Live Preview SDK for inspector mode + live updates. */
  enabled: boolean;
  spaceId: string;
  environment: string;
  /** Default locale for your space (single-locale sites often use `en-US`). */
  locale: string;
};

/**
 * Wraps the app when Draft Mode is on so Contentful’s preview iframe can use
 * inspector mode and live updates. No-ops when `enabled` is false.
 */
export function ContentfulLivePreviewRoot({
  children,
  enabled,
  spaceId,
  environment,
  locale,
}: Props) {
  if (!enabled || !spaceId) {
    return <>{children}</>;
  }

  return (
    <ContentfulLivePreviewProvider
      locale={locale}
      space={spaceId}
      environment={environment}
      enableInspectorMode
      enableLiveUpdates
      targetOrigin={["https://app.contentful.com", "https://app.eu.contentful.com"]}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
}
