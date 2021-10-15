import initialValues from "../fixtures/initialFilterforms.json";
import moment from "moment";
const START_PATH = 'http://localhost:3000';

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

    it.skip("should validate start period", () => {
        cy.get("[id=fromDate]").focus().clear();
        cy.get("[class=filterForm__buttonSet]");
        cy.get("[class=submit_button]").find("div").click();
        cy.get(".filterBillForm__form").eq(0).get("#filterBillForm__item__fromDate")
            .eq(0).get("p").contains("fromDate is a required field");
    });

    it("end date should have the current date", () => {        
        cy.get('#toDate').should("have.value", 
            moment(new Date()).format("DD/MM/YYYY"));
    });
    it("should pass the submit form button", () => {       
        cy.get("[class=submit_button]").find("div").click();
    });

    it("should open the pending bill tabs", () => {
        cy.get(".searchBills__content");
        cy.get(".tabs_header");
        cy.get(".tabs.desktop").find(".tab").eq(1).click();
        cy.get(".tab.active").find("span").should('be.visible');

    })

    it('pending bills should be "h3" title', () => {
        cy.get(".tabs_content").find(".panel");
        cy.get(".manageBills__content_header").find("h3").contains("Pending Bills");
    })

    it("pending bills table should exist", () => {
        cy.get(".tabs_content").find(".panel");
        cy.get(".manageBills__content_body");
        cy.get(".MuiPaper-root.MuiTableContainer-root").find("table").should('be.visible');             
    })

    it("the view details button of the first element should be visible", () => {     
        cy.get("table").find("tbody")
        cy.get("tr").eq(0).should('be.visible');
        cy.get("td > button").eq(0).click();
        cy.wait(1000);
        cy.get("td > button").eq(0).click();
        cy.get("td > button").eq(1).should("be.visible");
        //cy.get("button").eq(0).click();
    })

    it("should open the view dialog of the first pending bill", () => {
        cy.get("table").find("tbody")
        cy.get("tr").eq(0).should('be.visible');
        cy.get("td > button").eq(1).click();
    })
});

