describe("User can offer help", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/offers",
      response: { message: "Your offer has been sent!" },
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.login();
    cy.stubMainLoggedIn();
  });

  describe("sucessfully ", () => {
    beforeEach(() => {
      cy.StubRequestPendingOffer();
      cy.get("#request-1").within(() => {
        cy.get(".header").should("contain", "Change to winter tires").click();
      });
      cy.get("#selected-title").contains("Change to winter tires");
      cy.get("#contact-button").click();
      cy.get("#offerMessage")
        .should("be.visible")
        .type(
          "Im so handy. I have been handy my hole carrerier. I can do anything with silver tejp. Ready when you have time. // MacGyver"
        );
    });
    it(" message is shown", () => {
      cy.get("button#message-send-btn").contains("Send").click();
      cy.wait(3000);
      cy.get("p#message").should("contain", "Your offer has been sent!");
    });
  });
});
