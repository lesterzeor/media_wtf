import { MainLayout } from "@/components/layout/MainLayout";

describe("<MainLayout />", () => {
  it("renders skip link, main landmark, and nested children", () => {
    cy.mount(
      <MainLayout>
        <p>Layout child</p>
      </MainLayout>,
    );
    cy.get('a[href="#main-content"]').should("contain.text", "Skip to main content");
    cy.get("#main-content").should("contain.text", "Layout child");
  });
});

