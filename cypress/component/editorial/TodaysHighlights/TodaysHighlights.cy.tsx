import { TodaysHighlights } from "@/components/editorial/TodaysHighlights";
import { articleFixture } from "./TodaysHighlights.fixtures";

describe("<TodaysHighlights />", () => {
  it("shows empty state when there are no articles", () => {
    cy.mount(<TodaysHighlights articles={[]} />);
    cy.contains("No articles yet").should("exist");
  });

  it("renders highlight rows when articles exist", () => {
    cy.mount(<TodaysHighlights articles={[articleFixture({ title: "Highlight A" })]} />);
    cy.contains("Today's highlights").should("exist");
    cy.contains("Highlight A").should("exist");
  });
});

