/**
 * Seed rich-text Article entries (and Category / Author links) via Contentful Management API.
 *
 * Setup in `.env.local` (never commit secrets):
 * - CONTENTFUL_MANAGEMENT_TOKEN
 * - CONTENTFUL_SPACE_ID
 * - CONTENTFUL_ENVIRONMENT (optional, default `master`)
 * - CONTENTFUL_ARTICLE_CONTENT_TYPE_ID (optional, default `article`)
 * - CONTENTFUL_CATEGORY_CONTENT_TYPE_ID (optional, default `category`)
 * - CONTENTFUL_AUTHOR_CONTENT_TYPE_ID (optional, default `author`)
 * - CONTENTFUL_DEFAULT_LOCALE (optional, default `en-US`)
 *
 * Usage:
 *   npm run contentful:seed-articles
 *   npm run contentful:seed-articles -- --dry-run
 *   npm run contentful:seed-articles -- --force
 *
 * **The 30 long-form articles** (`scripts/seed-articles-extra-30.ts`) are appended **after** the original
 * roster in `ARTICLE_SEEDS`. `--limit N` always takes the **first N** entries of the full list—so
 * `--limit 3` never touches those 30. To seed only them, use **`--only-extra-30`** (or `--offset` below).
 *
 *   npm run contentful:seed-articles -- --only-extra-30
 *   npm run contentful:seed-articles -- --only-extra-30 --force
 *   npm run contentful:seed-articles -- --offset 33 --limit 30   # same 30 via full-list indices (33+30 = 63)
 *   npm run contentful:seed-articles -- --limit 5                # first 5 articles in the combined list only
 *
 * `--dry-run` lists planned slugs locally (no API). `--force` updates and republishes existing slugs.
 * Hero images: Unsplash URLs in `seed-article-hero-images.ts` → Contentful Assets → `heroImage` link.
 * Re-run with `--force` to attach images to articles that were created before heroes existed (reuses assets by title when possible).
 */
import { createClient } from "contentful-management";
import type { Environment } from "contentful-management";
import { config } from "dotenv";
import { resolve } from "node:path";
import { ARTICLE_SEEDS, CATEGORY_DEFS } from "./seed-articles-data";
import { ARTICLE_SEEDS_EXTRA_30 } from "./seed-articles-extra-30";
import { HERO_IMAGE_BY_SLUG, type HeroImageSeed } from "./seed-article-hero-images";
import { linesToRichTextDocument } from "./seed-articles-rich-text";
import type { ArticleSeed } from "./seed-articles-types";

config({ path: resolve(process.cwd(), ".env.local") });

/**
 * SDK default is ~5×500ms — too short when Contentful fetches a remote URL (e.g. Unsplash) and processes it.
 * @see AssetProcessingForLocale in contentful-management
 */
const ASSET_PROCESS_OPTS = {
  processingCheckWait: 2000,
  processingCheckRetries: 90,
} as const;

const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN?.trim();
const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim();
const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";
const locale = process.env.CONTENTFUL_DEFAULT_LOCALE?.trim() || "en-US";
const articleTypeId = process.env.CONTENTFUL_ARTICLE_CONTENT_TYPE_ID?.trim() || "article";
const categoryTypeId = process.env.CONTENTFUL_CATEGORY_CONTENT_TYPE_ID?.trim() || "category";
const authorTypeId = process.env.CONTENTFUL_AUTHOR_CONTENT_TYPE_ID?.trim() || "author";

function parseArgs() {
  const argv = process.argv.slice(2);
  const numAfter = (flag: string): number | undefined => {
    const i = argv.indexOf(flag);
    if (i === -1 || argv[i + 1] === undefined) {
      return undefined;
    }
    const n = Number.parseInt(argv[i + 1], 10);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  };
  return {
    dryRun: argv.includes("--dry-run"),
    force: argv.includes("--force"),
    onlyExtra30: argv.includes("--only-extra-30"),
    limit: (() => {
      const n = numAfter("--limit");
      return n !== undefined && n > 0 ? n : undefined;
    })(),
    offset: numAfter("--offset"),
  };
}

/** Resolves which seeds to process (order matters: `--only-extra-30` vs full list vs `--offset`/`--limit`). */
function resolveArticleSeeds(args: {
  onlyExtra30: boolean;
  limit?: number;
  offset?: number;
}): ArticleSeed[] {
  const { onlyExtra30, limit, offset } = args;
  if (onlyExtra30) {
    const pool = [...ARTICLE_SEEDS_EXTRA_30];
    const start = offset ?? 0;
    const end = limit !== undefined ? start + limit : undefined;
    return pool.slice(start, end);
  }
  const pool = [...ARTICLE_SEEDS];
  const start = offset ?? 0;
  const end = limit !== undefined ? start + limit : undefined;
  return pool.slice(start, end);
}

function linkEntry(id: string) {
  return {
    sys: {
      type: "Link" as const,
      linkType: "Entry" as const,
      id,
    },
  };
}

function linkAsset(id: string) {
  return {
    sys: {
      type: "Link" as const,
      linkType: "Asset" as const,
      id,
    },
  };
}

