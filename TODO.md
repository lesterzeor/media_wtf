# Project backlog / follow-ups

Use this file to track deferred work mentioned in planning or reviews. **Update or remove items** when you complete them.

---

## Home page & UI

### Home section ribbon styling (2026-04)

- **Context:** Section headers (`HomeSectionHeader`, `variant="ribbon"`) were updated to use **primary green text** (`text-brand-primary`) on a **light strip** (`bg-neutral-50`) with a **green bottom border**, instead of white text on a solid green bar — closer to the reference screenshot.
- **Follow-up:** If the design spec changes again, adjust `src/components/home/HomeSectionHeader.tsx` only; badge variant (`Hot`) still uses solid `bg-brand-primary` + white text.

### Newsletter / subscribe

- **Context:** `NewsletterSignup` (`src/components/home/NewsletterSignup.tsx`) is a **client** component with **non-functional** Name/Email fields and `preventDefault` on submit. `SubscribeSidebar` wraps it with the Subscribe ribbon.
- **TODO:** Wire a real flow:
  - Add API route (e.g. `POST /api/newsletter`) or server action.
  - Connect to ESP (Mailchimp, ConvertKit, Resend audience, etc.) or store leads in Firestore (Firebase stubs exist in repo).
  - Add env vars for API keys; never commit secrets.
  - UX: loading state, success/error toasts, optional double opt-in copy.

### Ads

- **Context:** `AdPlaceholder` shows dimensions; `AdSlot` integrates GAM when env is set.
- **TODO:** Replace placeholders in `src/app/page.tsx` with real slots where inventory is ready; verify GPT config in `src/lib/ads/`.

---

## Contentful

- **Context:** Home singleton fields include `mustSeeArticles`, `hotArticle`, `recommendedSidebarArticles`, `trendingArticles`, plus featured media and highlights.
- **TODO:** After model changes, run `npm run contentful:sync-home-model`, fill the Home entry in the UI, publish, then `npm run codegen` if GraphQL shape changes.

### Live Preview & live updates (deferred — revisit later)

- **Context:** Draft mode routes (`/api/draft`, `/api/disable-draft`), `ContentfulLivePreviewRoot`, `PreviewModeBanner`, iframe CSP/`middleware.ts` (strip `X-Frame-Options` + `frame-ancestors`). **Article** preview uses `GetArticleBySlugLivePreview` (`@contentSourceMaps`) + `rawRequest` + `encodeGraphQLResponse` + `useContentfulLiveUpdates` in `ArticlePageClient`. **Split queries:** `GetArticleBySlug` has no CSM (build + `preview: false`); `GetArticleBySlugLivePreview` is preview-only so Vercel build does not fail.
- **Still not satisfactory:** Live updates in the Contentful side-by-side iframe may require refresh; Content Source Maps need **Premium**-tier features; hosting may still inject `X-Frame-Options: DENY` (disable Deployment Protection / strip at CDN). **Home page** does not yet use `useContentfulLiveUpdates` + `GetHomeDocument`.
- **TODO (pick up later):**
  - Verify browser console for “Content Source Maps” / SDK errors in preview.
  - Confirm space plan + preview token; test `encodeGraphQLResponse` path end-to-end.
  - Optional: home route client wrapper + `GetHome` CSM query (or accept refresh-only for home).
  - Document operational fixes (Vercel protection, Cloudflare) in README or this file when stable.

---

## GraphQL codegen

- **Context:** `predev` / `prebuild` run codegen; output is `gql/`.
- **TODO:** Consider GraphQL Code Generator **persisted documents** or SWC plugin for smaller bundles (see Guild docs) if bundle size becomes an issue.

---

## Article / author

- **Context:** Articles support linked **Author** entries (`author.name`); `ArticleMetaLine` can show `variant="site"` (red site name + date) or `variant="author"`.
- **TODO:** Align article detail page (`src/app/articles/[slug]/page.tsx`) styling with home list rules if product wants author vs site line everywhere.

---

## How to add a new item

1. Add a short **title** and **date or context** (why it exists).
2. Link to **files** or **features** so future you (or an agent) can pick up quickly.
3. When done, delete the item or mark it done with a note.
