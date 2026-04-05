"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MegaMenuDropdown } from "@/components/layout/MegaMenuDropdown";
import { NAV_ITEMS, SITE_LOGO, SITE_LOGO_IMAGE, SITE_NAME } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const CLOSE_DELAY_MS = 160;

function NavChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "ml-0.5 inline-block h-3 w-3 text-neutral-500 transition-transform duration-200",
        open && "rotate-180",
      )}
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

function LogoMark() {
  return SITE_LOGO_IMAGE ? (
    <Image
      src={SITE_LOGO_IMAGE}
      alt=""
      width={200}
      height={40}
      className="h-9 w-auto md:h-10"
      aria-hidden
    />
  ) : (
    <span className="font-serif text-xl font-bold tracking-tight md:text-2xl" aria-hidden>
      <span className="text-brand-primary">{SITE_LOGO.accent}</span>
      <span className="text-brand-navy">{SITE_LOGO.rest}</span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpenIndex(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeMega = openIndex !== null ? NAV_ITEMS[openIndex]?.megaMenu : undefined;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[box-shadow,background-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-neutral-200/90 bg-white/95 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md"
          : "border-neutral-200 bg-white shadow-none",
      )}
    >
      <Container wide className="relative">
        <div className="flex h-16 items-stretch justify-between gap-4 md:h-17">
          <Link href="/" className="flex shrink-0 items-center">
            <LogoMark />
            <span className="sr-only">{SITE_NAME}</span>
          </Link>
          <Link
            href="/articles"
            className="flex items-center text-[11px] font-bold uppercase tracking-wide text-neutral-800 hover:text-brand-navy md:hidden"
          >
            Articles
          </Link>

          <div
            className="relative hidden min-h-0 flex-1 flex-col justify-end md:flex"
            onMouseLeave={scheduleClose}
          >
            <nav aria-label="Main navigation" className="flex justify-end pb-0">
              <ul className="flex items-center justify-end gap-4 lg:gap-6">
                {NAV_ITEMS.map((item, index) => {
                  const hasMega = Boolean(item.megaMenu);
                  const isOpen = openIndex === index;
                  return (
                    <li
                      key={item.label + item.href}
                      onMouseEnter={() => {
                        cancelClose();
                        if (hasMega) {
                          setOpenIndex(index);
                        } else {
                          setOpenIndex(null);
                        }
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.06em] transition-colors",
                          "text-neutral-800 hover:text-brand-navy",
                          isOpen && hasMega && "text-brand-primary",
                        )}
                      >
                        {item.label}
                        {hasMega ? <NavChevron open={isOpen} /> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {activeMega ? (
          <div
            className="animate-[mega-menu-in_0.2s_ease-out_forwards] absolute left-0 right-0 top-full z-40 hidden w-full min-w-0 md:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="overflow-hidden rounded-b-lg border border-t-0 border-neutral-200 bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)]">
              <div className="flex w-full min-w-0 min-h-12 items-center bg-brand-navy px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white md:min-h-13 md:px-6 md:text-xs">
                {activeMega.title}
              </div>
              <div className="min-w-0 border-t border-neutral-100 bg-white">
                <MegaMenuDropdown data={activeMega} />
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
