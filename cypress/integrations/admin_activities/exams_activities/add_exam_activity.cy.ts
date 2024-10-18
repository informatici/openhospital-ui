/// <reference types="cypress" />

const EXAM_STARTS_PATH = "/admin/exams";

describe("Add exam Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(EXAM_STARTS_PATH);
    cy.dataCy("activity-title").contains("Exams");
  });

  it("should show exam creation form", () => {
    cy.dataCy("add-new-exam").click();
    cy.dataCy("activity-title").contains("New exam");
  });

  it("should fail to create a new exam", () => {
    cy.byId("code").type("FAIL");
    cy.byId("examtype").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.byId("selectedType").last().click();
    cy.get('.MuiPopover-paper li[data-value="3"]').last().click().click();
    cy.byId("description").type("Children exam");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new exam", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("Exam created successfully");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after exam creation", () => {
    cy.dataCy("activity-title").contains("Exams");
  });

  it("should cancel the cancellation of the exam creation", () => {
    cy.dataCy("add-new-exam").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains("Are you sure to Reset the Form");
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the exam creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("activity-title").contains("Exams");
  });
});
