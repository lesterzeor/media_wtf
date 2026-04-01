import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { RichTextProps } from "@/components/content/types";
import { Prose } from "@/components/ui/Prose";

export function RichText({ document }: RichTextProps) {
  if (!document || typeof document !== "object") {
    return <p className="text-slate-600">No article body is available yet.</p>;
  }

  return <Prose>{documentToReactComponents(document as Parameters<typeof documentToReactComponents>[0])}</Prose>;
}
