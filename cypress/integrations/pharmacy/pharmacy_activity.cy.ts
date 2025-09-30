describe("PharmacyActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate("/pharmacy");
    cy.dataCy("pharmacy-activity");
  });

  it("should render pharmacy home", () => {
    cy.dataCy("pharmacy-home").contains("Pharmacy");
  });
});
