# MediaWTF Phase 1

Phase 1 scaffold for an ad-ready content website using Next.js, TypeScript, Tailwind CSS, and Contentful GraphQL. The project includes reusable layout/UI components, GTM-ready hooks, and Firebase configuration stubs for future features.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Contentful GraphQL (`graphql-request`)
- Firebase SDK (init only)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.example .env.local
```

3. Fill in your Contentful and Firebase values in `.env.local`.

4. Run development server:

```bash
npm run dev
```

## Contentful setup

### Point the app at your content type

GraphQL types and collections are **generated from your space**. If you see `Unknown type "Article"` or `Cannot query field "articleCollection"`, your space does not use the content type ID `article`.

Set **`CONTENTFUL_ARTICLE_CONTENT_TYPE_ID`** in `.env.local` to the **API identifier** of the content type that holds your posts (Contentful app → Content model → select the type → field **Content type ID**). Examples:

- Content type ID `blogPost` → GraphQL type `BlogPost`, collection `blogPostCollection`
- Content type ID `article` → GraphQL type `Article`, collection `articleCollection`

If the GraphQL type name does not match the usual PascalCase rule, set **`CONTENTFUL_ARTICLE_GRAPHQL_TYPE`** explicitly (inspect names in Contentful → GraphQL playground / API explorer for your space).

### Field IDs must match the query

The GraphQL selection in `src/graphql/operations.graphql` expects these **field IDs** on that content type (adjust the file if yours differ):

| Field ID            | Role                          |
| ------------------- | ----------------------------- |
| `title`             | Title                         |
| `slug`              | Slug (used in URLs)           |
| `excerpt`           | Short text (optional)         |
| `heroImage`         | Media (optional)              |
| `body`              | Rich text (optional)          |
| `categories`        | Reference to category entries (`name`, `slug`). **Single link** (default in app) or **many references** — set `CONTENTFUL_CATEGORIES_MODE=many` if you use many. |
| `author`            | Reference to an **Author** entry (field `name` is shown in the UI). Selection in `src/graphql/operations.graphql`. |

If your `categories` field is a **single** Entry link (as in the Contentful UI “Reference — one entry”), keep the default (`CONTENTFUL_CATEGORIES_MODE` unset or `single`). If you change it to **many references**, set `CONTENTFUL_CATEGORIES_MODE=many` so the app queries `categoriesCollection`.

If a field is missing or named differently (e.g. `summary` instead of `excerpt`), update the fragment in `src/graphql/operations.graphql` and the mapper in `src/lib/contentful/mappers.ts`.

### GraphQL Codegen

`npm run dev` and `npm run build` run **`npm run codegen`** first (`predev` / `prebuild`). Codegen needs `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` in `.env.local` and writes typed documents to `gql/`. Operations live in `src/graphql/*.graphql`.

The checked-in operations target the default **`article` / `Article` / `articleCollection`** names. If you use a different content type ID (e.g. `blogPost`), update the collection and fragment type names in `src/graphql/operations.graphql` and run `npm run codegen` again.

### Sort order

Collection order is set in **`src/graphql/operations.graphql`** (`order: sys_publishedAt_DESC`). Change it there if your schema uses a different allowed `order` value.

### Home page curation (singleton `home`)

The home page reads a **single Home entry** for the featured grid, **Must see** (left column), **Trending** (center: text list + ad placeholder), **Subscribe** + **Hot** + **Recommended** + ad (right column), plus highlights. Run `npm run contentful:sync-home-model` to align the **`home`** content type (and to **remove** deprecated fields such as `educationArticles`, `heroArticle`, or `recommendedArticle` if still present).

1. Add **`CONTENTFUL_MANAGEMENT_TOKEN`** to `.env.local` (Contentful → Settings → API keys → **Content management tokens**). Do **not** commit it or paste it into chat.
2. Run:

```bash
npm run contentful:sync-home-model
```

This creates/updates the **`home`** content type via the Management API (including **`mustSeeArticles`**, **`hotArticle`**, **`recommendedSidebarArticles`** when missing).

3. In Contentful → **Content**, edit your **Home** entry: link **Featured media**, **Featured article (left column)** (large card above the left ad), **Today’s highlights**, **Must see articles**, **Trending articles**, **Hot article**, **Recommended (sidebar list)**, then **Publish**.
4. Wait briefly for GraphQL to expose new fields, then run **`npm run codegen`** if needed. Until the Home query succeeds, the page **falls back** to the latest articles list for empty sections.

## Key folders

- `src/app` routes (`/`, `/articles`, `/articles/[slug]`)
- `src/components/home` home page blocks (`FeaturedMediaGrid`, `MustSeeSection`, `TrendingSection`, `SubscribeSidebar`, `HotSection`, `RecommendedSidebarSection`, shared `ArticleThumb`, `ArticleMetaLine`, `HomeSectionHeader`) + `types.ts`
- `src/components/layout` app shell (`Navbar`, `Footer`, `MainLayout`) + `types.ts`
- `src/components/editorial` shared article/editorial pieces (`CategoryTags`, `EditorialHeroImage`, etc.) + `types.ts`
- `src/config/site.ts` logo wordmark + main nav labels
- `src/components/ui` shared primitives (`Card`, `Container`, `AdSlot`, `AdPlaceholder`, etc.) + `types.ts`
- `src/components/content` Contentful renderers (`RichText`, `ContentfulImage`) + `types.ts`
- `src/lib/contentful` GraphQL client, dynamic queries, and mappers
- `src/lib/ads` Google Publisher Tag (GAM) loader and slot registry
- `src/lib/firebase` Firebase app and Firestore initialization exports

## Google Ad Manager (Phase 1.5)

Display ads use **Google Publisher Tag** (`gpt.js`) and `<AdSlot />` regions (`top`, `in-content`, `sidebar`).

1. In **Google Ad Manager**, create ad units whose paths match:

   `/{NETWORK_CODE}/{AD_UNIT_PREFIX}/{SLOT_SEGMENT}`

   Example: network `123456789`, prefix `mediawtf.com` → full paths like `/123456789/mediawtf.com/top`.

2. Set in `.env.local`:

   - `NEXT_PUBLIC_GAM_NETWORK_CODE` — network code (digits only is fine).
   - `NEXT_PUBLIC_GAM_AD_UNIT_PREFIX` — inventory path after the network code (e.g. `mediawtf.com`), no leading slash.

3. Optionally override the last segment per slot with `NEXT_PUBLIC_GAM_SLOT_SEGMENT_TOP`, `..._IN_CONTENT`, `..._SIDEBAR` (defaults: `top`, `in-content`, `sidebar`).

4. Restart the dev server after changing env vars.

If those variables are unset, `AdSlot` shows a dashed placeholder and GPT is not loaded. **GTM** (`NEXT_PUBLIC_GTM_ID`) is separate and can be used alongside GAM for other tags.

## Deploying to Vercel

1. Import this repository into Vercel.
2. Add all variables from `.env.example` into Vercel project environment settings (including `CONTENTFUL_ARTICLE_CONTENT_TYPE_ID`).
3. Deploy with default Next.js build command (`npm run build`).

## Notes

- **Ads**: With `NEXT_PUBLIC_GAM_NETWORK_CODE` and `NEXT_PUBLIC_GAM_AD_UNIT_PREFIX` set, `AdSlot` renders GPT-managed slots; otherwise placeholders are shown.
- GTM is loaded only when `NEXT_PUBLIC_GTM_ID` is set.
- Firebase is configured but not used by UI or route logic yet.
