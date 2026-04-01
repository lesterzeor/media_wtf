import Link from "next/link";
import { ArticleThumb } from "@/components/home/ArticleThumb";
import { HomeSectionHeader } from "@/components/home/HomeSectionHeader";
import type { RecommendedSidebarSectionProps } from "@/components/home/types";
import { cn } from "@/lib/utils";

export type { RecommendedSidebarSectionProps } from "@/components/home/types";

export function RecommendedSidebarSection({ articles, className }: RecommendedSidebarSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={cn("overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm", className)}>
      <HomeSectionHeader title="Recommended" variant="ribbon" />
      <ul className="divide-y divide-neutral-200 px-3 md:px-4">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/articles/${article.slug}`}
              className="flex items-center gap-3 py-3 transition hover:bg-neutral-50/80"
            >
              {article.heroImage ? (
                <ArticleThumb image={article.heroImage} alt={article.title} size="md" />
              ) : (
                <div className="size-24 shrink-0 rounded bg-neutral-200" aria-hidden />
              )}
              <h3 className="min-w-0 flex-1 font-sans text-[15px] font-bold leading-snug text-neutral-900">
                {article.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
