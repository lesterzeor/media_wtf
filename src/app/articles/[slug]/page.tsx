import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArticleView } from "@/components/content/ArticleView";
import { getArticleBySlug, getArticleBySlugQuery, getArticleSlugs } from "@/lib/contentful/api";
import { ArticlePageClient } from "./ArticlePageClient";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const slugs = await getArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Allow builds to succeed before Contentful is configured.
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { isEnabled: draftModeEnabled } = await draftMode();
  const locale = process.env.CONTENTFUL_DEFAULT_LOCALE?.trim() || "en-US";

  if (draftModeEnabled) {
    const query = await getArticleBySlugQuery(slug);
    if (!query) {
      notFound();
    }
    return (
      <Container className="py-10">
        <ArticlePageClient initialQuery={query} locale={locale} />
      </Container>
    );
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return (
    <Container className="py-10">
      <ArticleView article={article} />
    </Container>
  );
}
