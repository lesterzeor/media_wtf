"use client";

import { parseYoutubeVideoId, resolveMediaUrl } from "@/lib/youtubeEmbed";

type ArticleClosingMediaProps = {
  closingYoutubeUrl?: string | null;
  /** Direct link to a video file (e.g. .mp4) — plain text URL in Contentful. */
  closingVideoUrl?: string | null;
};

/**
 * End-of-article media from plain URL fields: YouTube embed or HTML5 video for a direct file URL.
 * YouTube field is tried first; then `closingVideoUrl` is parsed as YouTube or used as `<video src>`.
 */
export function ArticleClosingMedia({ closingYoutubeUrl, closingVideoUrl }: ArticleClosingMediaProps) {
  const ytPrimary = closingYoutubeUrl?.trim() ? parseYoutubeVideoId(closingYoutubeUrl) : null;
  if (ytPrimary) {
    return <YoutubeEmbed id={ytPrimary} />;
  }

  const rawSecondary = closingVideoUrl?.trim();
  if (rawSecondary) {
    const ytSecondary = parseYoutubeVideoId(rawSecondary);
    if (ytSecondary) {
      return <YoutubeEmbed id={ytSecondary} />;
    }
    const src = resolveMediaUrl(rawSecondary);
    return (
      <figure className="mx-auto mt-10 w-full max-w-4xl">
        <video
          src={src}
          className="w-full rounded-xl bg-black shadow-sm"
          controls
          playsInline
          preload="metadata"
          aria-label="Article video"
        />
      </figure>
    );
  }

  return null;
}

function YoutubeEmbed({ id }: { id: string }) {
  return (
    <figure className="mx-auto mt-10 w-full max-w-4xl">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-950 shadow-sm">
        <iframe
          title="Embedded YouTube video"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </figure>
  );
}
