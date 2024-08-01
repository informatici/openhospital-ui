/// <reference types="cypress" />

const PREGNANTTREATMENT_TYPE_START_PATH = "/admin/types/pregnanttreatmenttypes";

describe("Pregnant treatment types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(PREGNANTTREATMENT_TYPE_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage pregnant treatment types");
  });

  it("should show pregnant treatment type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-activity-title").contains("Edit pregnant treatment type");
  });

  it("should fail to edit the pregnant treatment type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save pregnant treatment type changes", () => {
    cy.byId("description").clear().type("Pregnant treatment type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after pregnant treatment type update", () => {
    cy.dataCy("sub-activity-title").contains("Manage pregnant treatment types");
  });

  it("should cancel the cancellation of the pregnant treatment type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the pregnant treatment type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the pregnant treatment type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage pregnant treatment types");
  });
});
