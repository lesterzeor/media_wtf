import Script from "next/script";

/** Loads `adsbygoogle.js` once when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set (e.g. `ca-pub-…`). */
export function AdSenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

  if (!client) {
    return null;
  }

  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;

  return (
    <Script
      async
      id="adsense-loader"
      src={src}
      strategy="beforeInteractive"
      crossOrigin="anonymous"
    />
  );
}
