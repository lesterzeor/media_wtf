/** Resolve protocol-relative or bare host asset URLs for <video> / <iframe> src. */
export function resolveMediaUrl(url: string): string {
  const t = url.trim();
  if (t.startsWith("http://") || t.startsWith("https://")) {
    return t;
  }
  if (t.startsWith("//")) {
    return `https:${t}`;
  }
  return `https://${t.replace(/^\/+/, "")}`;
}

/**
 * Extracts a YouTube video id from common URL shapes (watch, youtu.be, embed, shorts).
 * Returns null if the string does not look like a valid YouTube URL.
 */
export function parseYoutubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }
  try {
    const withScheme = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    const u = new URL(withScheme);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) {
        return v;
      }
      const parts = u.pathname.split("/").filter(Boolean);
      const embed = parts.indexOf("embed");
      if (embed >= 0 && parts[embed + 1] && /^[\w-]{11}$/.test(parts[embed + 1])) {
        return parts[embed + 1];
      }
      const shorts = parts.indexOf("shorts");
      if (shorts >= 0 && parts[shorts + 1] && /^[\w-]{11}$/.test(parts[shorts + 1])) {
        return parts[shorts + 1];
      }
    }
  } catch {
    return null;
  }
  return null;
}
