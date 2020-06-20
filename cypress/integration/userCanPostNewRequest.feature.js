describe("User", () => {
  beforeEach(() => {
    cy.server();
    cy.login()
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
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(2)").click();
      cy.get("#reward").type("100");
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#message").should(
        "contain",
        "Your reQuest was successfully created!"
      );
      cy.get("#logout").click();
    });
  
  it("the input fields are cleared on submission", () => {
    cy.get("#myrequest-home-link").click();
      cy.get("#requests-link").click()
      cy.get("#create-request-link").click();
      cy.get("#title").type("Fix my bike");
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(2)").click();
      cy.get("#reward").type("100");
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#message").should(
        "contain",
        "Your reQuest was successfully created!"
      );
      cy.get("#title").should("not.have.value", "Fix my bike");
      cy.get("#description").should("not.have.value", "I cant ride my bike, HILFE, hilfe, pronto!");
      cy.wait(3000);
      cy.get("#message").should("not.be.visible");

    })
  });

  