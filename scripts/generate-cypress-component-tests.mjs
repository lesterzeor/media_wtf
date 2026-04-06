/**
 * Generates `cypress/component/<segment>/<Name>/{Name}.cy.tsx` and `{Name}.fixtures.ts`
 * for components listed in `COMPONENTS` (one-time / maintenance scaffold).
 *
 * Run: `node scripts/generate-cypress-component-tests.mjs`
 *
 * Hand-written specs live in `cypress/component/home/FeaturedMediaGrid/` (not generated).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const COMPONENT_ROOT = path.join(ROOT, "cypress", "component");

function writeFile(relDir, fileName, content) {
  const full = path.join(COMPONENT_ROOT, relDir, fileName);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, `${content.replace(/\n+$/, "\n")}\n`);
}

function fixturesTs(componentName) {
  return `/**
 * Test data for <${componentName} /> Cypress component specs.
 * Re-export shared builders; add component-specific helpers here when needed.
 */
export * from "../../_support/index";
`;
}

/** @type {{ segment: string; name: string; spec: string }[]} */
const COMPONENTS = [
  {
    segment: "layout",
    name: "Footer",
    spec: `import { Footer } from "@/components/layout/Footer";

describe("<Footer />", () => {
  it("renders footer navigation with an articles link", () => {
    cy.mount(<Footer />);
    cy.get('nav[aria-label="Footer"]').find("a").should("have.attr", "href", "/articles");
  });
});
`,
  },
  {
    segment: "layout",
    name: "Navbar",
    spec: `import { Navbar } from "@/components/layout/Navbar";

describe("<Navbar />", () => {
  it("renders the home link with accessible site name", () => {
    cy.mount(<Navbar />);
    cy.get('a[href="/"]').should("exist");
    cy.contains("span.sr-only", "MediaWTF").should("exist");
  });
});
`,
  },
  {
    segment: "layout",
    name: "MainLayout",
    spec: `import { MainLayout } from "@/components/layout/MainLayout";

describe("<MainLayout />", () => {
  it("renders skip link, main landmark, and nested children", () => {
    cy.mount(
      <MainLayout>
        <p>Layout child</p>
      </MainLayout>,
    );
    cy.get('a[href="#main-content"]').should("contain.text", "Skip to main content");
    cy.get("#main-content").should("contain.text", "Layout child");
  });
});
`,
  },
  {
    segment: "layout",
    name: "MegaMenuDropdown",
    spec: `import { MegaMenuDropdown } from "@/components/layout/MegaMenuDropdown";
import { NAV_ITEMS } from "@/config/site";

describe("<MegaMenuDropdown />", () => {
  it("renders column titles and links from mega menu data", () => {
    const data = NAV_ITEMS[0]?.megaMenu;
    if (!data) {
      throw new Error("NAV_ITEMS[0].megaMenu must exist for this test");
    }
    cy.mount(<MegaMenuDropdown data={data} />);
    cy.contains("h3", data.columns[0].title).should("exist");
    cy.get("a").should("have.length.at.least", 2);
  });
});
`,
  },
  {
    segment: "layout",
    name: "SkipLink",
    spec: `import { SkipLink } from "@/components/layout/SkipLink";

describe("<SkipLink />", () => {
  it("renders a skip link to main content", () => {
    cy.mount(<SkipLink />);
    cy.get('a[href="#main-content"]').should("contain.text", "Skip to main content");
  });
});
`,
  },
  {
    segment: "contentful",
    name: "ContentfulLivePreviewRoot",
    spec: `import { ContentfulLivePreviewRoot } from "@/components/contentful/ContentfulLivePreviewRoot";

describe("<ContentfulLivePreviewRoot />", () => {
  it("renders children when preview is disabled", () => {
    cy.mount(
      <ContentfulLivePreviewRoot enabled={false} spaceId="" environment="master" locale="en-US">
        <span>App content</span>
      </ContentfulLivePreviewRoot>,
    );
    cy.contains("App content").should("exist");
  });
});
`,
  },
  {
    segment: "home",
    name: "HotSection",
    spec: `import { HotSection } from "@/components/home/HotSection";
import { articleFixture } from "./HotSection.fixtures";

