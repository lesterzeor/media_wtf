import { RecommendedSidebarSection } from "@/components/home/RecommendedSidebarSection";
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

