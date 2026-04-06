/**
 * Ensures Article closing-media fields are plain-text URLs only (no Asset upload).
 *
 * - `closingYoutubeUrl` — Short text (optional)
 * - `closingVideoUrl` — Short text for a direct video file URL, e.g. .mp4 (optional)
 *
 * If an older **Asset** field `closingVideo` exists, it is omitted and removed from the schema
 * (Contentful requires omit → publish → delete).
 *
 * Setup: `CONTENTFUL_MANAGEMENT_TOKEN`, `CONTENTFUL_SPACE_ID`, optional `CONTENTFUL_ARTICLE_CONTENT_TYPE_ID`.
 * Run: `npm run contentful:sync-article-closing-media`
 * Then: `npm run codegen`
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

function hasField(fields: ContentTypeProps["fields"] | undefined, id: string): boolean {
  return (fields ?? []).some((f) => f.id === id);
}

function isLegacyClosingVideoAssetField(f: ContentTypeProps["fields"][number]): boolean {
  return f.id === "closingVideo" && (f as { linkType?: string }).linkType === "Asset";
}

function closingYoutubeUrlField(): ContentTypeProps["fields"][number] {
  return {
    id: "closingYoutubeUrl",
    name: "Closing media — YouTube URL",
    type: "Symbol",
    localized: false,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  };
}

function closingVideoUrlField(): ContentTypeProps["fields"][number] {
  return {
    id: "closingVideoUrl",
    name: "Closing media — video file URL",
    type: "Symbol",
    localized: false,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  };
}

async function main() {
  if (!token || !spaceId) {
    console.error(
      "Missing CONTENTFUL_MANAGEMENT_TOKEN or CONTENTFUL_SPACE_ID in .env.local (see scripts/ensure-article-closing-media-fields.ts).",
    );
    process.exit(1);
  }

  const client = createClient({ accessToken: token });
  const ctParams = { spaceId, environmentId, contentTypeId: articleTypeId };

  let working = await client.contentType.get(ctParams);

  const legacy = working.fields?.find(isLegacyClosingVideoAssetField);
  if (legacy && !legacy.omitted) {
    const fieldsOmitted = (working.fields ?? []).map((f) =>
      isLegacyClosingVideoAssetField(f) ? { ...f, omitted: true } : f,
    );
    working = await client.contentType.update(ctParams, {
      ...working,
      fields: fieldsOmitted,
    });
    await client.contentType.publish(ctParams, working);
    console.log("Omitted legacy field: closingVideo (Asset). Fetching schema again…");
    working = await client.contentType.get(ctParams);
  }

  let nextFields = [...(working.fields ?? [])].filter((f) => f.id !== "closingVideo");

  let appended = false;
  if (!hasField(nextFields, "closingYoutubeUrl")) {
    nextFields = [...nextFields, closingYoutubeUrlField()];
    appended = true;
    console.log("Will add field: closingYoutubeUrl");
  }
  if (!hasField(nextFields, "closingVideoUrl")) {
    nextFields = [...nextFields, closingVideoUrlField()];
    appended = true;
    console.log("Will add field: closingVideoUrl");
  }

  const idsBefore = new Set((working.fields ?? []).map((f) => f.id));
  const idsAfter = new Set(nextFields.map((f) => f.id));
  const schemaChanged =
    appended ||
    idsBefore.size !== idsAfter.size ||
    [...idsBefore].some((id) => !idsAfter.has(id)) ||
    [...idsAfter].some((id) => !idsBefore.has(id));

  if (!schemaChanged) {
    console.log(
      "Article content type already has closingYoutubeUrl + closingVideoUrl (plain text) and no legacy closingVideo Asset.",
    );
    return;
  }

  const updated = await client.contentType.update(ctParams, {
    ...working,
    fields: nextFields,
  });
  await client.contentType.publish(ctParams, updated);
  console.log(`Published content type: ${articleTypeId}`);
  console.log("\nNext: run `npm run codegen`.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
