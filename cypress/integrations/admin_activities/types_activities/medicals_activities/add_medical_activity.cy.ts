/// <reference types="cypress" />

const MEDICAL_TYPE_STARTS_PATH = "/admin/types/medicals";

describe("Add medical type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(MEDICAL_TYPE_STARTS_PATH);
    cy.dataCy("sub-medical-title").contains("Manage medical types");
  });

  it("should show medical type creation form", () => {
    cy.dataCy("add-medical-type").click();
    cy.dataCy("sub-medical-title").contains("New medical type");
  });

  it("should fail to create a new medical type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Medical type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new medical type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The medical type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after medical type creation", () => {
    cy.dataCy("sub-medical-title").contains("Manage medical types");
  });

  it("should cancel the cancellation of the medical type creation", () => {
    cy.dataCy("add-medical-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the medical type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the medical type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-medical-title").contains("Manage medical types");
  });
});
