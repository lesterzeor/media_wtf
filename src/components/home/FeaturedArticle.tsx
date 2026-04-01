import Link from "next/link";
import { EditorialHeroImage } from "@/components/editorial/EditorialHeroImage";
import { ArticleMetaLine } from "@/components/home/ArticleMetaLine";
import type { FeaturedArticleProps } from "@/components/home/types";
import { cn } from "@/lib/utils";

export type { FeaturedArticleProps } from "@/components/home/types";

/**
 * Left-column featured story: full-width image, green “Featured” badge, headline,
 * site name + date, excerpt (reference layout).
 */
export function FeaturedArticle({ article, className }: FeaturedArticleProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm",
        className,
      )}
    >
      <Link href={`/articles/${article.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2">
        <div className="relative aspect-16/10 w-full bg-neutral-200">
          {article.heroImage?.url ? (
            <EditorialHeroImage
              image={article.heroImage}
              className="object-cover transition duration-300 group-hover:scale-[1.01]"
              sizes="(max-width: 1024px) 100vw, 36vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-300 text-sm text-neutral-500">
              No image
            </div>
          )}
          <span className="absolute left-3 top-3 bg-brand-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
            Featured
          </span>
        </div>
        <div className="px-4 pb-4 pt-4 md:px-5 md:pb-5">
          <h2 className="font-sans text-xl font-bold leading-tight text-neutral-900 md:text-2xl">
            {article.title}
          </h2>
          <div className="mt-2">
            <ArticleMetaLine article={article} variant="site" />
          </div>
          {article.excerpt ? (
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-neutral-700">{article.excerpt}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
