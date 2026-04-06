import { Footer } from "@/components/layout/Footer";

describe("<Footer />", () => {
  it("renders footer navigation with an articles link", () => {
    cy.mount(<Footer />);
    cy.get('nav[aria-label="Footer"]').find("a").should("have.attr", "href", "/articles");
  });
});

