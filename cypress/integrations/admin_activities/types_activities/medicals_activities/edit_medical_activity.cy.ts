/// <reference types="cypress" />

const MEDICAL_TYPE_START_PATH = "/admin/types/medicals";

describe("Medical types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(MEDICAL_TYPE_START_PATH);
    cy.dataCy("sub-medical-title").contains("Manage medical types");
  });

  it("should show medical type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-medical-title").contains("Edit medical type");
  });

  it("should fail to edit the medical type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save medical type changes", () => {
    cy.byId("description").clear().type("Medical type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after medical type update", () => {
    cy.dataCy("sub-medical-title").contains("Manage medical types");
  });

  it("should cancel the cancellation of the medical type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the medical type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the medical type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-medical-title").contains("Manage medical types");
  });
});
