/// <reference types="cypress" />

const OPERATION_TYPE_START_PATH = "/admin/types/operations";

describe("Operation types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(OPERATION_TYPE_START_PATH);
    cy.dataCy("sub-operation-title").contains("Manage operation types");
  });

  it("should show operation type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-operation-title").contains("Edit operation type");
  });

  it("should fail to edit the operation type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save operation type changes", () => {
    cy.byId("description").clear().type("Operation type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after operation type update", () => {
    cy.dataCy("sub-operation-title").contains("Manage operation types");
  });

  it("should cancel the cancellation of the operation type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the operation type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the operation type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-operation-title").contains("Manage operation types");
  });
});
