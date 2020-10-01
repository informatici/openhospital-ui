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

  it.skip("should pass the callback function for performing the API call", () => {});
});
