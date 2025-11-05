describe("NewPharmaceuticalForm spec", () => {
  beforeEach(() => {
    cy.authenticate("/pharmacy/pharmaceutical/new");
    cy.dataCy("new-pharmaceutical-form").should("exist");
  });

  it("should display form fields and actions", () => {
    cy.dataCy("pharmaceutical-code-field").should("exist");
    cy.dataCy("pharmaceutical-type-field").should("exist");
    cy.dataCy("pharmaceutical-button-set").should("exist");
  });
});
