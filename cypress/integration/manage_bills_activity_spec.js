const START_PATH = 'http://localhost:3000';
import initialValues from "../fixtures/initialFilterforms.json";

describe("ManageBillsActivity spec", () => {
    it("should render the manage bill ui", () => {
        cy.authenticate(START_PATH);
        cy.get("[class=appHeader__identified__trigger]").click();
        cy.get("[class=appHeader__nav]").click();
        cy.get("[class=appHeader__nav_items]");
        cy.get("#billing__nav__item").click();
        cy.get("#manage__bills__button").click();
    });

    it("should have a filterBillForm as a child component", () => {
        cy.get("[class=searchBills]");
        cy.get("[class=searchBills__background]");
        cy.get("[class=container]");
        cy.get("[class=searchBills__panel]");
        cy.get("[class=searchBills__formData]");
        cy.get("[class=searchBills__formData_sidebar]");
        cy.get("[id=filterBillForm]");
        cy.get("#filterBillForm__item__fromDate");
        cy.get("#filterBillForm__item__toDate");
    });

    it("should validate start period and end Dates", () => {
        cy.get("[id=fromDate]").focus().clear();
        //cy.get("[id=fromDate]").focus().blur();
        cy.get("[id=toDate]").focus().clear();
        cy.get("[class=filterForm__buttonSet]");
        cy.get("[class=submit_button]").find("div");
        cy.get("[class=submit_button]").find("div").click();
        cy.get(".filterBillForm__form").eq(0).get("#filterBillForm__item__fromDate")
            .eq(0).get("p").contains("fromDate is a required field");
        cy.get(".filterBillForm__form").eq(0).get("#filterBillForm__item__toDate").
            eq(0).get("p").contains("toDate is a required field");
    })

    it.skip("should pass in initialValues carrying only default values", () => {

        const fields = Object.keys(initialValues).map((fieldName) => ({
            fieldName,
            id: `[id=${fieldName.toString()}]`,
            value: initialValues[fieldName]
        }));

        fields.forEach((field) => {
            cy.get(field.id).type(field.value);
        });

        fields.forEach((field) => {
            cy.get(field.id).should("have.value", initialValues[field.fieldName]);
        });
    });


});

