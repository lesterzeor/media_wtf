import { HomeScrollToTop } from "@/components/home/HomeScrollToTop";

describe("<HomeScrollToTop />", () => {
  it("renders no visible output", () => {
    cy.mount(
      <div data-cy-wrapper>
        <HomeScrollToTop />
      </div>,
    );
    cy.get("[data-cy-wrapper]").should("be.empty");
  });
});

