"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ArticleView } from "@/components/content/ArticleView";
import { GetArticleBySlugDocument } from "@/gql/graphql";
import type { GetArticleBySlugQuery } from "@/gql/graphql";
import { mapArticle } from "@/lib/contentful/mappers";

type Props = {
  initialQuery: GetArticleBySlugQuery;
  locale: string;
};

/**
 * Subscribes to Contentful Live Preview updates and re-renders when fields change.
 * Requires the same GraphQL document used for the initial fetch.
 */
export function ArticlePageClient({ initialQuery, locale }: Props) {
  const data = useContentfulLiveUpdates(initialQuery, {
    query: GetArticleBySlugDocument,
    locale,
  });

  const raw = data.articleCollection?.items?.[0];
  const article = mapArticle(raw as Parameters<typeof mapArticle>[0]);

  if (!article) {
    return (
      <p className="text-sm text-neutral-500" role="status">
        This article could not be loaded for preview.
      </p>
    );
  }

  return <ArticleView article={article} />;
}
