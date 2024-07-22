/// <reference types="cypress" />

const VACCINE_TYPE_START_PATH = "/admin/types/vaccines";

describe("vaccine types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(VACCINE_TYPE_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage vaccine types");
  });

  it("should show vaccine type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-activity-title").contains("Edit vaccine type");
  });

  it("should fail to edit the vaccine type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save vaccine type changes", () => {
    cy.byId("description").clear().type("vaccine type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after vaccine type update", () => {
    cy.dataCy("sub-activity-title").contains("Manage vaccine types");
  });

  it("should cancel the cancellation of the vaccine type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the vaccine type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the vaccine type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage vaccine types");
  });
});
