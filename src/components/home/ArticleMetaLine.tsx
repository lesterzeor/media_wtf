import type { ArticleMetaLineProps } from "@/components/home/types";
import { SITE_NAME } from "@/config/site";
import { formatPublishedDate } from "@/lib/formatPublishedDate";
import { cn } from "@/lib/utils";

/** Author line or publication name + date (reference: site name in red, date gray). */
export function ArticleMetaLine({
  article,
  className,
  variant = "author",
  tone = "light",
}: ArticleMetaLineProps) {
  const date = formatPublishedDate(article.publishedAt);

  if (variant === "site") {
    const siteClass =
      tone === "dark"
        ? "font-medium text-red-300 drop-shadow-sm"
        : "font-medium text-red-600";
    const dateClass = tone === "dark" ? "text-white/85 drop-shadow-sm" : "text-neutral-400";
    const pipeClass = tone === "dark" ? "text-white/45" : "text-neutral-300";
    return (
      <p className={cn("text-xs leading-snug", className)}>
        <span className={siteClass}>{SITE_NAME}</span>
        {date ? (
          <>
            <span className={cn("mx-1.5", pipeClass)}>|</span>
            <span className={dateClass}>{date}</span>
          </>
        ) : null}
      </p>
    );
  }

  const author = article.author?.trim();
  if (!author && !date) {
    return null;
  }
  const authorClass =
    tone === "dark"
      ? "font-medium text-white/95 drop-shadow-sm"
      : "font-medium text-brand-primary";
  const dateClass = tone === "dark" ? "text-white/80 drop-shadow-sm" : "text-neutral-400";
  const pipeClass = tone === "dark" ? "text-white/40" : "text-neutral-300";

  return (
    <p className={cn("text-xs leading-snug", className)}>
      {author ? <span className={authorClass}>{author}</span> : null}
      {author && date ? <span className={cn("mx-1.5", pipeClass)}>|</span> : null}
      {date ? <span className={dateClass}>{date}</span> : null}
    </p>
  );
}
