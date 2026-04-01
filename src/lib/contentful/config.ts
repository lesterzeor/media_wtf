import { contentTypeIdToGraphQLType } from "@/lib/contentful/naming";

const requiredServerVars = ["CONTENTFUL_SPACE_ID", "CONTENTFUL_ACCESS_TOKEN"] as const;

export type ContentfulArticleSchema = {
  /** Content type ID as shown in Contentful (e.g. `blogPost`, `article`). */
  contentTypeId: string;
  /** GraphQL type name (e.g. `BlogPost`, `Article`). */
  graphQLType: string;
  /** Root collection field (e.g. `blogPostCollection`). */
  collectionField: string;
  /** `order` argument for collection queries (schema-specific). */
  articlesOrder: string;
};

export function getContentfulConfig() {
  for (const key of requiredServerVars) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    spaceId: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  };
}

/**
 * Maps your Contentful content type ID to GraphQL type/collection names.
 * Set `CONTENTFUL_ARTICLE_CONTENT_TYPE_ID` to the ID of the type that holds posts (see Contentful → Content model).
 */
export function getContentfulArticleSchema(): ContentfulArticleSchema {
  const contentTypeId = process.env.CONTENTFUL_ARTICLE_CONTENT_TYPE_ID?.trim() || "article";
  const graphQLType =
    process.env.CONTENTFUL_ARTICLE_GRAPHQL_TYPE?.trim() || contentTypeIdToGraphQLType(contentTypeId);
  const collectionField = `${contentTypeId}Collection`;
  const articlesOrder = process.env.CONTENTFUL_ARTICLES_ORDER?.trim() || "sys_publishedAt_DESC";

  return {
    contentTypeId,
    graphQLType,
    collectionField,
    articlesOrder,
  };
}

/** Single Entry link → `categories` + inline fragment; many references → `categoriesCollection`. */
export type CategoriesFieldMode = "single" | "many";

export function getCategoriesFieldMode(): CategoriesFieldMode {
  const v = process.env.CONTENTFUL_CATEGORIES_MODE?.trim().toLowerCase();
  if (v === "many" || v === "collection") {
    return "many";
  }
  return "single";
}

/** GraphQL type for linked category entries (content type ID `category` → `Category`). */
export function getCategoryGraphQLType(): string {
  const id = process.env.CONTENTFUL_CATEGORY_CONTENT_TYPE_ID?.trim() || "category";
  return (
    process.env.CONTENTFUL_CATEGORY_GRAPHQL_TYPE?.trim() || contentTypeIdToGraphQLType(id)
  );
}
