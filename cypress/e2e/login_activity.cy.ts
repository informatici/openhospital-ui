describe("LoginActivity spec", () => {
  it("should render the ui", () => {
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(w) {
        w.sessionStorage.clear();
      },
    });
    cy.dataCy("login-panel");
  });

  it("should validate the username input", () => {
    cy.byId("username").focus().clear().blur();
    cy.dataCy("login-panel").contains("Insert a valid username");
    cy.byId("username").focus().type("hribeiro").blur();
    cy.dataCy("login-panel").should("not.contain", "Insert a valid username");
  });

  it("should validate the password input", () => {
    cy.byId("password").focus().clear().blur();
    cy.dataCy("login-panel").contains("Insert the password");
    cy.byId("password").focus().type("123456789").blur();
    cy.dataCy("login-panel").should("not.contain", "Insert the password");
  });

  it("should toggle the password visibility", () => {
    cy.byId("password").clear().type("thisisapassword");

    cy.get("[class=login__passwordToggler]").click();
    cy.byId("password").then(($input) => {
      expect($input.attr("type")).equal("text");
    });

    cy.get("[class=login__passwordToggler]").click();
    cy.byId("password").then(($input) => {
      expect($input.attr("type")).equal("password");
    });
  });

  it("should have username and password input fields and a submit button when on login mode", () => {
    cy.byId("username");
    cy.byId("password");
    cy.get(".login__buttonContainer button");
  });

  // Waiting to be implemented
  it.skip("should have username input field and a submit button when on resetPassword mode", () => {
    cy.contains("Forgot the password?").click();
    cy.byId("username");
    cy.byId("password").should("not.exist");
    cy.get("[class=send-request]");
  });

  // Waiting to be implemented
  it.skip("should have a link that toggles the central panel to the resetPassword mode", () => {
    cy.get("[class=password-reset]").click();
    cy.dataCy("login-panel").contains("RESET PASSWORD");
  });

  // Waiting to be implemented
  it.skip("should have a “back” button that toggles the central panel to the login mode", () => {
    cy.get("[class=back]").click();
    cy.dataCy("login-panel").contains("SIGN IN");
  });

  // Waiting to be implemented
  it.skip("should reset the activity state to login mode after submitting the resetPassword’s username input", () => {
    cy.get("[class=password-reset]").click();
    cy.byId("username").focus().type("username").blur();
    cy.get("[class=send-request]").click();
    cy.dataCy("login-panel").contains("SIGN IN");
  });

  it("should alert the user of invalid credentials", () => {
    cy.byId("username").focus().clear().type("fail").blur();
    cy.byId("password").focus().clear().type("123456789").blur();

    cy.get(".login__buttonContainer button").click();

    cy.dataCy("login-invalid-credentials").should("not.have.class", "hidden");
  });

  it("should change the activity when credentials are valid and submit button's clicked", () => {
    cy.byId("username").focus().clear().type("hribeiro").blur();
    cy.byId("password").focus().clear().type("123456789").blur();

    cy.get(".login__buttonContainer button").click();

    cy.dataCy("dashboard");
  });
  it("should display the logout confirmation when the logout icon is clicked", () => {
    //If the reduce menu icon is present, open the menu page and click on signout icon
    // else click directly on the signout icon

    cy.byId("signout_icon").click();

    //check if the confirmation dialog is rendered
    cy.get(".MuiDialog-paper");
    //dismiss the confirmation dialog
    cy.get(".dialog__content .dialog__buttonSet .reset_button button").click();

    //close the menu page if present
    if (cy.dataCy("app-header-identified-trigger"))
      cy.dataCy("app-header-identified-trigger").click();

    //check if the dashbaord is rendered
    cy.dataCy("dashboard");
  });
  it("should display the login page when the logout is confirmed on the dialog", () => {
    //If the reduce menu icon is present, open the menu page and click on signout icon
    // else click directly on the signout icon
    if (cy.dataCy("app-header-identified-trigger")) {
      cy.dataCy("app-header-identified-trigger").click();
      cy.byId("signout_icon").click();
    } else {
      cy.byId("signout_icon").click();
    }
    //validate the signout action
    cy.get(".dialog__content .dialog__buttonSet .return_button button").click();

    //check if the login page is displayed
    cy.dataCy("login-panel");
  });
});