describe("<HotSection />", () => {
  it("shows empty guidance when there is no article", () => {
    cy.mount(<HotSection article={null} />);
    cy.contains("Hot article").should("exist");
  });

  it("renders the article title and link when provided", () => {
    const article = articleFixture({ title: "Hot title", slug: "hot-slug" });
    cy.mount(<HotSection article={article} />);
    cy.get('a[href="/articles/hot-slug"]').should("contain.text", "Hot title");
  });
});
`,
  },
  {
    segment: "home",
    name: "RecommendedSidebarSection",
    spec: `import { RecommendedSidebarSection } from "@/components/home/RecommendedSidebarSection";
import { articleFixture } from "./RecommendedSidebarSection.fixtures";

describe("<RecommendedSidebarSection />", () => {
  it("returns null when there are no articles", () => {
    cy.mount(<RecommendedSidebarSection articles={[]} />);
    cy.get("section").should("not.exist");
  });

  it("renders recommended headings and links", () => {
    const articles = [articleFixture({ slug: "r1", title: "Rec one" })];
    cy.mount(<RecommendedSidebarSection articles={articles} />);
    cy.get("h2").should("contain.text", "Recommended");
    cy.get('a[href="/articles/r1"]').should("exist");
  });
});
`,
  },
  {
    segment: "home",
    name: "TrendingSection",
    spec: `import { TrendingSection } from "@/components/home/TrendingSection";
import { articleFixture } from "./TrendingSection.fixtures";

describe("<TrendingSection />", () => {
  it("returns null when empty", () => {
    cy.mount(<TrendingSection articles={[]} />);
    cy.get("section").should("not.exist");
  });

  it("lists trending article titles", () => {
    cy.mount(<TrendingSection articles={[articleFixture({ slug: "t1", title: "Trending A" })]} />);
    cy.get("h2").should("contain.text", "Trending");
    cy.contains("Trending A").should("exist");
  });
});
`,
  },
  {
    segment: "home",
    name: "MustSeeSection",
    spec: `import { MustSeeSection } from "@/components/home/MustSeeSection";
import { articleFixture } from "./MustSeeSection.fixtures";

describe("<MustSeeSection />", () => {
  it("returns null when empty", () => {
    cy.mount(<MustSeeSection articles={[]} />);
    cy.get("section").should("not.exist");
  });

  it("renders list items with article titles", () => {
    cy.mount(<MustSeeSection articles={[articleFixture({ slug: "m1", title: "Must see item" })]} />);
    cy.get("h2").should("contain.text", "Must see");
    cy.contains("Must see item").should("exist");
  });
});
`,
  },
  {
    segment: "home",
    name: "ArticleMetaLine",
    spec: `import { ArticleMetaLine } from "@/components/home/ArticleMetaLine";
import { articleFixture } from "./ArticleMetaLine.fixtures";

describe("<ArticleMetaLine />", () => {
  it("shows site name and date for site variant", () => {
    cy.mount(<ArticleMetaLine article={articleFixture()} variant="site" />);
    cy.contains("MediaWTF").should("exist");
  });

  it("shows author line for author variant when author is set", () => {
    cy.mount(<ArticleMetaLine article={articleFixture({ author: "Jane Doe" })} variant="author" />);
    cy.contains("Jane Doe").should("exist");
  });
});
`,
  },
  {
    segment: "home",
    name: "NewsletterSignup",
    spec: `import { NewsletterSignup } from "@/components/home/NewsletterSignup";

describe("<NewsletterSignup />", () => {
  it("renders labeled fields and submit", () => {
    cy.mount(<NewsletterSignup idPrefix="ct-test" />);
    cy.get('label[for="ct-test-name"]').should("exist");
    cy.get('label[for="ct-test-email"]').should("exist");
    cy.get('button[type="submit"]').should("contain.text", "Subscribe");
  });
});
`,
  },
  {
    segment: "home",
    name: "HomeSectionHeader",
    spec: `import { HomeSectionHeader } from "@/components/home/HomeSectionHeader";

