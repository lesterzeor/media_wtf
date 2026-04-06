import { PreviewModeBannerUI } from "@/components/contentful/PreviewModeBannerUI";

describe("<PreviewModeBannerUI />", () => {
  it("renders preview status and exit control", () => {
    cy.mount(<PreviewModeBannerUI />);
    cy.get('[role="status"]').should("contain.text", "Contentful preview");
    cy.get('a[href="/api/disable-draft"]').should("contain.text", "Exit preview");
  });
});
