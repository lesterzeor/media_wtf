import type { SectionHeaderProps, SectionVariant } from "@/components/editorial/types";
import { cn } from "@/lib/utils";

/** Light-theme section ribbons: tinted background + dark text (no white copy). */
const variantClass: Record<SectionVariant, string> = {
  purple: "border-b border-violet-200/90 bg-violet-100 text-violet-950",
  pink: "border-b border-pink-200/90 bg-pink-100 text-pink-950",
  navy: "border-b border-slate-200 bg-slate-100 text-slate-900",
};

export function SectionHeader({ title, variant = "purple", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "w-full py-2.5 text-center text-[13px] font-bold uppercase tracking-[0.14em]",
        variantClass[variant],
        className,
      )}
    >
      {title}
    </div>
  );
}
