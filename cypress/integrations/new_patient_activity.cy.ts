/// <reference types="cypress" />

import initialValues from "../fixtures/newPatientInitialValues.json";

type InitialValuesKeys = keyof typeof initialValues;

const START_PATH = "/patients/new";

describe("NewPatientActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate(START_PATH);
    cy.get("[class=newPatient]");
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

  it("should pass the “submit” button label", () => {
    cy.dataCy("patient-data-submit-button").contains("Submit");
  });

  it("should allow the user to add and remove a profile picture", () => {
    cy.fixture("images/profilePicture.jpg", null).as("profilePicture");
    cy.dataCy("profile-picture")
      .find("img")
      .invoke("attr", "src")
      .then((firstSrc) => {
        const placeholder = firstSrc;

        cy.dataCy("profile-picture-input").selectFile(
          "@profilePicture",
          { force: true }
        );
        cy.get(".MuiDialogContent-root .MuiButton-containedPrimary").click();
        cy.wait(2000);

        cy.wait(1000);
        cy.dataCy("profile-picture")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).to.not.equal(placeholder);
          });

        cy.get(".profilePicture_removeIcon").click();
        cy.wait(1000);
        cy.dataCy("profile-picture")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).equal(placeholder);
          });
      });
  });

  it("should allow the user to fill in the form with personal data", () => {
    cy.byId("firstName").type("Antonio Carlos");
    cy.byId("secondName").type("Jobim");
    cy.get(".MuiSelect-select[id=sex]").click();
    cy.dataValue("M").click();
  });

  it("should reset all the fields on the Clear All button click", () => {
    cy.byId("firstName").clear().type("Antonio Carlos");
    cy.byId("secondName").clear().type("Jobim");
    cy.dataCy("patient-data-form").contains("Clear All").click();
    cy.dataCy("dialog-button-set").contains("Clear All").click();
    cy.byId("firstName").should("have.value", "");
    cy.byId("secondName").should("have.value", "");
    cy.byId("birthDate").should("have.value", "");
  });

  it.skip("should reset the profile picture on the Clear All button click", () => {
    cy.dataCy("patient-data-form").contains("Clear All").click();
    cy.dataCy("dialog-button-set").contains("Clear All").click();
  });

  it("should show an error message when the call fails", () => {
    cy.wait(2000);
    cy.get(".dateField button").click();
    cy.get(".MuiPickersCalendar-week .MuiPickersDay-today").click();
    cy.byId("firstName").clear().type("fail");
    cy.byId("secondName").clear().type("fail");
    cy.get(".MuiSelect-select[id=sex]").click();
    cy.dataValue("M").click();
    cy.dataCy("patient-data-submit-button").click();
    cy.dataCy("info-box").should("have.class", "error");
  });

  it("should show a confirmation dialog when the call is successful", () => {
    cy.wait(2000);
    cy.get(".dateField button").click();
    cy.get(".MuiPickersCalendar-week .MuiPickersDay-today").click();
    cy.byId("firstName").clear().type("Antonio Carlos");
    cy.byId("secondName").clear().type("Jobim");
    cy.get(".MuiSelect-select[id=sex]").click();
    cy.dataValue("M").click();
    cy.dataCy("patient-data-submit-button").click();
    cy.dataCy("dialog-info").contains(
      "The patient registration was successful."
    );
  });

  it("should reset the form if the user chooses to keep editing after a submit", () => {
    cy.dataCy("dialog-button-set").contains("Add Another Patient").click();
    cy.byId("firstName").should("have.value", "");
    cy.byId("secondName").should("have.value", "");
    cy.byId("birthDate").should("have.value", "");
  });

  it("should redirect the user to the DashboardActivity on Dashboard button click", () => {
    cy.wait(2000);
    cy.get(".dateField button").click();
    cy.get(".MuiPickersCalendar-week .MuiPickersDay-today").click();
    cy.byId("firstName").type("Antonio Carlos");
    cy.byId("secondName").type("Jobim");
    cy.get(".MuiSelect-select[id=sex]").click();
    cy.dataValue("M").click();
    cy.dataCy("patient-data-submit-button").click();
    cy.dataCy("dialog-button-set").contains("Go to home").click();
    cy.dataCy("dashboard-activity");
  });
});
