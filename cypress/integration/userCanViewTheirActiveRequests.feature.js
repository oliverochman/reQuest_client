describe('User can view their active reQuests', () => {
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
    cy.route({
      method: "GET",
      url: "**/my_request/requests/2",
      response: "fixture:active_specific_request_with_offer.json"
    })
  });

  it('in a list, by navigating to "active reQuests"', () => {
    cy.get('#active-link').click();
    cy.get("#request-1").should('contain', 'Paint fences in backyard')
  });

  it("can view a specific reQuest", () => {
    cy.get("#active-link").click()
    cy.get("#request-1").click()
    cy.get("#request-description-1").should("be.visible")
    cy.get("#request-offer-1").should("be.visible")
  })
})
