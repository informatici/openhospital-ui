/// <reference types="cypress" />

const EXAM_TYPE_STARTS_PATH = "/admin/types/exams";

describe("Add exam type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(EXAM_TYPE_STARTS_PATH);
    cy.dataCy("sub-activity-title").contains("Manage exam types");
  });

  it("should show exam type creation form", () => {
    cy.dataCy("add-exam-type").click();
    cy.dataCy("sub-activity-title").contains("New exam type");
  });

  it("should fail to create a new exam type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Exam type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new exam type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The exam type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after exam type creation", () => {
    cy.dataCy("sub-activity-title").contains("Manage exam types");
  });

  it("should cancel the cancellation of the exam type creation", () => {
    cy.dataCy("add-exam-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the exam type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the exam type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage exam types");
  });
});
