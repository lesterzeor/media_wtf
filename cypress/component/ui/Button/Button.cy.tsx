import { Button } from "@/components/ui/Button";

describe("<Button />", () => {
  it("renders a link with href", () => {
    cy.mount(<Button href="/articles">Read more</Button>);
    cy.get('a[href="/articles"]').should("contain.text", "Read more");
  });
});

