const stubLocation = require("../support/stubLocation");

describe("Visitor can view all listed requests", () => {
  beforeEach(() => {
    cy.stubMain();
  });
  it("reQuests are shown", () => {
    cy.visit("/", stubLocation({ latitude: 57.71, longitude: 11.97 }));
    cy.get("#request-1").within(() => {
      cy.get("div.header").should("contain", "Change to winter tires");
    });

    cy.get("#request-2").within(() => {
      cy.get(".header").should("contain", "Paint fences in backyard");
    });
  });
});
