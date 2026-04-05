import type { Article } from "@/types/content";

/** Max items for Must see, Trending, Recommended sidebar. */
export const HOME_SECTION_LIMIT = 8;

/**
 * Every slug here should exist as a Contentful **Category** entry (`slug` field).
 * Seeded by `npm run contentful:seed-articles` → `scripts/seed-articles-data.ts` (`CATEGORY_DEFS`).
 */
export const HOME_PAGE_CATEGORY_SLUGS = [
  "fiction",
  "lifestyle",
  "travel",
  "technology",
  "culture",
  "opinion",
  "guides",
  "science",
] as const;

/**
 * Preferred category slugs per section (first match wins when filling from newest-first list).
 * Wider pools = more seeded articles qualify before generic backfill.
 */
export const HOME_SECTION_CATEGORY_SLUGS = {
  /** Editorial picks: guides, life, debate, culture */
  mustSee: ["guides", "lifestyle", "opinion", "culture"] as const,
  /** Newsy / timely */
  trending: ["technology", "science", "opinion", "culture"] as const,
  /** Longer reads */
  recommended: ["fiction", "travel", "lifestyle", "guides"] as const,
} as const;

/** First linked category label for UI (Contentful single reference → one entry typical). */
export function primaryCategoryName(article: Article): string | undefined {
  const n = article.categories[0]?.name?.trim();
  return n || undefined;
}

/** Newest-first articles not in `excludeIds`, up to `limit`. */
export function takeLatestArticles(
  orderedNewestFirst: Article[],
  excludeIds: Set<string>,
  limit: number,
): Article[] {
  const out: Article[] = [];
  for (const a of orderedNewestFirst) {
    if (out.length >= limit) {
      break;
    }
    if (excludeIds.has(a.id)) {
      continue;
    }
    out.push(a);
  }
  return out;
}

function articleMatchesAnySlug(article: Article, slugs: readonly string[]): boolean {
  if (article.categories.length === 0) {
    return false;
  }
  const want = new Set(slugs);
  return article.categories.some((c) => want.has(c.slug));
}

/**
 * Picks up to `limit` articles from a newest-first list.
 * Prefer entries whose categories overlap `preferredSlugs`, then backfill with the latest remaining articles.
 */
export function pickArticlesForHomeSection(
  orderedNewestFirst: Article[],
  preferredSlugs: readonly string[],
  limit: number,
  excludeIds: Set<string>,
): Article[] {
  const out: Article[] = [];
  const seen = new Set<string>();

  const push = (a: Article) => {
    if (out.length >= limit) {
      return;
    }
    if (excludeIds.has(a.id) || seen.has(a.id)) {
      return;
    }
    out.push(a);
    seen.add(a.id);
  };

  for (const a of orderedNewestFirst) {
    if (out.length >= limit) {
      break;
    }
    if (excludeIds.has(a.id)) {
      continue;
    }
    if (articleMatchesAnySlug(a, preferredSlugs)) {
      push(a);
    }
  }

  for (const a of orderedNewestFirst) {
    if (out.length >= limit) {
      break;
    }
    push(a);
  }

  return out.slice(0, limit);
}
