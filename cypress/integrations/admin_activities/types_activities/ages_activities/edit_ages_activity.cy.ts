/// <reference types="cypress" />

const AGE_TYPE_START_PATH = "/admin/types/ages";

describe("Admission types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(AGE_TYPE_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage age types");
  });

  it("should show age types edit form", () => {
    cy.dataCy("edit-age-types").click();
    cy.dataCy("sub-activity-title").contains("Edit age types");
  });

  it("should fail to edit the age type", () => {
    cy.byId("ageTypes\\[0\\]\\.to").type("1");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save age types changes", () => {
    cy.byId("ageTypes\\[0\\]\\.to").clear().type("0");
    cy.byId("ageTypes\\[5\\]\\.to").clear().type("104");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("have been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after age types update", () => {
    cy.dataCy("sub-activity-title").contains("Manage age types");
  });

  it("should cancel the cancellation of the age types update", () => {
    cy.dataCy("edit-age-types").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the age types update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the age types update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage age types");
  });
});
