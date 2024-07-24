/// <reference types="cypress" />

const PREGNANTTREATMENT_TYPES_START_PATH =
  "/admin/types/pregnanttreatmenttypes";

describe("Pregnant treatment types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(PREGNANTTREATMENT_TYPES_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage pregnant treatment types");
  });

  it("should present the table with two rows", () => {
    cy.dataCy("pregnanttreatment-types-table")
      .find("table")
      .then((table) => {
        expect(table.find("tbody tr").length).equal(4);
      });
  });

  it("should cancel the deletion of the pregnant treatment type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("dialog-info").contains("Are you sure to delete item with code");
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should delete the first pregnant treatment type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains("has been deleted successfully!");
    cy.dataCy("approve-dialog").last().click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("pregnanttreatment-types-table")
      .find("table")
      .then((table) => {
        expect(table.find("tbody tr").length).equal(3);
      });
  });
});
