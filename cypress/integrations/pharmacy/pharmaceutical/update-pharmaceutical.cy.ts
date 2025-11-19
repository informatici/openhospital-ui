describe("Update Pharmaceutical", () => {
  before(() => {
    cy.authenticate("/pharmacy/pharmaceutical");
    cy.dataCy("pharmaceutical").should("exist");
  });

  it("Should navigate to edit pharmaceutical form", () => {
    cy.dataCy("table-edit-action").eq(3).click();
    cy.dataCy("pharmaceutical-form").should("exist");
  });

  it("Should update form fields", () => {
    cy.byId("prodCode").focus().clear().type("PROD_04");
    cy.byId("type").focus().clear().type("Labora");
    cy.byId("type-option-0").click();
    cy.byId("description").focus().clear().type("fail");
    cy.byId("pcsperpck").focus().clear().type("25");
    cy.byId("minqty").focus().clear().type("75");
    cy.byName("ignoreSimilar").focus().check().blur();
  });

  it("Should display an error info box if the medical update fails", () => {
    cy.dataCy("submit-button").click();

    cy.dataCy("info-box").should("have.class", "error");
  });

  it("Should show a confirmation dialog if the medical update succeeds", () => {
    cy.byId("description").focus().clear().type("New description").blur();
    cy.dataCy("submit-button").click();
    cy.dataCy("info-box").should("not.exist");
    cy.dataCy("dialog-title").contains("Pharmaceutical updated successfully");
    cy.dataCy("approve-dialog").click();
  });
});
