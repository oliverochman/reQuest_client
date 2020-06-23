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
    cy.route({
      method: "POST",
      url: "**/offers/1/messages",
      response: "fixture:offers/offerConversation.json",
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

    it("can view messages", () => {
      cy.get("#helper-message").should("not.be.visible");
      cy.get("#offers > .cards > .ui > .content > .meta").should(
        "contain",
        "helper@mail.com"
      );
      cy.get("button#quest-completed").should("be.visible");
      cy.get("button#quest-reply").should("be.visible");
    });

    it("can send a reply message", () => {
      cy.get("button#quest-reply").should("be.visible").click();
      cy.get("#send-message-form").should("be.visible");
      cy.get("#replyMessage").type("Can you swing by this weekend?");
      cy.wait(1000);
      cy.get("#message-send-btn").click();
      cy.get("#helper-message").should("be.visible");
    });
  });
});
