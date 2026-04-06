import { Card } from "@/components/ui/Card";
import { articleFixture } from "./Card.fixtures";

describe("<Card />", () => {
  it("renders title link and article structure", () => {
    cy.mount(<Card article={articleFixture({ title: "Card item", slug: "card-slug" })} />);
    cy.get("article").should("exist");
    cy.get('a[href="/articles/card-slug"]').should("contain.text", "Card item");
  });
});

