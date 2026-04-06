import { AdRegion } from "@/components/ui/AdRegion";

describe("<AdRegion />", () => {
  it("renders a placeholder region outside production", () => {
    cy.mount(<AdRegion region="in-content" />);
    cy.get('[role="region"]').should("exist");
  });
});

