import { Navbar } from "@/components/layout/Navbar";

describe("<Navbar />", () => {
  it("renders the home link with accessible site name", () => {
    cy.mount(<Navbar />);
    cy.get('a[href="/"]').should("exist");
    cy.contains("span.sr-only", "MediaWTF").should("exist");
  });
});

