import { HomeSectionHeader } from "@/components/home/HomeSectionHeader";

describe("<HomeSectionHeader />", () => {
  it("renders ribbon and badge variants as headings", () => {
    cy.mount(
      <div>
        <HomeSectionHeader title="Ribbon title" variant="ribbon" />
        <HomeSectionHeader title="Badge title" variant="badge" />
      </div>,
    );
    cy.get("h2").should("contain.text", "Ribbon title");
    cy.get("h2").should("contain.text", "Badge title");
  });
});

