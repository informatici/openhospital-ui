/// <reference types="cypress" />

const VACCINE_TYPES_START_PATH = "/admin/types/vaccines";

describe("Vaccine types Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(VACCINE_TYPES_START_PATH);
    cy.dataCy("sub-activity-title").contains("Manage vaccine types");
  });

  it("should present the table with two rows", () => {
    cy.dataCy("vaccine-types-table")
      .find("table")
      .then((table) => expect(table.find("tbody tr").length).equal(3));
  });

  it("should cancel the deletion of the vaccine type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("dialog-info").contains("Are you sure to delete item with code");
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should delete the first vaccine type", () => {
    cy.dataCy("table-delete-action").first().click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").contains("has been deleted successfully!");
    cy.dataCy("approve-dialog").last().click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("vaccine-types-table")
      .find("table")
      .then((table) => expect(table.find("tbody tr").length).equal(2));
  });
});
