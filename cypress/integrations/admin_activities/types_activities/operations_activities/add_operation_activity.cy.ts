/// <reference types="cypress" />

const OPERATION_TYPE_STARTS_PATH = "/admin/types/operations";

describe("Add operation type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(OPERATION_TYPE_STARTS_PATH);
    cy.dataCy("sub-operation-title").contains("Manage operation types");
  });

  it("should show operation type creation form", () => {
    cy.dataCy("add-operation-type").click();
    cy.dataCy("sub-operation-title").contains("New operation type");
  });

  it("should fail to create a new operation type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Operation type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new operation type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The operation type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after operation type creation", () => {
    cy.dataCy("sub-operation-title").contains("Manage operation types");
  });

  it("should cancel the cancellation of the operation type creation", () => {
    cy.dataCy("add-operation-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the operation type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the operation type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-operation-title").contains("Manage operation types");
  });
});
