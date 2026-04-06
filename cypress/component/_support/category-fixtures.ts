import type { Category } from "@/types/content";

export function categoryFixture(overrides: Partial<Category> = {}): Category {
  return {
    id: "cat-test-id",
    name: "Culture",
    slug: "culture",
    ...overrides,
  };
}
