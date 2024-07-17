/// <reference types="cypress" />

const DELIVERY3_TYPES_START_PATH = "/admin/types/deliveries";

describe("Delivery Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DELIVERY3_TYPES_START_PATH);
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });

  it("should present the table with four rows", () => {
    cy.dataCy("delivery-types-table")
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

  it("should cancel the delivery deletion", () => {
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("delivery-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(3);
      });
  });

  it("should delete the delivery", () => {
    cy.get('button[title="Delete"]').first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains(
      "The delivery type has been deleted successfully!"
    );
    cy.dataCy("approve-dialog").last().click();
  });
});
