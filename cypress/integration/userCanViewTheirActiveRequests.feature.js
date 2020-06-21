describe('User can view their active reQuests', () => {
  beforeEach(() => {
    cy.stubMain()
    cy.route({
      method: "GET",
      url: "**/my_request/requests*",
      response: "fixture:requests/list_of_my_requests.json",
      headers: {
        uid: "me@mail.com",
      },
    })
    cy.route({
      method: "GET",
      url: "**/my_request/requests/5",
      response: "fixture:requests/active_specific_request_with_offer.json",
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
    cy.get("#request-5").within(() => {
      cy.get(".header").should('contain', 'Fix the fixtures in the app')
    })
    cy.get("#request-6").within(() => {
      cy.get(".header").should('contain', 'Copy fixtures and then copy them again')
    })
  });

  it("can view a specific reQuest", () => {
    cy.get("#active-link").click()
    cy.get("#request-5").click()
    cy.get("#request-description-5").should("be.visible")
    cy.get('.helper-email-36').click();
    cy.get("#offer-message").should("contain", 
      "I can help you with this, and I'm probably the first to offer my help")
  })
})
