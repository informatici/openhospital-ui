/// <reference types="cypress" />

const WARD_START_PATH = "/admin/wards";

describe("Add Ward Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(WARD_START_PATH);
    cy.dataCy("activity-title").contains("Wards");
  });

  it("should show ward creation form", () => {
    cy.dataCy("add-new-ward").click();
    cy.dataCy("activity-title").contains("Add Ward");
  });

  it("should fail to create a new ward", () => {
    cy.byId("code").type("FL");
    cy.byId("description").type("Children ward");
    cy.byId("email").type("children.ward@oh.com");
    cy.byId("telephone").type("698123234");
    cy.get('input[name="opd"]').check();
    cy.get('input[name="pharmacy"]').check();
    cy.get('input[name="pharmacy"]').uncheck();
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new ward", () => {
    cy.byId("code").clear().type("C");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("Ward has been created successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after ward creation", () => {
    cy.dataCy("activity-title").contains("Wards");
  });

  it("should cancel the cancellation of the ward creation", () => {
    cy.dataCy("add-new-ward").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to Reset the Form? All the unsaved data will be lost."
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.be.visible");
  });

  it("should cancel the ward creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Wards");
  });
});
