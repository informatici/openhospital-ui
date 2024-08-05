/// <reference types="cypress" />

const DELIVERY_RESULT_TYPE_STARTS_PATH = "/admin/types/deliveryresulttypes";

describe("Add delivery result type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DELIVERY_RESULT_TYPE_STARTS_PATH);
    cy.dataCy("sub-activity-title").contains("Manage delivery result types");
  });

  it("should show delivery result type creation form", () => {
    cy.dataCy("add-deliveryresult-type").click();
    cy.dataCy("sub-activity-title").contains("New delivery result type");
  });

  it("should fail to create a new delivery result type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Delivery result type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new delivery result type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The delivery result type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after delivery result type creation", () => {
    cy.dataCy("sub-activity-title").contains("Manage delivery result types");
  });

  it("should cancel the cancellation of the delivery result type creation", () => {
    cy.dataCy("add-deliveryresult-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the delivery result type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the delivery result type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage delivery result types");
  });
});
