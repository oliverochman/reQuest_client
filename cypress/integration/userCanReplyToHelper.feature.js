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
      response: "fixture:offers/offerConversation.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "POST",
      url: "**/offers/5/messages",
      response: {
        message: {
          me: true,
          content: "what I just posted",
        },
      },
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
      cy.get("button#quest-reply").should("be.visible").click();
      cy.get("#send-message-form").should("be.visible");
      cy.get("#replyMessage").type("Can you swing by this weekend?");
      cy.get("#send-chat-message").click();
      cy.wait(1000);
      cy.get(".my-bubble").should("be.visible");
      cy.get("#replyMessage").type(
        "Or just looked at the calendar, will sunday at noon fit?"
      );
      cy.get("#send-chat-message").click();
      cy.get("#close-messages").click();
      cy.get(".my-bubble").should("not.be.visible");
    });
  });
});
