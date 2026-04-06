import { ArticleThumb } from "@/components/home/ArticleThumb";
import { contentImageFixture } from "./ArticleThumb.fixtures";

describe("<ArticleThumb />", () => {
  it("renders an image with alt text", () => {
    cy.mount(
      <ArticleThumb image={contentImageFixture()} alt="Thumb alt" size="sm" />,
    );
    cy.get('img[alt="Thumb alt"]').should("exist");
  });
});

