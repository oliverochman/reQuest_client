describe("Visitor can browse by category", () => {
  beforeEach(() => {
    cy.server();
    cy.stubMain();
    cy.route({
      method: "GET",
      url: "**/requests",
      response: "fixture:requests/list_of_requests_visitor.json",
    });
    cy.visit("/");
  });

  it("and they should all be visible", () => {
    cy.get("#categories").within(() => {
      cy.get("#home").should("be.visible");
      cy.get("#education").should("be.visible");
      cy.get("#it").should("be.visible");
      cy.get("#vehicles").should("be.visible");
      cy.get("#others").should("be.visible");
    });
  });

  it("and they should be clickable", () => {
    cy.get("#home").click();
    cy.get("#education").click();
  });
  it("click home successfully", () => {
    cy.route({
      method: "GET",
      url: "**/requests",
      response: "fixture:requests/list_of_requests_visitor.json",
    });
    cy.get("#home").click();
    cy.get("#request-2").should("be.visible");
    cy.get("#request-8").should("be.visible");
    cy.get("#request-9").should("be.visible");
    cy.get("#request-6").should("be.visible");
    cy.get("#request-5").should("be.visible");
    cy.get("#request-1").should("not.be.visible");
    cy.get("#request-4").should("not.be.visible");
  });
  it("click education successfully", () => {
    cy.route({
      method: "GET",
      url: "**/requests",
      response: "fixture:requests/list_of_requests_visitor_2.json",
    });
    cy.get("#education").click();
    cy.get("#request-4").should("be.visible");
    cy.get("#request-7").should("be.visible");
    cy.get("#request-8").should("not.be.visible");
    cy.get("#request-6").should("not.be.visible");
  });
});
