const HOSTNAME = Cypress.env("HOSTNAME");
const START_PATH = `${HOSTNAME}/patients/details/1`;

describe("Patient Details / Exams", () => {
  before(() => {
    cy.authenticate(START_PATH);
  });

  it("should render the ui", () => {
    cy.get("[class=patientDetails]");
  });

  it("should have a menu item for Exams", () => {
    cy.get("[class='patientDetails__main_menu']")
      .contains("Laboratory:")
      .click();
  });

  it("should make it possible for the user to fill out the form to create a new exam", () => {
    cy.get("[id='examDate']").focus().type("02022022").blur();
    cy.get("[id='exam']").focus().type("1.3 Differential").blur();
    cy.get("[id='material']").focus().type("angal.lab.blood").blur();
    cy.get("[id='result']").focus().type("POSITIVE").blur();
    cy.get("[id='note']").focus().type("note").blur();
  });

  it("should display an error info box if the exam creation call fails", () => {
    cy.get("[id='note']").focus().clear().type("ERROR").blur();

    cy.get("[class='submit_button']").click();

    cy.get("div.infoBox").should("have.class", "error");
  });

  it("should display a dialog confirming the exam creation when the call is successful", () => {
    cy.get("[id='note']")
      .focus()
      .clear()
      .type("This is the note of a valid form")
      .blur();

    cy.get("[class='submit_button']").click();

    cy.get("div.infoBox").should("not.exist");

    cy.get("div.dialog__title").contains("Patient exam added");
    cy.get("div.return_button").click();
  });
});
