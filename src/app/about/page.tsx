import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_NAME } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: `About ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME}: our editorial focus, how we publish, and how to reach us.`,
  alternates: { canonical: `${getSiteUrl()}/about` },
};

export default function AboutPage() {
  return (
    <LegalPage
      title={`About ${SITE_NAME}`}
      intro={
        <>
          Last updated{" "}
          <time dateTime="2026-04-06">April 6, 2026</time>
        </>
      }
    >
      <p>
        <strong>{SITE_NAME}</strong> is an independent online publication focused on culture, media, and the stories
        behind the headlines. We publish original articles and guides meant to inform readers and spark curiosity—not
        clickbait.
      </p>
      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Editorial standards</h2>
      <p>
        We aim for clear writing, accurate facts, and transparent attribution. When we cover news or third-party
        material, we cite sources. Opinion and analysis are labeled as such when the tone goes beyond straight reporting.
      </p>
      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Advertising</h2>
      <p>
        {SITE_NAME} may display advertising, including through Google AdSense and similar programs. Ads are served by
        third parties; see our{" "}
        <Link href="/privacy" className="font-medium text-brand-navy underline hover:text-brand-primary">
          Privacy Policy
        </Link>{" "}
        for how cookies and advertising technologies work on this site.
      </p>
      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Contact</h2>
      <p>
        For general inquiries, corrections, or partnership questions, please use the contact method listed on our{" "}
        <Link href="/privacy" className="font-medium text-brand-navy underline hover:text-brand-primary">
          Privacy Policy
        </Link>{" "}
        page. We read feedback and take factual corrections seriously.
      </p>
      <p>
        <Link href="/articles" className="font-medium text-brand-navy underline hover:text-brand-primary">
          Browse all articles →
        </Link>
      </p>
    </LegalPage>
  );
}
