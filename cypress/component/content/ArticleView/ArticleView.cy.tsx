import { ArticleView } from "@/components/content/ArticleView";
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