async function findHeroAssetIdByTitle(environment: Environment, slug: string): Promise<string | null> {
  const want = `Article hero: ${slug}`;
  const res = await environment.getAssets({ limit: 200 });
  for (const item of res.items) {
    const t = item.fields?.title?.[locale as keyof typeof item.fields.title];
    if (t === want) {
      return item.sys.id;
    }
  }
  return null;
}

/** Create + process + publish a JPEG Asset from a remote URL (e.g. Unsplash), or reuse an existing asset with the same title. */
async function getOrCreatePublishedHeroAsset(
  environment: Environment,
  slug: string,
  hero: HeroImageSeed,
): Promise<string> {
  const existingId = await findHeroAssetIdByTitle(environment, slug);
  if (existingId) {
    const a = await environment.getAsset(existingId);
    if (a.sys.publishedVersion) {
      return existingId;
    }
    const pub = await a.publish();
    return pub.sys.id;
  }

  const asset = await environment.createAsset({
    fields: {
      title: { [locale]: `Article hero: ${slug}` },
      description: {
        [locale]: `${hero.credit}. Source: Unsplash — unsplash.com/license`,
      },
      file: {
        [locale]: {
          contentType: "image/jpeg",
          fileName: hero.fileName,
          upload: hero.uploadUrl,
        },
      },
    },
  });

  let processed: Awaited<ReturnType<typeof environment.createAsset>>;
  try {
    processed = await asset.processForAllLocales(ASSET_PROCESS_OPTS);
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    if (name === "AssetProcessingTimeout") {
      processed = await pollUntilAssetHasUrl(environment, asset.sys.id);
    } else {
      throw err;
    }
  }

  const published = await processed.publish();
  return published.sys.id;
}

/** Fallback if `processForAllLocales` times out — processing may still succeed server-side. */
async function pollUntilAssetHasUrl(
  environment: Environment,
  assetId: string,
): Promise<Awaited<ReturnType<typeof environment.createAsset>>> {
  for (let i = 0; i < 90; i++) {
    const check = await environment.getAsset(assetId);
    const fileLocale = check.fields?.file?.[locale as keyof typeof check.fields.file] as
      | { url?: string }
      | undefined;
    if (fileLocale?.url) {
      return check;
    }
    await sleep(2000);
  }
  throw new Error(`Asset ${assetId} did not finish processing (no url after fallback poll).`);
}

async function findEntryByField(
  environment: Environment,
  contentTypeId: string,
  fieldId: string,
  value: string,
): Promise<{ id: string } | null> {
  const res = await environment.getEntries({
    content_type: contentTypeId,
    [`fields.${fieldId}`]: value,
    limit: 1,
  });
  const item = res.items[0];
  return item ? { id: item.sys.id } : null;
}

async function getOrCreateCategory(environment: Environment, name: string, slug: string): Promise<string> {
  const existing = await findEntryByField(environment, categoryTypeId, "slug", slug);
  if (existing) {
    return existing.id;
  }
  const entry = await environment.createEntry(categoryTypeId, {
    fields: {
      name: { [locale]: name },
      slug: { [locale]: slug },
    },
  });
  await entry.publish();
  console.log(`Created category: ${name}`);
  return entry.sys.id;
}

async function getOrCreateAuthor(environment: Environment, name: string): Promise<string> {
  const existing = await findEntryByField(environment, authorTypeId, "name", name);
  if (existing) {
    return existing.id;
  }
  const entry = await environment.createEntry(authorTypeId, {
    fields: {
      name: { [locale]: name },
    },
  });
  await entry.publish();
  console.log(`Created author: ${name}`);
  return entry.sys.id;
}

function articleFields(
  seed: ArticleSeed,
  categoryId: string,
  authorId: string,
  heroAssetId?: string,
) {
  const body = linesToRichTextDocument(seed.lines);
  const fields: Record<string, Record<string, unknown>> = {
    title: { [locale]: seed.title },
    slug: { [locale]: seed.slug },
    excerpt: { [locale]: seed.excerpt },
    body: { [locale]: body },
    categories: { [locale]: linkEntry(categoryId) },
    author: { [locale]: linkEntry(authorId) },
  };
  if (heroAssetId) {
    fields.heroImage = { [locale]: linkAsset(heroAssetId) };
  }
  return fields;
}

