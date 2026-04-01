import Link from "next/link";
import { CategoryTags } from "@/components/editorial/CategoryTags";
import { EditorialHeroImage } from "@/components/editorial/EditorialHeroImage";
import type { FeaturedHeroProps } from "@/components/editorial/types";
import { cn } from "@/lib/utils";

export function FeaturedHero({ article, className }: FeaturedHeroProps) {
  if (!article) {
    return (
      <div
        className={cn(
          "flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-100 text-sm text-neutral-500",
          className,
        )}
      >
        Add a published article in Contentful to feature here.
      </div>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300 hover:shadow",
        className,
      )}
    >
      <div className="relative aspect-[16/11] w-full min-h-[200px] bg-neutral-100">
        {article.heroImage ? (
          <EditorialHeroImage
            image={article.heroImage}
            priority
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300" />
        )}
      </div>
      <div className="border-t border-neutral-100 p-4 md:p-5">
        <CategoryTags categories={article.categories} className="mb-2" />
        <h2 className="font-serif text-2xl font-bold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
          {article.title}
        </h2>
        {article.author?.trim() ? (
          <p className="mt-2 text-sm text-brand-primary">By {article.author.trim()}</p>
        ) : null}
      </div>
    </Link>
  );
}
