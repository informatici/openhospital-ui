/// <reference types="cypress" />

const OPERATION_TYPES_START_PATH = "/admin/types/operations";

describe("Operation types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(OPERATION_TYPES_START_PATH);
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
});
