describe("can log in", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/auth/*",
      response: "fixture:user/successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/auth/*",
      response: "fixture:user/successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "DELETE",
      url: "**/auth/*",
      response: "fixture:user/logout.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/karma_points*",
      response: { karma: 500 },
      headers: {
        uid: "user@mail.com",
      },
    });
  });
  it("Successfully", () => {
    cy.visit("/login");
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("#submit-btn").contains("Submit").click();
    });
  });
});
describe("unsuccessfully", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/auth/*",
      response: "fixture:user/unsuccessful_login.json",
      headers: {
        uid: "user@mail.com",
      },
      status: 400,
    });
  });
  it("with invalid credentials", () => {
    cy.visit("/login");
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#error-message").should("contain","Invalid login credentials. Please try again.");
    });
  });
});
