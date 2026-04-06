import { FeaturedMediaGrid } from "@/components/home/FeaturedMediaGrid";
import { articleFixture } from "./FeaturedMediaGrid.fixtures";

describe("<FeaturedMediaGrid />", () => {
  it("renders nothing when there are no articles to show", () => {
    cy.mount(<FeaturedMediaGrid articles={[]} />);
    cy.get("section").should("not.exist");
  });

  it("renders the featured region with an accessible name", () => {
    const articles = [articleFixture({ title: "Lead story", slug: "lead" })];
    cy.mount(<FeaturedMediaGrid articles={articles} />);
    cy.get('section[aria-label="Featured stories"]').should("exist");
  });

  it("links the large tile to the first article", () => {
    const articles = [articleFixture({ slug: "first-slot", title: "First headline" })];
    cy.mount(<FeaturedMediaGrid articles={articles} />);
    cy.get('a[href="/articles/first-slot"]').should("contain.text", "First headline");
  });

  it("shows four grid slots with Coming soon when only one article is provided", () => {
    cy.mount(<FeaturedMediaGrid articles={[articleFixture({ title: "Only one" })]} />);
    cy.get("section p").then(($ps) => {
      const comingSoon = [...$ps].filter((p) => p.textContent?.trim() === "Coming soon");
      expect(comingSoon).to.have.length(4);
    });
  });

  it("renders up to five article links in Contentful order", () => {
    const articles = [
      articleFixture({ id: "1", slug: "a", title: "Alpha" }),
      articleFixture({ id: "2", slug: "b", title: "Bravo" }),
      articleFixture({ id: "3", slug: "c", title: "Charlie" }),
      articleFixture({ id: "4", slug: "d", title: "Delta" }),
      articleFixture({ id: "5", slug: "e", title: "Echo" }),
    ];
    cy.mount(<FeaturedMediaGrid articles={articles} />);
    cy.get('a[href="/articles/a"]').should("contain.text", "Alpha");
    cy.get('a[href="/articles/b"]').should("contain.text", "Bravo");
    cy.get('a[href="/articles/c"]').should("contain.text", "Charlie");
    cy.get('a[href="/articles/d"]').should("contain.text", "Delta");
    cy.get('a[href="/articles/e"]').should("contain.text", "Echo");
  });
});
