describe("User can see their current karma points", () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });
  it("should display users current karma points in header", () => {
    cy.get("#myrequest-home-link").click();
    cy.get("#requests-link").click();
    cy.get("#points-display").should("exist");
    cy.get("#karma-points-amount").should("contain", "100p");
  });
});
