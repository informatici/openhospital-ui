/// <reference types="cypress" />

const VACCINE_TYPE_STARTS_PATH = "/admin/types/vaccines";

describe("Add vaccine type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(VACCINE_TYPE_STARTS_PATH);
    cy.dataCy("sub-activity-title").contains("Manage vaccine types");
  });

  it("should show vaccine type creation form", () => {
    cy.dataCy("add-vaccine-type").click();
    cy.dataCy("sub-activity-title").contains("New vaccine type");
  });

  it("should fail to create a new vaccine type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Vaccine type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new vaccine type", () => {
    cy.byId("code").clear().type("K");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The vaccine type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after vaccine type creation", () => {
    cy.dataCy("sub-activity-title").contains("Manage vaccine types");
  });

  it("should cancel the cancellation of the vaccine type creation", () => {
    cy.dataCy("add-vaccine-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the vaccine type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the vaccine type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage vaccine types");
  });
});
