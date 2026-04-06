import { FeaturedHero } from "@/components/editorial/FeaturedHero";
import { articleFixture } from "./FeaturedHero.fixtures";

describe("<FeaturedHero />", () => {
  it("shows placeholder when no article", () => {
    cy.mount(<FeaturedHero article={null} />);
    cy.contains("Add a published article").should("exist");
  });

  it("renders hero link when article exists", () => {
    cy.mount(<FeaturedHero article={articleFixture({ slug: "fh-1", title: "Hero story" })} />);
    cy.get('a[href="/articles/fh-1"]').should("contain.text", "Hero story");
  });
});

