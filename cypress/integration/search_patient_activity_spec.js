const START_PATH = "http://localhost:3000/search";

describe("SearchPatientActivity spec", () => {
  it.only("should render the ui", () => {
    cy.authenticate(START_PATH);
    cy.get("[class=searchPatient]");
  });
});
