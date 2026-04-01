import { notFound } from "next/navigation";
import { ContentfulImage } from "@/components/content/ContentfulImage";
import { RichText } from "@/components/content/RichText";
import { AdSlot } from "@/components/ui/AdSlot";
import { Container } from "@/components/ui/Container";
import { getArticleBySlug, getArticleSlugs } from "@/lib/contentful/api";

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
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <Container className="py-10">
      <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">{article.title}</h1>
            {(article.author?.trim() || article.publishedAt) && (
              <p className="text-sm text-slate-500">
                {article.author?.trim() ? (
                  <span className="font-medium text-brand-primary">By {article.author.trim()}</span>
                ) : null}
                {article.author?.trim() && article.publishedAt ? <> · </> : null}
                {article.publishedAt ? (
                  <>
                    Published {new Date(article.publishedAt).toLocaleDateString("en-US", { dateStyle: "long" })}
                  </>
                ) : null}
              </p>
            )}
          </header>
          {article.heroImage ? <ContentfulImage image={article.heroImage} priority /> : null}
          <RichText document={article.body} />
          <AdSlot slot="in-content" />
        </div>
        <aside className="space-y-4">
          <AdSlot slot="sidebar" className="min-h-64" />
        </aside>
      </article>
    </Container>
  );
}
