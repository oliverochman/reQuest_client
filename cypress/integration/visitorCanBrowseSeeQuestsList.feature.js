describe("Visitor can view all listed quests", () => {
  beforeEach(() => {
    cy.stubMain();
  });
  it("Quests are shown", () => {
    cy.get("#quest-1").should("contain", "Change to winter tires");
    cy.get("#quest-2").should("contain", "Paint fences around backyard");
  });
});
