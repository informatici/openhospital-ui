describe("Patient Details / Discharge", () => {
  before(() => {
    cy.authenticate(`${Cypress.env("HOSTNAME")}/patients/details/1`);
  });

  it("should render the ui", () => {
    cy.dataCy("patient-details");
  });

  it("should have a menu item for discharge", () => {
    cy.dataCy("patient-details-main-menu").contains("Discharge:").click();
  });

  it("Should make it possible for the user to fill out the form to discharge the patient", () => {
    cy.byId("disDate").focus().type("03052022").blur();
    cy.byId("disType").focus().type("NORMALE").blur();
    cy.byId("diseaseOut1").focus().type("Abortions").blur();
    cy.byId("note").focus().clear().type("fail").blur();
  });

  it("should display an error info box if the patient discharging fails", () => {
    cy.get("[class='submit_button']").click();

    cy.dataCy("info-box").should("have.class", "error");
  });

  it("should show a confirmation dialog if the patient discharging succeeds", () => {
    cy.byId("note").focus().clear().type("success").blur();
    cy.get("[class='submit_button']").click();
    cy.dataCy("info-box").should("not.exist");
    cy.dataCy("dialog-title").contains("Patient discharged");
    cy.dataCy("dialog-return-button").click();
  });
});
