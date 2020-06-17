Cypress.Commands.add("stubMain", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/requests",
    response: "fixture:list_of_requests_visitor.json",
  });
});

Cypress.Commands.add("stubMainLoggedIn", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/requests",
    response: "fixture:list_of_requests.json",
  });
});

Cypress.Commands.add("login", () => {
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
    cy.visit("/login");
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("Button#submit").contains("Submit").click();
    });
})