describe("<HomeSectionHeader />", () => {
  it("renders ribbon and badge variants as headings", () => {
    cy.mount(
      <div>
        <HomeSectionHeader title="Ribbon title" variant="ribbon" />
        <HomeSectionHeader title="Badge title" variant="badge" />
      </div>,
    );
    cy.get("h2").should("contain.text", "Ribbon title");
    cy.get("h2").should("contain.text", "Badge title");
  });
});
`,
  },
  {
    segment: "home",
    name: "HomeScrollToTop",
    spec: `import { HomeScrollToTop } from "@/components/home/HomeScrollToTop";

describe("<HomeScrollToTop />", () => {
  it("renders no visible output", () => {
    cy.mount(
      <div data-cy-wrapper>
        <HomeScrollToTop />
      </div>,
    );
    cy.get("[data-cy-wrapper]").should("be.empty");
  });
});
`,
  },
  {
    segment: "home",
    name: "FeaturedArticle",
    spec: `import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { articleFixture } from "./FeaturedArticle.fixtures";

describe("<FeaturedArticle />", () => {
  it("renders featured article headline and link", () => {
    const article = articleFixture({ slug: "fa-1", title: "Featured headline" });
    cy.mount(<FeaturedArticle article={article} />);
    cy.get('a[href="/articles/fa-1"]').should("contain.text", "Featured headline");
    cy.contains("Featured").should("exist");
  });
});
`,
  },
  {
    segment: "home",
    name: "SubscribeSidebar",
    spec: `import { SubscribeSidebar } from "@/components/home/SubscribeSidebar";

describe("<SubscribeSidebar />", () => {
  it("renders subscribe section and form fields", () => {
    cy.mount(<SubscribeSidebar />);
    cy.get("h2").should("contain.text", "Subscribe");
    cy.get('input[type="email"]').should("exist");
  });
});
`,
  },
  {
    segment: "home",
    name: "ArticleThumb",
    spec: `import { ArticleThumb } from "@/components/home/ArticleThumb";
import { contentImageFixture } from "./ArticleThumb.fixtures";

describe("<ArticleThumb />", () => {
  it("renders an image with alt text", () => {
    cy.mount(
      <ArticleThumb image={contentImageFixture()} alt="Thumb alt" size="sm" />,
    );
    cy.get('img[alt="Thumb alt"]').should("exist");
  });
});
`,
  },
  {
    segment: "ui",
    name: "AdPlaceholder",
    spec: `import { AdPlaceholder } from "@/components/ui/AdPlaceholder";

describe("<AdPlaceholder />", () => {
  it("renders labeled dimensions and advertisement copy", () => {
    cy.mount(<AdPlaceholder width={300} height={250} />);
    cy.get('[role="region"]').should("have.attr", "aria-label", "Advertisement placeholder 300×250");
    cy.contains("Advertisement").should("exist");
    cy.contains("300×250").should("exist");
  });
});
`,
  },
  {
    segment: "ui",
    name: "Card",
    spec: `import { Card } from "@/components/ui/Card";
import { articleFixture } from "./Card.fixtures";

describe("<Card />", () => {
  it("renders title link and article structure", () => {
    cy.mount(<Card article={articleFixture({ title: "Card item", slug: "card-slug" })} />);
    cy.get("article").should("exist");
    cy.get('a[href="/articles/card-slug"]').should("contain.text", "Card item");
  });
});
`,
  },
  {
    segment: "ui",
    name: "Button",
    spec: `import { Button } from "@/components/ui/Button";

describe("<Button />", () => {
  it("renders a link with href", () => {
    cy.mount(<Button href="/articles">Read more</Button>);
    cy.get('a[href="/articles"]').should("contain.text", "Read more");
  });
});
`,
  },
  {
    segment: "ui",
    name: "BackToTop",
    spec: `import { BackToTop } from "@/components/ui/BackToTop";

describe("<BackToTop />", () => {
  it("renders a control with an accessible name", () => {
    cy.mount(<BackToTop />);
    cy.get("button").should("have.attr", "aria-label", "Back to top");
  });
});
`,
  },
  {
    segment: "ui",
    name: "AdSlot",
    spec: `import { AdSlot } from "@/components/ui/AdSlot";

describe("<AdSlot />", () => {
  it("renders a slot marker for the given region", () => {
    cy.mount(<AdSlot slot="sidebar" />);
    cy.get("[data-ad-slot=sidebar]").should("exist");
  });
});
`,
  },
  {
    segment: "ui",
    name: "AdRegion",
    spec: `import { AdRegion } from "@/components/ui/AdRegion";

