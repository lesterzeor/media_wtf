# Checkpoint — context for future sessions

_Last updated: 2026-04-01_

Use this file to **onboard an assistant or future you** on the `media_wtf` repo without re-reading the whole git history.

---

## What this project is

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- **Contentful** via **GraphQL Content API** (`graphql-request`), types from **`npm run codegen`** → `gql/graphql.ts`
- **Article** content type (`article` → `Article`), **Home** singleton (`home`), optional **Author** / **Category** links
- **Ads:** GTM + GPT placeholders (`AdSlot`, `AdPlaceholder`); Firebase stubs exist for later

---

## Environment (names only — never commit secrets)

- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT`, `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_SECRET` — `/api/draft?secret=...`
- `CONTENTFUL_MANAGEMENT_TOKEN` — **local scripts only** (`contentful:sync-home-model`, `contentful:seed-articles`)
- Optional: `CONTENTFUL_DEFAULT_LOCALE`, `CONTENTFUL_ARTICLE_CONTENT_TYPE_ID`, `CONTENTFUL_CATEGORY_CONTENT_TYPE_ID`, `CONTENTFUL_AUTHOR_CONTENT_TYPE_ID` (see `.env.example`)

**Preview URL pattern (Contentful UI):**  
`https://<host>/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&redirect=/articles/{entry.fields.slug}` or `redirect=/` for Home.

---

## Session / milestone context (what we built)

### Layout & nav

- **`src/components/layout/Navbar.tsx`** — Sticky header, mega menu on hover (delayed close). Mega menu panel sits under the **`Container wide`** bar: **navy title strip is full width** of that container; **`MegaMenuDropdown`** is the white body (links/columns). **`LogoMark`** used for the visible logo.
- **`src/components/layout/MegaMenuDropdown.tsx`** — Navy bar removed from here; navbar shell owns the blue strip + title; dropdown is body-only.
- **`src/config/site.ts`** — `NAV_ITEMS` with mega menus. The old **“Education”** nav item was replaced by **“Spotlight”** (no education-themed IA).

### Home page feed (`src/app/page.tsx` + `src/lib/contentful/homeFeed.ts`)

- **`HOME_SECTION_LIMIT = 8`** — Must see, Trending, and Recommended sidebar each show **at most 8** articles.
- **Category-driven picks** — `HOME_SECTION_CATEGORY_SLUGS` maps sections to **category slugs** (must see / trending / recommended). **`HOME_PAGE_CATEGORY_SLUGS`** lists the eight slugs that should exist as **Category** entries in Contentful (aligned with seed data).
- **`pickArticlesForHomeSection`** — Newest-first list; prefers articles whose **categories** match the section’s slugs, then **backfills** with remaining articles (respecting exclude sets).
- **No “education” articles list** — Home’s **`educationArticles`** field and app logic were **removed** (see below).
- **Deduping** — Trending excludes **layout (featured + grid)** and **must see**; Recommended sidebar excludes **must see + trending + hot** so columns don’t repeat the same stories when enough content exists.
- **Trending** — Algorithmic feed first; Home **Today’s highlights** only **top up** if still under 8. **`src/components/home/TrendingSection.tsx`** — titles/meta are **left-aligned** (not centered).
- **Category labels** — **`primaryCategoryName()`** in `homeFeed.ts`; **Must see / Trending / Recommended** show a small navy category line when the article has a linked category.

### Education removal (code + Contentful)

- **Removed:** `educationArticlesCollection` from **`GetHome`** in `src/graphql/operations.graphql`; **`education`** from **`HomeLayout`** (`src/types/content.ts`) and **`mapHome`** (`src/lib/contentful/mappers.ts`).
- **Deleted:** `src/components/editorial/EducationSection.tsx`, `EducationCard.tsx`; types cleaned in `src/components/editorial/types.ts`.
- **`scripts/ensure-home-content-type.ts`** — No longer defines **`educationArticles`**. On **update**, existing types **drop** that field using Contentful’s **two-step rule**: set field **`omitted: true`** → **publish** → **remove** field on next update. Match fields by **`apiName === 'educationArticles'`** (internal **`id`** may be opaque, e.g. `iimi`).
- After schema change, run **`npm run codegen`** so `gql/` matches (introspection may still mention old fields until the space is updated).

### Demo content: seed articles + hero images

