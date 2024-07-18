/// <reference types="cypress" />

const DISCHARGE_TYPES_START_PATH = "/admin/types/discharges";

describe("Admission types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISCHARGE_TYPES_START_PATH);
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });

  it("should present the table with three rows", () => {
    cy.dataCy("discharge-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(3);
      });
  });
});
