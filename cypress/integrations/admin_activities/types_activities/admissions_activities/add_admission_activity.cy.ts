/// <reference types="cypress" />

const ADMISSION_TYPE_STARTS_PATH = "/admin/types/admissions";

describe("Add admission type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(ADMISSION_TYPE_STARTS_PATH);
    cy.dataCy("sub-activity-title").contains("Manage admission types");
  });

  it("should show admission type creation form", () => {
    cy.dataCy("add-admission-type").click();
    cy.dataCy("sub-activity-title").contains("New admission type");
  });

  it("should fail to create a new admission type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Admission type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new admission type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The admission type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after admission type creation", () => {
    cy.dataCy("sub-activity-title").contains("Manage admission types");
  });

  it("should cancel the cancellation of the admission type creation", () => {
    cy.dataCy("add-admission-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the admission type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the admission type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-activity-title").contains("Manage admission types");
  });
});
