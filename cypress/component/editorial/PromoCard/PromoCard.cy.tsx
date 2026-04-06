import { PromoCard } from "@/components/editorial/PromoCard";

describe("<PromoCard />", () => {
  it("renders spotlight copy and browse link", () => {
    cy.mount(<PromoCard />);
    cy.contains("Spotlight").should("exist");
    cy.get('a[href="/articles"]').should("contain.text", "Browse articles");
  });
});

