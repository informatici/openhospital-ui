describe("New Pharmaceutical", () => {
  it("Should render the UI", () => {
    cy.authenticate("/pharmacy/pharmaceutical/new");
    cy.dataCy("new-pharmaceutical").should("exist");
  });

  it("Should display form fields", () => {
    cy.dataCy("pharmaceutical-form").should("exist");
    cy.byId("prodCode").should("exist");
    cy.byId("type").should("exist");
    cy.dataCy("submit-button").should("exist");
  });

  it("Should fill form", () => {
    cy.byId("prodCode").type("TEST001");
    cy.byId("type")
      .should("not.be.disabled")
      .click()
      .type("{downarrow}{enter}");
    cy.byId("description").type("Test description");
    cy.byId("pcsperpck").type("10");
    cy.byId("minqty").type("5");
  });

  it("Should submit form successfully", () => {
    cy.dataCy("submit-button").click();
    cy.url().should("include", "/pharmacy/pharmaceutical");
  });
});
