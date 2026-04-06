import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

/**
 * Static legal / policy pages: readable typography, clear hierarchy for reviewers and users.
 */
export function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <Container className="py-10 md:py-12">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8 border-b border-neutral-200 pb-6">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">{title}</h1>
          {intro ? <div className="mt-4 text-sm text-neutral-600">{intro}</div> : null}
        </header>
        <div className="legal-prose space-y-5 text-base leading-relaxed text-neutral-800">{children}</div>
      </article>
    </Container>
  );
}
