import type { Article, Category, ContentImage } from "@/types/content";
export type CategoryTagsProps = {
  categories: Category[];
  className?: string;
};

export type SectionVariant = "purple" | "pink" | "navy";

export type SectionHeaderProps = {
  title: string;
  variant?: SectionVariant;
  className?: string;
};

export type ArticleHighlightRowProps = {
  article: Article;
};

export type FeaturedHeroProps = {
  article: Article | null;
  className?: string;
};

export type RecommendedFeatureProps = {
  article: Article | null;
  className?: string;
};

export type TodaysHighlightsProps = {
  articles: Article[];
};

export type PromoCardProps = {
  className?: string;
};

export type EditorialHeroImageProps = {
  image: ContentImage;
  priority?: boolean;
  sizes?: string;
  className?: string;
};
