import Link from "next/link";
import type { ButtonProps } from "@/components/ui/types";
import { cn } from "@/lib/utils";

export function Button({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </Link>
  );
}
