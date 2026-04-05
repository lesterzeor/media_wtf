/** Month names — UTC-based so SSR and browser match for the same ISO string. */
const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const LONG_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function formatIsoUtc(iso: string, longMonth: boolean): string | null {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      return null;
    }
    const months = longMonth ? LONG_MONTHS : SHORT_MONTHS;
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch {
    return null;
  }
}

/** Short date for article meta lines (lists, sidebars). Same output on server and client for a given ISO string. */
export function formatPublishedDate(iso: string | undefined): string | null {
  if (!iso) {
    return null;
  }
  return formatIsoUtc(iso, false);
}

/** Long date for article byline (`April 2, 2026`). Avoids `toLocaleDateString` hydration mismatches. */
export function formatPublishedDateLong(iso: string | undefined): string | null {
  if (!iso) {
    return null;
  }
  return formatIsoUtc(iso, true);
}
