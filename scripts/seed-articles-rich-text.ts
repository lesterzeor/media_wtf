import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import type { LineSpec } from "./seed-articles-types";

function textNode(value: string, bold = false) {
  return {
    nodeType: "text" as const,
    value,
    marks: bold ? [{ type: MARKS.BOLD }] : [],
    data: {},
  };
}

function paragraph(...runs: ReturnType<typeof textNode>[]) {
  return {
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: runs.length ? runs : [textNode(" ")],
  };
}

function lineSpecToTopLevelNodes(spec: LineSpec): object[] {
  switch (spec.t) {
    case "h1":
      return [{ nodeType: BLOCKS.HEADING_1, data: {}, content: [textNode(spec.text)] }];
    case "h2":
      return [{ nodeType: BLOCKS.HEADING_2, data: {}, content: [textNode(spec.text)] }];
    case "h3":
      return [{ nodeType: BLOCKS.HEADING_3, data: {}, content: [textNode(spec.text)] }];
    case "p":
      return [paragraph(textNode(spec.text))];
    case "hr":
      return [{ nodeType: BLOCKS.HR, data: {}, content: [] }];
    case "quote":
      return [
        {
          nodeType: BLOCKS.QUOTE,
          data: {},
          content: spec.lines.map((line) => paragraph(textNode(line))),
        },
      ];
    case "ul":
      return [
        {
          nodeType: BLOCKS.UL_LIST,
          data: {},
          content: spec.items.map((item) => ({
            nodeType: BLOCKS.LIST_ITEM,
            data: {},
            content: [paragraph(textNode(item))],
          })),
        },
      ];
    case "ol":
      return [
        {
          nodeType: BLOCKS.OL_LIST,
          data: {},
          content: spec.items.map((item) => ({
            nodeType: BLOCKS.LIST_ITEM,
            data: {},
            content: [paragraph(textNode(item))],
          })),
        },
      ];
    default: {
      const _x: never = spec;
      return _x;
    }
  }
}

/** Valid Contentful rich-text **document** for the `body` field. */
export function linesToRichTextDocument(lines: LineSpec[]) {
  const content = lines.flatMap((line) => lineSpecToTopLevelNodes(line));
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content,
  };
}
