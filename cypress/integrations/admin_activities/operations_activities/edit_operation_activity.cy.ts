/// <reference types="cypress" />

const OPERATION_START_PATH = "/admin/operations";

describe("Operations Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(OPERATION_START_PATH);
    cy.dataCy("activity-title").contains("Operations");
  });

  it("should show operation edit form", () => {
    cy.get('button[title="Edit"]').first().click();
    cy.dataCy("activity-title").contains("Edit Operation");
  });

  it("should fail to edit the operation", () => {
    cy.byId("code").should("be.disabled");
    cy.get('input[name="major"]').uncheck();
    cy.get('input[name="major"]').check();
    cy.byId("type").clear().blur();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save operation changes", () => {
    cy.byId("type").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after operation update", () => {
    cy.dataCy("activity-title").contains("Operations");
  });

  it("should cancel the cancellation of the operation creation", () => {
    cy.get('button[title="Edit"]').first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to Reset the Form? All the unsaved data will be lost."
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.be.visible");
  });

  it("should cancel the operation update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Operations");
  });
});
