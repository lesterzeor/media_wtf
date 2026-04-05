import Link from "next/link";
import { ContentfulImage } from "@/components/content/ContentfulImage";
import type { CardProps } from "@/components/ui/types";

export function Card({ article }: CardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
        {article.heroImage ? (
          <ContentfulImage
            image={article.heroImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400" aria-hidden>
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-4">
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
