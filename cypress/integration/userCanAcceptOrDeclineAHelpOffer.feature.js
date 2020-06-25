describe("User can", () => {
  beforeEach(() => {
    cy.stubMain();
    cy.route({
      method: "GET",
      url: "**/karma_points*",
      response: { karma_points: 50 },
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.StubRequestPendingOffer();
  });
  describe("successfully accept a help offer by clicking 'Accept'", () => {
    beforeEach(() => {
      cy.login();
      cy.wait(1500);
      cy.get("#myrequest-home-link").click();
      cy.wait(1500);
      cy.get("#requests-link").click();
      cy.get("#request-1").click();
    });

    it("can view a message", () => {
      cy.get("#helper-message").should("not.be.visible");
      cy.get("#offer-1").within(() => {
        cy.get(".helper-email-1").should("be.visible");
      });
      cy.get(".helper-email-1").click();
      cy.get("button#accepted").should("be.visible");
      cy.get("button#declined").should("be.visible");
      cy.wait(1000);
    });

    it("success message is shown and it disapers from pending", () => {
      cy.StubRequestUpdatedOffer();
      cy.get(".helper-email-1").click();
      cy.get("button#accepted").contains("Accept").click();
      cy.get("p#status-message").contains(
        "You accepted help from helper@mail.com"
      );
      cy.get(".helper-email-2").should("be.visible");
      cy.get(".helper-email-1").should("not.be.visible");
    });
  });

  describe.only("successfully decline a help offer by clicking 'Decline'", () => {
    beforeEach(() => {
      cy.StubRequestPendingOffer();
      cy.login();
      cy.wait(1500);
      cy.get("#myrequest-home-link").click();
      cy.wait(1500);
      cy.get("#requests-link").click();
      cy.get("#request-1").click();
      cy.get("#helper-message").should("not.be.visible");
      cy.get("#offer-2").within(() => {
        cy.get(".helper-email-2").should("be.visible").click();
      });
      cy.get("button#declined").should("be.visible");
      cy.wait(1000);
    });

    it("and sees a decline success message", () => {
      cy.StubRequestUpdatedOffer();
      cy.route({
        method: "PUT",
        url: "**/offers/*",
        response: "fixture:offers/putOffer_declined.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.get("button#declined").contains("Decline").click();
      cy.get("p#status-message").contains(
        "You declined help from helper@mail.com"
      );
      cy.get(".helper-email-1").should("not.be.visible");
    });
  });
});
