import initialValues from "../consts/newPatientInitialValues.json";

const START_PATH = "http://localhost:3000/new";

describe("NewPatientActivity spec", () => {
  it("should render the ui", () => {
    cy.visit(START_PATH, {
      onBeforeLoad(w) {
        w.localStorage.clear();
        w.localStorage.setItem("sessionId", "token");
      },
    });
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

  it.skip("should pass the callback function for performing the API call", () => {
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

    cy.get("[class=patientDataForm]").contains("submit").click();

    cy.wait(1000);
    cy.get("[class=confirmationDialog]");
  });
});
