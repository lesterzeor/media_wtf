import type { Article, Category, HomeLayout } from "@/types/content";

type RawCategory = {
  sys?: { id?: string };
  name?: string;
  slug?: string;
};

/** Linked `Author` entry or legacy plain string if ever present. */
type RawAuthorRef = {
  sys?: { id?: string };
  name?: string | null;
};

type RawArticle = {
  sys?: { id?: string; publishedAt?: string };
  title?: string;
  slug?: string;
  excerpt?: string;
  author?: RawAuthorRef | string | null;
  body?: { json?: unknown; links?: unknown };
  heroImage?: {
    url?: string;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
  };
  closingYoutubeUrl?: string | null;
  closingVideoUrl?: string | null;
  /** Many references field in Contentful */
  categoriesCollection?: {
    items?: Array<RawCategory | null>;
  };
  /** Single reference field in Contentful */
  categories?: RawCategory | null;
};

function resolveArticleAuthorName(raw: RawArticle): string | undefined {
  const a = raw.author;
  if (a == null) {
    return undefined;
  }
  if (typeof a === "string") {
    const t = a.trim();
    return t || undefined;
  }
  const n = a.name?.trim();
  return n || undefined;
}

function mapCategoryEntry(item: RawCategory | null | undefined): Category | null {
  if (!item?.sys?.id || !item.name || !item.slug) {
    return null;
  }
  return { id: item.sys.id, name: item.name, slug: item.slug };
}

function extractCategories(raw: RawArticle): Category[] {
  const fromMany = raw.categoriesCollection?.items
    ?.map((item) => mapCategoryEntry(item))
    .filter((c): c is Category => Boolean(c));
  if (fromMany?.length) {
    return fromMany;
  }

  const one = mapCategoryEntry(raw.categories ?? undefined);
  return one ? [one] : [];
}

type RawHomeItem = {
  internalTitle?: string;
  mustSeeAmount?: number | null;
  trendingAmount?: number | null;
  recommendedSidebarAmount?: number | null;
  featuredMediaArticlesCollection?: { items?: Array<RawArticle | null> };
  todaysHighlightsCollection?: { items?: Array<RawArticle | null> };
  featuredArticle?: RawArticle | null;
  mustSeeArticlesCollection?: { items?: Array<RawArticle | null> };
  /** Contentful GraphQL exposes the one link as `hotArticleCollection`, not `hotArticle`. */
  hotArticleCollection?: { items?: Array<RawArticle | null> };
  hotArticle?: RawArticle | null;
  recommendedSidebarArticlesCollection?: { items?: Array<RawArticle | null> };
  trendingArticlesCollection?: { items?: Array<RawArticle | null> };
};

function mapArticleList(items: Array<RawArticle | null | undefined> | undefined): Article[] {
  return (items ?? [])
    .map((item) => mapArticle(item))
    .filter((item): item is Article => Boolean(item));
}

export function mapHome(raw: RawHomeItem | null | undefined): HomeLayout | null {
  if (!raw) {
    return null;
  }

  return {
    internalTitle: raw.internalTitle,
    mustSeeAmount: raw.mustSeeAmount ?? null,
    trendingAmount: raw.trendingAmount ?? null,
    recommendedSidebarAmount: raw.recommendedSidebarAmount ?? null,
    featuredMedia: mapArticleList(raw.featuredMediaArticlesCollection?.items),
    featured: mapArticle(raw.featuredArticle),
    highlights: mapArticleList(raw.todaysHighlightsCollection?.items),
    mustSee: mapArticleList(raw.mustSeeArticlesCollection?.items),
    hot:
      mapArticle(raw.hotArticle) ??
      mapArticle(raw.hotArticleCollection?.items?.[0]),
    recommendedSidebar: mapArticleList(raw.recommendedSidebarArticlesCollection?.items),
    trending: mapArticleList(raw.trendingArticlesCollection?.items),
  };
}

export function mapArticle(raw: RawArticle | null | undefined): Article | null {
  if (!raw?.slug || !raw?.title || !raw?.sys?.id) {
    return null;
  }

  const author = resolveArticleAuthorName(raw);

  return {
    id: raw.sys.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    ...(author ? { author } : {}),
    publishedAt: raw.sys.publishedAt,
    body:
      raw.body?.json != null
        ? { json: raw.body.json, ...(raw.body.links != null ? { links: raw.body.links } : {}) }
        : undefined,
    heroImage: raw.heroImage?.url
      ? {
          url: raw.heroImage.url,
          width: raw.heroImage.width ?? 1200,
          height: raw.heroImage.height ?? 675,
          title: raw.heroImage.title ?? raw.title,
          description: raw.heroImage.description,
        }
      : undefined,
    ...(raw.closingYoutubeUrl?.trim()
      ? { closingYoutubeUrl: raw.closingYoutubeUrl.trim() }
      : {}),
    ...(raw.closingVideoUrl?.trim() ? { closingVideoUrl: raw.closingVideoUrl.trim() } : {}),
    categories: extractCategories(raw),
  };
}
