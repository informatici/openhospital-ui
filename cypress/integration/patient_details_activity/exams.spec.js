const API_BASE_PATH = Cypress.env("API_BASE_PATH");
const HOSTNAME = Cypress.env("HOSTNAME");
const START_PATH = `${HOSTNAME}/details/1`;

describe.skip("Patient Details / Exams", () => {
  before(() => {
    cy.authenticate(START_PATH);
  });

  it("should render the ui", () => {
    cy.get("[class=patientDetails]");
  });

  it("should have a menu item for Exams", () => {
    cy.get("[class='patientDetails__main_menu']").contains("Exams:").click();
  });

  it("should make it possible for the user to fill out the form to create a new exam", () => {
    cy.get("[id='date']").focus().type("02022022").blur();
    cy.get("[id='exam']").focus().type("1.3 Differential").blur();
    cy.get("[id='material']").focus().type("angal.lab.blood").blur();
    cy.get("[id='result']").focus().type("POSITIVE").blur();
    cy.get("[id='note']").focus().type("note").blur();
  });

  it("should display an error dialog if the exam creation call fails", () => {
    cy.intercept("POST", `${API_BASE_PATH}/laboratories`, {
      statusCode: 400,
    }).as("postLaboratories");

    cy.get("[class='submit_button']").click();

    cy.wait("@postLaboratories");

    cy.get("div.infoBox").should("have.class", "error");
  });

  it("should display a dialog confirming the exam creation when the call is successful", () => {
    cy.intercept("POST", `${API_BASE_PATH}/laboratories`, {
      statusCode: 201,
    }).as("postLaboratories");

    cy.get("[class='submit_button']").click();

    cy.wait("@postLaboratories");

    cy.get("div.dialog__title").contains("Patient exam added");
    cy.get("div.return_button").click();
  });
});
