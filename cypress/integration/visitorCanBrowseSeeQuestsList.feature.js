describe("Visitor can view all listed quests", () => {
  beforeEach(() => {
    cy.stubMain();
  });
  it("Quests are shown", () => {
    cy.visit("/");
    cy.get("#quest-1").within(() => {
      cy.get(".header").should("contain", "Change to winter tires");
    });

    cy.get("#quest-2").within(() => {
      cy.get(".header").should("contain", "Paint fences in backyard");
    });
  });
});