- **`npm run contentful:seed-articles`** — **`scripts/seed-demo-articles.ts`** creates **categories**, **authors**, and **30 articles** with **rich text** (`scripts/seed-articles-rich-text.ts` + **`LineSpec`** in `seed-articles-types.ts`). Data: **`scripts/seed-articles-data.ts`** (`ARTICLE_SEEDS`, **`CATEGORY_DEFS`**).
- **`scripts/seed-article-hero-images.ts`** — Per-slug **Unsplash** JPEG URLs (free license); asset **description** includes photographer credit.
- **Hero pipeline:** For each article (create or **`--force`** update), create/reuse a **Contentful Asset** (`upload` from URL), **`processForAllLocales`** with **`ASSET_PROCESS_OPTS`** (`processingCheckWait` / `processingCheckRetries` — SDK defaults are too short for remote URLs). On **`AssetProcessingTimeout`**, **poll `getAsset`** until `file[locale].url` exists. Link **`heroImage`** to the article. Reuse asset when title is **`Article hero: {slug}`**.
- **Legacy Management client** — `createClient({ type: 'legacy' })` for `getSpace` / `createEntry` / `createAsset` (plain client is a different API).
- **`--dry-run`** — Lists slugs only, **no API**. **`--force`** — Updates existing entries (e.g. add heroes after first seed).

---

## Implemented features (high level)

| Area | Notes |
|------|--------|
| **Homepage** | `src/app/page.tsx` — `FeaturedMediaGrid`, left column `FeaturedArticle` + ad + `MustSeeSection`, trending + ad, subscribe + hot + recommended. Data from `getHome()` / `getArticles(100)`. |
| **Home CMS** | `featuredMediaArticles`, `featuredArticle` (left column card), `todaysHighlights`, `hotArticle` / `hotArticleCollection`, curated lists as in `operations.graphql`. **No `educationArticles`, `heroArticle`, or `recommendedArticle` in app query.** |
| **Articles** | `src/app/articles/[slug]/page.tsx` — draft mode → `ArticlePageClient` + live-preview query path; else server-rendered `ArticleView`. |
| **Draft / preview** | `src/app/api/draft/route.ts`, `disable-draft/route.ts`; layout wraps `ContentfulLivePreviewRoot` when `draftMode()` is on; `PreviewModeBanner`. |
| **Security / iframe** | `src/middleware.ts` — CSP `frame-ancestors` for Contentful + delete `X-Frame-Options`. |
| **GraphQL** | `src/graphql/operations.graphql`. **`GetArticleBySlug`** = delivery/build (no `@contentSourceMaps`). **`GetArticleBySlugLivePreview`** = CSM + `preview: true` only. |

---

## Known gaps / deferred

- **Live preview “live updates”** still flaky; see **`TODO.md`** (CSM, headers, hosting).
- **Home** listing does not use `useContentfulLiveUpdates` — home may not live-update in the preview iframe until refresh.
- **Newsletter** UI is placeholder.
- **Seed script** `getAssets({ limit: 200 })` for hero dedup — very large spaces might need pagination or a tighter query.

---

## Commands

```bash
npm run dev                          # local dev (codegen runs via predev)
npm run codegen                      # regenerate gql/ after GraphQL / schema changes
npm run contentful:sync-home-model   # Management API — Home content type (+ drop educationArticles via omit flow)
npm run contentful:seed-articles     # Seed demo articles + hero assets (needs MANAGEMENT_TOKEN)
npm run contentful:seed-articles -- --dry-run
npm run contentful:seed-articles -- --force   # refresh entries + hero images
npm run build
```

---

## Files worth knowing

| Path | Role |
|------|------|
| `src/lib/contentful/api.ts` | `getArticles`, `getArticleBySlug`, `getArticleBySlugQuery`, `getHome` |
| `src/lib/contentful/homeFeed.ts` | Section limits, category slugs, `pickArticlesForHomeSection`, `primaryCategoryName` |
| `src/lib/contentful/mappers.ts` | Raw GraphQL → `Article` / `HomeLayout` |
| `src/graphql/operations.graphql` | All operations + fragments |
| `scripts/ensure-home-content-type.ts` | Home content type create/update; **education** field removal (omit → remove) |
| `scripts/seed-demo-articles.ts` | Seed categories, authors, articles, **hero Assets** |
| `scripts/seed-articles-data.ts` | `ARTICLE_SEEDS`, `CATEGORY_DEFS` |
| `scripts/seed-article-hero-images.ts` | Unsplash URLs per slug |
| `codegen.ts` | Introspects Contentful; needs `.env.local` for codegen |
| `TODO.md` | Backlog |
| `AGENTS.md` / `CLAUDE.md` | Next.js in-repo docs pointer |

---

## How to use this checkpoint

1. Open **`CHECKPOINT.md`** + **`TODO.md`** when starting a session that touches Contentful, home layout, or seed data.
2. Say **“continue from CHECKPOINT.md”** or paste the sections that apply.

---

## Optional: refresh this file

After major milestones, update **Session / milestone context**, **Known gaps**, and **Last updated** so the next run stays accurate.
