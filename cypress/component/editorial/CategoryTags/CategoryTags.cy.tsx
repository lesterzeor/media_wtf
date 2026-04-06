import { CategoryTags } from "@/components/editorial/CategoryTags";
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

