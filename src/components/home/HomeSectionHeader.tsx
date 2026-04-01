import type { HomeSectionHeaderProps } from "@/components/home/types";
import { cn } from "@/lib/utils";

export function HomeSectionHeader({ title, variant = "ribbon", className }: HomeSectionHeaderProps) {
  if (variant === "badge") {
    return (
      <div
        className={cn(
          "mb-3 inline-block rounded bg-brand-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm",
          className,
        )}
      >
        {title}
      </div>
    );
  }
  /** Ribbon: primary green label on light ground (reference — not white text on solid fill). */
  return (
    <div
      className={cn(
        "w-full border-b-2 border-brand-primary bg-neutral-50 py-2.5 text-center text-[12px] font-bold uppercase tracking-[0.18em] text-brand-primary",
        className,
      )}
    >
      {title}
    </div>
  );
}
