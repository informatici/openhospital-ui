/// <reference types="cypress" />

const EXAM_TYPES_START_PATH = "/admin/types/exams";

describe("Exam types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(EXAM_TYPES_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage exam types");
  });

  it("should present the table with two rows", () => {
    cy.dataCy("exam-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(2);
      });
  });

  it("should cancel the deletion of the exam type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("dialog-info").contains("Are you sure to delete item with code");
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should delete the first exam type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains("has been deleted successfully!");
    cy.dataCy("approve-dialog").last().click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("exam-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(1);
      });
  });
});
