describe("User can add categories to request", () => {
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
    })
  });

  it("and add category to new reQuest creation form", () => {
    cy.get("#myrequest-home-link").click();
    cy.wait(1000)
    cy.get("#requests-link").click()
    cy.get("#create-request-link").click();
    cy.get("#title").type("Fix my bike");
    cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
    cy.get("#reward").type("100");
    cy.get("#category").click();
    cy.get("#category > .visible > :nth-child(2)").click();
    cy.get("#submit-btn").contains("Submit").click();
});
    
    
  })

  