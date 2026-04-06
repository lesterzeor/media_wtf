import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_NAME } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms governing use of ${SITE_NAME}, our content, and limitations of liability.`,
  alternates: { canonical: `${getSiteUrl()}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={
        <>
          Last updated{" "}
          <time dateTime="2026-04-06">April 6, 2026</time>
        </>
      }
    >
      <p>
        Welcome to <strong>{SITE_NAME}</strong>. These Terms of Service (“Terms”) govern your access to and use of our
        website and content. By accessing or using the Site, you agree to these Terms.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Use of content</h2>
      <p>
        Articles, images, graphics, and other materials on the Site are protected by copyright and other laws. You may
        read and share links to our pages for personal, non-commercial use. You may not copy, scrape, or republish
        substantial portions of our content without permission, except as allowed by law (e.g. fair use with proper
        attribution).
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Disclaimer</h2>
      <p>
        Content is provided for general information and entertainment. We strive for accuracy but do not warrant that
        information is complete, current, or suitable for any particular purpose. Nothing on the Site is professional
        legal, medical, or financial advice.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE_NAME} and its operators shall not be liable for any indirect,
        incidental, special, or consequential damages arising from your use of the Site or reliance on its content.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Third-party links and ads</h2>
      <p>
        The Site may contain links to third-party websites or display advertisements. We do not control third-party
        sites or ad networks and are not responsible for their content or practices. See our{" "}
        <Link href="/privacy" className="font-medium text-brand-navy underline hover:text-brand-primary">
          Privacy Policy
        </Link>{" "}
        for how advertising may use cookies and similar technologies.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Changes</h2>
      <p>
        We may modify these Terms at any time. Updated Terms will be posted on this page with a revised “Last updated”
        date. Continued use of the Site after changes constitutes acceptance.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Contact</h2>
      <p>
        Questions about these Terms may be directed through the contact options described in our{" "}
        <Link href="/privacy" className="font-medium text-brand-navy underline hover:text-brand-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </LegalPage>
  );
}
