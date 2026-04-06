import { ArticleMetaLine } from "@/components/home/ArticleMetaLine";
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

