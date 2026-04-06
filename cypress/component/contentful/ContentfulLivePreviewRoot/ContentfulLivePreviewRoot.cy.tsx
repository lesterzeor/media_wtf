import { ContentfulLivePreviewRoot } from "@/components/contentful/ContentfulLivePreviewRoot";

describe("<ContentfulLivePreviewRoot />", () => {
  it("renders children when preview is disabled", () => {
    cy.mount(
      <ContentfulLivePreviewRoot enabled={false} spaceId="" environment="master" locale="en-US">
        <span>App content</span>
      </ContentfulLivePreviewRoot>,
    );
    cy.contains("App content").should("exist");
  });
});

