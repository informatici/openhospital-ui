const HOSTNAME = Cypress.env("HOSTNAME");
const START_PATH_INPATIENT = `${HOSTNAME}/patients/details/2`;
const START_PATH_OUTPATIENT = `${HOSTNAME}/patients/details/1234563`;

//both inpatient and out-patient used the same opd form now!
describe.skip("Patient Details / Visit - Inpatient", () => {
  before(() => {
    cy.authenticate(START_PATH_INPATIENT);
  });

  it("should render the ui", () => {
    cy.get("[class=patientDetails]");
  });

  it("should have a menu item for visits", () => {
    cy.get("[class='patientDetails__main_menu']").contains("Visits:").click();
  });

  it("Should make it possible for the user to fill out the form to add a new visit for an inpatient", () => {
    cy.get("[id=ward]").focus().type("FEMALE WARDS").blur();
    cy.get("[id=date]").focus().type("03052022").blur();
    cy.get("[id=duration]").focus().type("100").blur();
    cy.get("[id=service]").focus().type("Some service").blur();
  });

  it.skip("should display an error info box if the visit creation fails", () => {
    cy.get("[class='submit_button']").click();

    cy.get("div.infoBox").should("have.class", "error");
  });

  it.skip("should show confirmation dialog if the visit creation succeeds", () => {
    cy.get("[id=duration]").focus().clear().type("40").blur();
    cy.get("[class='submit_button']").click();
    cy.get("div.infoBox").should("not.exist");
    cy.get("div.dialog__title").contains("Visit created");
    cy.get("[class='return_button']").click();
  });
});

describe("Patient Details / Visit - Outpatient", () => {
  before(() => {
    cy.authenticate(START_PATH_OUTPATIENT);
  });

  it("should render the ui", () => {
    cy.get("[class=patientDetails]");
  });

  it("should have a menu item for visits", () => {
    cy.get("[class='patientDetails__main_menu']").contains("Visits:").click();
  });

  it("Should make it possible for the user to fill out the form to add a new visit for an outpatient", () => {
    cy.get("[id=date]").focus().type("01012021").blur();
    cy.get("[id=disease]").focus().type("Abortions").blur();
    cy.get("[id=note]").focus().type("fail").blur();
  });

  it.skip("should display an error info box if the visit creation fails", () => {
    cy.get("[class='submit_button']").click();

    cy.get("div.infoBox").should("have.class", "error");
  });

  it.skip("should show confirmation dialog if the visit creation succeeds", () => {
    cy.get("[id=note]").focus().clear().type("succeed").blur();
    cy.get("[class='submit_button']").click();
    cy.get("div.infoBox").should("not.exist");
    cy.get("div.dialog__title").contains("Opd Created");
    cy.get("[class='return_button']").click();
  });
});
