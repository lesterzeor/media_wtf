export type ContentImage = {
  url: string;
  width: number;
  height: number;
  title: string;
  description?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

/** Contentful rich text from GraphQL: `body { json links { ... } }`. */
export type ArticleBodyRichText = {
  json: unknown;
  links?: unknown;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  /** Display name from linked Author entry (`author.name`) or legacy string. */
  author?: string;
  publishedAt?: string;
  heroImage?: ContentImage;
  /** Rich text document + link resolution data, or a legacy plain document object. */
  body?: ArticleBodyRichText | unknown;
  categories: Category[];
};

/** Curated home layout from Contentful `home` singleton (Option A). */
export type HomeLayout = {
  internalTitle?: string;
  /**
   * Ordered list for `FeaturedMediaGrid` (same order as in Contentful).
   * First 5 slots: 1 large tile + 2×2 grid. When empty, fall back to highlights or latest.
   */
  featuredMedia: Article[];
  /** Left column card (below strip); single reference on Home, like Hot. */
  featured: Article | null;
  highlights: Article[];
  mustSee: Article[];
  hot: Article | null;
  recommendedSidebar: Article[];
  trending: Article[];
};
