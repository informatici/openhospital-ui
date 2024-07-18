/// <reference types="cypress" />

const MEDICAL_TYPES_START_PATH = "/admin/types/medicals";

describe("Medical types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(MEDICAL_TYPES_START_PATH);
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
});
