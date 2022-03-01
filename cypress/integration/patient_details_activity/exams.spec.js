const START_PATH = "http://localhost:3000/details/1";

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

  it("should make it possible for the use to fill out the form to add a new exam", () => {
    cy.get("[id='date']").focus().type("02022022").blur();
    cy.get("[id='exam']").focus().type("1.3 Differential").blur();
    cy.get("[id='material']").focus().type("angal.lab.blood").blur();
    cy.get("[id='panel1bh-header']").click();
    cy.get("[class='PrivateSwitchBase-input-8']").first().click();
    cy.get("[id='note']").focus().type("note").blur();

    cy.get("[class='submit_button']").click();
  });
});
