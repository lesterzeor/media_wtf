import { RichText } from "@/components/content/RichText";
import { minimalRichTextDocument } from "./RichText.fixtures";

describe("<RichText />", () => {
  it("renders paragraph content from a Contentful document", () => {
    cy.mount(<RichText document={minimalRichTextDocument()} />);
    cy.get(".article-body").should("contain.text", "Body paragraph for tests.");
  });
});

