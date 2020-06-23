describe("User can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/karma_points*",
      response: { karma_points: 50 },
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.stubMain();
    cy.StubRequestUpdatedOffer();
  });
  describe("successfully reply message'", () => {
    beforeEach(() => {
      cy.login();
      cy.get("#myrequest-home-link").click();
      cy.wait(500);
      cy.get("#requests-link").click();
      cy.get("#active-link").click();
      cy.get("#request-5").click();
    });

    it("can view a message", () => {
      cy.get("#helper-message").should("not.be.visible");
      cy.get("#offer-1").within(() => {
        cy.get(".helper-email-5").should("be.visible");
      });
      cy.get(".helper-email-1").click();
      cy.get("button#accepted").should("be.visible");
      cy.get("button#declined").should("be.visible");
      cy.wait(1000);
    });

    it("success message is shown", () => {
      cy.get(".helper-email-1").click();
      cy.get("button#quest-reply").contains("Accept").click();
      cy.get("#helper-message").should("not.be.visible");
    });
  });
});
