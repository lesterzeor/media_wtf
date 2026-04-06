import { SubscribeSidebar } from "@/components/home/SubscribeSidebar";

describe("<SubscribeSidebar />", () => {
  it("renders subscribe section and form fields", () => {
    cy.mount(<SubscribeSidebar />);
    cy.get("h2").should("contain.text", "Subscribe");
    cy.get('input[type="email"]').should("exist");
  });
});

