import Link from "next/link";
import type { MegaMenuData } from "@/config/site";

type MegaMenuDropdownProps = {
  data: MegaMenuData;
};

/** White 3-column body; navy title row is rendered by the navbar shell. */
export function MegaMenuDropdown({ data }: MegaMenuDropdownProps) {
  return (
    <div className="grid gap-8 px-4 py-8 md:grid-cols-[minmax(0,1.15fr)_1fr_1fr] md:gap-10 md:px-8 md:py-9">
      <div className="min-w-0 border-neutral-200 md:border-r md:pr-8">
        {data.description ? (
          <p className="mb-6 text-sm leading-relaxed text-neutral-700">{data.description}</p>
        ) : null}
        {data.featuredLinks && data.featuredLinks.length > 0 ? (
          <ul className="space-y-3">
            {data.featuredLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand-navy hover:text-brand-primary"
                >
                  {link.label}
                  <span aria-hidden className="text-base leading-none">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {data.columns.map((col) => (
        <div key={col.title} className="min-w-0">
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-900">
            {col.title}
          </h3>
          <ul className="space-y-2.5">
            {col.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-neutral-800 transition-colors hover:text-brand-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
