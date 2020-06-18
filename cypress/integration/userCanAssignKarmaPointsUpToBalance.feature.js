describe("User can assign Karma Points to the extent of their balance", () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });

  describe("points are successfullly deducted on submission of form", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "**/karma_points*",
        response: { karma_points: 500 },
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "POST",
        url: "**/requests",
        response: "fixture:post_new_request.json",
        headers: {
          uid: "user@mail.com",
        },
      });
    });

    it("successfully creates", () => {
      cy.get("#myrequest-home-link").click();
      cy.get("#requests-link").click()
      cy.get("#create-request-link").click();
      cy.get("#title").type("Fix my bike");
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
      cy.get("#reward").type("100");
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#message").should(
        "contain",
        "Your reQuest was successfully created!"
      );
    });
  });

  describe("unsuccessfully", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "**/karma_points*",
        response: { karma_points: 500 },
        headers: {
          uid: "user@mail.com",
        },
      });
    });

    it("unsuccessfully creates due to lack of karma points", () => {
      cy.get("#myrequest-home-link").click();
      cy.get("#requests-link").click()
      cy.get("#create-request-link").click();
      cy.get("#title").type("Fix my bike");
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
      cy.get("#reward")
        .type("600")
        .then(($input) => {
          expect($input[0].validationMessage).to.eq(
            "Value must be less than or equal to 500."
          );
        });
    });
  });
});
