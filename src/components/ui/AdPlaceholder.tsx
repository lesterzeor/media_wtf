import type { CSSProperties } from "react";
import type { AdPlaceholderProps } from "@/components/ui/types";
import { cn } from "@/lib/utils";

/**
 * Dummy ad slot: outer box matches the stated IAB size when the parent is wide enough;
 * scales down proportionally with `max-width: 100%` on narrow viewports. Border is inside the box (`box-border`).
 */
export function AdPlaceholder({ width, height, className }: AdPlaceholderProps) {
  const label = `${width}×${height}`;
  const shortSlot = height <= 120;

  const style: CSSProperties = {
    boxSizing: "border-box",
    width: `${width}px`,
    maxWidth: "100%",
    aspectRatio: `${width} / ${height}`,
    height: "auto",
  };

  return (
    <div
      role="region"
      aria-label={`Advertisement placeholder ${label}`}
      className={cn(
        "mx-auto flex shrink-0 flex-col items-center justify-center border border-neutral-200 bg-neutral-50 text-center",
        shortSlot ? "gap-0 px-1 py-0.5" : "gap-1 px-2 py-2 sm:gap-2 sm:px-3 sm:py-3",
        className,
      )}
      style={style}
      data-ad-placeholder={label}
    >
      {shortSlot ? (
        <>
          <span className="text-[8px] font-semibold uppercase leading-none tracking-wide text-neutral-400">
            Advertisement
          </span>
          <span className="text-[11px] font-semibold leading-none tabular-nums text-neutral-500 sm:text-xs">
            {label}
          </span>
        </>
      ) : (
        <>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Advertisement
          </span>
          <span className="text-base font-semibold tabular-nums text-neutral-500 sm:text-lg">{label}</span>
        </>
      )}
    </div>
  );
}
