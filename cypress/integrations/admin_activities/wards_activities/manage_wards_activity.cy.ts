/// <reference types="cypress" />

const WARDS_START_PATH = "/admin/wards";

describe("Wards Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(WARDS_START_PATH);
    cy.dataCy("activity-title").contains("Wards");
  });

  it("should present the table with four rows", () => {
    cy.dataCy("wards-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(8);
      });
  });

  it("should display the deletion dialog", () => {
    cy.get('button[title="Delete"]').first().click();
    cy.dataCy("dialog-info").should(
      "contain",
      "Are you sure to delete item with code"
    );
  });

  it("should cancel the ward deletion", () => {
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.be.visible");
    cy.dataCy("wards-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(8);
      });
  });

  it("should delete the ward", () => {
    cy.get('button[title="Delete"]').first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.be.visible");
    cy.dataCy("approve-dialog").last().click();
  });
});
