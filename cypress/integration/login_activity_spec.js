const START_PATH = "http://localhost:3000/login";

describe("LoginActivity spec", () => {
  it("should render the ui", () => {
    cy.visit(START_PATH);
    cy.get("[class=login__panel]");
  });

  it("should validate the username input", () => {
    cy.get("[id=username]").focus().clear().blur();
    cy.get("[class=login__panel]").contains("Enter a valid user name");

    cy.get("[id=username]").focus().type("hribeiro").blur();
    cy.get("[class=login__panel]").should(
      "not.contain",
      "Enter a valid user name"
    );
  });

  it("should validate the password input", () => {
    cy.get("[id=password]").focus().clear().blur();
    cy.get("[class=login__panel]").contains("Enter the password");

    cy.get("[id=password]").focus().type("123456789").blur();
    cy.get("[class=login__panel]").should("not.contain", "Enter the password");
  });

  it("should toggle the password visibility", () => {
    cy.get("[id=password]").clear().type("thisisapassword");

    cy.get("[class=login__passwordToggler]").click();
    cy.get("[id=password]").then(($input) => {
      expect($input.attr("type")).equal("text");
    });

    cy.get("[class=login__passwordToggler]").click();
    cy.get("[id=password]").then(($input) => {
      expect($input.attr("type")).equal("password");
    });
  });

  it("should have username and password input fields and a submit button when on login mode", () => {
    cy.get("[id=username]");
    cy.get("[id=password]");
    cy.get("[class=login__panel]").contains("LOG IN");
  });

  // Waiting to be implemented
  it.skip("should have username input field and a submit button when on resetPassword mode", () => {
    cy.contains("Forgot the password?").click();
    cy.get("[id=username]");
    cy.get("[id=password]").should("not.exist");
    cy.get("[class=send-request]");
  });

  // Waiting to be implemented
  it.skip("should have a link that toggles the central panel to the resetPassword mode", () => {
    cy.get("[class=password-reset]").click();
    cy.get("[class=login__panel]").contains("RESET PASSWORD");
  });

  // Waiting to be implemented
  it.skip("should have a “back” button that toggles the central panel to the login mode", () => {
    cy.get("[class=back]").click();
    cy.get("[class=login__panel]").contains("SIGN IN");
  });

  // Waiting to be implemented
  it.skip("should reset the activity state to login mode after submitting the resetPassword’s email input", () => {
    cy.get("[class=password-reset]").click();
    cy.get("[id=username]").focus().type("username").blur();
    cy.get("[class=send-request]").click();
    cy.get("[class=login__panel]").contains("SIGN IN");
  });

  it("should change the activity when credentials are valid and submit button's clicked", () => {
    cy.get("[id=username]").focus().clear().type("hribeiro").blur();
    cy.get("[id=password]").focus().clear().type("123456789").blur();

    cy.contains("LOG IN").click();

    cy.wait(500);
    cy.url().should("include", "/dashboard");
  });
});
