/// <reference types="cypress" />

const VACCINES_START_PATH = "/admin/vaccines";

describe("Vaccines Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(VACCINES_START_PATH);
    cy.dataCy("activity-title").contains("Vaccines");
  });

  it("should present the table with eight rows", () => {
    cy.dataCy("vaccines-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(8);
      });
  });
});
