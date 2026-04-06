import { NewsletterSignup } from "@/components/home/NewsletterSignup";

describe("<NewsletterSignup />", () => {
  it("renders labeled fields and submit", () => {
    cy.mount(<NewsletterSignup idPrefix="ct-test" />);
    cy.get('label[for="ct-test-name"]').should("exist");
    cy.get('label[for="ct-test-email"]').should("exist");
    cy.get('button[type="submit"]').should("contain.text", "Subscribe");
  });
});

