describe("New Pharmaceutical", () => {
  beforeEach(() => {
    cy.authenticate("/pharmacy/pharmaceutical/new");
  });

  it("Should render the UI", () => {
    cy.dataCy("new-pharmaceutical").should("exist");
  });

  it("Should navigate to pharmaceutical form", () => {
    cy.dataCy("pharmaceutical-form").should("exist");
  });

  it("Should fill pharmaceutical form", () => {
    cy.byId("prodCode").focus().clear().type("PROD_04");
    cy.byId("type").focus().clear().type("Labora");
    cy.byId("type-option-0").click();
    cy.byId("description").focus().clear().type("fail");
    cy.byId("pcsperpck").focus().clear().type("25");
    cy.byId("minqty").focus().clear().type("75");
  });

  it("Should display an error info box if the pharmaceutical creation fails", () => {
    cy.dataCy("submit-button").click();

    cy.dataCy("info-box").should("have.class", "error");
  });

  it("Should show a confirmation if the pharmaceutical creation succeeds", () => {
    cy.byId("prodCode").focus().clear().type("PROD_04");
    cy.byId("type").focus().clear().type("Labora");
    cy.byId("type-option-0").click();
    cy.byId("description").focus().clear().type("New description").blur();
    cy.dataCy("submit-button").click();
    cy.dataCy("info-box").should("not.exist");
    cy.dataCy("dialog-title").contains("Pharmaceutical added successfully");
    cy.dataCy("approve-dialog").click();
  });
});
