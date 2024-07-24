/// <reference types="cypress" />

const OPERATION_STARTS_PATH = "/admin/operations";

describe("Add Operation Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(OPERATION_STARTS_PATH);
    cy.dataCy("activity-title").contains("Operations");
  });

  it("should show operation creation form", () => {
    cy.dataCy("add-new-operation").click();
    cy.dataCy("activity-title").contains("Add Operation");
  });

  it("should fail to create a new operation", () => {
    cy.byId("code").type("FAIL");
    cy.byId("type").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.byId("description").type("Laparotomy");
    cy.get('input[name="major"]').check();
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new operation", () => {
    cy.byId("code").clear().type("202");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "Operation has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after operation creation", () => {
    cy.dataCy("activity-title").contains("Operations");
  });

  it("should cancel the cancellation of the operation creation", () => {
    cy.dataCy("add-new-operation").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to Reset the Form? All the unsaved data will be lost."
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the operation creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Operations");
  });
});
