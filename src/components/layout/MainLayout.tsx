import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { MainLayoutProps } from "@/components/layout/types";
import { BackToTop } from "@/components/ui/BackToTop";

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
