describe("PharmacyActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate("/pharmacy");
    cy.dataCy("pharmacy-activity");
  });

  it("should navigate to ward stock", () => {
    cy.dataCy("ward-stock").click();
    cy.dataCy("subtitle").contains("CHILDREN WARDS");
  });

  it("should display select female ward and show movements", () => {
    cy.dataCy("cta-button-F").click();
    cy.dataCy("subtitle").contains("FEMALE WARDS");
    cy.dataCy("ward-stock-table")
      .find("table tbody tr")
      .then(($rows) => {
        expect($rows.length).equal(12);
      });
  });

  it("should show female ward incoming movements", () => {
    cy.dataCy("incoming-button").click();
    cy.dataCy("ward-stock-table")
      .find("table tbody tr")
      .then(($rows) => {
        expect($rows.length).equal(4);
      });
  });
  it("should show female ward outgoing movements", () => {
    cy.dataCy("outcoming-button").click();
    cy.dataCy("ward-stock-table")
      .find("table tbody tr")
      .then(($rows) => {
        expect($rows.length).equal(8);
      });
  });
});
