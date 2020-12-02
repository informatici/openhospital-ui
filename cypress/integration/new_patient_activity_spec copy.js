import initialValues from "../fixtures/newPatientInitialValues.json";

const START_PATH = "http://localhost:3000/new";

describe("NewPatientActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate(START_PATH);
    cy.get("[class=newPatient]");
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
    cy.get("[class=patientDataForm]").contains("submit");
  });

  it("should allow the user to add and remove a profile picture", () => {
    cy.get("[class=profilePicture]")
      .find("img")
      .invoke("attr", "src")
      .then((firstSrc) => {
        const placeholder = firstSrc;

        cy.get(
          "[id=profilePicture_input]"
        ).attachFile("images/profilePicture.jpg", { force: true });

        cy.wait(1000);
        cy.get("[class=profilePicture]")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).to.not.equal(placeholder);
          });

        cy.get("[class=profilePicture_removeIcon]").click();
        cy.wait(1000);
        cy.get("[class=profilePicture]")
          .find("img")
          .invoke("attr", "src")
          .then((nextSrc) => {
            expect(nextSrc).equal(placeholder);
          });
      });
  });

  it("should allow the user to fill in the form with personal data", () => {
    cy.get("[id=firstName]").type("Antonio Carlos");
    cy.get("[id=secondName]").type("Jobim");
    cy.get("[id=birthDate]").type("10/10/2020");
  });

  it("should reset all the fields on the Clear All button click", () => {
    cy.get("[id=firstName]").clear().type("Antonio Carlos");
    cy.get("[id=secondName]").clear().type("Jobim");
    cy.get("[id=birthDate]").clear().type("10/10/2020");
    cy.get("[class=patientDataForm]").contains("Clear All").click();
    cy.get("div.dialog__buttonSet").contains("Clear All").click();
    cy.get("[id=firstName]").should("have.value", "");
    cy.get("[id=secondName]").should("have.value", "");
    cy.get("[id=birthDate]").should("have.value", "");
  });

  it.skip("should reset the profile picture on the Clear All button click", () => {
    cy.get("[class=patientDataForm]").contains("Clear All").click();
    cy.get("div.dialog__buttonSet").contains("Clear All").click();
  });

  it("should show an error message when the call fails", () => {
    cy.get("[id=firstName]").clear().type("fail");
    cy.get("[id=secondName]").clear().type("fail");
    cy.get("[id=birthDate]").clear().type("00/00/0000");
    cy.get("[class=patientDataForm]").contains("submit").click();
    cy.get("div.infoBox").should("have.class", "error");
  });

  it("should show a confirmation dialog when the call is successful", () => {
    cy.get("[id=firstName]").clear().type("Antonio Carlos");
    cy.get("[id=secondName]").clear().type("Jobim");
    cy.get("[id=birthDate]").clear().type("10/10/2020");
    cy.get("[class=patientDataForm]").contains("submit").click();
    cy.get("div.dialog__info").contains(
      "The patient registration was successful."
    );
  });

  it("should reset the form if the user chooses to keep editing after a submit", () => {
    cy.get("div.dialog__buttonSet").contains("Keep editing").click();
    cy.get("[id=firstName]").should("have.value", "");
    cy.get("[id=secondName]").should("have.value", "");
    cy.get("[id=birthDate]").should("have.value", "");
  });

  it("should redirect the user to the DashboardActivity on Dashboard button click", () => {
    cy.get("[id=firstName]").type("Antonio Carlos");
    cy.get("[id=secondName]").type("Jobim");
    cy.get("[id=birthDate]").type("10/10/2020");
    cy.get("[class=patientDataForm]").contains("submit").click();
    cy.get("div.dialog__buttonSet").contains("Dashboard").click();
    cy.get("div.dashboard");
  });
});
