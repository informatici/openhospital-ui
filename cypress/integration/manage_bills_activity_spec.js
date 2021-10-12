const START_PATH = 'http://localhost:3000';

describe("ManageBillsActivity spec", () => {
    it("should render the ui", () => {
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
    });

    it("should validate start period date", () => {
        cy.get("[id=fromDate]").focus().clear().blur();
        //cy.get("[class=filterBillForm__form]").contains("Ce champ est obligatoire");
    })

});

