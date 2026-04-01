import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ProseProps = PropsWithChildren<{
  className?: string;
}>;

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none text-neutral-800 prose-headings:text-neutral-900 prose-headings:font-semibold prose-a:text-blue-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
