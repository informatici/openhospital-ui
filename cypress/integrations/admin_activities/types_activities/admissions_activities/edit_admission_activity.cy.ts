/// <reference types="cypress" />

const ADMISSION_TYPE_START_PATH = "/admin/types/admissions";

describe("Admission types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(ADMISSION_TYPE_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage admission types");
  });

  it("should show admission type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-activity-title").contains("Edit admission type");
  });

  it("should fail to edit the admission type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save admission type changes", () => {
    cy.byId("description").clear().type("Admission type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after admission type update", () => {
    cy.dataCy("sub-activity-title").contains("Manage admission types");
  });

  it("should cancel the cancellation of the admission type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the admission type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the admission type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage admission types");
  });
});
