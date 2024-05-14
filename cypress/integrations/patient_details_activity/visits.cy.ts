/// <reference types="cypress" />

const START_PATH_INPATIENT = '/patients/details/2';
const START_PATH_OUTPATIENT = '/patients/details/1234563';

//both inpatient and out-patient used the same opd form now!
describe.skip("Patient Details / Visit - Inpatient", () => {
  before(() => {
    cy.authenticate(START_PATH_INPATIENT);
  });

  it("should render the ui", () => {
    cy.dataCy("patient-details");
  });

  it("should have a menu item for visits", () => {
    cy.dataCy("patient-details-main-menu").contains("Visits:").click();
  });

  it("Should make it possible for the user to fill out the form to add a new visit for an inpatient", () => {
    cy.byId("ward").focus().type("FEMALE WARDS").blur();
    cy.byId("date").focus().type("03052022").blur();
    cy.byId("duration").focus().type("100").blur();
    cy.byId("service").focus().type("Some service").blur();
  });

  it.skip("should display an error info box if the visit creation fails", () => {
    cy.get("[class='submit_button']").click();

    cy.dataCy("info-box").should("have.class", "error");
  });

  it.skip("should show confirmation dialog if the visit creation succeeds", () => {
    cy.byId("duration").focus().clear().type("40").blur();
    cy.get("[class='submit_button']").click();
    cy.dataCy("info-box").should("not.exist");
    cy.dataCy("dialog-title").contains("Visit created");
    cy.dataCy("dialog-return-button").click();
  });
});

describe("Patient Details / Visit - Outpatient", () => {
  before(() => {
    cy.authenticate(START_PATH_OUTPATIENT);
  });

  it("should render the ui", () => {
    cy.dataCy("patient-details");
  });

  it("should have a menu item for visits", () => {
    cy.dataCy("patient-details-main-menu").contains("Visits:").click();
  });

  it("Should make it possible for the user to fill out the form to add a new visit for an outpatient", () => {
    cy.byId("date").focus().type("01012021").blur();
    cy.byId("disease").focus().type("Abortions").blur();
    cy.byId("note").focus().type("fail").blur();
  });

  it.skip("should display an error info box if the visit creation fails", () => {
    cy.get("[class='submit_button']").click();

    cy.dataCy("info-box").should("have.class", "error");
  });

  it.skip("should show confirmation dialog if the visit creation succeeds", () => {
    cy.byId("note").focus().clear().type("succeed").blur();
    cy.get("[class='submit_button']").click();
    cy.dataCy("info-box").should("not.exist");
    cy.dataCy("dialog-title").contains("Opd Created");
    cy.dataCy("dialog-return-button").click();
  });
});
