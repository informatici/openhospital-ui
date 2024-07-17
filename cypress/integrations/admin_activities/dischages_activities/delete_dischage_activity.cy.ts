/// <reference types="cypress" />

const DISCHARGES_TYPES_START_PATH = "/admin/types/discharges";

describe("Discharges Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISCHARGES_TYPES_START_PATH);
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });

  it("should present the table with four rows", () => {
    cy.dataCy("discharge-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(3);
      });
  });

  it("should display the deletion dialog", () => {
    cy.get('button[title="Delete"]').first().click();
    cy.dataCy("dialog-info").contains("Are you sure to delete item with code");
  });

  it("should cancel the discharge deletion", () => {
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("discharge-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(3);
      });
  });

  it("should delete the discharge", () => {
    cy.get('button[title="Delete"]').first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains(
      "The discharge type has been deleted successfully!"
    );
    cy.dataCy("approve-dialog").last().click();
  });
});
