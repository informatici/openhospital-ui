/// <reference types="cypress" />

const DISEASE_STARTS_PATH = "/admin/diseases";

describe("Add Disease Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISEASE_STARTS_PATH);
    cy.dataCy("activity-title").contains("Diseases");
  });

  it("should show disease creation form", () => {
    cy.dataCy("add-new-disease").click();
    cy.dataCy("activity-title").contains("Add Disease");
  });

  it("should fail to create a new disease", () => {
    cy.byId("code").type("FAIL");
    cy.byId("diseaseType").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.byId("description").type("Children disease");
    cy.get('input[name="opdInclude"]').check();
    cy.get('input[name="ipdInInclude"]').check();
    cy.get('input[name="ipdInInclude"]').uncheck();
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new disease", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("Disease has been created successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after disease creation", () => {
    cy.dataCy("activity-title").contains("Diseases");
  });

  it("should cancel the cancellation of the disease creation", () => {
    cy.dataCy("add-new-disease").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to Reset the Form? All the unsaved data will be lost."
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the disease creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Diseases");
  });
});
