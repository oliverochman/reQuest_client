describe("User can offer help", () => {
  beforeEach(() => {
    cy.server();
    cy.login();
    cy.stubMainLoggedIn();
    cy.get("#request-1").within(() => {
      cy.get(".header").should("contain", "Change to winter tires").click();
    });
    cy.get("#selected-title").contains("Change to winter tires");
    cy.get("#contact-button").click();
  });

  describe("sucessfully ", () => {
    beforeEach(() => {
      cy.stubMainLoggedIn();
      cy.route({
        method: "POST",
        url: "**/offers",
        response: { message: "Your offer has been sent!" },
        headers: {
          uid: "user@mail.com",
        },
      });
    });
    it(" message is shown", () => {
      cy.get("#offerMessage")
        .should("be.visible")
        .type(
          "Im so handy. I have been handy my hole carrerier. I can do anything with silver tejp. Ready when you have time. // MacGyver"
        );
      cy.wait(1000);
      cy.get("button#message-send-btn").click();
      cy.get("p#message").should("contain", "Your offer has been sent!");
    });
  });
  describe("unsucessfully ", () => {
    beforeEach(() => {
      cy.stubMainLoggedIn();
      cy.route({
        method: "POST",
        url: "**/offers",
        response: { message: "Your offer has been sent!" },
        headers: {
          uid: "user@mail.com",
        },
      });
    });
    it(" message is shown", () => {
      cy.get("#offerMessage").should("be.visible");
      cy.get("#offerMessage").then(($message) => {
        expect($message[0].validationMessage).to.eq(
          "Please fill out this field."
        );
      });
    });
  });
});
