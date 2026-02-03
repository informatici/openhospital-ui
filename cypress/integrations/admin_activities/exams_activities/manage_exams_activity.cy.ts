/// <reference types="cypress" />

const EXAMS_START_PATH = "/admin/exams";

describe("Exams activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(EXAMS_START_PATH);
    cy.dataCy("activity-title").contains("Exams");
  });

  it("should present the table with five rows", () => {
    cy.dataCy("exams-table")
      .find("table")
      .then(($table) => expect($table.find("tbody tr").length).equal(5));
  });

  it("should display the deletion dialog", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("dialog-info").should(
      "contain",
      "Are you sure to delete item with code"
    );
  });

  it("should cancel the exam deletion", () => {
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("exams-table")
      .find("table")
      .then(($table) => expect($table.find("tbody tr").length).equal(5));
  });

  it("should delete the exam", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains("has been deleted successfully!");
    cy.dataCy("approve-dialog").last().click();
    cy.dataCy("dialog-info").should("not.exist");
  });
});
