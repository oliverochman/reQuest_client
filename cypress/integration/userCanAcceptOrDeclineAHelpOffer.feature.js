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
      url: "**/my_requests/requests/1",
      response: "fixture:view_specific_request_with_offers.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/my_requests/requests/2",
      response: "fixture:view_another_specific_request_with_offers.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.get("#myrequest-home-link").click();
    cy.get("#requests-link").click();
    cy.get("#request-1").click();
  });

  describe("click on any offer", () => {
    it("to display more information about it", () => {
      // cy.get("#offer-message").should("not.exist");
      cy.get("#offer-1").within(() => {
        cy.get("#helper-email").should("be.visible");
      });
      cy.get("#helper-email").click();
      cy.get("#helper-message").should("be.visible");
      cy.get("button#accept").should("be.visible");
      cy.get("button#decline").should("be.visible");
    });
  });

  xdescribe("successfully accept a help offer by clicking 'Accept'", () => {
    beforeEach(() => {
      cy.get("#request-1").within(() => {
        cy.get("#offer-1").within(() => {
          cy.get("button#accept").contains("Accept").click();
        });
      });
    });

    it("and sees a success message", () => {
      cy.get("#accept-message").should(
        "contain",
        "You have accepted help from helper@mail.com"
      );
    });

    it("and the other offers disappears", () => {
      cy.get("#request-1").within(() => {
        cy.get("#offer-2").should("not.exist");
      });
    });

    it("and the buttons disappears", () => {
      cy.get("button#accept").should("not.exist");
      cy.get("button#decline").should("not.exist");
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
        "You have declined help from helper@mail.com"
      );
    });

    it("and the declined offer disappears", () => {
      cy.get("#request-1").within(() => {
        cy.get("#offer-1").should("not.exist");
      });
    });
  });
});
