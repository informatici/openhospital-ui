/// <reference types="cypress" />

const OPERATIONS_START_PATH = "/admin/operations";

describe("Operations Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(OPERATIONS_START_PATH);
    cy.dataCy("activity-title").contains("Operations");
  });

  it("should present the table with four rows", () => {
    cy.dataCy("operations-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(4);
      });
  });
});
