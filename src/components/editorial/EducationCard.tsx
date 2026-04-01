import Link from "next/link";
import { CategoryTags } from "@/components/editorial/CategoryTags";
import type { EducationCardProps } from "@/components/editorial/types";

/** Compact grid cell — parent provides grid lines via `gap-px` + background. */
export function EducationCard({ article }: EducationCardProps) {
  return (
    <article className="relative flex h-full flex-col p-4 md:p-5">
      <div className="flex justify-between gap-2">
        <CategoryTags categories={article.categories} className="line-clamp-2 flex-1" />
        <span className="shrink-0 text-neutral-400" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </span>
      </div>
      <h3 className="mt-3 flex-1 font-serif text-[17px] font-bold leading-snug text-neutral-900">
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h3>
      {article.excerpt ? (
        <p className="mt-2 line-clamp-2 text-xs text-neutral-600">{article.excerpt}</p>
      ) : null}
      {article.author?.trim() ? (
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
          By {article.author.trim()}
        </p>
      ) : null}
    </article>
  );
}
