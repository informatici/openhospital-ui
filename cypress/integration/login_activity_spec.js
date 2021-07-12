const START_PATH = "http://localhost:3000/";

describe("LoginActivity spec", () => {
  it("should render the ui", () => {
    cy.visit(START_PATH, {
      onBeforeLoad(w) {
        w.sessionStorage.clear();
      },
    });
    cy.get("[class=login__panel]");
  });

  it("should validate the username input", () => {
    cy.get("[id=username]").focus().clear().blur();
    cy.get("[class=login__panel]").contains("Insert a valid user name");
    cy.get("[id=username]").focus().type("hribeiro").blur();
    cy.get("[class=login__panel]").should(
      "not.contain",
      "Insert a valid user name"
    );
  });

  it("should validate the password input", () => {
    cy.get("[id=password]").focus().clear().blur();
    cy.get("[class=login__panel]").contains("Insert the password");
    cy.get("[id=password]").focus().type("123456789").blur();
    cy.get("[class=login__panel]").should("not.contain", "Insert the password");
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
    cy.get(".login__buttonContainer button");
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

  it("should alert the user of invalid credentials", () => {
    cy.get("[id=username]").focus().clear().type("fail").blur();
    cy.get("[id=password]").focus().clear().type("123456789").blur();

    cy.get(".login__buttonContainer button").click();

    cy.get("div.login__invalidCredentials").should("not.have.class", "hidden");
  });

  it("should change the activity when credentials are valid and submit button's clicked", () => {
    cy.get("[id=username]").focus().clear().type("hribeiro").blur();
    cy.get("[id=password]").focus().clear().type("123456789").blur();

    cy.get(".login__buttonContainer button").click();

    cy.get("div.dashboard");
  });
  it("should display the logout confirmation when the logout icon is clicked", () => {
    //If the reduce menu icon is present, open the menu page and click on signout icon
    // else click directly on the signout icon 
    
      cy.get("[id=signout_icon]").click();
    
    //check if the confirmation dialog is rendered
    cy.get(".MuiDialog-paper");
    //dismiss the confirmation dialog
    cy.get(".dialog__content .dialog__buttonSet .reset_button button").click();

    //close the menu page if present
    if (cy.get("[class=appHeader__identified__trigger]"))
      cy.get("[class=appHeader__identified__trigger]").click();

    //check if the dashbaord is rendered
    cy.get("div.dashboard");

  });
  it("should display the login page when the logout is confirmed on the dialog", () => {
    //If the reduce menu icon is present, open the menu page and click on signout icon
    // else click directly on the signout icon
    if (cy.get("[class=appHeader__identified__trigger]")) {
      cy.get("[class=appHeader__identified__trigger]").click();
      cy.get("[id=signout_icon]").click();
    } else {
      cy.get("[id=signout_icon]").click();
    }
    //validate the signout action
    cy.get(".dialog__content .dialog__buttonSet .return_button button").click();

    //check if the login page is displayed
    cy.get("[class=login__panel]")

  });
});
