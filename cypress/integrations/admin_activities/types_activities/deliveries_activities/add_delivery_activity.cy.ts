const DELIVERY_TYPE_STARTS_PATH = "/admin/types/deliveries";

describe("Add delivery type Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DELIVERY_TYPE_STARTS_PATH);
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });

  it("should show delivery type creation form", () => {
    cy.dataCy("add-delivery-type").click();
    cy.dataCy("sub-delivery-title").contains("New delivery type");
  });

  it("should fail to create a new delivery type", () => {
    cy.byId("code").type("FAIL");
    cy.byId("description").type("Delivery type");
    cy.dataCy("submit-form").click();
    cy.dataCy("info-box").contains("Fail");
  });

  it("should successfully create a new delivery type", () => {
    cy.byId("code").clear().type("22");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains(
      "The delivery type has been created successfully!"
    );
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after delivery type creation", () => {
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });

  it("should cancel the cancellation of the delivery type creation", () => {
    cy.dataCy("add-delivery-type").click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the delivery type creation?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the delivery type creation", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });
});
