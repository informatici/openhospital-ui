/// <reference types="cypress" />

const ADMISSION_TYPES_START_PATH = "/admin/types/admissions";

describe("Admission types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(ADMISSION_TYPES_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage admission types");
  });

  it("should present the table with three rows", () => {
    cy.dataCy("admission-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(3);
      });
  });
});
