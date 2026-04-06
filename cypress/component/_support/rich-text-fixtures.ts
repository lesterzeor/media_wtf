import { BLOCKS } from "@contentful/rich-text-types";

/** Minimal Contentful rich-text document (single paragraph). */
export function minimalRichTextDocument() {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: "Body paragraph for tests.",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };
}
