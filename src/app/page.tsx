import { Container } from "@/components/ui/Container";
import { AdRegion } from "@/components/ui/AdRegion";
import { HomeScrollToTop } from "@/components/home/HomeScrollToTop";
import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { FeaturedMediaGrid } from "@/components/home/FeaturedMediaGrid";
import { HotSection } from "@/components/home/HotSection";
import { MustSeeSection } from "@/components/home/MustSeeSection";
import { RecommendedSidebarSection } from "@/components/home/RecommendedSidebarSection";
import { SubscribeSidebar } from "@/components/home/SubscribeSidebar";
import { TrendingSection } from "@/components/home/TrendingSection";
import { getArticles, getHome } from "@/lib/contentful/api";
import {
  HOME_SECTION_CATEGORY_SLUGS,
  HOME_SECTION_LIMIT,
  pickArticlesForHomeSection,
} from "@/lib/contentful/homeFeed";
import type { Article } from "@/types/content";

export const revalidate = 300;

function withoutIds(articles: Article[], ids: Set<string>): Article[] {
  return articles.filter((a) => !ids.has(a.id));
}

/** Stories shown in the featured strip — exclude from lower lists to reduce duplicates. */
function layoutExcludeIds(shown: Article[]): Set<string> {
  return new Set(shown.map((a) => a.id));
}

export default async function Home() {
  let articles: Article[] = [];
  let loadError: string | null = null;

  try {
    articles = await getArticles(100);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load Contentful content.";
  }

  const home = await getHome();

  /** Contentful order when Home → Featured media is set; otherwise highlights or latest. */
  const orderedMedia: Article[] = (() => {
    if (home && home.featuredMedia.length > 0) {
      return home.featuredMedia;
    }
    if (home && home.highlights.length > 0) {
      return home.highlights.slice(0, 5);
    }
    return articles.slice(0, 5);
  })();

  /** Strip uses positions 1–5 only (large featured + 2×2). */
  const featuredStripArticles = orderedMedia.slice(0, 5);
  const layoutExcluded = layoutExcludeIds(featuredStripArticles);
  const featuredLeftColumn = home?.featured ?? null;
  if (featuredLeftColumn) {
    layoutExcluded.add(featuredLeftColumn.id);
  }
  const pool = withoutIds(articles, layoutExcluded);

  /** Must see: up to 8 newest, preferring guides / lifestyle / opinion / culture, then backfill. */
  const mustSee = pickArticlesForHomeSection(
    articles,
    HOME_SECTION_CATEGORY_SLUGS.mustSee,
    HOME_SECTION_LIMIT,
    layoutExcluded,
  );

  const mustSeeIds = new Set(mustSee.map((a) => a.id));

  /** Trending: up to 8 newest, preferring tech / science / opinion / culture; optional top-up from Home “highlights” if still short. */
  const trendingExclude = new Set([...layoutExcluded, ...mustSeeIds]);

  const trending = pickArticlesForHomeSection(
    articles,
    HOME_SECTION_CATEGORY_SLUGS.trending,
    HOME_SECTION_LIMIT,
    trendingExclude,
  );

  if (trending.length < HOME_SECTION_LIMIT && home?.highlights && home.highlights.length > 0) {
    for (const a of home.highlights) {
      if (trending.length >= HOME_SECTION_LIMIT) {
        break;
      }
      if (trendingExclude.has(a.id) || trending.some((x) => x.id === a.id)) {
        continue;
      }
      trending.push(a);
    }
  }

  const trendingIds = new Set(trending.map((a) => a.id));

  const hotArticle = home?.hot ?? withoutIds(pool, mustSeeIds)[0] ?? null;

  const sidebarExclude = new Set<string>([...mustSeeIds, ...trendingIds, ...(hotArticle ? [hotArticle.id] : [])]);

  const recommendedSidebar = pickArticlesForHomeSection(
    articles,
    HOME_SECTION_CATEGORY_SLUGS.recommended,
    HOME_SECTION_LIMIT,
    new Set([...layoutExcluded, ...sidebarExclude]),
  );

  return (
    <div className="pb-16">
      <HomeScrollToTop />
      <Container wide className="space-y-8 pt-6 md:space-y-10 md:pt-8">
        {loadError ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">Contentful</p>
            <p>{loadError}</p>
          </div>
        ) : null}

        <FeaturedMediaGrid articles={featuredStripArticles} />

        {/* Reference layout: Must see | Trending + ad | Subscribe + Hot + Recommended + ad */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-6 xl:gap-8">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5 xl:col-span-5">
            {featuredLeftColumn ? <FeaturedArticle article={featuredLeftColumn} /> : null}
            <AdRegion region="in-content" className="mx-auto w-full max-w-[300px]" />
            <MustSeeSection articles={mustSee} />
          </div>

          <div className="flex min-w-0 flex-col gap-6 lg:col-span-3 xl:col-span-4">
            <TrendingSection articles={trending} />
            <AdRegion region="top" className="mx-auto w-full max-w-[300px]" />
          </div>

          <aside className="flex min-w-0 flex-col gap-8 lg:col-span-4 xl:col-span-3">
            <SubscribeSidebar />
            <HotSection article={hotArticle} />
            <RecommendedSidebarSection articles={recommendedSidebar} />
            <AdRegion region="sidebar" className="mx-auto w-full max-w-[300px]" />
          </aside>
        </div>
      </Container>
    </div>
  );
}
