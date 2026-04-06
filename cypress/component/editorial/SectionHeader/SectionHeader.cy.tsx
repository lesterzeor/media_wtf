import { SectionHeader } from "@/components/editorial/SectionHeader";

describe("<SectionHeader />", () => {
  it("renders the title with variant styling", () => {
    cy.mount(<SectionHeader title="Section A" variant="navy" />);
    cy.contains("Section A").should("exist");
  });
});

