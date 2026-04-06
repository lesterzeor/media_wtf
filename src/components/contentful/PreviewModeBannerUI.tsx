import Link from "next/link";

/**
 * Presentational preview bar — safe for Cypress component tests (no `next/headers`).
 * Production entry: {@link PreviewModeBanner} in `PreviewModeBanner.tsx`.
 */
export function PreviewModeBannerUI() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex justify-center p-4"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex max-w-lg items-center gap-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 shadow-lg">
        <span className="font-semibold">Contentful preview</span>
        <span className="hidden text-amber-800 sm:inline">Draft content and Live Preview are active.</span>
        <Link
          href="/api/disable-draft"
          className="shrink-0 rounded-md bg-amber-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-950 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50"
        >
          Exit preview
        </Link>
      </div>
    </div>
  );
}
