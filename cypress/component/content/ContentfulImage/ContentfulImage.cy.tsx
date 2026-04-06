import { ContentfulImage } from "@/components/content/ContentfulImage";
import { contentImageFixture } from "./ContentfulImage.fixtures";

describe("<ContentfulImage />", () => {
  it("renders a fixed-size image", () => {
    cy.mount(<ContentfulImage image={contentImageFixture()} />);
    cy.get("img").should("have.attr", "alt", "Test image description");
  });

  it("supports fill mode inside a relative parent", () => {
    cy.mount(
      <div className="relative h-32 w-full">
        <ContentfulImage image={contentImageFixture()} fill sizes="100vw" />
      </div>,
    );
    cy.get("img").should("exist");
  });
});

