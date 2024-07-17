/// <reference types="cypress" />

const DISEASE_TYPE_START_PATH = "/admin/types/diseases";

describe("Disease types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISEASE_TYPE_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage disease types");
  });

  it("should show disease type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-activity-title").contains("Edit disease type");
  });

  it("should fail to edit the disease type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save disease type changes", () => {
    cy.byId("description").clear().type("Disease type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after disease type update", () => {
    cy.dataCy("sub-activity-title").contains("Manage disease types");
  });

  it("should cancel the cancellation of the disease type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the disease type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the disease type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage disease types");
  });
});
