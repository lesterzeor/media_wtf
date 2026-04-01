import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white py-10">
      <Container wide className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-neutral-600">
          © {new Date().getFullYear()} MediaWTF. Content from Contentful.
        </p>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-neutral-700">
          <Link href="/articles" className="hover:text-brand-navy">
            All articles
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
