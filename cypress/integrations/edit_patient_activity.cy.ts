/// <reference types="cypress" />

import initialValues from "../fixtures/editPatientInitialValues.json";

type InitialValuesKeys = keyof typeof initialValues;

const START_PATH = "/patients/details/72/edit";

describe("EditPatientActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate(START_PATH);
    cy.dataCy("edit-patient");
  });

  it.skip("should have access to the user credentials", () => {});

  it("should have a PatientDataForm as a child component", () => {
    cy.dataCy("patient-data-form");
  });

  it("should have an AppHeader", () => {
    cy.dataCy("app-header");
  });

  it("should pass in initialValues carrying only default values", () => {
    const fields = Object.keys(initialValues).map((fieldName) => ({
      fieldName,
      id: `[id=${fieldName.toString()}]`,
    }));
    fields.forEach((field) => {
      cy.get(field.id).should(
        "have.value",
        initialValues[field.fieldName as InitialValuesKeys]
      );
    });
  });

  it("should pass the “save” button label", () => {
    cy.dataCy("patient-data-submit-button").contains("Save");
  });

  it("should allow the user to change the profile picture", () => {
    cy.fixture("images/editPicture.jpg", null).as("editPicture");
    cy.dataCy("profile-picture")
      .find("img")
      .invoke("attr", "src")
      .then((firstSrc) => {
        const currentPicture = firstSrc;

        cy.dataCy("profile-picture-input").selectFile("@editPicture", {
          force: true,
        });
        cy.get(".MuiDialogContent-root .MuiButton-containedPrimary").click();
        cy.wait(3000);


        cy.dataCy("profile-picture")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).to.not.equal(currentPicture);
          });
      });
  });

  it("should allow the user to remove the profile picture", () => {
    cy.dataCy("profile-picture")
      .find("img")
      .invoke("attr", "src")
      .then((firstSrc) => {
        const currentPicture = firstSrc;
        expect(currentPicture).to.be.a("string");
        cy.dataCy("remove-profile-picture").click();
        cy.dataCy("profile-picture")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).to.not.equal(currentPicture);
          });
      });
  });

  it("should show a confirmation dialog when the call is successful", () => {
    cy.byId("firstName").clear().type("Marcelo");
    cy.dataCy("patient-data-submit-button").click();
    cy.dataCy("dialog-info").contains("The patient was edit successfully.");
  });

  it("should reset the form if the user chooses to keep editing after a submit", () => {
    cy.dataCy("dialog-button-set").contains("Keep editing").click();
    cy.dataCy("patient-data-form");
  });

  it("should redirect the user to the Patient on Patient button click", () => {
    cy.dataCy("patient-data-submit-button").click();
    cy.dataCy("dialog-button-set").contains("Patient").click();
    cy.dataCy("patient-details");
  });

  it("should return back to patient edit form", () => {
    cy.authenticate(START_PATH);
    cy.dataCy("edit-patient");
  });

  it("should not leave on the Cancel button click, if the Cancel button of the Cancel Dialog is click", () => {
    cy.byId("firstName").clear().type("Marcelo");
    cy.dataCy("patient-data-cancel-button").click();
    cy.url().then((url) => {
      cy.dataCy("dialog-button-set").contains("Keep").click();
      cy.url().should("eq", url);
    });
    //cy.byId("firstName").should("have.value", "Antonio Carlos");
  });
});
