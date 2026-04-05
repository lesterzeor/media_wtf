import Link from "next/link";
import { EditorialHeroImage } from "@/components/editorial/EditorialHeroImage";
import { ArticleMetaLine } from "@/components/home/ArticleMetaLine";
import type { FeaturedMediaGridProps } from "@/components/home/types";
import type { Article } from "@/types/content";
import { cn } from "@/lib/utils";

export type { FeaturedMediaGridProps } from "@/components/home/types";

function BrokenImageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h.01M15 15l-6-6M9 15l6-6" />
    </svg>
  );
}

type TileSize = "featured" | "grid";

function MediaGridTile({
  article,
  size,
  priority,
}: {
  article: Article | null;
  size: TileSize;
  priority?: boolean;
}) {
  const isFeatured = size === "featured";
  const title = article?.title ?? "Coming soon";
  const hasImage = Boolean(article?.heroImage?.url);

  const overlay = (
    <>
      {hasImage && article?.heroImage ? (
        <EditorialHeroImage
          image={article.heroImage}
          priority={priority}
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes={
            isFeatured
              ? "(max-width: 1024px) 100vw, 60vw"
              : "(max-width: 1024px) 50vw, 20vw"
          }
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" aria-hidden />
      )}
      {!hasImage && (
        <div className="absolute left-2 top-2 text-white/50">
          <BrokenImageIcon />
        </div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
        aria-hidden
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 overflow-hidden",
          isFeatured
            ? "px-0 pb-5 pt-8 md:pb-6 md:pt-10"
            : "px-2 pb-3 pt-6 text-center md:px-3 md:pb-4 lg:text-left",
        )}
      >
        <p
          className={cn(
            "font-sans font-bold uppercase text-white no-underline",
            isFeatured
              ? "float-left mx-[4%] mt-0 mb-[5px] w-[92%] text-center leading-[120%] [text-shadow:1px_1px_2px_rgb(0,0,0)] max-md:text-3xl max-lg:text-4xl lg:text-[50px]"
              : "text-[10px] leading-snug tracking-wide sm:text-[11px] md:text-xs lg:text-[0.8125rem]",
          )}
        >
          {title}
        </p>
        {article ? (
          <div
            className={cn(
              "font-sans not-italic",
              isFeatured
                ? "clear-both mt-1 px-4 text-center text-sm md:px-6 md:text-base lg:px-8 lg:text-lg"
                : "mt-1 text-[9px] sm:text-[10px] md:text-xs",
              !isFeatured && "text-center lg:text-left",
            )}
          >
            <ArticleMetaLine article={article} variant="site" tone="dark" />
          </div>
        ) : null}
      </div>
    </>
  );

  const baseClass = cn(
    "group relative block h-full w-full min-h-0 overflow-hidden bg-neutral-900 outline-none transition",
    "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",
    isFeatured
      ? "min-h-[220px] aspect-[4/3] max-lg:w-full lg:aspect-auto lg:min-h-full"
      : "min-h-[148px] sm:min-h-[160px] lg:min-h-0",
  );

  if (article?.slug) {
    return (
      <Link href={`/articles/${article.slug}`} className={baseClass}>
        {overlay}
      </Link>
    );
  }

  return <div className={cn(baseClass, "cursor-default")}>{overlay}</div>;
}

/**
 * Featured media layout (5 slots) in **Contentful list order**:
 * - index 0 → large featured tile (~60% desktop)
 * - indices 1–4 → 2×2 grid (~40%)
 *
 * **Mobile:** full-width featured row, then a flush 2×2 grid.
 */
export function FeaturedMediaGrid({ articles, className }: FeaturedMediaGridProps) {
  const featured = articles[0] ?? null;
  const slots: (Article | null)[] = [...articles.slice(1, 5)];
  while (slots.length < 4) {
    slots.push(null);
  }

  if (!featured && slots.every((s) => s == null)) {
    return null;
  }

  return (
    <section
      className={cn(
        "overflow-hidden border-y border-neutral-200 bg-neutral-950 shadow-sm lg:rounded-lg lg:border-x",
        "max-lg:-mx-4 max-lg:w-[calc(100%+2rem)] max-lg:rounded-none max-lg:border-x-0",
        "md:max-lg:-mx-6 md:max-lg:w-[calc(100%+3rem)]",
        className,
      )}
      aria-label="Featured stories"
    >
      <div className="grid grid-cols-2 gap-0 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:min-h-[min(70vw,520px)] lg:max-h-[640px]">
        <div className="col-span-2 min-h-0 lg:col-span-1 lg:min-h-0">
          <MediaGridTile article={featured} size="featured" priority />
        </div>
        <div className="col-span-2 grid min-h-0 grid-cols-2 grid-rows-2 gap-0 lg:col-span-1 lg:min-h-0">
          {slots.map((article, index) => (
            <div key={article?.id ?? `slot-${index}`} className="min-h-0">
              <MediaGridTile article={article} size="grid" priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
