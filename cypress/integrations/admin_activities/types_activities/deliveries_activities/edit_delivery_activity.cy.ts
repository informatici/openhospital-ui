const DELIVERY_TYPE_START_PATH = "/admin/types/deliveries";

describe("Delivery types Edit Activity specs", () => {
  it("should render the ui", () => {
    cy.authenticate(DELIVERY_TYPE_START_PATH);
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });

  it("should show delivery type edit form", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("sub-delivery-title").contains("Edit delivery type");
  });

  it("should fail to edit the delivery type", () => {
    cy.byId("code").should("be.disabled");
    cy.byId("description").clear();
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should successfully save delivery type changes", () => {
    cy.byId("description").clear().type("Delivery type");
    cy.dataCy("submit-form").click();
    cy.dataCy("dialog-info").contains("has been updated successfully!");
    cy.dataCy("approve-dialog").click();
  });

  it("should redirect after delivery type update", () => {
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });

  it("should cancel the cancellation of the delivery type update", () => {
    cy.dataCy("table-edit-action").first().click();
    cy.dataCy("cancel-form").click();
    cy.dataCy("dialog-info").contains(
      "Are you sure to cancel the delivery type update?"
    );
    cy.dataCy("close-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
  });

  it("should cancel the delivery type update", () => {
    cy.dataCy("cancel-form").click();
    cy.dataCy("approve-dialog").click();
    cy.dataCy("dialog-info").should("not.exist");
    cy.dataCy("sub-delivery-title").contains("Manage delivery types");
  });
});
