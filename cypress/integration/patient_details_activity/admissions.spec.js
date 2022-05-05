const HOSTNAME = Cypress.env("HOSTNAME");
const START_PATH_INPATIENT = `${HOSTNAME}/patients/details/1`;
const START_PATH_OUTPATIENT = `${HOSTNAME}/patients/details/1234563`;

describe("Patient Details / Admissions / Inpatient", () => {
  before(() => {
    cy.authenticate(START_PATH_INPATIENT);
  });

  it("should render the ui", () => {
    cy.get("[class=patientDetails]");
  });

  it("should have a menu item for visits", () => {
    cy.get("[class='patientDetails__main_menu']")
      .contains("Admissions:")
      .click();
  });

  it("should display an info box saying the patient is already admitted", () => {
    cy.get("[class=patientAdmission__subtitle]").contains(
      "The patient has already been admitted, here you will find the history of admissions. To resign, go to the dismission page."
    );
  });
});

describe("Patient Details / Admissions / Outpatient", () => {
  before(() => {
    cy.authenticate(START_PATH_OUTPATIENT);
  });

  it("should render the ui", () => {
    cy.get("[class=patientDetails]");
  });

  it("should have a menu item for visits", () => {
    cy.get("[class='patientDetails__main_menu']")
      .contains("Admissions:")
      .click();
  });

  it("should make it possible for the user to fill out the admission form to admit a patient", () => {
    cy.get("[id=ward]").focus().clear().type("FEMALE WARDS").blur();
    cy.get("[id=transUnit]").focus().clear().type("1").blur();
    cy.get("[id=admDate]").focus().clear().type("03052022").blur();
    cy.get("[id=admType]").focus().clear().type("SELF").blur();
    cy.get("[id=diseaseIn]").focus().clear().type("Abortions").blur();
    cy.get("[id=note]").focus().clear().type("fail").blur();
  });

  it("should display an error info box if the visit creation fails", () => {
    cy.get("[class='submit_button']").click();

    cy.get("div.infoBox").should("have.class", "error");
  });

  it("should show a confirmation dialog if the admission succeeds", () => {
    cy.get("[id=note]").focus().clear().type("succeed").blur();
    cy.get("[class='submit_button']").click();
    cy.get("div.infoBox").should("not.exist");
    cy.get("div.dialog__title").contains("Patient admitted");
    cy.get("[class='return_button']").click();
  });
});
