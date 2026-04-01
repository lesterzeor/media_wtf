import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Enables Next.js Draft Mode after Contentful validates the secret.
 * Configure Contentful → Settings → Content preview → Preview URL, e.g.:
 * `https://your-domain.com/api/draft?secret={CONTENTFUL_PREVIEW_SECRET}&redirect=/articles/{entry.fields.slug}`
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CONTENTFUL_PREVIEW_SECRET?.trim();
  if (!secret) {
    return new Response("Preview secret not configured (CONTENTFUL_PREVIEW_SECRET).", { status: 501 });
  }

  const q = request.nextUrl.searchParams;
  if (q.get("secret") !== secret) {
    return new Response("Invalid secret.", { status: 401 });
  }

  const target =
    q.get("redirect") ?? q.get("path") ?? q.get("slug") ?? "/";

  const path = target.startsWith("/") ? target : `/${target}`;

  (await draftMode()).enable();
  redirect(path);
}
