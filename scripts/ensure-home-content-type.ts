/**
 * Creates or updates the `home` singleton content model via Contentful Management API.
 *
 * Setup (do not commit secrets):
 * 1. Add to `.env.local`:
 *    - CONTENTFUL_MANAGEMENT_TOKEN  (Settings → API keys → Content management tokens)
 *    - CONTENTFUL_SPACE_ID
 *    - CONTENTFUL_ENVIRONMENT=master (optional)
 *    - CONTENTFUL_ARTICLE_CONTENT_TYPE_ID=article (optional, must match your Article type ID)
 * 2. Run: npm run contentful:sync-home-model
 * 3. In Contentful → Content → Add entry → Home, publish, and link articles.
 *
 * Never paste your management token into chat or commit it to git.
 */
import { createClient } from "contentful-management";
import type { ContentTypeProps } from "contentful-management";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN?.trim();
const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim();
const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";
const articleTypeId = process.env.CONTENTFUL_ARTICLE_CONTENT_TYPE_ID?.trim() || "article";

function isNotFound(error: unknown): boolean {
  const err = error as { sys?: { id?: string }; name?: string };
  return err?.name === "NotFound" || err?.sys?.id === "NotFound";
}

function featuredMediaArticlesField(): ContentTypeProps["fields"][number] {
  const linkToArticle = {
    linkContentType: [articleTypeId],
  };
  return {
    id: "featuredMediaArticles",
    name: "Featured media (ordered)",
    type: "Array",
    localized: false,
    required: false,
    disabled: false,
    omitted: false,
    items: {
      type: "Link",
      linkType: "Entry",
      validations: [linkToArticle],
    },
  };
}

function buildFields() {
  const linkToArticle = {
    linkContentType: [articleTypeId],
  };

  return [
    {
      id: "internalTitle",
      name: "Internal title",
      type: "Symbol" as const,
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "heroArticle",
      name: "Hero article",
      type: "Link" as const,
      localized: false,
      required: false,
      validations: [linkToArticle],
      disabled: false,
      omitted: false,
      linkType: "Entry" as const,
    },
    {
      id: "todaysHighlights",
      name: "Today's highlights",
      type: "Array" as const,
      localized: false,
      required: false,
      disabled: false,
      omitted: false,
      items: {
        type: "Link" as const,
        linkType: "Entry" as const,
        validations: [linkToArticle],
      },
    },
    {
      id: "recommendedArticle",
      name: "Recommended article",
      type: "Link" as const,
      localized: false,
      required: false,
      validations: [linkToArticle],
      disabled: false,
      omitted: false,
      linkType: "Entry" as const,
    },
    {
      id: "educationArticles",
      name: "Education articles",
      type: "Array" as const,
      localized: false,
      required: false,
      disabled: false,
      omitted: false,
      items: {
        type: "Link" as const,
        linkType: "Entry" as const,
        validations: [linkToArticle],
      },
    },
    {
      id: "mustSeeArticles",
      name: "Must see articles",
      type: "Array" as const,
      localized: false,
      required: false,
      disabled: false,
      omitted: false,
      items: {
        type: "Link" as const,
        linkType: "Entry" as const,
        validations: [linkToArticle],
      },
    },
    {
      id: "hotArticle",
      name: "Hot article",
      type: "Link" as const,
      localized: false,
      required: false,
      validations: [linkToArticle],
      disabled: false,
      omitted: false,
      linkType: "Entry" as const,
    },
    {
      id: "recommendedSidebarArticles",
      name: "Recommended (sidebar list)",
      type: "Array" as const,
      localized: false,
      required: false,
      disabled: false,
      omitted: false,
      items: {
        type: "Link" as const,
        linkType: "Entry" as const,
        validations: [linkToArticle],
      },
    },
    {
      id: "trendingArticles",
      name: "Trending articles",
      type: "Array" as const,
      localized: false,
      required: false,
      disabled: false,
      omitted: false,
      items: {
        type: "Link" as const,
        linkType: "Entry" as const,
        validations: [linkToArticle],
      },
    },
  ];
}

async function main() {
  if (!token || !spaceId) {
    console.error(
      "Missing CONTENTFUL_MANAGEMENT_TOKEN or CONTENTFUL_SPACE_ID in .env.local (see scripts/ensure-home-content-type.ts header).",
    );
    process.exit(1);
  }

  const client = createClient({ accessToken: token });
  const envParams = { spaceId, environmentId };
  const ctParams = { ...envParams, contentTypeId: "home" };
  const fields = buildFields() as ContentTypeProps["fields"];

  let existing: ContentTypeProps | null = null;
  try {
    existing = await client.contentType.get(ctParams);
  } catch (error) {
    if (!isNotFound(error)) {
      throw error;
    }
  }

  if (!existing) {
    const created = await client.contentType.createWithId(ctParams, {
      name: "Home",
      fields: [...fields, featuredMediaArticlesField()],
      displayField: "internalTitle",
    });
    await client.contentType.publish(ctParams, created);
    console.log("Created and published content type: home");
  } else {
    const hasFeatured = existing.fields?.some((f) => f.id === "featuredMediaArticles");
    const nextFields = hasFeatured
      ? existing.fields
      : [...(existing.fields ?? []), featuredMediaArticlesField()];

    const updated = await client.contentType.update(ctParams, {
      ...existing,
      name: "Home",
      displayField: "internalTitle",
      fields: nextFields,
    });
    await client.contentType.publish(ctParams, updated);
    console.log(
      hasFeatured
        ? "Home content type already had featuredMediaArticles; republished."
        : "Appended featuredMediaArticles and published content type: home",
    );
  }

  console.log(
    "\nDone. GraphQL may take a minute to expose `homeCollection`. In Contentful → Content, add one Home entry, link articles, and publish.\n",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
