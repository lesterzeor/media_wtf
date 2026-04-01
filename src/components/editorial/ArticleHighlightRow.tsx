import Link from "next/link";
import { CategoryTags } from "@/components/editorial/CategoryTags";
import type { ArticleHighlightRowProps } from "@/components/editorial/types";

/** Single row for “Today’s highlights” and similar lists. */
export function ArticleHighlightRow({ article }: ArticleHighlightRowProps) {
  return (
    <article className="border-b border-neutral-200 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <Link href={`/articles/${article.slug}`} className="group block">
        <CategoryTags categories={article.categories} className="mb-2" />
        <h3 className="font-serif text-lg font-bold leading-snug text-neutral-900 group-hover:underline">
          {article.title}
        </h3>
        {article.author?.trim() ? (
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            By {article.author.trim()}
          </p>
        ) : null}
      </Link>
    </article>
  );
}
