import type { CategoryTagsProps } from "@/components/editorial/types";
import { cn } from "@/lib/utils";

/**
 * Reusable category line: `PRIMARY | SECONDARY` (reference-style).
 * With no categories, shows a neutral label so layout stays stable.
 */
export function CategoryTags({ categories, className }: CategoryTagsProps) {
  const primary = categories[0];
  const secondary = categories[1];

  if (!primary) {
    return (
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-primary",
          className,
        )}
      >
        Featured
      </p>
    );
  }

  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.12em]", className)}>
      <span className="text-brand-primary">{primary.name}</span>
      {secondary ? (
        <>
          <span className="mx-1.5 font-normal text-neutral-400">|</span>
          <span className="text-brand-navy">{secondary.name}</span>
        </>
      ) : null}
    </p>
  );
}
