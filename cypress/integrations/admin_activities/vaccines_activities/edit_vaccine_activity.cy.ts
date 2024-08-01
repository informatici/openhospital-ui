/// <reference types="cypress" />

const VACCINE_START_PATH = "/admin/vaccines";

describe("Vaccines Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(VACCINE_START_PATH);
    cy.dataCy("activity-title").contains("Vaccines");
  });

  it("should show vaccine edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("activity-title").contains("Edit Vaccine");
  });

  it("should fail to edit the vaccine", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("vaccineType").clear().blur();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save vaccine changes", () => {
    cy.byId("vaccineType").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.dataCy("submit-form").click().click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after vaccine update", () => {
    cy.dataCy("activity-title").contains("Vaccines");
  });

  it("should cancel the cancellation of the vaccine creation", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the vaccine update"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the vaccine update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Vaccines");
  });
});
