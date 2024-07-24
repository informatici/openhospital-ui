/// <reference types="cypress" />

const DISCHARGE_TYPE_START_PATH = "/admin/types/discharges";

describe("Discharge types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISCHARGE_TYPE_START_PATH);
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });

  it("should show admission type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-discharge-title").contains("Edit discharge type");
  });

  it("should fail to edit the discharge type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save discharge type changes", () => {
    cy.byId("description").clear().type("Discharge type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after discharge type update", () => {
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });

  it("should cancel the cancellation of the discharge type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the discharge type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the discharge type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });
});
