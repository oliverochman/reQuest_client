describe("Users", () => {
  describe("cannot navigate directly to their 'reQuests' page", () => {
    it("without first clicking 'my reQuest'", () => {
      cy.stubMain()
      cy.login()
      cy.get("#requests-link").should("not.exist")
    })
  })

  describe("cannot navigate to 'myRequest' if not logged in", () => {
    it("but are redirected to login page instead", () => {
      cy.stubMain()
      cy.visit("/")
      cy.get("#myrequest-home-link").click()
      cy.get("#requests-link").should("not.exist")
      cy.get("#login-form").should("be.visible")
    })
  })

  describe("can, by navigating to 'my reQuest' and then 'reQuests'", () => {
    beforeEach(() => {
      cy.stubMain()
      cy.route({
        method: 'GET',
<<<<<<< HEAD
        url: '**/my_request/requests',
        response: 'fixture:list_of_my_requests.json',
=======
        url: '**/my_requests/requests',
        response: 'fixture:requests/list_of_my_requests.json',
>>>>>>> 026fc7a9a80a68b68f3e732125a4129cdafde643
        headers: {
          uid: "me@mail.com",
        },
      })  
      cy.route({
        method: 'GET',
<<<<<<< HEAD
        url: '**/my_request/requests/1',
        response: 'fixture:view_specific_request_with_offers.json',
=======
        url: '**/my_requests/requests/1',
        response: 'fixture:requests/view_specific_request_with_offers.json',
>>>>>>> 026fc7a9a80a68b68f3e732125a4129cdafde643
        headers: {
          uid: "me@mail.com",
        },
      })  
      cy.route({
        method: 'GET',
<<<<<<< HEAD
        url: '**/my_request/requests/2',
        response: 'fixture:view_another_specific_request_with_offers.json',
=======
        url: '**/my_requests/requests/2',
        response: 'fixture:requests/view_another_specific_request_with_offers.json',
>>>>>>> 026fc7a9a80a68b68f3e732125a4129cdafde643
        headers: {
          uid: "me@mail.com",
        },
      })
      cy.login()  
      cy.get("#myrequest-home-link").click()
      cy.get("#requests-link").click()
    })

    it("view their reQuest list, excl. description and offers", () => {
      cy.get("#request-1").should("be.visible")
      cy.get("#request-2").should("be.visible")
      cy.get("#request-3").should("be.visible")
      cy.get("#request-description-1").should("not.exist")
      cy.get("#offer-1").should("not.exist")
    })
    
    it("click on a reQuest to view its description and offers", () => {
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