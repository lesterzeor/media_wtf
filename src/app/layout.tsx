import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Geist_Mono, Merriweather, Oswald } from "next/font/google";
import { ContentfulLivePreviewRoot } from "@/components/contentful/ContentfulLivePreviewRoot";
import { PreviewModeBanner } from "@/components/contentful/PreviewModeBanner";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdSenseScript } from "@/lib/ads/AdSenseScript";
import { GooglePublisherTag } from "@/lib/ads/GooglePublisherTag";
import { GoogleTagManager } from "@/lib/analytics/GoogleTagManager";
import "./globals.css";

/** Primary UI typeface — matches `font-sans` / body. */
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MediaWTF",
  description: "Content-driven publishing scaffold with Contentful GraphQL",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: draftModeEnabled } = await draftMode();
  const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim() ?? "";
  const environment = process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";
  const contentfulLocale = process.env.CONTENTFUL_DEFAULT_LOCALE?.trim() || "en-US";

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${geistMono.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-neutral-50 text-neutral-900">
        <ContentfulLivePreviewRoot
          enabled={draftModeEnabled}
          spaceId={spaceId}
          environment={environment}
          locale={contentfulLocale}
        >
          <GoogleTagManager />
          <AdSenseScript />
          <GooglePublisherTag />
          <MainLayout>{children}</MainLayout>
        </ContentfulLivePreviewRoot>
        <PreviewModeBanner />
      </body>
    </html>
  );
}
