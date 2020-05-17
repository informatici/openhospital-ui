describe("LoginActivity spec", () => {
  it("should render the ui", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("[name=central-panel]");
  });
  it("should validate the username input", () => {
    cy.get("[name=username]")
      .focus()
      .clear()
      .blur()
      .should("have.class", "invalid");
    cy.get("[name=username]")
      .focus()
      .type("a")
      .blur()
      .should("not.have.class", "invalid");
  });
  it("should validate the password input", () => {
    cy.get("[name=password]")
      .focus()
      .clear()
      .blur()
      .should("have.class", "invalid");
    cy.get("[name=password]")
      .focus()
      .type("a")
      .blur()
      .should("not.have.class", "invalid");
  });
  it("should toggle the password visibility", () => {
    cy.get("[name=password-toggler]").click();
    cy.get("[name=password]").should("have.class", "visible");
    cy.get("[name=password-visibility-toggler]").click();
    cy.get("[name=password]").should("have.class", "invisible");
  });
  it("should have a login and resetPassword mode", () => {
    it("should have username and password input fields and a submit button when on login mode", () => {
      cy.get("[name=username]");
      cy.get("[name=password]");
      cy.get("[name=sign-in]");
    });
    it("should have username input field and a submit button when on resetPassword mode", () => {
      cy.get("[name=password-reset]").click();
      cy.get("[name=username]");
      cy.get("[name=password]").should("not.exist");
      cy.get("[name=send-request]");
    });
  });
  it("should have a link that toggles the central panel to the resetPassword mode", () => {
    cy.get("[name=password-reset]").click();
    cy.get("[name=central-panel]").contains("RESET PASSWORD");
  });
  it("should have a “back” button that toggles the central panel to the login mode", () => {
    cy.get("[name=back]").click();
    cy.get("[name=central-panel]").contains("SIGN IN");
  });
  it("should reset the activity state to login mode after submitting the resetPassword’s email input", () => {
    cy.get("[name=password-reset]").click();
    cy.get("[name=username]").focus().type("username").blur();
    cy.get("[name=send-request]").click();
    cy.get("[name=central-panel]").contains("SIGN IN");
  });
});
