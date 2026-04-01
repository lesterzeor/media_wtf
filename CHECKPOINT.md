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
- `CONTENTFUL_MANAGEMENT_TOKEN` — **local scripts only** (e.g. `contentful:sync-home-model`)
- Optional: `CONTENTFUL_DEFAULT_LOCALE`, `CONTENTFUL_ARTICLE_CONTENT_TYPE_ID`, etc. (see `.env.example`)

**Preview URL pattern (Contentful UI):**  
`https://<host>/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&redirect=/articles/{entry.fields.slug}` or `redirect=/` for Home.

---

## Implemented features (high level)

| Area | Notes |
|------|--------|
| **Homepage** | `src/app/page.tsx` — `FeaturedMediaGrid`, left column `FeaturedArticle` + ad + `MustSeeSection`, trending + ad, subscribe + hot + recommended. Data from `getHome()` / `getArticles()`. |
| **Home CMS** | `featuredMediaArticles` (ordered), `hotArticle` exposed as **`hotArticleCollection`** in GraphQL (not `hotArticle` scalar). Sync script merges new fields without reordering published fields (`scripts/ensure-home-content-type.ts`). |
| **Articles** | `src/app/articles/[slug]/page.tsx` — draft mode → `ArticlePageClient` + live-preview query path; else server-rendered `ArticleView`. |
| **Draft / preview** | `src/app/api/draft/route.ts`, `disable-draft/route.ts`; layout wraps `ContentfulLivePreviewRoot` when `draftMode()` is on; `PreviewModeBanner`. |
| **Security / iframe** | `src/middleware.ts` — CSP `frame-ancestors` for Contentful + delete `X-Frame-Options`. If iframe still fails, hosting often adds **`X-Frame-Options: DENY`** (e.g. Vercel Deployment Protection) — fix in dashboard or CDN. |
| **GraphQL** | Operations in `src/graphql/operations.graphql`. **`GetArticleBySlug`** = delivery/build (no `@contentSourceMaps`). **`GetArticleBySlugLivePreview`** = CSM + `preview: true` only for draft live-preview path. Codegen schema = Contentful URL only (no local stub file). |

---

## Known gaps / deferred

- **Live preview “live updates”** still flaky; needs follow-up (see **`TODO.md`** → *Live Preview & live updates*). Possible causes: Content Source Maps / plan limits, `encodeGraphQLResponse`, or platform headers.
- **Home** listing does not subscribe to `useContentfulLiveUpdates` — editing entries may not reflect until refresh outside the article detail flow.
- **Newsletter** UI is non-functional (placeholder).
- **Some Home GraphQL fields** may not exist on every space; `GetHome` was trimmed to fields that exist on the live schema (see git history / `operations.graphql`).

---

## Commands

```bash
npm run dev              # local dev (codegen runs via predev)
npm run codegen          # regenerate gql/ after GraphQL changes
npm run contentful:sync-home-model   # Management API — extend Home content type
npm run build
```

---

## Files worth knowing

| Path | Role |
|------|------|
| `src/lib/contentful/api.ts` | `getArticles`, `getArticleBySlug`, `getArticleBySlugQuery`, `getHome` |
| `src/lib/contentful/client.ts` | Preview vs delivery token |
| `src/lib/contentful/mappers.ts` | Raw GraphQL → `Article` / `HomeLayout` |
| `src/graphql/operations.graphql` | All operations + fragments |
| `codegen.ts` | Introspects Contentful; requires `.env.local` for codegen |
| `TODO.md` | Backlog and follow-ups |
| `AGENTS.md` / `CLAUDE.md` | Points to Next.js in-repo docs |

---

## How to use this checkpoint

1. Open **`CHECKPOINT.md`** + **`TODO.md`** at the start of a session.
2. Mention “continue from CHECKPOINT.md” or paste relevant sections if the task touches Contentful, preview, or home layout.

---

## Optional: refresh this file

When you finish a major milestone, update the **Implemented** / **Known gaps** sections and **Last updated** date so the next session stays accurate.
