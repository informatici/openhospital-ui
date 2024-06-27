/// <reference types="cypress" />

const WARD_STARTS_PATH = "/admin/wards";

describe("Edit Ward Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(WARD_STARTS_PATH);
    cy.dataCy("activity-title").contains("Wards");
  });

  it("should show ward creation form", () => {
    cy.get('button[title="Edit"]').first().click();
    cy.dataCy("activity-title").contains("Edit Ward");
  });

  it("should fail to edit the ward", () => {
    cy.byId("code").should("be.disabled");
    cy.get('input[name="opd"]').uncheck();
    cy.get('input[name="pharmacy"]').check();
    cy.byId("telephone").type("+237698123234");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save ward changes", () => {
    cy.byId("telephone").clear().type("623123234");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after ward update", () => {
    cy.dataCy("activity-title").contains("Wards");
  });

  it("should cancel the cancellation of the ward creation", () => {
    cy.get('button[title="Edit"]').first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to Reset the Form? All the unsaved data will be lost."
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.be.visible");
  });

  it("should cancel the ward update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Wards");
  });
});
