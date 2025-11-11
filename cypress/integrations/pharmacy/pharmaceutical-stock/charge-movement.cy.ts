describe("Charge movement", () => {
  it("Should render the ui", () => {
    cy.authenticate("/pharmacy/pharmaceutical-stock");
    cy.dataCy("pharmaceutical-stock").should("exist");
  });

  it("Should navigate to chareg movement form", () => {
    cy.dataCy("charge-button").click();
    cy.dataCy("charge-movement").should("exist");
  });

  it("Should fill charege movement form", () => {
    cy.byId("date").focus().type("031120251200").blur();
    cy.byId("medical").focus().type("Para");
    cy.byId("medical-option-0").click();
    cy.byId("quantity").focus().clear().type("12").blur();
    cy.byId("refNo").focus().type("0").blur();
    cy.byId('"lot.code"').focus().type("128").blur();
    cy.byId('"lot.preparationDate"').focus().type("030820251200").blur();
    cy.byId('"lot.dueDate"').focus().type("030820281200").blur();
    cy.byId('"lot.cost"').focus().type("64").blur();
  });

  it("Should display an error info box if the movement charging fails", () => {
    cy.dataCy("submit-button").click();

    cy.dataCy("info-box").should("have.class", "error");
  });

  it("Should show a confirmation dialog if the movement charging succeeds", () => {
    cy.byId("refNo").focus().clear().type("448").blur();
    cy.dataCy("submit-button").click();
    cy.dataCy("info-box").should("not.exist");
    cy.dataCy("dialog-title").contains("Charge Movement Successful");
    cy.dataCy("dialog-return-button").click();
  });
});
