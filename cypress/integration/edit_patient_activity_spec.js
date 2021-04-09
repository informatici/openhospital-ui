import initialValues from "../fixtures/editPatientInitialValues.json";

const START_PATH = "http://localhost:3000/details/72/edit";

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

        cy.get(
          "[id=profilePicture_input]"
        ).attachFile("images/profilePicture.jpg", { force: true });

        cy.wait(1000);
        cy.get("[class=profilePicture]")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).to.not.equal(currentPicture);
          });
      });
  });

  it("should reset all the fields on the Reset button click", () => {
    cy.get("[id=firstName]").clear().type("Marcelo");
    cy.get("[class=patientDataForm]").contains("Reset").click();
    cy.get("div.dialog__buttonSet").contains("Reset").click();
    cy.get("[id=firstName]").should("have.value", "Antonio Carlos");
  });

  it("should show a confirmation dialog when the call is successful", () => {
    cy.get("[id=firstName]").clear().type("Marcelo");
    cy.get("[class=patientDataForm]").contains("Submit").click();
    cy.get("div.dialog__info").contains(
      "The patient was edit successfully."
    );
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
});
