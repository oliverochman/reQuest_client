describe('User can view their active reQuests', () => {
  beforeEach(() => {
    cy.stubMain()
    cy.route({
      method: "GET",
      url: "**/my_request/requests*",
      response: "fixture:list_of_my_requests.json",
      headers: {
        uid: "me@mail.com",
      },
    })
    cy.route({
      method: "GET",
      url: "**/my_request/requests/2",
      response: "fixture:active_specific_request_with_offer.json",
      headers: {
        uid: "me@mail.com",
      },
    })
    cy.login()
    cy.get("#myrequest-home-link").click()
    cy.get("#requests-link").click()
  });

  it('in a list, by navigating to "active reQuests"', () => {
    cy.get('#active-link').click();
    cy.get("#request-2").within(() => {
      cy.get(".header").should('contain', 'Paint fences in backyard')
    })
    cy.get("#request-3").within(() => {
      cy.get(".header").should('contain', 'Paint pictures for Michelangelo')
    })
  });

  it("can view a specific reQuest", () => {
    cy.get("#active-link").click()
    cy.get("#request-2").click()
    cy.get("#request-description-2").should("be.visible")
    cy.get("#offer-message").should("contain", 
      "I can help you with this, and I'm probably the first to offer my help")
  })
})
