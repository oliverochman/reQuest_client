describe("Users", () => {
  beforeEach(() => {
    cy.stubMainPage()
    cy.login()
  })

  xdescribe("cannot navigate directly to their 'reQuests' page", () => {
    it("without first clicking 'my reQuest'", () => {
      cy.get("#requests-link").should("not.exist")
    })
  })

  describe("can, by navigating to 'my reQuest' and then 'reQuests'", () => {
    beforeEach(() => {
      cy.route({
        method: 'GET',
        url: '**/my_requests/requests',
        response: 'fixture:list_of_my_requests.json',
        headers: {
          uid: "me@mail.com",
        },
      })  
      cy.route({
        method: 'GET',
        url: '**/my_requests/requests/1',
        response: 'fixture:view_specific_request_with_offers.json',
        headers: {
          uid: "me@mail.com",
        },
      })  
      cy.route({
        method: 'GET',
        url: '**/my_requests/requests/2',
        response: 'fixture:view_another_specific_request_with_offers.json',
        headers: {
          uid: "me@mail.com",
        },
      })  
      cy.get("#myrequest-home-link").click()
      cy.get("#requests-link").click()
    })

    xit("view their reQuest list, excl. description and offers", () => {
      cy.get("#request-1").should("be.visible")
      cy.get("#request-2").should("be.visible")
      cy.get("#request-3").should("be.visible")
      cy.get("#request-description-1").should("not.exist")
      cy.get("#offer-1").should("not.exist")
    })
    
    xit("click on a reQuest to view its description and offers", () => {
      cy.get("#request-1").click()
      cy.get("#request-description-1").should("contain", "I need help, really need help changing tyres.")
      cy.get("#offer-1").within(() => {
        cy.get("#offer-message").should("contain", "I can help you with this")
        cy.get("#offer-email").should("contain", "helper@mail.com")
      })
    })

    it("click on it again to hide description and offers", () => {
      cy.get("#request-1").click()
      cy.wait(500)
      cy.get("#request-1").click()
      cy.get("#request-description-1").should("not.exist")
      cy.get("#offer-1").should("not.exist")
    })

    it("click on another reQuest to expand that one instead", () => {
      cy.get("#request-1").click()
      cy.wait(500)
      cy.get("#request-2").click()
      cy.get("#request-description-1").should("not.exist")
      cy.get("#offer-1").within(() => {
        cy.get("#offer-message").should("not.contain", "I can help you with this")
      })
      cy.get("#request-description-2").should("be.visible")
      cy.get("#offer-1").within(() => {
        cy.get("#offer-message").should("contain", "I can do this for you")
      })
    })
  })
})