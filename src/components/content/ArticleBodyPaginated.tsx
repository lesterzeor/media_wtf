"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { RichText } from "@/components/content/RichText";
import { paginateArticleBody } from "@/lib/contentful/splitRichTextAtHr";
import type { Article } from "@/types/content";
import { cn } from "@/lib/utils";

type ArticleBodyPaginatedProps = {
  body: Article["body"];
  /** Hero image — only rendered on part 1; hidden on later parts when the body is split by HRs. */
  hero?: ReactNode;
};

export function ArticleBodyPaginated({ body, hero }: ArticleBodyPaginatedProps) {
  const { pages, links } = useMemo(() => paginateArticleBody(body), [body]);
  const [pageIndex, setPageIndex] = useState(0);
  /** Tracks last rendered part so we scroll only on real Prev/Next, not first paint. */
  const prevPartRef = useRef<number | null>(null);

  const total = pages.length;
  const i = total > 0 ? Math.min(pageIndex, total - 1) : 0;

  useEffect(() => {
    if (prevPartRef.current === null) {
      prevPartRef.current = i;
      return;
    }
    if (prevPartRef.current !== i) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      prevPartRef.current = i;
    }
  }, [i]);

  if (total === 0 || !pages[i]) {
    return (
      <div className="scroll-mt-24 space-y-6">
        {hero}
        <RichText document={body} />
      </div>
    );
  }

  const pageDocument = links !== undefined ? { json: pages[i], links } : pages[i];

  return (
    <div className={cn("scroll-mt-24", i === 0 && hero ? "space-y-6" : undefined)}>
      {i === 0 ? hero : null}
      <RichText document={pageDocument} />

      {total > 1 ? (
        <nav
          className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Article page navigation"
        >
          <button
            type="button"
            disabled={i <= 0}
            onClick={() => setPageIndex(Math.max(0, i - 1))}
            className={cn(
              "rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors",
              i <= 0
                ? "cursor-not-allowed border-neutral-200 text-neutral-400"
                : "border-neutral-300 text-neutral-900 hover:border-brand-primary hover:text-brand-primary",
            )}
          >
            Prev
          </button>
          <p className="text-center text-sm text-neutral-500">
            Part {i + 1} of {total}
          </p>
          <button
            type="button"
            disabled={i >= total - 1}
            onClick={() => setPageIndex(Math.min(total - 1, i + 1))}
            className={cn(
              "rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors",
              i >= total - 1
                ? "cursor-not-allowed border-neutral-200 text-neutral-400"
                : "border-neutral-300 text-neutral-900 hover:border-brand-primary hover:text-brand-primary",
            )}
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
