/// <reference types="cypress" />

const DISEASES_START_PATH = "/admin/diseases";

describe("Diseases Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISEASES_START_PATH);
    cy.dataCy("activity-title").contains("Diseases");
  });

  it("should present the table with 4 rows", () => {
    cy.dataCy("diseases-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(8);
      });
  });
  it("Should show only enabled diseases", () => {
    cy.dataCy("enabled")
      .click()
      .wait(1000)
      .dataCy("diseases-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(6);
      });
  });
  it("Should show only disabled diseases", () => {
    cy.dataCy("disabled")
      .click()
      .wait(1000)
      .dataCy("diseases-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(6);
      });
  });
});
