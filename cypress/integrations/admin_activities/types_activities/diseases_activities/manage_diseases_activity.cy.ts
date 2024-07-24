/// <reference types="cypress" />

const DISEASE_TYPES_START_PATH = "/admin/types/diseases";

describe("Disease types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISEASE_TYPES_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage disease types");
  });

  it("should present the table with two rows", () => {
    cy.dataCy("disease-types-table")
      .find("table")
      .then((table) => {
        expect(table.find("tbody tr").length).equal(2);
      });
  });

  it("should cancel the deletion of the disease type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("dialog-info").contains("Are you sure to delete item with code");
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should delete the first disease type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains("has been deleted successfully!");
    cy.dataCy("approve-dialog").last().click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("disease-types-table")
      .find("table")
      .then((table) => {
        expect(table.find("tbody tr").length).equal(1);
      });
  });
});