describe("<AdRegion />", () => {
  it("renders a placeholder region outside production", () => {
    cy.mount(<AdRegion region="in-content" />);
    cy.get('[role="region"]').should("exist");
  });
});
`,
  },
  {
    segment: "ui",
    name: "AdSenseDisplayUnit",
    spec: `import { AdSenseDisplayUnit } from "@/components/ui/AdSenseDisplayUnit";

describe("<AdSenseDisplayUnit />", () => {
  it("renders nothing when AdSense client id is not configured", () => {
    cy.mount(<AdSenseDisplayUnit adSlot="123456" />);
    cy.get("ins.adsbygoogle").should("not.exist");
  });
});
`,
  },
  {
    segment: "ui",
    name: "Container",
    spec: `import { Container } from "@/components/ui/Container";

describe("<Container />", () => {
  it("renders children inside a centered wrapper", () => {
    cy.mount(
      <Container wide>
        <p>Inside container</p>
      </Container>,
    );
    cy.contains("Inside container").should("exist");
    cy.get(".max-w-7xl").should("exist");
  });
});
`,
  },
  {
    segment: "content",
    name: "ArticleView",
    spec: `import { ArticleView } from "@/components/content/ArticleView";
import { articleFixture, minimalRichTextDocument } from "./ArticleView.fixtures";

describe("<ArticleView />", () => {
  it("renders the article title and sidebar ads region", () => {
    const article = articleFixture({
      title: "Article view title",
      body: { json: minimalRichTextDocument() },
    });
    cy.mount(<ArticleView article={article} />);
    cy.get("h1").should("contain.text", "Article view title");
    cy.get("aside[aria-label=Advertisements]").should("exist");
  });
});
`,
  },
  {
    segment: "content",
    name: "ContentfulImage",
    spec: `import { ContentfulImage } from "@/components/content/ContentfulImage";
import { contentImageFixture } from "./ContentfulImage.fixtures";

describe("<ContentfulImage />", () => {
  it("renders a fixed-size image", () => {
    cy.mount(<ContentfulImage image={contentImageFixture()} />);
    cy.get("img").should("have.attr", "alt", "Test image description");
  });

  it("supports fill mode inside a relative parent", () => {
    cy.mount(
      <div className="relative h-32 w-full">
        <ContentfulImage image={contentImageFixture()} fill sizes="100vw" />
      </div>,
    );
    cy.get("img").should("exist");
  });
});
`,
  },
  {
    segment: "content",
    name: "ArticleBodyPaginated",
    spec: `import { ArticleBodyPaginated } from "@/components/content/ArticleBodyPaginated";
import { minimalRichTextDocument } from "./ArticleBodyPaginated.fixtures";

describe("<ArticleBodyPaginated />", () => {
  it("renders article body text", () => {
    cy.mount(<ArticleBodyPaginated body={{ json: minimalRichTextDocument() }} />);
    cy.contains("Body paragraph for tests.").should("exist");
  });
});
`,
  },
  {
    segment: "content",
    name: "RichText",
    spec: `import { RichText } from "@/components/content/RichText";
import { minimalRichTextDocument } from "./RichText.fixtures";

