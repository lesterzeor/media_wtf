import { TrendingSection } from "@/components/home/TrendingSection";
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

