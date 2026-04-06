import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { articleFixture } from "./FeaturedArticle.fixtures";

describe("<FeaturedArticle />", () => {
  it("renders featured article headline and link", () => {
    const article = articleFixture({ slug: "fa-1", title: "Featured headline" });
    cy.mount(<FeaturedArticle article={article} />);
    cy.get('a[href="/articles/fa-1"]').should("contain.text", "Featured headline");
    cy.contains("Featured").should("exist");
  });
});

