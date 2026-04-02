import { BLOCKS } from "@contentful/rich-text-types";
import type { ArticleBodyRichText } from "@/types/content";

type RtNode = {
  nodeType?: string;
  data?: Record<string, unknown>;
  content?: RtNode[];
  [key: string]: unknown;
};

/**
 * Split a Contentful rich-text **document** at top-level **horizontal rule** (`hr`) blocks.
 * Rules act as page breaks and are not included in any page. If there are no `hr` nodes, returns a single page.
 *
 * In the Contentful editor: **Insert → Horizontal rule** between sections you want as separate pages.
 */
export function splitRichTextDocumentAtHr(json: unknown): RtNode[] {
  if (!json || typeof json !== "object") {
    return [];
  }

  const doc = json as RtNode;
  if (doc.nodeType !== BLOCKS.DOCUMENT || !Array.isArray(doc.content)) {
    return [doc];
  }

  const segments: RtNode[][] = [];
  let current: RtNode[] = [];

  for (const node of doc.content) {
    const n = node as RtNode;
    if (n?.nodeType === BLOCKS.HR) {
      if (current.length > 0) {
        segments.push(current);
        current = [];
      }
    } else {
      current.push(n as RtNode);
    }
  }

  if (current.length > 0) {
    segments.push(current);
  }

  const data = doc.data ?? {};

  if (segments.length === 0) {
    return [{ nodeType: BLOCKS.DOCUMENT, data, content: [] }];
  }

  return segments.map((content) => ({
    nodeType: BLOCKS.DOCUMENT,
    data,
    content,
  }));
}

export function paginateArticleBody(body: ArticleBodyRichText | unknown): {
  pages: unknown[];
  links: ArticleBodyRichText["links"];
} {
  const isPayload =
    typeof body === "object" &&
    body !== null &&
    "json" in body &&
    (body as ArticleBodyRichText).json != null &&
    typeof (body as ArticleBodyRichText).json === "object";

  const json = isPayload ? (body as ArticleBodyRichText).json : body;
  const links = isPayload ? (body as ArticleBodyRichText).links : undefined;

  const pages = splitRichTextDocumentAtHr(json);
  return { pages, links };
}
