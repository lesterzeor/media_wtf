/**
 * Compact line-based spec → Contentful rich-text document (see seed-demo-articles.ts).
 */
export type LineSpec =
  | { t: "h1"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "hr" }
  | { t: "quote"; lines: string[] }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] };

export type ArticleSeed = {
  title: string;
  slug: string;
  excerpt: string;
  /** Key into CATEGORY_DEFS in seed-demo-articles */
  categoryKey:
    | "fiction"
    | "lifestyle"
    | "travel"
    | "tech"
    | "culture"
    | "opinion"
    | "guides"
    | "science";
  authorName: string;
  lines: LineSpec[];
};
