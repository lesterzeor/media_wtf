/** Short date for article meta lines (lists, sidebars). */
export function formatPublishedDate(iso: string | undefined): string | null {
  if (!iso) {
    return null;
  }
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}
