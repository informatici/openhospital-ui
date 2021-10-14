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

    it("should validate start period", () => {
        cy.get("[id=fromDate]").focus().clear();
        cy.get("[class=filterForm__buttonSet]");
        cy.get("[class=submit_button]").find("div").click();
        cy.get(".filterBillForm__form").eq(0).get("#filterBillForm__item__fromDate")
            .eq(0).get("p").contains("fromDate is a required field");
    })


    it("should pass in initialValues carrying only default values", () => {
        cy.get("#filterBillForm__item__fromDate");
        const fields = Object.keys(initialValues).map((fieldName) => ({
            fieldName,
            id: `[id=${fieldName.toString()}]`,
            value: initialValues[fieldName]
        }));
        cy.get('#fromDate').next().click();

        cy.get(".MuiPickersCalendarHeader-switchHeader").find('[tabindex="0"]').eq(0).type('{enter}', { force: true });

    });

    it("should pass the submit form button label", () => {
        cy.get("[class=submit_button]").find("div").click();
    });



});

