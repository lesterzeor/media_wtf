import { AdSlot } from "@/components/ui/AdSlot";

describe("<AdSlot />", () => {
  it("renders a slot marker for the given region", () => {
    cy.mount(<AdSlot slot="sidebar" />);
    cy.get("[data-ad-slot=sidebar]").should("exist");
  });
});

