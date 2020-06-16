describe("Users", () => {
  beforeEach(() => {
    cy.stubMainPage()
    cy.login()
  })

  describe("cannot navigate directly to their 'reQuests' page", () => {
    it("without first clicking 'my reQuest'", () => {
      cy.get("requests-link").should("not.exist")
    })
  })

  describe("can, by navigating to 'my reQuest' and then 'reQuests'", () => {
    beforeEach(() => {
      cy.get("myrequest-link").click()
      cy.get("requests-link").click()
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
      cy.get("#request-description-1").should("be.visible")
      cy.get("#offer-1").should("be.visible")
    })
  })
})