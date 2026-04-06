import Link from "next/link";

/** WCAG 2.4.1 Bypass Blocks — first focusable control; pairs with `#main-content` on `<main>`. */
export function SkipLink() {
  return (
    <Link href="#main-content" className="skip-to-content">
      Skip to main content
    </Link>
  );
}
