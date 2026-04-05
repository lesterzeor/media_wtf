import type { Article, ContentImage } from "@/types/content";

export type FeaturedMediaGridProps = {
  /** Ordered list (e.g. Home → Featured media in Contentful). Rendered as equal tiles in that order. */
  articles: Article[];
  className?: string;
};

/** Left-column hero card (image + “Featured” badge + title + meta + excerpt). */
export type FeaturedArticleProps = {
  article: Article;
  className?: string;
};

export type MustSeeSectionProps = {
  articles: Article[];
  className?: string;
};

export type HotSectionProps = {
  article: Article | null;
  className?: string;
};

export type RecommendedSidebarSectionProps = {
  articles: Article[];
  className?: string;
};

export type HomeSectionHeaderProps = {
  title: string;
  /** Full-width primary bar vs compact pill (e.g. HOT). */
  variant?: "ribbon" | "badge";
  className?: string;
};

export type ArticleThumbProps = {
  image: ContentImage;
  alt: string;
  size?: "sm" | "md";
  className?: string;
};

export type ArticleMetaLineProps = {
  article: Article;
  className?: string;
  /** `site` = publication name in red + date (reference lists). `author` = byline from Contentful. */
  variant?: "author" | "site";
  /** `dark` = text for image overlays (featured grid). */
  tone?: "light" | "dark";
};

export type TrendingSectionProps = {
  articles: Article[];
  className?: string;
};

export type SubscribeSidebarProps = {
  className?: string;
};

export type NewsletterSignupProps = {
  className?: string;
  /** Prefix for input ids when multiple instances could exist on one page. */
  idPrefix?: string;
};