describe("<RichText />", () => {
  it("renders paragraph content from a Contentful document", () => {
    cy.mount(<RichText document={minimalRichTextDocument()} />);
    cy.get(".article-body").should("contain.text", "Body paragraph for tests.");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "RecommendedFeature",
    spec: `import { RecommendedFeature } from "@/components/editorial/RecommendedFeature";
import { articleFixture, categoryFixture } from "./RecommendedFeature.fixtures";

describe("<RecommendedFeature />", () => {
  it("shows placeholder copy when article is null", () => {
    cy.mount(<RecommendedFeature article={null} />);
    cy.contains("Publish more articles").should("exist");
  });

  it("renders linked title when article is set", () => {
    const article = articleFixture({
      slug: "rf-1",
      title: "Recommended story",
      categories: [categoryFixture()],
    });
    cy.mount(<RecommendedFeature article={article} />);
    cy.get('a[href="/articles/rf-1"]').should("contain.text", "Recommended story");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "PromoCard",
    spec: `import { PromoCard } from "@/components/editorial/PromoCard";

describe("<PromoCard />", () => {
  it("renders spotlight copy and browse link", () => {
    cy.mount(<PromoCard />);
    cy.contains("Spotlight").should("exist");
    cy.get('a[href="/articles"]').should("contain.text", "Browse articles");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "TodaysHighlights",
    spec: `import { TodaysHighlights } from "@/components/editorial/TodaysHighlights";
import { articleFixture } from "./TodaysHighlights.fixtures";

describe("<TodaysHighlights />", () => {
  it("shows empty state when there are no articles", () => {
    cy.mount(<TodaysHighlights articles={[]} />);
    cy.contains("No articles yet").should("exist");
  });

  it("renders highlight rows when articles exist", () => {
    cy.mount(<TodaysHighlights articles={[articleFixture({ title: "Highlight A" })]} />);
    cy.contains("Today's highlights").should("exist");
    cy.contains("Highlight A").should("exist");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "ArticleHighlightRow",
    spec: `import { ArticleHighlightRow } from "@/components/editorial/ArticleHighlightRow";
import { articleFixture, categoryFixture } from "./ArticleHighlightRow.fixtures";

describe("<ArticleHighlightRow />", () => {
  it("links the article title", () => {
    const article = articleFixture({
      slug: "ahr-1",
      title: "Highlight row title",
      categories: [categoryFixture({ name: "News" })],
    });
    cy.mount(<ArticleHighlightRow article={article} />);
    cy.get('a[href="/articles/ahr-1"]').should("contain.text", "Highlight row title");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "FeaturedHero",
    spec: `import { FeaturedHero } from "@/components/editorial/FeaturedHero";
import { articleFixture } from "./FeaturedHero.fixtures";

describe("<FeaturedHero />", () => {
  it("shows placeholder when no article", () => {
    cy.mount(<FeaturedHero article={null} />);
    cy.contains("Add a published article").should("exist");
  });

  it("renders hero link when article exists", () => {
    cy.mount(<FeaturedHero article={articleFixture({ slug: "fh-1", title: "Hero story" })} />);
    cy.get('a[href="/articles/fh-1"]').should("contain.text", "Hero story");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "EditorialHeroImage",
    spec: `import { EditorialHeroImage } from "@/components/editorial/EditorialHeroImage";
import { contentImageFixture } from "./EditorialHeroImage.fixtures";

describe("<EditorialHeroImage />", () => {
  it("fills a relative container", () => {
    cy.mount(
      <div className="relative h-48 w-full">
        <EditorialHeroImage image={contentImageFixture()} />
      </div>,
    );
    cy.get("img").should("have.attr", "alt", "Test image description");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "SectionHeader",
    spec: `import { SectionHeader } from "@/components/editorial/SectionHeader";

describe("<SectionHeader />", () => {
  it("renders the title with variant styling", () => {
    cy.mount(<SectionHeader title="Section A" variant="navy" />);
    cy.contains("Section A").should("exist");
  });
});
`,
  },
  {
    segment: "editorial",
    name: "CategoryTags",
    spec: `import { CategoryTags } from "@/components/editorial/CategoryTags";
import { categoryFixture } from "./CategoryTags.fixtures";

describe("<CategoryTags />", () => {
  it("shows Featured when there are no categories", () => {
    cy.mount(<CategoryTags categories={[]} />);
    cy.contains("Featured").should("exist");
  });

  it("renders primary and secondary labels", () => {
    cy.mount(
      <CategoryTags categories={[categoryFixture({ name: "Alpha" }), categoryFixture({ name: "Beta", id: "2", slug: "beta" })]} />,
    );
    cy.contains("Alpha").should("exist");
    cy.contains("Beta").should("exist");
  });
});
`,
  },
];

for (const c of COMPONENTS) {
  const rel = path.join(c.segment, c.name);
  writeFile(rel, `${c.name}.fixtures.ts`, fixturesTs(c.name));
  writeFile(rel, `${c.name}.cy.tsx`, c.spec);
}

console.log(
  `Wrote ${COMPONENTS.length} generated component test folders (plus hand-maintained home/FeaturedMediaGrid and contentful/PreviewModeBannerUI).`,
);
