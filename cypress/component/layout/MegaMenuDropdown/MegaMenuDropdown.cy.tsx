import { MegaMenuDropdown } from "@/components/layout/MegaMenuDropdown";
import { NAV_ITEMS } from "@/config/site";

describe("<MegaMenuDropdown />", () => {
  it("renders column titles and links from mega menu data", () => {
    const data = NAV_ITEMS[0]?.megaMenu;
    if (!data) {
      throw new Error("NAV_ITEMS[0].megaMenu must exist for this test");
    }
    cy.mount(<MegaMenuDropdown data={data} />);
    cy.contains("h3", data.columns[0].title).should("exist");
    cy.get("a").should("have.length.at.least", 2);
  });
});

