import Link from "next/link";
import { HomeSectionHeader } from "@/components/home/HomeSectionHeader";
import type { TrendingSectionProps } from "@/components/home/types";
import { formatPublishedDate } from "@/lib/formatPublishedDate";
import { cn } from "@/lib/utils";

export type { TrendingSectionProps } from "@/components/home/types";

/** Center column: date above title, text-only list (reference layout). */
export function TrendingSection({ articles, className }: TrendingSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={cn("overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm", className)}>
      <HomeSectionHeader title="Trending" variant="ribbon" />
      <ul className="divide-y divide-neutral-200 px-2 py-0 md:px-3">
        {articles.map((article) => {
          const date = formatPublishedDate(article.publishedAt);
          return (
            <li key={article.id}>
              <Link
                href={`/articles/${article.slug}`}
                className="block py-4 text-center transition hover:bg-neutral-50/90"
              >
                {date ? (
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">{date}</p>
                ) : null}
                <h3 className="mt-1.5 px-1 font-sans text-[15px] font-bold leading-snug text-neutral-900">
                  {article.title}
                </h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
