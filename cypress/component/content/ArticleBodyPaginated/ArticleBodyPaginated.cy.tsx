import { ArticleBodyPaginated } from "@/components/content/ArticleBodyPaginated";
import { minimalRichTextDocument } from "./ArticleBodyPaginated.fixtures";

describe("<ArticleBodyPaginated />", () => {
  it("renders article body text", () => {
    cy.mount(<ArticleBodyPaginated body={{ json: minimalRichTextDocument() }} />);
    cy.contains("Body paragraph for tests.").should("exist");
  });
});

