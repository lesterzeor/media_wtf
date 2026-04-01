import { encodeGraphQLResponse } from "@contentful/live-preview";
import { print } from "graphql";
import { draftMode } from "next/headers";
import {
  GetArticleBySlugDocument,
  GetArticlesDocument,
  GetArticleSlugsDocument,
  GetHomeDocument,
} from "@/gql/graphql";
import type { GetArticleBySlugQuery, GetArticlesQuery } from "@/gql/graphql";
import { getContentfulClient } from "@/lib/contentful/client";
import { mapArticle, mapHome } from "@/lib/contentful/mappers";
import type { Article, HomeLayout } from "@/types/content";

function articleItemsFromArticlesQuery(
  data: GetArticlesQuery,
): Parameters<typeof mapArticle>[0][] {
  return (data.articleCollection?.items ?? []) as Parameters<typeof mapArticle>[0][];
}

function articleItemsFromSlugQuery(
  data: GetArticleBySlugQuery,
): Parameters<typeof mapArticle>[0][] {
  return (data.articleCollection?.items ?? []) as Parameters<typeof mapArticle>[0][];
}

export async function getArticles(limit = 12): Promise<Article[]> {
  const { isEnabled } = await draftMode();
  const client = getContentfulClient(isEnabled);
  const data = await client.request(GetArticlesDocument, {
    limit,
    skip: 0,
    preview: isEnabled,
  });

  return articleItemsFromArticlesQuery(data)
    .map((item) => mapArticle(item))
    .filter((item): item is Article => Boolean(item));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { isEnabled } = await draftMode();
  const client = getContentfulClient(isEnabled);
  const data = await client.request(GetArticleBySlugDocument, {
    slug,
    preview: isEnabled,
  });

  const first = articleItemsFromSlugQuery(data)[0];
  return mapArticle(first);
}

/**
 * Raw GraphQL for Live Preview. For draft mode we use `rawRequest` so `extensions` (Content Source Maps)
 * are available, then `encodeGraphQLResponse` so `useContentfulLiveUpdates` can merge edits.
 * Without `@contentSourceMaps` + encode, the SDK cannot wire fields and you must refresh manually.
 * Content Source Maps require a Contentful **Premium** plan.
 */
export async function getArticleBySlugQuery(slug: string): Promise<GetArticleBySlugQuery | null> {
  const { isEnabled } = await draftMode();
  const client = getContentfulClient(isEnabled);

  if (!isEnabled) {
    const data = await client.request(GetArticleBySlugDocument, {
      slug,
      preview: false,
    });
    const first = articleItemsFromSlugQuery(data)[0];
    return first ? data : null;
  }

  const response = await client.rawRequest({
    query: print(GetArticleBySlugDocument),
    variables: {
      slug,
      preview: true,
    },
  });

  const data = response.data as GetArticleBySlugQuery | undefined;
  const first = data?.articleCollection?.items?.[0];
  if (!first) {
    return null;
  }

  if (response.extensions != null && data != null) {
    try {
      const encoded = encodeGraphQLResponse({
        data,
        extensions: response.extensions,
      });
      return encoded.data as GetArticleBySlugQuery;
    } catch {
      // Encoding failed (e.g. missing maps) — fall back to raw data; live updates may not work.
    }
  }

  return data as GetArticleBySlugQuery;
}

export async function getArticleSlugs(): Promise<string[]> {
  const client = getContentfulClient(false);
  const data = await client.request(GetArticleSlugsDocument, {});

  return (data.articleCollection?.items ?? [])
    .map((item) => item?.slug)
    .filter((slug): slug is string => Boolean(slug));
}

/** Curated home singleton (`home` content type). Returns null if missing, empty, or the query/schema is not ready yet. */
export async function getHome(): Promise<HomeLayout | null> {
  try {
    const { isEnabled } = await draftMode();
    const client = getContentfulClient(isEnabled);
    const data = await client.request(GetHomeDocument, {
      preview: isEnabled,
    });
    const raw = data.homeCollection?.items?.[0];
    return mapHome(raw as Parameters<typeof mapHome>[0]);
  } catch (error) {
    console.error(
      "[getHome] Contentful GetHome failed — home singleton data (hotArticle, featured media, etc.) will be missing. Check: HOME entry published, fields exist (run npm run contentful:sync-home-model), Delivery token, and GraphQL errors below.",
      error,
    );
    return null;
  }
}
