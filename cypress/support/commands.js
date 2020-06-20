Cypress.Commands.add("stubMain", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/requests",
    response: "fixture:requests/list_of_requests_visitor.json",
  });
});

Cypress.Commands.add("stubMainLoggedIn", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/requests",
    response: "fixture:requests/list_of_requests.json",
  });
});

Cypress.Commands.add("login", () => {
  cy.route({
    method: "POST",
    url: "**/auth/*",
    response: "fixture:user/successful_login.json",
    headers: {
      uid: "user@mail.com",
    },
  });
  cy.route({
    method: "GET",
    url: "**/auth/*",
    response: "fixture:user/successful_login.json",
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
})
