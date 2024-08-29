/// <reference types="cypress" />

const DELIVERY_RESULT_TYPE_START_PATH = "/admin/types/deliveryresulttypes";

describe("Delivery result types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DELIVERY_RESULT_TYPE_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage delivery result types");
  });

  it("should show delivery result type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-activity-title").contains("Edit delivery result type");
  });

  it("should fail to edit the delivery result type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save delivery result type changes", () => {
    cy.byId("description").clear().type("Delivery result type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after delivery result type update", () => {
    cy.dataCy("sub-activity-title").contains("Manage delivery result types");
  });

  it("should cancel the cancellation of the delivery result type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the delivery result type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the delivery result type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage delivery result types");
  });
});
