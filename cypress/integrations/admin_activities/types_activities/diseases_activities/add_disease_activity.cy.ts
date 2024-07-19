/// <reference types="cypress" />

const DISEASE_TYPE_STARTS_PATH = "/admin/types/diseases";

describe("Add disease type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISEASE_TYPE_STARTS_PATH);
    cy.dataCy("sub-activity-title").contains("Manage disease types");
  });

  it("should show disease type creation form", () => {
    cy.dataCy("add-disease-type").click();
    cy.dataCy("sub-activity-title").contains("New disease type");
  });

  it("should fail to create a new disease type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Disease type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new disease type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The disease type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after disease type creation", () => {
    cy.dataCy("sub-activity-title").contains("Manage disease types");
  });

  it("should cancel the cancellation of the disease type creation", () => {
    cy.dataCy("add-disease-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the disease type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the disease type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage disease types");
  });
});
