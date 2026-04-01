"use client";

import type { NewsletterSignupProps } from "@/components/home/types";
import { cn } from "@/lib/utils";

export type { NewsletterSignupProps } from "@/components/home/types";

/**
 * Non-functional newsletter capture — replace with API route + ESP (Mailchimp, ConvertKit, etc.).
 * Used inside the home sidebar “Subscribe” card.
 */
export function NewsletterSignup({ className, idPrefix = "newsletter" }: NewsletterSignupProps) {
  const nameId = `${idPrefix}-name`;
  const emailId = `${idPrefix}-email`;

  return (
    <form
      className={cn("space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor={nameId} className="mb-1 block text-xs font-medium text-neutral-700">
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>
      <div>
        <label htmlFor={emailId} className="mb-1 block text-xs font-medium text-neutral-700">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-neutral-200 py-2.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-300"
      >
        Subscribe
      </button>
    </form>
  );
}