async function upsertArticle(
  environment: Environment,
  seed: ArticleSeed,
  categoryId: string,
  authorId: string,
  force: boolean,
): Promise<"created" | "skipped" | "updated"> {
  const existing = await findEntryByField(environment, articleTypeId, "slug", seed.slug);
  const heroDef = HERO_IMAGE_BY_SLUG[seed.slug];
  let heroAssetId: string | undefined;
  if (heroDef && (!existing || force)) {
    console.log(`  … hero image: ${seed.slug}`);
    heroAssetId = await getOrCreatePublishedHeroAsset(environment, seed.slug, heroDef);
    await sleep(200);
  }

  const fields = articleFields(seed, categoryId, authorId, heroAssetId);

  if (existing && !force) {
    console.log(`Skip (exists): ${seed.slug}`);
    return "skipped";
  }

  if (existing && force) {
    const entry = await environment.getEntry(existing.id);
    entry.fields = fields as typeof entry.fields;
    const updated = await entry.update();
    await updated.publish();
    console.log(`Updated: ${seed.slug}`);
    return "updated";
  }

  const created = await environment.createEntry(articleTypeId, {
    fields: fields as Record<string, Record<string, unknown>>,
  });
  await created.publish();
  console.log(`Created: ${seed.slug}`);
  return "created";
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const { dryRun, force, limit, offset, onlyExtra30 } = parseArgs();

  const seeds = resolveArticleSeeds({ onlyExtra30, limit, offset });

  const longFormStartIndex = ARTICLE_SEEDS.length - ARTICLE_SEEDS_EXTRA_30.length;
  if (dryRun) {
    console.log(
      `Dry run — ${seeds.length} article(s) (no API calls). Remove --dry-run after configuring .env.local.`,
    );
    if (onlyExtra30) {
      console.log("Mode: --only-extra-30 (long-form batch from seed-articles-extra-30.ts only).");
    } else if (limit !== undefined || offset !== undefined) {
      console.log(
        `Mode: slice of full list — offset=${offset ?? 0}, limit=${limit ?? "end"}. Long-form extras start at index ${longFormStartIndex} (${ARTICLE_SEEDS_EXTRA_30.length} slugs).`,
      );
      const sliceEnd = (offset ?? 0) + seeds.length;
      if (sliceEnd <= longFormStartIndex) {
        console.warn(
          `This slice does not include the long-form batch. Use: npm run contentful:seed-articles -- --dry-run --only-extra-30`,
        );
      }
    }
    console.log("");
    for (const s of seeds) {
      console.log(`  ${s.slug.padEnd(42)} [${s.categoryKey}] ${s.title}`);
    }
    const authors = [...new Set(seeds.map((s) => s.authorName))];
    console.log(`\nAuthors: ${authors.join(", ")}`);
    console.log(`Categories used: ${[...new Set(seeds.map((s) => s.categoryKey))].sort().join(", ")}`);
    return;
  }

  if (!token || !spaceId) {
    console.error(
      "Missing CONTENTFUL_MANAGEMENT_TOKEN or CONTENTFUL_SPACE_ID in .env.local (see scripts/seed-demo-articles.ts header).",
    );
    process.exit(1);
  }

  console.log(
    `Seeding ${seeds.length} article(s)${force ? " (--force)" : ""} → locale ${locale}, env ${environmentId}`,
  );
  if (onlyExtra30) {
    console.log("Mode: --only-extra-30 (long-form batch from seed-articles-extra-30.ts).\n");
  } else if (limit !== undefined || offset !== undefined) {
    console.log(
      `Mode: full-list slice — offset=${offset ?? 0}, limit=${limit ?? "end"}. Long-form extras start at index ${longFormStartIndex}.`,
    );
    const sliceEnd = (offset ?? 0) + seeds.length;
    if (sliceEnd <= longFormStartIndex) {
      console.warn(
        `This slice does not reach the ${ARTICLE_SEEDS_EXTRA_30.length} long-form articles. Re-run with: npm run contentful:seed-articles -- --only-extra-30`,
      );
    }
    console.log("");
  } else {
    console.log("");
  }

  const client = createClient({ accessToken: token }, { type: "legacy" });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  const categoryIds = new Map<string, string>();
  for (const key of Object.keys(CATEGORY_DEFS) as Array<keyof typeof CATEGORY_DEFS>) {
    const def = CATEGORY_DEFS[key];
    const id = await getOrCreateCategory(environment, def.name, def.slug);
    categoryIds.set(key, id);
    await sleep(120);
  }

  const authorNames = [...new Set(seeds.map((s) => s.authorName))];
  const authorIds = new Map<string, string>();
  for (const name of authorNames) {
    const id = await getOrCreateAuthor(environment, name);
    authorIds.set(name, id);
    await sleep(120);
  }

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const seed of seeds) {
    const catId = categoryIds.get(seed.categoryKey);
    const authId = authorIds.get(seed.authorName);
    if (!catId || !authId) {
      console.error(`Missing category or author for ${seed.slug}`);
      failed += 1;
      continue;
    }

    try {
      const result = await upsertArticle(environment, seed, catId, authId, force);
      if (result === "created") {
        created += 1;
      } else if (result === "updated") {
        updated += 1;
      } else {
        skipped += 1;
      }
    } catch (err) {
      failed += 1;
      const detail =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message)
          : String(err);
      console.error(`\nError (${seed.slug}): ${detail}`);
      if (err instanceof Error && err.stack) {
        console.error(err.stack);
      }
    }
    await sleep(120);
  }

  console.log(`\nDone. created=${created} updated=${updated} skipped=${skipped} failed=${failed}`);
  if (failed > 0) {
    console.error("Fix errors above and re-run (existing slugs skip unless --force).");
    process.exitCode = 1;
  }
  console.log("Delivery API / the site may take a minute to show new entries.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
