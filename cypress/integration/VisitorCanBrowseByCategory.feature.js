describe("Visitor can browse by category", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/")
  });

  it("and they should all be visible", () => {
    cy.get("#categories").within(() => {
      cy.get("#home").should("be.visible")
    cy.get("#education").should("be.visible")
    cy.get("#it").should("be.visible")
    cy.get("#vehicles").should("be.visible")
    cy.get("#others").should("be.visible")
    })
    
  });

  it("and they should be clickable", () => {
    cy.get("#home").click()
    cy.get("#education").click()
  });

  //it("but only existing categories", () => {
    //cy.get("cleaning").should("not exist")
  //})
})
