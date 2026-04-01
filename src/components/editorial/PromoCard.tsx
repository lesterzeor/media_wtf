import Link from "next/link";
import type { PromoCardProps } from "@/components/editorial/types";
import { cn } from "@/lib/utils";

/** Left-rail promo placeholder — swap for sponsorship, newsletter, or custom CMS block later. */
export function PromoCard({ className }: PromoCardProps) {
  return (
    <aside
      className={cn(
        "flex min-h-[280px] flex-col justify-between rounded-lg border border-brand-primary/25 bg-brand-primary/5 p-5 shadow-sm",
        className,
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Spotlight
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-neutral-900">
          Stories worth your time
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          Curated reads from our editors. Replace this block with a sponsor unit or featured program when
          ready.
        </p>
      </div>
      <Link
        href="/articles"
        className="mt-6 inline-flex w-full items-center justify-center rounded-md border-2 border-brand-primary bg-white px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-brand-primary transition hover:bg-brand-primary/10"
      >
        Browse articles
      </Link>
    </aside>
  );
}
