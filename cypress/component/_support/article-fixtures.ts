import type { Article } from "@/types/content";

const placeholderImage = {
  url: "https://images.ctfassets.net/placeholder/placeholder/placeholder.jpg",
  width: 1200,
  height: 800,
  title: "Hero image",
  description: "Decorative hero for tests",
};

/** Minimal valid {@link Article} for component tests (Contentful-shaped). */
export function articleFixture(overrides: Partial<Article> = {}): Article {
  return {
    id: "article-test-id",
    slug: "test-article-slug",
    title: "Test article title",
    categories: [],
    heroImage: placeholderImage,
    publishedAt: "2025-01-15T12:00:00.000Z",
    ...overrides,
  };
}
