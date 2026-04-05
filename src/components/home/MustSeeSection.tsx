import Link from "next/link";
import { ArticleMetaLine } from "@/components/home/ArticleMetaLine";
import { ArticleThumb } from "@/components/home/ArticleThumb";
import { HomeSectionHeader } from "@/components/home/HomeSectionHeader";
import type { MustSeeSectionProps } from "@/components/home/types";
import { primaryCategoryName } from "@/lib/contentful/homeFeed";
import { cn } from "@/lib/utils";

export type { MustSeeSectionProps } from "@/components/home/types";

export function MustSeeSection({ articles, className }: MustSeeSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={cn("overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm", className)}>
      <HomeSectionHeader title="Must see" variant="ribbon" />
      <ul className="divide-y divide-neutral-200 px-3 py-0 md:px-4">
        {articles.map((article) => {
          const category = primaryCategoryName(article);
          return (
          <li key={article.id}>
            <Link
              href={`/articles/${article.slug}`}
              className="flex gap-3 py-4 transition hover:bg-neutral-50/80"
            >
              {article.heroImage ? (
                <ArticleThumb image={article.heroImage} alt={article.title} size="sm" />
              ) : (
                <div
                  className="size-[72px] shrink-0 rounded bg-neutral-200"
                  aria-hidden
                />
              )}
              <div className="min-w-0 flex-1">
                {category ? (
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                    {category}
                  </p>
                ) : null}
                <ArticleMetaLine article={article} className="mb-1" variant="site" />
                <h3 className="font-sans text-base font-bold leading-snug text-neutral-900">{article.title}</h3>
              </div>
            </Link>
          </li>
          );
        })}
      </ul>
    </section>
  );
}
