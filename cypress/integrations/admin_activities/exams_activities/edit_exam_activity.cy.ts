/// <reference types="cypress" />

const EXAM_START_PATH = "/admin/exams";

describe("Exams edit activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(EXAM_START_PATH);
    cy.dataCy("activity-title").contains("Exams");
  });

  it("should show exam edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("activity-title").contains("Edit exam");
  });

  it("should fail to edit the exam", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("examtype").clear().blur();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save exam changes", () => {
    cy.byId("examtype").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.dataCy("submit-form").click().click();
    cy.dataCy("dialog-info").contains("Exam updated successfully");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after exam update", () => {
    cy.dataCy("activity-title").contains("Exams");
  });

  it("should cancel the cancellation of the exam creation", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains("Are you sure to Reset the Form");
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the exam update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Exams");
  });
});
