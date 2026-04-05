import Script from "next/script";

/**
 * Google Tag Manager — set `NEXT_PUBLIC_GTM_ID` (e.g. `GTM-WRHH5W6G`).
 *
 * **GA4:** Add a *Google Analytics: GA4 Configuration* (or Google tag) tag inside GTM
 * with Measurement ID `G-…` — do **not** also paste the standalone `gtag.js` snippet
 * from analytics.google.com into this app, or you will double-count page views.
 */
function getGtmId(): string | undefined {
  return process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined;
}

/** GTM bootstrap script — loaded after hydration (`afterInteractive` avoids App Router ESLint noise vs `beforeInteractive`). */
export function GoogleTagManagerScript() {
  const gtmId = getGtmId();
  if (!gtmId) {
    return null;
  }

  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
      `}
    </Script>
  );
}

/**
 * GTM `noscript` fallback — Google asks for this immediately after `<body>` opens.
 */
export function GoogleTagManagerNoScript() {
  const gtmId = getGtmId();
  if (!gtmId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
