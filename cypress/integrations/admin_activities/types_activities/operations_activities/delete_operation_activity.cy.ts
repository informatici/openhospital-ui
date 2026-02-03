/// <reference types="cypress" />

const OPERATION2_TYPES_START_PATH = "/admin/types/operations";

describe("Operation Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(OPERATION2_TYPES_START_PATH);
    cy.dataCy("sub-operation-title").contains("Manage operation types");
  });

  it("should present the table with four rows", () => {
    cy.dataCy("operation-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(9);
      });
  });

  it("should display the deletion dialog", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("dialog-info").contains("Are you sure to delete item with code");
  });

  it("should cancel the operation deletion", () => {
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("operation-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(9);
      });
  });

  it("should delete the operation", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains(
      "The operation type has been deleted successfully!"
    );
    cy.dataCy("approve-dialog").last().click();
    cy.dataCy("operation-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(8);
      });
  });
});
