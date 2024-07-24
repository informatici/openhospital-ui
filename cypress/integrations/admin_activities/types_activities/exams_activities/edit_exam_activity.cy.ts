/// <reference types="cypress" />

const EXAM_TYPE_START_PATH = "/admin/types/exams";

describe("Exam types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(EXAM_TYPE_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage exam types");
  });

  it("should show exam type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-activity-title").contains("Edit exam type");
  });

  it("should fail to edit the exam type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save exam type changes", () => {
    cy.byId("description").clear().type("Exam type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after exam type update", () => {
    cy.dataCy("sub-activity-title").contains("Manage exam types");
  });

  it("should cancel the cancellation of the exam type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the exam type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the exam type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage exam types");
  });
});
