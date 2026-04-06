import { MustSeeSection } from "@/components/home/MustSeeSection";
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

