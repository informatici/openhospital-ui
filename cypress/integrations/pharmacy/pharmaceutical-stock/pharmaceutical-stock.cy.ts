describe("PharmacyActivity spec", () => {
  it("should render the ui", () => {
    cy.authenticate("/pharmacy");
    cy.dataCy("pharmacy-activity");
  });

  it("should navigate to pharmaceutical stock", () => {
    cy.dataCy("pharmaceutical-stock").click();
  });

  it("should display stock table with 10 rows", () => {
    cy.dataCy("pharmaceutical-stock-table")
      .find("table tbody tr")
      .then(($rows) => {
        expect($rows.length).equal(20);
      });
  });
});
