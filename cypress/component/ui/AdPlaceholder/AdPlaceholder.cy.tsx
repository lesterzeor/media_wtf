import { AdPlaceholder } from "@/components/ui/AdPlaceholder";

describe("<AdPlaceholder />", () => {
  it("renders labeled dimensions and advertisement copy", () => {
    cy.mount(<AdPlaceholder width={300} height={250} />);
    cy.get('[role="region"]').should("have.attr", "aria-label", "Advertisement placeholder 300×250");
    cy.contains("Advertisement").should("exist");
    cy.contains("300×250").should("exist");
  });
});

