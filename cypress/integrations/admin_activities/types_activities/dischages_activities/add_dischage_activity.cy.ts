/// <reference types="cypress" />

const DISCHARGE_TYPE_STARTS_PATH = "/admin/types/discharges";

describe("Add discharge type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DISCHARGE_TYPE_STARTS_PATH);
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });

  it("should show discharge type creation form", () => {
    cy.dataCy("add-discharge-type").click();
    cy.dataCy("sub-discharge-title").contains("New discharge type");
  });

  it("should fail to create a new admission type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Discharge type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new discharge type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The discharge type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after discharge type creation", () => {
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });

  it("should cancel the cancellation of the discharge type creation", () => {
    cy.dataCy("add-discharge-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the discharge type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the discharge type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-discharge-title").contains("Manage discharge types");
  });
});
