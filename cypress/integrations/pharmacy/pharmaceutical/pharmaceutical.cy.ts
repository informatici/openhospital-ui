describe("PharmacyActivity spec", () => {
    beforeEach(() => {
      cy.authenticate("/pharmacy");
      cy.dataCy("pharmacy-activity").should("exist");
    });
  
    it("should navigate to pharmaceutical component and display content", () => {
      cy.dataCy("pharmaceutical").click(); 
  
      cy.get(".pharmaceutical__title").contains(
        "Pharmaceutical" 
      );
  
      cy.dataCy("pharmaceutical-actions").should("exist");
      cy.dataCy("pharmaceutical-table").should("exist");
    });
  });
  