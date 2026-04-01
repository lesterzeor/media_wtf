import Link from "next/link";
import { ContentfulImage } from "@/components/content/ContentfulImage";
import type { CardProps } from "@/components/ui/types";

export function Card({ article }: CardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {article.heroImage ? <ContentfulImage image={article.heroImage} /> : null}
      <div className="space-y-3 p-4">
        <h3 className="text-lg font-semibold text-slate-900">
          <Link href={`/articles/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        {article.excerpt ? <p className="text-sm text-slate-600">{article.excerpt}</p> : null}
        {article.author?.trim() ? (
          <p className="text-xs text-brand-primary">By {article.author.trim()}</p>
        ) : null}
      </div>
    </article>
  );
}
