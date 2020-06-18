describe("Requested can mark a request as completed", () => {
  beforeEach(() => {
    cy.stubMain();
    cy.login();
    cy.get("#myrequest-home-link").click();
    cy.get("#requests-link").click();
  });
  it("should have a quest completed button", () => {
    cy.get("#active").click();
    cy.get("#quest-completed").should("exist");
  });
});
