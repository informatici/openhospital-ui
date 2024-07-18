/// <reference types="cypress" />

const DELIVERY_TYPES_START_PATH = "/admin/types/deliveries";

describe("Delivery types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DELIVERY_TYPES_START_PATH);
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });

  it("should present the table with three rows", () => {
    cy.dataCy("delivery-types-table")
      .find("table")
      .then(($table) => {
        const rows = $table.find("tbody tr");
        expect(rows.length).equal(3);
      });
  });
});
