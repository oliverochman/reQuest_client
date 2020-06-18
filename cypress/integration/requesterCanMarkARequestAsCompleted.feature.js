describe("Requested can mark a request as completed", () => {
  beforeEach(() => {
    cy.stubMain();
    cy.route({
      method: 'GET',
      url: '**/my_requests/requests',
      response: 'fixture:list_of_my_requests.json',
      headers: {
        uid: "me@mail.com",
      },
    })  
    
    cy.login();
    cy.get("#myrequest-home-link").click();
    cy.get("#requests-link").click();
  });
  it("should have a quest completed button", () => {
    cy.server()
    cy.route({
      method: "GET",
      url: "**/my_requests/requests",
      response: "fixture:active_specific_request_with_offer.json",
      headers: {
        uid: "me@mail.com",
      },
    });
    cy.get("#active").click();
    cy.wait(1000)
    cy.get("#my-list").should("contain", "Change to winter tires");
    cy.get("#quest-completed").should("exist");
  });
  it("should change the request to completed", () => {});
});
