describe("User can offer help", () => {
  beforeEach(() => {
    cy.server();
    cy.login();
    cy.stubMainLoggedIn();
    cy.route({
      method: "POST",
      url: "**/my_request/requests",
      response: "fixture:requests/post_new_request.json",
      headers: {
        uid: "user@mail.com",
      },
    });
  });

  describe("send message to reQuester", () => {
    it("helper can pick a reQuest", () => {
      cy.get("#request-1").within(() => {
        cy.get(".header").should("contain", "Change to winter tires").click();
      });
      cy.get("#selected-title").contains("Change to winter tires");
      cy.get("#contact-button").click();
      cy.get("#request-2").should("not.be.visible");
      cy.get("#message-area").should("be.visible");
    });
  });
});
