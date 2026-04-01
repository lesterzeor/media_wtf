import { draftMode } from "next/headers";
import Link from "next/link";

/** Floating bar when Draft Mode is active — exit link clears the draft cookie. */
export async function PreviewModeBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) {
    return null;
  }

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
          className="shrink-0 rounded-md bg-amber-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-amber-800"
        >
          Exit preview
        </Link>
      </div>
    </div>
  );
}
