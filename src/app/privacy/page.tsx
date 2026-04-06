import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_NAME } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `How ${SITE_NAME} collects, uses, and protects information—including cookies, analytics, and advertising.`,
  alternates: { canonical: `${getSiteUrl()}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <>
          Last updated{" "}
          <time dateTime="2026-04-06">April 6, 2026</time>
        </>
      }
    >
      <p>
        This Privacy Policy describes how <strong>{SITE_NAME}</strong> (“we,” “us,” or “our”) handles information when
        you visit our website (the “Site”). By using the Site, you agree to this policy. If you do not agree, please do
        not use the Site.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Information we collect</h2>
      <p>We may collect:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Technical data</strong> such as browser type, device type, general location (country/region), referring
          pages, and pages viewed—typically via server logs, cookies, or similar technologies.
        </li>
        <li>
          <strong>Analytics data</strong> to understand readership (for example, through Google Tag Manager / Google
          Analytics when enabled). This helps us improve content and site performance.
        </li>
        <li>
          <strong>Content delivery</strong>: our CMS (Contentful) and hosting infrastructure may process requests and
          metadata needed to display articles and images.
        </li>
      </ul>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Cookies and similar technologies</h2>
      <p>
        We and our partners may use cookies, pixels, and local storage for analytics, preferences, frequency capping,
        and—where applicable—personalized advertising. You can control cookies through your browser settings. Blocking
        cookies may affect how certain features work.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Advertising</h2>
      <p>
        Third-party advertisers, including{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          className="font-medium text-brand-navy underline hover:text-brand-primary"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google
        </a>
        , may use cookies to serve ads based on your prior visits to our Site or other websites. Google’s use of
        advertising cookies enables it and its partners to serve ads to you based on your visit to our Site and/or
        other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
        <a
          href="https://www.google.com/settings/ads"
          className="font-medium text-brand-navy underline hover:text-brand-primary"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Ads Settings
        </a>{" "}
        or{" "}
        <a
          href="https://www.aboutads.info"
          className="font-medium text-brand-navy underline hover:text-brand-primary"
          rel="noopener noreferrer"
          target="_blank"
        >
          aboutads.info
        </a>
        .
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Children</h2>
      <p>
        The Site is not directed at children under 13 (or under 16 where applicable). We do not knowingly collect
        personal information from children. If you believe we have, please contact us and we will delete it.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, or restrict certain data, or to
        object to processing. To exercise these rights, contact us using the information below.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Changes</h2>
      <p>
        We may update this policy from time to time. The “Last updated” date at the top will change when we do. Continued
        use of the Site after changes means you accept the updated policy.
      </p>

      <h2 className="pt-2 font-serif text-xl font-bold text-neutral-900">Contact</h2>
      {contactEmail ? (
        <p>
          Email:{" "}
          <a href={`mailto:${contactEmail}`} className="font-medium text-brand-navy underline hover:text-brand-primary">
            {contactEmail}
          </a>
        </p>
      ) : (
        <p>
          For privacy-related requests, add <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
          to your site configuration so visitors can reach you. Until then, use any publisher contact method you list
          publicly elsewhere.
        </p>
      )}

      <p>
        Related:{" "}
        <Link href="/terms" className="font-medium text-brand-navy underline hover:text-brand-primary">
          Terms of Service
        </Link>
      </p>
    </LegalPage>
  );
}
