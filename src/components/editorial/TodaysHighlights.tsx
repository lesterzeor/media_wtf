import Link from "next/link";
import { ArticleHighlightRow } from "@/components/editorial/ArticleHighlightRow";
import type { TodaysHighlightsProps } from "@/components/editorial/types";

export function TodaysHighlights({ articles }: TodaysHighlightsProps) {
  return (
    <section className="flex h-full min-h-[280px] flex-col rounded-lg border border-neutral-200 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-neutral-900">
          Today&apos;s highlights
        </h2>
        <Link
          href="/articles"
          className="text-[11px] font-semibold uppercase tracking-wide text-brand-navy hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        {articles.length === 0 ? (
          <p className="text-sm text-neutral-500">No articles yet. Publish entries in Contentful.</p>
        ) : (
          articles.map((article) => <ArticleHighlightRow key={article.id} article={article} />)
        )}
      </div>
    </section>
  );
}
