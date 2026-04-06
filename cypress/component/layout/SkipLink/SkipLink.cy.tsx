import { SkipLink } from "@/components/layout/SkipLink";

describe("<SkipLink />", () => {
  it("renders a skip link to main content", () => {
    cy.mount(<SkipLink />);
    cy.get('a[href="#main-content"]').should("contain.text", "Skip to main content");
  });
});

