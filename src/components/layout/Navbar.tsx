"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE_LOGO, SITE_LOGO_IMAGE, SITE_NAME } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

function NavChevron() {
  return (
    <svg
      className="ml-0.5 inline-block h-3 w-3 text-neutral-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[box-shadow,background-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-neutral-200/90 bg-white/95 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md"
          : "border-neutral-200 bg-white shadow-none",
      )}
    >
      <Container wide className="flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <Link href="/" className="shrink-0">
          {SITE_LOGO_IMAGE ? (
            <Image
              src={SITE_LOGO_IMAGE}
              alt={SITE_NAME}
              width={200}
              height={40}
              priority
              className="h-9 w-auto md:h-10"
            />
          ) : (
            <span className="font-serif text-xl font-bold tracking-tight md:text-2xl">
              <span className="text-brand-primary">{SITE_LOGO.accent}</span>
              <span className="text-brand-navy">{SITE_LOGO.rest}</span>
            </span>
          )}
        </Link>
        <Link
          href="/articles"
          className="text-[11px] font-bold uppercase tracking-wide text-neutral-800 hover:text-brand-navy md:hidden"
        >
          Articles
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center justify-end gap-4 text-[11px] font-bold uppercase tracking-[0.06em] text-neutral-800 md:flex lg:gap-6"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="inline-flex items-center whitespace-nowrap hover:text-brand-navy"
            >
              {item.label}
              <NavChevron />
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
