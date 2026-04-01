import { Container } from "@/components/ui/Container";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";
import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { FeaturedMediaGrid } from "@/components/home/FeaturedMediaGrid";
import { HotSection } from "@/components/home/HotSection";
import { MustSeeSection } from "@/components/home/MustSeeSection";
import { RecommendedSidebarSection } from "@/components/home/RecommendedSidebarSection";
import { SubscribeSidebar } from "@/components/home/SubscribeSidebar";
import { TrendingSection } from "@/components/home/TrendingSection";
import { getArticles, getHome } from "@/lib/contentful/api";
import type { Article } from "@/types/content";

export const revalidate = 300;

function withoutIds(articles: Article[], ids: Set<string>): Article[] {
  return articles.filter((a) => !ids.has(a.id));
}

export default async function Home() {
  let articles: Article[] = [];
  let loadError: string | null = null;

  try {
    articles = await getArticles(24);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load Contentful content.";
  }

  const home = await getHome();

  const curatedFeatured =
    home && home.featuredMedia.length > 0 ? home.featuredMedia : null;

  const featured = curatedFeatured
    ? curatedFeatured[0] ?? null
    : home?.hero ?? articles[0] ?? null;
  const featuredId = featured?.id;
  const usedIds = new Set<string>(featuredId ? [featuredId] : []);

  const gridArticles = curatedFeatured
    ? curatedFeatured.slice(1, 5)
    : (() => {
        const gridSource =
          home && home.highlights.length > 0
            ? home.highlights.filter((a) => a.id !== featuredId)
            : articles.slice(1).filter((a) => a.id !== featuredId);
        return gridSource.slice(0, 4);
      })();

  const pool = withoutIds(articles, usedIds);

  const mustSeeRaw =
    home?.mustSee && home.mustSee.length > 0
      ? home.mustSee
      : home?.education && home.education.length > 0
        ? home.education
        : pool.slice(0, 6);

  let mustSee = featuredId
    ? mustSeeRaw.filter((a) => a.id !== featuredId)
    : mustSeeRaw;

  if (mustSee.length === 0 && pool.length > 0) {
    const exclude = new Set(featuredId ? [featuredId] : []);
    mustSee = withoutIds(pool, exclude).slice(0, 6);
  }

  const mustSeeIds = new Set(mustSee.map((a) => a.id));

  const trending =
    home?.trending && home.trending.length > 0
      ? home.trending
      : home?.highlights && home.highlights.length > 0
        ? home.highlights.filter((a) => !mustSeeIds.has(a.id)).slice(0, 8)
        : withoutIds(pool, mustSeeIds).slice(0, 6);

  const hotArticle =
    home?.hot ??
    home?.recommended ??
    withoutIds(pool, mustSeeIds)[0] ??
    null;

  const sidebarExclude = new Set<string>([...mustSeeIds, ...(hotArticle ? [hotArticle.id] : [])]);
  const recommendedSidebar =
    home?.recommendedSidebar && home.recommendedSidebar.length > 0
      ? home.recommendedSidebar
      : withoutIds(pool, sidebarExclude).slice(0, 5);

  return (
    <div className="pb-16">
      <Container wide className="space-y-8 pt-6 md:space-y-10 md:pt-8">
        {loadError ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">Contentful</p>
            <p>{loadError}</p>
          </div>
        ) : null}

        <FeaturedMediaGrid featured={featured} grid={gridArticles} />

        {/* Reference layout: Must see | Trending + ad | Subscribe + Hot + Recommended + ad */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-6 xl:gap-8">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5 xl:col-span-5">
            {featured ? <FeaturedArticle article={featured} /> : null}
            <AdPlaceholder width={300} height={250} />
            <MustSeeSection articles={mustSee} />
          </div>

          <div className="flex min-w-0 flex-col gap-6 lg:col-span-3 xl:col-span-4">
            <TrendingSection articles={trending} />
            <AdPlaceholder width={300} height={250} />
          </div>

          <aside className="flex min-w-0 flex-col gap-8 lg:col-span-4 xl:col-span-3">
            <SubscribeSidebar />
            <HotSection article={hotArticle} />
            <RecommendedSidebarSection articles={recommendedSidebar} />
            <AdPlaceholder width={300} height={250} />
          </aside>
        </div>
      </Container>
    </div>
  );
}
