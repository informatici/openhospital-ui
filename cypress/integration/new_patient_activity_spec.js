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
    cy.get("[id=birthDate]").type("19270125");
    cy.get("[id=sex]").clear().type("M");
    cy.get("[id=address]").type("Rua Nascimento Silva 107");
    cy.get("[id=city]").type("Rio de Janeiro");
    cy.get("[id=zipCode]").type("10040");
    cy.get("[id=telephone]").type("998338785");
    cy.get("[id=email]").type("antonio.jobim@email.com");
    cy.get("[id=bloodType]").clear().type("0+");
    cy.get("[id=insurance]").type("Insurance S.A.");
    cy.get("[id=taxCode]").type("K475");
  });

  it("should reset all the fields on the Clear All button click", () => {
    cy.get("[id=secondName]").clear().type("Jobim");
    cy.get("[class=patientDataForm]").contains("Clear All").click();
    cy.get("[id=secondName]").should("have.value", "");
  });

  it.skip("should reset the profile picture on the Clear All button click", () => {
    cy.get("[class=patientDataForm]").contains("Clear All").click();
  });

  it("should show an error message when the call fails", () => {
    cy.get("[id=firstName]").clear().type("fail");
    cy.get("[class=patientDataForm]").contains("submit").click();
    cy.get("div.infoBox").should("have.class", "error");
  });

  it("should show a confirmation dialog when the call is successful", () => {
    cy.get("[id=firstName]").clear().type("Antonio Carlos");
    cy.get("[class=patientDataForm]").contains("submit").click();
    cy.get("div.dialog__info").contains(
      "The patient registration was successful."
    );
  });

  it("should reset the form if the user chooses to keep editing after a submit", () => {
    cy.get("div.dialog__content").contains("Keep editing").click();
    cy.get("[id=firstName]").should("have.value", "");
    cy.get("[id=secondName]").should("have.value", "");
  });

  it("should redirect the user to the DashboardActivity on Dashboard button click", () => {
    cy.get("[id=firstName]").type("Antonio Carlos");
    cy.get("[class=patientDataForm]").contains("submit").click();
    cy.get("div.dialog__content").contains("Dashboard").click();
    cy.get("div.dashboard");
  });
});
