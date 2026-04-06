import Link from "next/link";
import { EditorialHeroImage } from "@/components/editorial/EditorialHeroImage";
import { ArticleMetaLine } from "@/components/home/ArticleMetaLine";
import { HomeSectionHeader } from "@/components/home/HomeSectionHeader";
import type { HotSectionProps } from "@/components/home/types";
import { cn } from "@/lib/utils";

export type { HotSectionProps } from "@/components/home/types";

export function HotSection({ article, className }: HotSectionProps) {
  if (!article) {
    return (
      <section
        className={cn(
          "flex flex-col items-center rounded-lg border border-dashed border-neutral-300 bg-white p-6 text-center text-sm text-neutral-500",
          className,
        )}
      >
        <HomeSectionHeader title="Hot" variant="badge" className="mb-3" />
        <p>
          Add a <strong className="text-neutral-700">Hot article</strong> on your Home entry in Contentful
          (field <code className="rounded bg-neutral-100 px-1 text-xs">hotArticle</code>), or publish more
          posts for automatic fallbacks.
        </p>
      </section>
    );
  }

  return (
    <section className={cn("overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm", className)}>
      <div className="p-4">
        <HomeSectionHeader title="Hot" variant="badge" />
        <Link
          href={`/articles/${article.slug}`}
          className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-md bg-neutral-200">
            {article.heroImage ? (
              <EditorialHeroImage
                image={article.heroImage}
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            ) : null}
          </div>
          <h3 className="font-serif text-xl font-bold leading-tight text-neutral-900 group-hover:underline md:text-2xl">
            {article.title}
          </h3>
          <div className="mt-2">
            <ArticleMetaLine article={article} variant="site" />
          </div>
          {article.excerpt ? (
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-neutral-700">{article.excerpt}</p>
          ) : null}
        </Link>
      </div>
    </section>
  );
}
