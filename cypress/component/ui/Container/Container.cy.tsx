import { Container } from "@/components/ui/Container";

describe("<Container />", () => {
  it("renders children inside a centered wrapper", () => {
    cy.mount(
      <Container wide>
        <p>Inside container</p>
      </Container>,
    );
    cy.contains("Inside container").should("exist");
    cy.get(".max-w-7xl").should("exist");
  });
});

