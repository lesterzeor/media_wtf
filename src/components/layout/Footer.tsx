import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white py-10">
      <Container wide className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-neutral-600" suppressHydrationWarning>
          © {new Date().getUTCFullYear()} MediaWTF
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-neutral-700">
          <Link
            href="/articles"
            className="rounded-sm hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            All articles
          </Link>
          <Link
            href="/about"
            className="rounded-sm hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="rounded-sm hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="rounded-sm hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            Terms
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
