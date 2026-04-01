/**
 * Contentful GraphQL type names are PascalCase derivations of the content type ID.
 * Example: `blogPost` → `BlogPost`, `article` → `Article`, `news-article` → `NewsArticle`.
 */
export function contentTypeIdToGraphQLType(id: string): string {
  const withSpaces = id
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();

  return withSpaces
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
