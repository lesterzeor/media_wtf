import { HomeSectionHeader } from "@/components/home/HomeSectionHeader";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import type { SubscribeSidebarProps } from "@/components/home/types";
import { cn } from "@/lib/utils";

export type { SubscribeSidebarProps } from "@/components/home/types";

/** Sidebar card: green ribbon + {@link NewsletterSignup} form (UI only until backend exists). */
export function SubscribeSidebar({ className }: SubscribeSidebarProps) {
  return (
    <section className={cn("overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm", className)}>
      <HomeSectionHeader title="Subscribe" variant="ribbon" />
      <div className="p-4">
        <NewsletterSignup idPrefix="subscribe-sidebar" />
      </div>
    </section>
  );
}
