/// <reference types="cypress" />

const DISEASE_START_PATH = "/admin/diseases";

describe("Diseases Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISEASE_START_PATH);
    cy.dataCy("activity-title").contains("Diseases");
  });

  it("should show disease edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("activity-title").contains("Edit Disease");
  });

  it("should fail to edit the disease", () => {
    cy.byId("code").should("be.disabled");
    cy.get('input[name="opdInclude"]').uncheck();
    cy.get('input[name="ipdInInclude"]').check();
    cy.byId("description").clear().type("FAIL");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save disease changes", () => {
    cy.byId("diseaseType").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.byId("description").clear().type("Disease description");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after disease update", () => {
    cy.dataCy("activity-title").contains("Diseases");
  });

  it("should cancel the cancellation of the disease creation", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to Reset the Form? All the unsaved data will be lost."
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the disease update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Diseases");
  });
});
