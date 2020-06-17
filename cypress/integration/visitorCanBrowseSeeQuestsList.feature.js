describe("Visitor can view all listed requests", () => {
  beforeEach(() => {
    cy.stubMainPage();
  });
  it("reQuests are shown", () => {
    cy.visit("/");
    cy.get("#request-1").within(() => {
      cy.get(".header").should("contain", "Change to winter tires");
    });

    cy.get("#request-2").within(() => {
      cy.get(".header").should("contain", "Paint fences in backyard");
    });
  });
});
