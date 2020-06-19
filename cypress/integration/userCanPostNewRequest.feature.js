describe("User", () => {
  beforeEach(() => {
    cy.server();
  });

  describe("can log in", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "**/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "GET",
        url: "**/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "POST",
        url: "**/my_request/requests",
        response: "fixture:post_new_request.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "DELETE",
        url: "**/auth/*",
        response: "fixture:logout.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "GET",
        url: "**/karma_points*",
        response: { karma: 500 },
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.visit("/login");
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("#submit-btn").contains("Submit").click();
      });
    });

    it("successfully", () => {
      cy.get("p").should("contain", "user@mail.com");
    })

    it("and post new reQuest after navigating to creation form", () => {
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
      cy.get("#logout").click();
    });
  });

  describe("unsuccessfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "**/auth/*",
        response: "fixture:unsuccessful_login.json",
        headers: {
          uid: "user@mail.com",
        },
        status: 400,
      });
      cy.visit("/login");
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("wrongpassword");
        cy.get("#submit-btn").contains("Submit").click();
      });
    });
    it("with invalid credentials", () => {
      cy.get("#error-message").should(
        "contain",
        "Invalid login credentials. Please try again."
      );
    });
  });
});
