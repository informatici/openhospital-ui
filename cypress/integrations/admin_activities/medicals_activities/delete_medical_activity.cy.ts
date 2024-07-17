/// <reference types="cypress" />

const MEDICAL2_TYPES_START_PATH = "/admin/types/medicals";

describe("Medical Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(MEDICAL2_TYPES_START_PATH);
    cy.dataCy("sub-medical-title").contains("Manage medical types");
  });

  it("should present the table with four rows", () => {
    cy.dataCy("medical-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(4);
      });
  });

  it("should display the deletion dialog", () => {
    cy.get('button[title="Delete"]').first().click();
    cy.dataCy("dialog-info").contains("Are you sure to delete item with code");
  });

  it("should cancel the medical deletion", () => {
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("medical-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(4);
      });
  });

  it("should delete the medical", () => {
    cy.get('button[title="Delete"]').first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains(
      "The medical type has been deleted successfully!"
    );
    cy.dataCy("approve-dialog").last().click();
  });
});
