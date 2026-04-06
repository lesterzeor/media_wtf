import { EditorialHeroImage } from "@/components/editorial/EditorialHeroImage";
import { contentImageFixture } from "./EditorialHeroImage.fixtures";

describe("<EditorialHeroImage />", () => {
  it("fills a relative container", () => {
    cy.mount(
      <div className="relative h-48 w-full">
        <EditorialHeroImage image={contentImageFixture()} />
      </div>,
    );
    cy.get("img").should("have.attr", "alt", "Test image description");
  });
});

