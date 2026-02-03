/// <reference types="cypress" />

const AGE_TYPES_START_PATH = "/admin/types/ages";

describe("Age types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(AGE_TYPES_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage age types");
  });

  it("should present the table with 6 rows", () => {
    cy.dataCy("age-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(6);
      });
  });
});
