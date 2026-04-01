import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { getArticles } from "@/lib/contentful/api";
import type { Article } from "@/types/content";

export const revalidate = 300;

export default async function ArticlesPage() {
  let articles: Article[] = [];
  let loadError: string | null = null;
  try {
    articles = await getArticles(24);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load articles.";
  }

  return (
    <Container className="space-y-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Latest Articles</h1>
        <p className="text-slate-600">Stories and resources fetched from Contentful GraphQL.</p>
      </header>
      {loadError ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">{loadError}</p>
      ) : null}
      {articles.length === 0 ? (
        <p className="rounded-lg border border-slate-300 bg-white p-4 text-sm text-slate-600">
          No articles were returned. Check your Contentful content type and environment variables.
        </p>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} article={article} />
        ))}
      </div>
    </Container>
  );
}
