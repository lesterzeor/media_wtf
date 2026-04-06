import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import type { MainLayoutProps } from "@/components/layout/types";
import { BackToTop } from "@/components/ui/BackToTop";

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
