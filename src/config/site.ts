/** Primary nav — update labels/hrefs to match your sections and future category routes. */
export const SITE_NAME = "MediaWTF";

/** Logo split (reference-style two-tone wordmark) — used when `SITE_LOGO_IMAGE` is not set. */
export const SITE_LOGO = {
  accent: "Media",
  rest: "WTF",
} as const;

/**
 * Optional raster/SVG logo: place the file under `public/` and set this to its URL path.
 * @example Put `public/logo.svg` → set `SITE_LOGO_IMAGE = "/logo.svg"`
 */
export const SITE_LOGO_IMAGE: string | null = "/logo.png";

export type MegaMenuLink = {
  label: string;
  href: string;
};

export type MegaMenuColumn = {
  title: string;
  links: MegaMenuLink[];
};

/** Shown in the full-width dropdown (Insert → Horizontal rule is unrelated — this is navbar only). */
export type MegaMenuData = {
  /** Title in the navy bar (shown uppercase in UI). */
  title: string;
  /** Left column intro. */
  description?: string;
  /** Bold “Explore all …” style links with arrows. */
  featuredLinks?: MegaMenuLink[];
  /** Topic columns (e.g. Featured topics / Explore by). */
  columns: MegaMenuColumn[];
};

export type NavItem = {
  label: string;
  href: string;
  /** If set, desktop hover opens mega menu; mobile uses top-level `href` only. */
  megaMenu?: MegaMenuData;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Clinical skills",
    href: "/articles",
    megaMenu: {
      title: "Clinical skills",
      description:
        "Practical techniques and decision-making for procedures, diagnostics, and patient care in the clinic.",
      featuredLinks: [
        { label: "Explore all in Clinical skills", href: "/articles" },
        { label: "Visit resource hub", href: "/articles" },
      ],
      columns: [
        {
          title: "Featured topics",
          links: [
            { label: "Anesthesia", href: "/articles" },
            { label: "Surgery basics", href: "/articles" },
            { label: "Diagnostics", href: "/articles" },
          ],
        },
        {
          title: "Explore by",
          links: [
            { label: "Articles", href: "/articles" },
            { label: "Videos", href: "/articles" },
            { label: "Podcasts", href: "/articles" },
          ],
        },
      ],
    },
  },
  {
    label: "Practice life",
    href: "/articles",
    megaMenu: {
      title: "Practice life",
      description: "Workflow, culture, and tools for running a stronger practice day to day.",
      featuredLinks: [{ label: "Explore all in Practice life", href: "/articles" }],
      columns: [
        {
          title: "Featured topics",
          links: [
            { label: "Operations", href: "/articles" },
            { label: "Team & culture", href: "/articles" },
          ],
        },
        {
          title: "Explore by",
          links: [
            { label: "Articles", href: "/articles" },
            { label: "Guides", href: "/articles" },
          ],
        },
      ],
    },
  },
  {
    label: "Spotlight",
    href: "/articles",
    megaMenu: {
      title: "Spotlight",
      description: "Deep dives, explainers, and standout stories from the week.",
      featuredLinks: [{ label: "Explore spotlight", href: "/articles" }],
      columns: [
        {
          title: "Featured topics",
          links: [
            { label: "Culture", href: "/articles" },
            { label: "Science", href: "/articles" },
          ],
        },
        {
          title: "Explore by",
          links: [
            { label: "Articles", href: "/articles" },
            { label: "Guides", href: "/articles" },
          ],
        },
      ],
    },
  },
  {
    label: "News",
    href: "/articles",
    megaMenu: {
      title: "News",
      description: "Headlines, analysis, and updates from the field.",
      featuredLinks: [{ label: "All news", href: "/articles" }],
      columns: [
        {
          title: "Featured topics",
          links: [
            { label: "Industry", href: "/articles" },
            { label: "Policy", href: "/articles" },
          ],
        },
        {
          title: "Explore by",
          links: [
            { label: "Articles", href: "/articles" },
            { label: "Briefs", href: "/articles" },
          ],
        },
      ],
    },
  },
];
