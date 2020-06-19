describe("User can", () => {
  beforeEach(() => {
    cy.stubMain();
    cy.login();
    cy.route({
      method: "GET",
      url: "**/my_requests/requests",
      response: "fixture:list_of_my_requests.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/my_requests/requests/2",
      response: "fixture:view_specific_request_with_offers.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/my_requests/requests/1",
      response: "fixture:view_specific_request_with_pending_offers.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "PUT",
      url: "**/offers",
      response: "fixture:putOffer_accepted.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.get("#myrequest-home-link").click();
    cy.get("#requests-link").click();
    cy.get("#request-1").click();
  });

  describe("successfully accept a help offer by clicking 'Accept'", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "**/my_requests/requests",
        response: "fixture:view_specific_request_with_updated_offers.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.get("#helper-message").should("not.be.visible");
      cy.get("#offer-1").within(() => {
        cy.get(".helper-email-1").should("be.visible");
      });

      cy.get(".helper-email-1").click();
      cy.get("button#accepted").should("be.visible");
      cy.get("button#declined").should("be.visible");
      cy.get("button#accepted").contains("Accept").click();
    });

    it("success message is shown", () => {
      cy.get("#accept-message").should(
        "contain",
        "You accepted help from helper@mail.com"
      );
    });

    it("the offers disappears from pending", () => {
      cy.get("#offer-1").should("not.exist");
    });
  });

  xdescribe("successfully decline a help offer by clicking 'Decline'", () => {
    beforeEach(() => {
      cy.get("#request-1").within(() => {
        cy.get("#offer-1").within(() => {
          cy.get("button#accept").contains("Decline").click();
        });
      });
    });

    it("and sees a success message", () => {
      cy.get("#decline-message").should(
        "contain",
        "You declined help from helper@mail.com"
      );
    });

    it("and the declined offer disappears", () => {
      cy.get("#request-1").within(() => {
        cy.get("#offer-1").should("not.exist");
      });
    });
  });
});
