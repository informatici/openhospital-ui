describe("New Pharmaceutical", () => {
  beforeEach(() => {
    cy.authenticate("/pharmacy/pharmaceutical/new");
    cy.dataCy("pharmaceutical-form").should("exist");
  });

  it("should display form fields and actions", () => {
    cy.byId("prodCode").should("exist");
    cy.byId("type").should("exist");
    cy.dataCy("submit-button").should("exist");
  });
});
