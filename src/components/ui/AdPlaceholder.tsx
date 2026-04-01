import type { CSSProperties } from "react";
import type { AdPlaceholderProps } from "@/components/ui/types";
import { cn } from "@/lib/utils";

/** Placeholder until real ads load — “Advertisement” + dimensions label. Caps at `width`×`height`; centers in wider parents. */
export function AdPlaceholder({ width, height, className }: AdPlaceholderProps) {
  const label = `${width}×${height}`;
  const style: CSSProperties = {
    width: `min(100%, ${width}px)`,
    aspectRatio: `${width} / ${height}`,
    maxHeight: height,
  };

  return (
    <div
      className={cn(
        "mx-auto flex flex-col items-center justify-center gap-2 border border-neutral-200 bg-neutral-50 px-4 py-5 text-center",
        className,
      )}
      style={style}
      data-ad-placeholder={label}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Advertisement
      </span>
      <span className="text-lg font-semibold tabular-nums text-neutral-500">{label}</span>
    </div>
  );
}
