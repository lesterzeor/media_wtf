import { AdSenseDisplayUnit } from "@/components/ui/AdSenseDisplayUnit";

describe("<AdSenseDisplayUnit />", () => {
  it("renders nothing when AdSense client id is not configured", () => {
    cy.mount(<AdSenseDisplayUnit adSlot="123456" />);
    cy.get("ins.adsbygoogle").should("not.exist");
  });
});

