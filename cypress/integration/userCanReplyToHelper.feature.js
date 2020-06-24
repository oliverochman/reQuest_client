describe("User can", () => {
  beforeEach(() => {
    cy.server();
    cy.stubMain();
    cy.route({
      method: "GET",
      url: "**/my_request/requests",
      response: "fixture:requests/list_of_my_requests.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/karma_points*",
      response: { karma_points: 50 },
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/my_request/requests/5",
      response: "fixture:offers/offer_with_conversation.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "POST",
      url: "**/message*",
      response: {},
      status: 201,
      headers: {
        uid: "user@mail.com",
      },
    });
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
      const lastMessage = ".s1117201058"
      cy.get("button#quest-reply").should("be.visible").click();
      cy.get("#send-message-form").should("be.visible");
      cy.get("#replyMessage").type("Can you swing by this weekend?");
      cy.get("#send-chat-message").click();
      cy.wait(1000);
      cy.get(lastMessage).should("contain", "Can you swing by this weekend?");
    });
  });
});
