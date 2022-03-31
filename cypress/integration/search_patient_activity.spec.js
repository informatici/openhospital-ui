const START_PATH = "http://localhost:3000/search";

describe("SearchPatientActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate(START_PATH);
    cy.get("[class=searchPatient]");
  });

  it("should present single search result if search param is patient ID", () => {
    cy.get("[id=id]").clear().type("1234567");
    cy.get("[class=searchPatient__panel]").submit();
    cy.get(["div.patientSearchItem"]).then((els) =>
      expect(els.length).equal(1)
    );
    cy.get("[id=id]").clear();
  });

  it("should clean up secondary fields if patient ID is filled", () => {
    cy.get("[id=firstName]").clear().type("Antonio");
    cy.get("[id=secondName]").clear().type("Carlos Jobim");

    cy.get("[id=id]").clear().type("1234567");

    cy.get("[id=firstName]").should("have.value", "");
    cy.get("[id=secondName]").should("have.value", "");

    cy.get("[id=id]").clear();
  });

  it("should alert the user that no result was found", () => {
    cy.get("[id=firstName]").clear().type("empty");
    cy.get("[class=searchPatient__panel]").submit();

    cy.get("[class=searchPatient]").contains(
      "We couldn't find a match, please try another search."
    );
  });

  it("should alert the user if the search fails", () => {
    cy.get("[id=firstName]").clear().type("fail");
    cy.get("[class=searchPatient__panel]").submit();

    cy.get("[class=searchPatient] .infoBox.error");
  });

  it("should display the results in a grid", () => {
    cy.get("[id=firstName]").clear().type("Antonio Carlos");
    cy.get("[class=searchPatient__panel]").submit();
    cy.get("[class=searchPatient__results]");
  });

  it("should go to PatientDetailsActivity when a PatientSearchItem is clicked", () => {
    cy.get(["div.patientSearchItem"]).then((els) =>
      cy.get(els[0]).first().click()
    );
    cy.get("div.patientDetails");
  });
});
