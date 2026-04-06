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

/** Contentful stores a stable internal `id` (e.g. `iimi`) and an `apiName` (e.g. `educationArticles`). */
type FieldWithApiName = ContentTypeProps["fields"][number] & { apiName?: string };

function isEducationArticlesField(f: ContentTypeProps["fields"][number]): boolean {
  const api = (f as FieldWithApiName).apiName;
  return f.id === "educationArticles" || api === "educationArticles";
}

function isHeroArticleField(f: ContentTypeProps["fields"][number]): boolean {
  const api = (f as FieldWithApiName).apiName;
  return f.id === "heroArticle" || api === "heroArticle";
}

function isRecommendedArticleField(f: ContentTypeProps["fields"][number]): boolean {
  const api = (f as FieldWithApiName).apiName;
  return f.id === "recommendedArticle" || api === "recommendedArticle";
}

function hasFeaturedMediaField(fields: ContentTypeProps["fields"] | undefined): boolean {
  return (fields ?? []).some(
    (f) =>
      f.id === "featuredMediaArticles" ||
      (f as FieldWithApiName).apiName === "featuredMediaArticles",
  );
}

function hasFeaturedArticleField(fields: ContentTypeProps["fields"] | undefined): boolean {
  return (fields ?? []).some(
    (f) =>
      f.id === "featuredArticle" ||
      (f as FieldWithApiName).apiName === "featuredArticle",
  );
}

/** Single article link — left column Featured card (mirrors Hot). */
function featuredArticleField(): ContentTypeProps["fields"][number] {
  const linkToArticle = {
    linkContentType: [articleTypeId],
  };
  return {
    id: "featuredArticle",
    name: "Featured article (left column)",
    type: "Link",
    localized: false,
    required: false,
    validations: [linkToArticle],
    disabled: false,
    omitted: false,
    linkType: "Entry",
  };
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

function sectionAmountField(
  id: string,
  name: string,
): ContentTypeProps["fields"][number] {
  return {
    id,
    name,
    type: "Integer",
    localized: false,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  };
}

function sectionAmountFields(): ContentTypeProps["fields"][number][] {
  return [
    sectionAmountField("mustSeeAmount", "Must see amount"),
    sectionAmountField("trendingAmount", "Trending amount"),
    sectionAmountField("recommendedSidebarAmount", "Recommended sidebar amount"),
  ];
}

function hasSectionAmountFields(fields: ContentTypeProps["fields"] | undefined): boolean {
  const want = new Set(["mustSeeAmount", "trendingAmount", "recommendedSidebarAmount"]);
  return (fields ?? []).filter((f) => want.has(f.id)).length === 3;
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
    ...sectionAmountFields(),
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
    featuredArticleField() as ContentTypeProps["fields"][number],
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
    let working = existing;

    /**
     * Contentful requires **omit → publish → remove** to delete a field; apiName may be
     * `educationArticles` while `id` is an opaque string (e.g. `iimi`).
     * @see https://www.contentful.com/developers/docs/extensibility/app-framework/field-deletion/
     */
    const edu = working.fields?.find(isEducationArticlesField);
    if (edu && !edu.omitted) {
      const fieldsOmitted = (working.fields ?? []).map((f) =>
        isEducationArticlesField(f) ? { ...f, omitted: true } : f,
      );
      const afterOmit = await client.contentType.update(ctParams, {
        ...working,
        name: "Home",
        fields: fieldsOmitted,
      });
      await client.contentType.publish(ctParams, afterOmit);
      console.log(
        "Set educationArticles to omitted=true and published. Removing field from schema…",
      );
      working = await client.contentType.get(ctParams);
    }

    const heroArticle = working.fields?.find(isHeroArticleField);
    if (heroArticle && !heroArticle.omitted) {
      const fieldsOmitted = (working.fields ?? []).map((f) =>
        isHeroArticleField(f) ? { ...f, omitted: true } : f,
      );
      const afterOmit = await client.contentType.update(ctParams, {
        ...working,
        name: "Home",
        fields: fieldsOmitted,
      });
      await client.contentType.publish(ctParams, afterOmit);
      console.log(
        "Set heroArticle to omitted=true and published. Removing field from schema…",
      );
      working = await client.contentType.get(ctParams);
    }

    const recommendedArticleField = working.fields?.find(isRecommendedArticleField);
    if (recommendedArticleField && !recommendedArticleField.omitted) {
      const fieldsOmitted = (working.fields ?? []).map((f) =>
        isRecommendedArticleField(f) ? { ...f, omitted: true } : f,
      );
      const afterOmit = await client.contentType.update(ctParams, {
        ...working,
        name: "Home",
        fields: fieldsOmitted,
      });
      await client.contentType.publish(ctParams, afterOmit);
      console.log(
        "Set recommendedArticle to omitted=true and published. Removing field from schema…",
      );
      working = await client.contentType.get(ctParams);
    }

    let nextFields = [...(working.fields ?? [])].filter(
      (f) =>
        !isEducationArticlesField(f) &&
        !isHeroArticleField(f) &&
        !isRecommendedArticleField(f),
    );
    if (!hasFeaturedMediaField(nextFields)) {
      nextFields = [...nextFields, featuredMediaArticlesField()];
    }
    if (!hasFeaturedArticleField(nextFields)) {
      nextFields = [...nextFields, featuredArticleField()];
    }
    if (!hasSectionAmountFields(nextFields)) {
      for (const f of sectionAmountFields()) {
        if (!nextFields.some((field) => field.id === f.id)) {
          nextFields = [...nextFields, f];
        }
      }
    }

    const updated = await client.contentType.update(ctParams, {
      ...working,
      name: "Home",
      displayField: working.displayField ?? "internalTitle",
      fields: nextFields,
    });
    await client.contentType.publish(ctParams, updated);
    console.log(
      edu || heroArticle || recommendedArticleField
        ? "Removed deprecated field(s) from Home content type (after omit). Ensured featured media / featured article fields if missing."
        : hasFeaturedMediaField(working.fields)
          ? "Home content type updated; republished."
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
