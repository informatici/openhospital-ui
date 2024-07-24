/// <reference types="cypress" />

const PREGNANTTREATMENT_TYPE_STARTS_PATH =
  "/admin/types/pregnanttreatmenttypes";

describe("Add pregnant treatment type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(PREGNANTTREATMENT_TYPE_STARTS_PATH);
    cy.dataCy("sub-activity-title").contains("Manage pregnant treatment types");
  });

  it("should show pregnant treatment type creation form", () => {
    cy.dataCy("add-pregnanttreatment-type").click();
    cy.dataCy("sub-activity-title").contains("New pregnant treatment type");
  });

  it("should fail to create a new pregnant treatment type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Pregnant treatment type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new pregnant treatment type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The pregnant treatment type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after pregnant treatment type creation", () => {
    cy.dataCy("sub-activity-title").contains("Manage pregnant treatment types");
  });

  it("should cancel the cancellation of the pregnant treatment type creation", () => {
    cy.dataCy("add-pregnanttreatment-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the pregnant treatment type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the pregnant treatment type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage pregnant treatment types");
  });
});
