import type { ContainerProps } from "@/components/ui/types";
import { cn } from "@/lib/utils";

export function Container({ children, className, wide }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 md:px-6", wide ? "max-w-7xl" : "max-w-6xl", className)}
    >
      {children}
    </div>
  );
}
