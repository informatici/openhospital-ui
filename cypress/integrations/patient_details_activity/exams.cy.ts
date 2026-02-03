/// <reference types="cypress" />

describe("Patient Details / Exams", () => {
  before(() => {
    cy.authenticate('/patients/details/1');
  });

  it("should render the ui", () => {
    cy.dataCy("patient-details");
  });

  it("should have a menu item for Exams", () => {
    cy.dataCy("patient-details-main-menu").contains("Laboratory:").click();
  });

  // Exam request test
  it("should make it possible for the user to fill out the form to request an exam", () => {
    cy.byId("'exam'").eq(0).focus().type("1.3 Differential").blur();
  });

  it("should display an success info box if the exam creation call succeed", () => {
    cy.get("[class='submit_button']").eq(0).click();
    cy.dataCy("dialog-title").contains("Request an exam");
    cy.dataCy("dialog-return-button").click();
  });
  //End Exam request test

  // it("should make it possible for the user to fill out the form to create a new exam", () => {
  //   cy.byId("'date'").focus().type("02022022").blur();
  //   cy.byId("'exam'").eq(1).focus().type("1.3 Differential").blur();
  //   cy.byId("'result'").focus().type("POSITIVE").blur();
  //   cy.byId("'note'").focus().type("note").blur();
  // });

  // it("should display an error info box if the exam creation call fails", () => {
  //   cy.byId("'note'").focus().clear().type("ERROR").blur();

  //   cy.get("[class='submit_button']").eq(1).click();

  //   cy.dataCy("info-box").should("have.class", "error");
  // });

  // it("should display a dialog confirming the exam creation when the call is successful", () => {
  //   cy.byId("'note'")
  //     .focus()
  //     .clear()
  //     .type("This is the note of a valid form")
  //     .blur();

  //   cy.get("[class='submit_button']").eq(1).click();

  //   cy.dataCy("info-box").should("not.exist");

  //   cy.dataCy("dialog-title").contains("Patient exam added");
  //   cy.dataCy("dialog-return-button").click();
  // });
});
