import initialValues from "../fixtures/editPatientInitialValues.json";

const START_PATH = "http://localhost:3000/patients/details/72/edit";

describe("EditPatientActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate(START_PATH);
    cy.get("[class=editPatient]");
  });

  it.skip("should have access to the user credentials", () => {});

  it("should have a PatientDataForm as a child component", () => {
    cy.get("[class=patientDataForm]");
  });

  it("should have an AppHeader", () => {
    cy.get("[class=appHeader]");
  });

  it("should pass in initialValues carrying only default values", () => {
    const fields = Object.keys(initialValues).map((fieldName) => ({
      fieldName,
      id: `[id=${fieldName.toString()}]`,
    }));
    fields.forEach((field) => {
      cy.get(field.id).should("have.value", initialValues[field.fieldName]);
    });
  });

  it("should pass the “submit” button label", () => {
    cy.get("[class=patientDataForm]").contains("Submit");
  });

  it("should allow the user to change the profile picture", () => {
    cy.get("[class=profilePicture]")
      .find("img")
      .invoke("attr", "src")
      .then((firstSrc) => {
        const currentPicture = firstSrc;

        cy.get("[id=profilePicture_input]").attachFile(
          "images/profilePicture.jpg",
          { force: true }
        );
        cy.get(".MuiDialogContent-root .MuiButton-containedPrimary").click();
        cy.wait(2000);

        cy.wait(1000);
        cy.get("[class=profilePicture]")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).to.not.equal(currentPicture);
          });
      });
  });

  it("should allow the user to remove the profile picture", () => {
    cy.get("[class=profilePicture]")
      .find("img")
      .invoke("attr", "src")
      .then((firstSrc) => {
        const currentPicture = firstSrc;
        expect(currentPicture).to.be.a("string");
        cy.get(".profilePicture_button.profilePicture_removeIcon").click();
        cy.get("[class=profilePicture]")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).to.not.equal(currentPicture);
          });
      });
  });

  it("should show a confirmation dialog when the call is successful", () => {
    cy.get("[id=firstName]").clear().type("Marcelo");
    cy.get("[class=patientDataForm]").contains("Submit").click();
    cy.get("div.dialog__info").contains("The patient was edit successfully.");
  });

  it("should reset the form if the user chooses to keep editing after a submit", () => {
    cy.get("div.dialog__buttonSet").contains("Keep editing").click();
    cy.get("[class=patientDataForm]");
  });

  it("should redirect the user to the Patient on Patient button click", () => {
    cy.get("[class=patientDataForm]").contains("Submit").click();
    cy.get("div.dialog__buttonSet").contains("Patient").click();
    cy.get("[class=patientDetails]");
  });

  it("should return back to patient edit form", () => {
    cy.authenticate(START_PATH);
    cy.get("[class=editPatient]");
  });

  it("should not leave on the Cancel button click, if the Cancel button of the Cancel Dialog is click", () => {
    cy.get("[id=firstName]").clear().type("Marcelo");
    cy.get("[class=patientDataForm]").contains("Cancel").click();
    cy.url().then((url) => {
      cy.get("div.dialog__buttonSet").contains("Keep").click();
      cy.url().should("eq", url);
    });
    //cy.get("[id=firstName]").should("have.value", "Antonio Carlos");
  });
});
