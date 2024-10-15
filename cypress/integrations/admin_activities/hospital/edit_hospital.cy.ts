/// <reference types="cypress" />

const STARTS_PATH = "/admin";

describe("Edit Hospital Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(STARTS_PATH);
    cy.dataCy("hospital-infos").click();
    cy.dataCy("edit-hospital").click();
    cy.dataCy("activity-title").contains("Edit hospital");
  });

  it("should fail to edit the hospitalInfo", () => {
    cy.byId("description").clear().type("FAIL");
    cy.byId("email").clear().type("luke@hospital.com");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("info-box").contains("Invalid payload");
  });

  it("should successfully save hospital infos changes", () => {
    cy.byId("description").clear().type("St. LUKE Hospital");
    cy.byId("email").clear().type("luke@hospital.com");
    cy.byId("currencyCod").clear().type("FCFA");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("updated successfully");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after hospital info update", () => {
    cy.dataCy("activity-title").contains("Wards");
  });

  it("should cancel the discard of the hospital infos", () => {
    cy.dataCy("edit-hospital").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains("lost");
    cy.dataCy("close-dialog").click().click();
    cy.dataCy("dialog-info").should("not.be.visible");
  });

  it("should cancel the update of the hospital infos", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains("lost");
    cy.dataCy("approve-dialog").click();
    cy.dataCy("activity-title").contains("Wards");
  });
});
