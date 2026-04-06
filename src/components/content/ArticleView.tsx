"use client";

import { ContentfulImage } from "@/components/content/ContentfulImage";
import { ArticleBodyPaginated } from "@/components/content/ArticleBodyPaginated";
import { AdRegion } from "@/components/ui/AdRegion";
import { formatPublishedDateLong } from "@/lib/formatPublishedDate";
import type { Article } from "@/types/content";

type ArticleViewProps = {
  article: Article;
};

/** Article layout — client so it can be used under `useContentfulLiveUpdates` in preview. */
export function ArticleView({ article }: ArticleViewProps) {
  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{article.title}</h1>
          {(article.author?.trim() || article.publishedAt) && (
            <p className="text-sm text-slate-500">
              {article.author?.trim() ? (
                <span className="font-medium text-brand-primary">By {article.author.trim()}</span>
              ) : null}
              {article.author?.trim() && article.publishedAt ? <> · </> : null}
              {article.publishedAt ? (
                <>Published {formatPublishedDateLong(article.publishedAt) ?? article.publishedAt}</>
              ) : null}
            </p>
          )}
        </header>
        <ArticleBodyPaginated
          key={article.id}
          body={article.body}
          closingYoutubeUrl={article.closingYoutubeUrl}
          closingVideoUrl={article.closingVideoUrl}
          hero={
            article.heroImage ? (
              <figure className="mx-auto w-full max-w-4xl">
                <div className="relative h-64 w-full overflow-hidden rounded-xl bg-neutral-100 sm:h-80 md:h-96">
                  <ContentfulImage
                    fill
                    image={article.heroImage}
                    priority
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              </figure>
            ) : null
          }
        />
        <AdRegion region="in-content" />
      </div>
      <aside className="space-y-4" aria-label="Advertisements">
        <AdRegion region="sidebar" />
      </aside>
    </article>
  );
}
