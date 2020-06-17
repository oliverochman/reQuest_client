describe("Visitor can view details of a specific request", () => {
  beforeEach(() => {
    cy.stubMain();
    cy.visit("/");
  });

  it("a request can be viewed", () => {
    cy.get("#request-1").click()
    cy.get("#selected-request").within(() => {
      cy.get("#selected-header").should("contain", "Change to winter tires");
      cy.get("#selected-description").should("contain", "Need a hand with tyres")
      cy.get("#selected-requester").should("contain", "someone1@email.com")
      cy.get("button").should("be.enabled")
    });
  });

  it('a request can have contact button disabled', () => {
    cy.get("#request-2").click()
    cy.get("#selected-request").within(() => {
      cy.get("#selected-header").should("contain", "Paint fences in backyard");
      cy.get("#selected-description").should("contain", "Need a hand with painting")
      cy.get("#selected-requester").should("contain", "someone2@email.com")
      cy.get("button").should("be.disabled")
    });
  });

  it('a button should not exist when visitor is browsing', () => {
    cy.get("#request-4").click()
    cy.get("#selected-request").within(() => {
      cy.get("button").should("not.exist")
    })
  })
});
