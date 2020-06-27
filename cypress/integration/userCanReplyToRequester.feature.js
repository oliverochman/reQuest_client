describe("User can reply to requester", () => {
  beforeEach(() => {
    cy.server();
    cy.stubMain();
    cy.route({
      method: "GET",
      url: "**/my_request/quests",
      response: "fixture:quests/list_of_user_quests.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/karma_points*",
      response: { karma_points: 50 },
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/my_request/quests/287",
      response: "fixture:quests/single_pending_quest.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/my_request/quests/289",
      response: "fixture:quests/single_active_quest.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/my_request/quests/285",
      response: "fixture:quests/single_completed_quest.json",
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
        uid: "me@mail.com",
      },
    });
  });

  describe("Helper can successfully", () => {
    beforeEach(() => {
      cy.login();
      cy.wait(1500);
      cy.get("#myrequest-home-link").click();
      cy.wait(1500);
      cy.get("#quests-link").click();
    });

    describe("on pending quests", () => {
      beforeEach(() => {
        cy.get("#pending-link").click()
        cy.get("#request-287").click()
      })

      it("see requester email", () => {
        cy.get("#conversation > .content > .meta").should(
          "contain",
          "requester@mail.com"
        );
      })

      it("view messages", () => {
        cy.get(".my-bubble").last().should("contain", "Today is fine // helper")
      });

      it("send a reply", () => {
        cy.get("#send-message-form").should("not.be.visible");
        cy.get("button#quest-reply").click();
        cy.get("#send-message-form").should("be.visible");
        cy.get("#message-text").type("I'd like to come today");
        cy.get("#send-chat-message").click();
        cy.wait(1000);
        cy.get(".my-bubble").last().should(
          "contain",
          "I'd like to come today"
        );
      });

      it("not see any irrelevant buttons", () => {
        cy.get("#accept-button").should("not.exist")
        cy.get("button#quest-completed").should("not.exist");
      })
    });
    
    describe("on active quests", () => {
      beforeEach(() => {
        cy.get("#active-link").click()
        cy.get("#request-289").click()
      })

      it("see requester email", () => {
        cy.get("#conversation > .content > .meta").should(
          "contain",
          "requester@mail.com"
        );
      })

      it("view messages", () => {
        cy.get(".your-bubble").last().should("contain", "Settled // requester")
      });

      it("send a reply", () => {
        cy.get("button#quest-reply").click();
        cy.get("#message-text").type("Nice");
        cy.get("#send-chat-message").click();
        cy.wait(1000);
        cy.get(".my-bubble").last().should(
          "contain",
          "Nice"
        );
      });

      it("not see any irrelevant buttons", () => {
        cy.get("#accept-button").should("not.exist")
        cy.get("button#quest-completed").should("not.exist");
      })
    });

    describe("on completed quests", () => {
      beforeEach(() => {
        cy.get("#completed-link").click()
        cy.get("#request-285").click()
      })

      it("see requester email", () => {
        cy.get("#conversation > .content > .meta").should(
          "contain",
          "requester@mail.com"
        );
      })

      it("view messages", () => {
        cy.get(".your-bubble").last().should("contain", "It was valuable // requester")
      });

      it("send a reply", () => {
        cy.get("button#quest-reply").click();
        cy.get("#message-text").type("You're welcome");
        cy.get("#send-chat-message").click();
        cy.wait(1000);
        cy.get(".my-bubble").last().should(
          "contain",
          "You're welcome"
        );
      });

      it("not see any irrelevant buttons", () => {
        cy.get("#accept-button").should("not.exist")
        cy.get("button#quest-completed").should("not.exist");
      })
    });
  });
});
