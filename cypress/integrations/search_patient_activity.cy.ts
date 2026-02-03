/// <reference types="cypress" />

const START_PATH = "/patients/search";

describe("SearchPatientActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate(START_PATH);
    cy.dataCy("search-patient");
  });

  it("should present single search result if search param is patient ID", () => {
    cy.byId("id").clear().type("1234567");
    cy.dataCy("search-patient-panel").submit();
    cy.dataCy("patient-search-item").then((els) => expect(els.length).equal(1));
    cy.byId("id").clear();
  });

  it("should clean up secondary fields if patient ID is filled", () => {
    cy.byId("firstName").clear().type("Antonio");
    cy.byId("secondName").clear().type("Carlos Jobim");

    cy.byId("id").clear().type("1234567");

    cy.byId("firstName").should("have.value", "");
    cy.byId("secondName").should("have.value", "");

    cy.byId("id").clear();
  });

  it("should alert the user that no result was found", () => {
    cy.byId("firstName").clear().type("empty");
    cy.dataCy("search-patient-panel").submit();

    cy.dataCy("search-patient").contains(
      "We couldn't find a match, please try another search."
    );
  });

  it("should alert the user if the search fails", () => {
    cy.byId("firstName").clear().type("fail");
    cy.dataCy("search-patient-panel").submit();

    cy.dataCy("info-box");
  });

  it("should display the results in a grid", () => {
    cy.byId("firstName").clear().type("Antonio Carlos");
    cy.dataCy("search-patient-panel").submit();
    cy.dataCy("search-patient-results");
  });

  it("should go to PatientDetailsActivity when a PatientSearchItem is clicked", () => {
    cy.dataCy("patient-search-item").first().click();
    cy.dataCy("patient-details");
  });
});
