describe("Visitor can browse by category", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/")
  });

  it("and they should all be visible", () => {
    cy.get("#Home").should("be visible")
    cy.get("#Education").should("be visible")
    cy.get("#IT").should("be visible")
    cy.get("#Vehicles").should("be visible")
    cy.get("#Others").should("be visible")
  });

  it("and they should be clickable", () => {
    cy.get("#Home").click()
    cy.get("#Education").click()
  });

  it("but only existing categories", () => {
    cy.get("cleaning").should("not exist")
  })
})
