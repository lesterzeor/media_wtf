import { HotSection } from "@/components/home/HotSection";
import { articleFixture } from "./HotSection.fixtures";

describe("<HotSection />", () => {
  it("shows empty guidance when there is no article", () => {
    cy.mount(<HotSection article={null} />);
    cy.contains("Hot article").should("exist");
  });

  it("renders the article title and link when provided", () => {
    const article = articleFixture({ title: "Hot title", slug: "hot-slug" });
    cy.mount(<HotSection article={article} />);
    cy.get('a[href="/articles/hot-slug"]').should("contain.text", "Hot title");
  });
});

