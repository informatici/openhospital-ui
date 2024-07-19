/// <reference types="cypress" />

const VACCINE_STARTS_PATH = "/admin/vaccines";

describe("Add Vaccine Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(VACCINE_STARTS_PATH);
    cy.dataCy("activity-title").contains("Vaccines");
  });

  it("should show vaccine creation form", () => {
    cy.dataCy("add-new-vaccine").click();
    cy.dataCy("activity-title").contains("Add Vaccine");
  });

  it("should fail to create a new vaccine", () => {
    cy.byId("code").type("FAIL");
    cy.byId("vaccineType").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.byId("description").type("Children vaccine");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new vaccine", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("Vaccine has been created successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after vaccine creation", () => {
    cy.dataCy("activity-title").contains("Vaccines");
  });

  it("should cancel the cancellation of the vaccine creation", () => {
    cy.dataCy("add-new-vaccine").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the vaccine creation"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the vaccine creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Vaccines");
  });
});
