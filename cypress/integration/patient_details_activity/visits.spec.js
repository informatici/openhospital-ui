const HOSTNAME = Cypress.env("HOSTNAME");
const START_PATH = `${HOSTNAME}/patients/details/1`;

describe("Patient Details / Visit - Inpatient", () => {
    before(() => {
        cy.authenticate(START_PATH);
    });

    it("should render the ui", () => {
        cy.get("[class=patientDetails]");
    });

    it("should have a menu item for visits", () => {
        cy.get("[class='patientDetails__main_menu']")
            .contains("Visits:")
            .click();
    });

    it("Should fill visit form with mock data", () => {
        cy.get("[id=ward]").focus().type("FEMALE WARDS").blur();
        cy.get("[id=date]").focus().type("03052022").blur();
        cy.get("[id=duration]").focus().type("100").blur();
        cy.get("[id=service]").focus().type("Some service").blur();
    })

    it("should display an error component if the visit creation call fails", () => {
        cy.get("[class='submit_button']").click();

        cy.get("div.infoBox").should("have.class", "error");
    });

    it("should show success dialog if the visit update call successes", () => {
        cy.get("[id=duration]").focus().clear().type("30").blur();
        cy.get("[class='submit_button']").click();
        cy.get("[class='return_button']").click();
    });

    it("should display an error component if the visit update call fails", () => {
        cy.get("[title='Edit']").first().click();
        cy.get("[id=duration]").focus().clear().type("100").blur();
        cy.get("[id=service]").focus().type(" extended").blur();
        cy.get("[class='submit_button']").click();

        cy.get("div.infoBox").should("have.class", "error");
    });

    it("should show success dialog if the visit update call successes", () => {
        cy.get("[id=duration]").focus().clear().type("45").blur();
        cy.get("[class='submit_button']").click();
        cy.get("[class='return_button']").click();
    });
});