import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Block, Inline } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import type { ArticleBodyRichText } from "@/types/content";
import type { RichTextProps } from "@/components/content/types";

function resolveAssetUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return `https://${url.replace(/^\/+/, "")}`;
}

type LinkedAsset = {
  sys?: { id?: string | null } | null;
  url?: string | null;
  title?: string | null;
  description?: string | null;
  width?: number | null;
  height?: number | null;
  contentType?: string | null;
};

type LinkedArticleEntry = {
  __typename?: string;
  sys?: { id?: string | null } | null;
  title?: string | null;
  slug?: string | null;
};

function indexById<T extends { sys?: { id?: string | null } | null }>(items: Array<T | null | undefined> | undefined): Map<string, T> {
  const map = new Map<string, T>();
  for (const item of items ?? []) {
    const id = item?.sys?.id;
    if (item && id) {
      map.set(id, item);
    }
  }
  return map;
}

function getTargetId(node: Block | Inline): string | undefined {
  const target = (node as { data?: { target?: { sys?: { id?: string } } } }).data?.target;
  return target?.sys?.id;
}

function isBodyPayload(doc: unknown): doc is ArticleBodyRichText {
  return (
    typeof doc === "object" &&
    doc !== null &&
    "json" in doc &&
    (doc as ArticleBodyRichText).json != null &&
    typeof (doc as ArticleBodyRichText).json === "object"
  );
}

/** Minimal render options: Contentful GraphQL needs `links` to resolve embeds (json alone has unresolved targets). */
function optionsForLinks(links: ArticleBodyRichText["links"]): Options {
  const assets = (links as { assets?: { block?: LinkedAsset[]; hyperlink?: LinkedAsset[] } } | undefined)?.assets;
  const entries = (links as { entries?: { block?: LinkedArticleEntry[]; hyperlink?: LinkedArticleEntry[]; inline?: LinkedArticleEntry[] } } | undefined)?.entries;

  const assetBlock = indexById(assets?.block);
  for (const a of assets?.hyperlink ?? []) {
    const id = a?.sys?.id;
    if (a && id) {
      assetBlock.set(id, a);
    }
  }

  const entryBlock = indexById(entries?.block);
  const entryHyperlink = indexById(entries?.hyperlink);
  const entryInline = indexById(entries?.inline);
  const allEntries = new Map<string, LinkedArticleEntry>([...entryBlock, ...entryHyperlink, ...entryInline]);

  return {
    renderMark: {
      [MARKS.CODE]: (text) => <code className="article-body-code">{text}</code>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = getTargetId(node);
        const asset = id ? assetBlock.get(id) : undefined;
        const url = asset?.url?.trim();
        if (!asset || !url) {
          return null;
        }
        const src = resolveAssetUrl(url);
        const w = asset.width ?? 1200;
        const h = asset.height ?? Math.round((w * 9) / 16);
        const alt = (asset.description ?? asset.title ?? "").trim() || "";
        const isImage = (asset.contentType ?? "").startsWith("image/");
        if (!isImage) {
          return (
            <p>
              <a href={src} rel="noopener noreferrer" target="_blank">
                {asset.title?.trim() || "Download file"}
              </a>
            </p>
          );
        }
        return (
          <figure className="article-body-figure">
            <Image
              src={src}
              alt={alt}
              width={w}
              height={h}
              className="h-auto w-full rounded-lg object-cover"
              sizes="(min-width: 1024px) min(896px, 100vw), 100vw"
            />
            {asset.title?.trim() ? <figcaption>{asset.title}</figcaption> : null}
          </figure>
        );
      },
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        const id = getTargetId(node);
        const asset = id ? assetBlock.get(id) : undefined;
        const href = asset?.url ? resolveAssetUrl(asset.url) : "#";
        return (
          <a href={href} rel="noopener noreferrer" target="_blank">
            {children}
          </a>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const id = getTargetId(node);
        const entry = id ? allEntries.get(id) : undefined;
        if (entry?.__typename === "Article" && entry.slug) {
          return <Link href={`/articles/${entry.slug}`}>{children}</Link>;
        }
        return <span>{children}</span>;
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = (node as { data?: { uri?: string } }).data?.uri;
        if (!uri) {
          return <span>{children}</span>;
        }
        const isExternal = /^https?:\/\//i.test(uri);
        if (isExternal) {
          return (
            <a href={uri} rel="noopener noreferrer" target="_blank">
              {children}
            </a>
          );
        }
        return <Link href={uri}>{children}</Link>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const id = getTargetId(node);
        const entry = id ? allEntries.get(id) : undefined;
        if (entry?.__typename === "Article" && entry.slug && entry.title) {
          return (
            <aside className="article-body-related">
              <p className="article-body-related-label">Related article</p>
              <Link className="article-body-related-title" href={`/articles/${entry.slug}`}>
                {entry.title}
              </Link>
            </aside>
          );
        }
        return null;
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const id = getTargetId(node);
        const entry = id ? allEntries.get(id) : undefined;
        if (entry?.__typename === "Article" && entry.slug && entry.title) {
          return <Link href={`/articles/${entry.slug}`}>{entry.title}</Link>;
        }
        return null;
      },
    },
  };
}

export function RichText({ document }: RichTextProps) {
  let docJson: unknown;
  let extra: Options | undefined;

  if (isBodyPayload(document)) {
    docJson = document.json;
    extra = optionsForLinks(document.links);
  } else {
    docJson = document;
  }

  if (!docJson || typeof docJson !== "object") {
    return <p className="text-neutral-500">No article body is available yet.</p>;
  }

  const options: Options = { ...extra };

  return (
    <div className="article-body">
      {documentToReactComponents(docJson as Parameters<typeof documentToReactComponents>[0], options)}
    </div>
  );
}
