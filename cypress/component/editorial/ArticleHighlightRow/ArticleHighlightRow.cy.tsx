import { ArticleHighlightRow } from "@/components/editorial/ArticleHighlightRow";
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

