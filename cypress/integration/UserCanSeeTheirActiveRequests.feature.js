describe('User can see their active requests', () => {
  beforeEach(() => {
    cy.stubMain()
    cy.login()
    cy.get("#myrequest-home-link").click()
    cy.get("#requests-link").click()
    cy.route({
      method: "GET",
      url: "**/my_request/requests",
      response: "fixture:list_of_my_requests.json",
      headers: {
        uid: "me@mail.com",
      },
    })
  });

  it('User can navigate to active requests', () => {
    cy.get('#active').click();
    cy.get('#middle-component').should('contain', 'whateverisinthefixture'),
  });


})
