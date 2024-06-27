/// <reference types="cypress" />

const DISEASES_START_PATH = "/admin/diseases";

describe("Diseases Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISEASES_START_PATH);
    cy.dataCy("activity-title").contains("Diseases");
  });

  it("should present the table with three rows", () => {
    cy.dataCy("diseases-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(3);
      });
  });
});
