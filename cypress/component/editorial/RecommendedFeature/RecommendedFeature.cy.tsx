import { RecommendedFeature } from "@/components/editorial/RecommendedFeature";
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

