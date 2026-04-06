import { BackToTop } from "@/components/ui/BackToTop";

describe("<BackToTop />", () => {
  it("renders a control with an accessible name", () => {
    cy.mount(<BackToTop />);
    cy.get("button").should("have.attr", "aria-label", "Back to top");
  });
});

