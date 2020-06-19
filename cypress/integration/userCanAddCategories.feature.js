describe("User can add categories to request", () => {
  beforeEach(() => {
    cy.server();

  });

  describe("with valid credentials", () => {
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
        url: "**/requests",
        response: "fixture:post_new_request.json",
        headers: {
          uid: "user@mail.com",
        },
      })
      it("and add category to new reQuest creation form", () => {
        cy.get("#myrequest-home-link").click();
        cy.get("#requests-link").click()
        cy.get("#create-request-link").click();
        cy.get("#title").type("Fix my bike");
        cy.get("#category").click();
        cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
        cy.get("#reward").type("100");
      })
     
  
  }
  )
}
)}
)
