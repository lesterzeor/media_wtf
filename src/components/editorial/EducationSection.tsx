import { EducationCard } from "@/components/editorial/EducationCard";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import type { EducationSectionProps } from "@/components/editorial/types";
import { AdSlot } from "@/components/ui/AdSlot";

export function EducationSection({ articles }: EducationSectionProps) {
  const cells = articles.slice(0, 4);

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <SectionHeader title="Continuing education" variant="purple" />
      <div className="lg:grid lg:grid-cols-[1fr_minmax(260px,300px)] lg:items-stretch">
        <div className="grid grid-cols-1 gap-px bg-neutral-300 md:grid-cols-2">
          {cells.length === 0 ? (
            <div className="col-span-full bg-white p-8 text-center text-sm text-neutral-500">
              Add more published articles to populate this grid.
            </div>
          ) : (
            cells.map((article) => (
              <div key={article.id} className="bg-white">
                <EducationCard article={article} />
              </div>
            ))
          )}
        </div>
        <div className="flex border-t border-neutral-200 bg-neutral-50 p-4 lg:border-l lg:border-t-0">
          <AdSlot slot="sidebar" className="min-h-[260px] w-full lg:min-h-0" />
        </div>
      </div>
    </section>
  );
}
