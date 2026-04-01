import Link from "next/link";
import { CategoryTags } from "@/components/editorial/CategoryTags";
import { EditorialHeroImage } from "@/components/editorial/EditorialHeroImage";
import type { RecommendedFeatureProps } from "@/components/editorial/types";
import { cn } from "@/lib/utils";

/** Large horizontal feature (pink section) — image left, text right. */
export function RecommendedFeature({ article, className }: RecommendedFeatureProps) {
  if (!article) {
    return (
      <div
        className={cn(
          "flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500",
          className,
        )}
      >
        Publish more articles to fill this recommended block.
      </div>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        "group grid overflow-hidden rounded-lg bg-white shadow-sm md:grid-cols-2",
        className,
      )}
    >
      <div className="relative aspect-[16/10] min-h-[200px] w-full md:aspect-auto md:min-h-[280px]">
        {article.heroImage ? (
          <EditorialHeroImage
            image={article.heroImage}
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-200" />
        )}
      </div>
      <div className="flex flex-col justify-center p-6 md:p-10">
        <CategoryTags categories={article.categories} className="mb-3" />
        <h2 className="font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
          {article.title}
        </h2>
        {article.author?.trim() ? (
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-primary">
            By {article.author.trim()}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
