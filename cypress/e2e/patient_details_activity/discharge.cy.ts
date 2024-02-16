describe("Patient Details / Discharge", () => {
  before(() => {
    cy.authenticate(`${Cypress.env("HOSTNAME")}/patients/details/1`);
  });

  it("should render the ui", () => {
    cy.get("[class=patientDetails]");
  });

  it("should have a menu item for discharge", () => {
    cy.get("[class='patientDetails__main_menu']")
      .contains("Discharge:")
      .click();
  });

  it("Should make it possible for the user to fill out the form to discharge the patient", () => {
    cy.get("[id=disDate]").focus().type("03052022").blur();
    cy.get("[id=disType]").focus().type("NORMALE").blur();
    cy.get("[id=diseaseOut1]").focus().type("Abortions").blur();
    cy.get("[id=note]").focus().clear().type("fail").blur();
  });

  it("should display an error info box if the patient discharging fails", () => {
    cy.get("[class='submit_button']").click();

    cy.get("div.infoBox").should("have.class", "error");
  });

  it("should show a confirmation dialog if the patient discharging succeeds", () => {
    cy.get("[id=note]").focus().clear().type("success").blur();
    cy.get("[class='submit_button']").click();
    cy.get("div.infoBox").should("not.exist");
    cy.get("div.dialog__title").contains("Patient discharged");
    cy.get("[class='return_button']").click();
  });
});
