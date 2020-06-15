Cypress.Commands.add("stubMain", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/quests",
    response: "fixture:list_of_quests.json",
  });
});
