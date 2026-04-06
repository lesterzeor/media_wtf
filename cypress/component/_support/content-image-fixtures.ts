import type { ContentImage } from "@/types/content";

/** Valid {@link ContentImage} for hero/card tests (matches `remotePatterns` host). */
export function contentImageFixture(overrides: Partial<ContentImage> = {}): ContentImage {
  return {
    url: "https://images.ctfassets.net/placeholder/placeholder/placeholder.jpg",
    width: 1200,
    height: 800,
    title: "Test image title",
    description: "Test image description",
    ...overrides,
  };
}
